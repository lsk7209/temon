#!/usr/bin/env node
/**
 * Normalizes tests.metadata rows that were saved as nested JSON strings.
 *
 * Dry-run:
 *   node scripts/normalize-test-metadata.js
 * Apply:
 *   node scripts/normalize-test-metadata.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function parseMetadata(value) {
  if (!value) return {};
  if (typeof value === "object") return value;
  if (typeof value !== "string") return {};

  try {
    return parseMetadata(JSON.parse(value));
  } catch {
    return {};
  }
}

function canonicalize(value) {
  const metadata = parseMetadata(value);
  if (
    metadata.searchSubmission &&
    typeof metadata.searchSubmission === "object" &&
    !metadata.searchSubmission.status
  ) {
    metadata.searchSubmission = {
      version: metadata.searchSubmission.version || "1.0",
      status: "completed",
      ...metadata.searchSubmission,
    };
  }

  return JSON.stringify(metadata);
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL is not configured");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const rows = await client.execute("select id, slug, status, metadata from tests");
  const changes = [];

  for (const row of rows.rows) {
    const before = row.metadata ?? "";
    const after = canonicalize(before);
    if (before !== after) {
      changes.push({
        id: row.id,
        slug: row.slug,
        status: row.status,
        before,
        after,
      });
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    apply: APPLY,
    scanned: rows.rows.length,
    changed: changes.length,
    byStatus: changes.reduce((acc, change) => {
      acc[change.status] = (acc[change.status] || 0) + 1;
      return acc;
    }, {}),
  };

  console.log(JSON.stringify(summary, null, 2));

  if (!APPLY || changes.length === 0) return;

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(REPORTS_DIR, `metadata-normalize-backup-${stamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify({ summary, changes }, null, 2));

  try {
    await client.batch(
      changes.map((change) => ({
        sql: "update tests set metadata = ?, updated_at = unixepoch() where id = ?",
        args: [change.after, change.id],
      })),
      "write",
    );
  } catch (error) {
    throw error;
  }

  console.log(`Backup written: ${path.relative(ROOT, backupPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
