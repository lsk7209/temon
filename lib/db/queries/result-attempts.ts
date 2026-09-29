/**
 * Idempotent result persistence keyed by a client attempt ID.
 *
 * Why: a client can time out after the server has already committed a row.
 * Retrying with the same attempt ID must return the original result instead of
 * inserting a duplicate, and reusing the ID for different answers must fail.
 */
import { createHash } from "node:crypto";
import type { Client, InStatement } from "@libsql/client";

export const ATTEMPT_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;
const MISSING_TABLE_PATTERN = /no such table:?\s*result_attempts/i;

export interface ResultRow {
  id: string;
  testId: string;
  resultType: string;
  answers: Record<string, string | number>;
  userIp?: string | null;
  userAgent?: string | null;
}

export type IdempotentInsertOutcome =
  | { kind: "created"; id: string }
  | { kind: "replayed"; id: string }
  | { kind: "conflict" };

let missingTableWarningShown = false;

/** Canonical JSON with sorted keys so key order never changes the digest. */
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`);
    return `{${entries.join(",")}}`;
  }
  return JSON.stringify(value);
}

export function computePayloadDigest(row: Pick<ResultRow, "testId" | "resultType" | "answers">): string {
  const canonical = canonicalJson({ testId: row.testId, resultType: row.resultType, answers: row.answers });
  return createHash("sha256").update(canonical).digest("hex");
}

function resultInsertArgs(row: ResultRow, createdAtSeconds: number) {
  return [row.id, row.testId, row.resultType, JSON.stringify(row.answers),
    row.userIp ?? null, row.userAgent ?? null, createdAtSeconds];
}

async function insertPlain(client: Client, row: ResultRow, createdAtSeconds: number): Promise<IdempotentInsertOutcome> {
  await client.execute({
    sql: `INSERT INTO test_results (id, test_id, result_type, answers, user_ip, user_agent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: resultInsertArgs(row, createdAtSeconds),
  });
  return { kind: "created", id: row.id };
}

/**
 * Inserts a result once per attempt ID inside one write batch (a single
 * SQLite transaction), so concurrent retries serialize and at most one row
 * is created. Without an attempt ID the legacy single insert is used.
 */
export async function insertResultIdempotent(
  client: Client,
  row: ResultRow,
  attemptId?: string,
): Promise<IdempotentInsertOutcome> {
  const createdAtSeconds = Math.floor(Date.now() / 1000);
  if (!attemptId) return insertPlain(client, row, createdAtSeconds);

  const digest = computePayloadDigest(row);
  const statements: InStatement[] = [
    {
      sql: `INSERT INTO test_results (id, test_id, result_type, answers, user_ip, user_agent, created_at)
        SELECT ?, ?, ?, ?, ?, ?, ?
        WHERE NOT EXISTS (SELECT 1 FROM result_attempts WHERE attempt_id = ?)`,
      args: [...resultInsertArgs(row, createdAtSeconds), attemptId],
    },
    {
      sql: `INSERT INTO result_attempts (attempt_id, payload_digest, result_id, created_at)
        VALUES (?, ?, ?, ?) ON CONFLICT(attempt_id) DO NOTHING`,
      args: [attemptId, digest, row.id, createdAtSeconds],
    },
    {
      sql: "SELECT payload_digest, result_id FROM result_attempts WHERE attempt_id = ?",
      args: [attemptId],
    },
  ];

  let storedDigest: unknown;
  let storedResultId: unknown;
  try {
    const results = await client.batch(statements, "write");
    const storedRow = results[2].rows[0];
    storedDigest = storedRow?.payload_digest;
    storedResultId = storedRow?.result_id;
  } catch (error) {
    // Deploy-order safety: before the additive migration exists, keep saving
    // (legacy, non-idempotent) instead of failing every result save.
    if (error instanceof Error && MISSING_TABLE_PATTERN.test(error.message)) {
      if (!missingTableWarningShown) {
        console.warn("result_attempts table missing; saving without idempotency.");
        missingTableWarningShown = true;
      }
      return insertPlain(client, row, createdAtSeconds);
    }
    throw error;
  }

  if (typeof storedResultId !== "string") throw new Error("Attempt row missing after idempotent insert");
  if (storedDigest !== digest) return { kind: "conflict" };
  return storedResultId === row.id
    ? { kind: "created", id: storedResultId }
    : { kind: "replayed", id: storedResultId };
}
