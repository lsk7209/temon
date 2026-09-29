// Idempotent result save: in-memory libsql fixture, no network or remote DB.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
process.env.TURSO_DATABASE_URL = "file::memory:";
delete process.env.TURSO_AUTH_TOKEN;

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith("@/")) request = path.join(root, request.slice(2));
  return resolveFilename.call(this, request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText, filename);
};

const FIXTURE = `
  PRAGMA foreign_keys = ON;
  CREATE TABLE tests (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
    status TEXT NOT NULL, published_at INTEGER, subtitle TEXT, description TEXT, category TEXT,
    question_count INTEGER NOT NULL DEFAULT 4, avg_minutes INTEGER NOT NULL DEFAULT 1,
    result_type_count INTEGER NOT NULL DEFAULT 2, metadata TEXT,
    created_at INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL DEFAULT 0);
  CREATE TABLE questions (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
    question_order INTEGER NOT NULL, question_text TEXT, choice_1_text TEXT, choice_2_text TEXT,
    choice_1_tags TEXT NOT NULL, choice_2_tags TEXT NOT NULL);
  CREATE TABLE result_types (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
    type_code TEXT NOT NULL, label TEXT NOT NULL, summary TEXT, traits TEXT, picks TEXT,
    tips TEXT, match_types TEXT, emoji TEXT);
  CREATE TABLE test_results (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
    result_type TEXT NOT NULL, answers TEXT NOT NULL, user_ip TEXT, user_agent TEXT,
    created_at INTEGER NOT NULL);
  INSERT INTO tests (id, slug, title, status) VALUES ('fixture-id', 'fixture-slug', 'Fixture', 'published');
  INSERT INTO questions VALUES ('q1', 'fixture-id', 1, 'q', 'a', 'b', '["E"]', '["I"]');
  INSERT INTO questions VALUES ('q2', 'fixture-id', 2, 'q', 'a', 'b', '["S"]', '["N"]');
  INSERT INTO questions VALUES ('q3', 'fixture-id', 3, 'q', 'a', 'b', '["T"]', '["F"]');
  INSERT INTO questions VALUES ('q4', 'fixture-id', 4, 'q', 'a', 'b', '["J"]', '["P"]');
  INSERT INTO result_types (id, test_id, type_code, label) VALUES ('r1', 'fixture-id', 'ESTJ', 'ESTJ');
  INSERT INTO result_types (id, test_id, type_code, label) VALUES ('r2', 'fixture-id', 'ISTJ', 'ISTJ');
`;

async function main() {
  const { client } = require("../lib/db/client.ts");
  const { POST } = require("../app/api/results/route.ts");
  const submit = require("../app/api/tests/[testId]/submit/route.ts");
  const { computePayloadDigest } = require("../lib/db/queries/result-attempts.ts");
  const { NextRequest } = require("next/server");
  await client.executeMultiple(FIXTURE);

  const count = async (table) =>
    Number((await client.execute(`SELECT count(*) AS n FROM ${table}`)).rows[0].n);
  async function post(body) {
    const response = await POST(new NextRequest("https://temon.kr/api/results", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    }));
    return { status: response.status, body: await response.json() };
  }
  const answers = { 0: '["E"]', 1: '["S"]', 2: '["T"]', 3: '["J"]' };
  const payload = (attemptId, extra = {}) => ({ testId: "fixture-slug", resultType: "ESTJ", answers, attemptId, ...extra });

  // 1) Pre-migration: attemptId accepted, table missing -> legacy save still works.
  const legacy = await post(payload("attempt_legacy-0001"));
  assert.equal(legacy.status, 201);
  assert.equal(await count("test_results"), 1);

  // Apply the real additive migration file.
  await client.executeMultiple(fs.readFileSync(path.join(root, "lib/db/migrations/0003_result_attempts.sql"), "utf8"));

  // 2) First save creates, retry with identical payload replays the same id.
  const first = await post(payload("attempt_retry-0001"));
  assert.equal(first.status, 201);
  assert.equal(first.body.replayed, false);
  const retry = await post(payload("attempt_retry-0001", { testId: "fixture-id" }));
  assert.equal(retry.status, 200, "slug vs id resolve to the same canonical payload");
  assert.equal(retry.body.id, first.body.id);
  assert.equal(retry.body.replayed, true);
  assert.equal(await count("test_results"), 2);

  // 3) Key order in answers does not change the digest.
  assert.equal(
    computePayloadDigest({ testId: "t", resultType: "E", answers: { a: "1", b: "2" } }),
    computePayloadDigest({ testId: "t", resultType: "E", answers: { b: "2", a: "1" } }),
  );

  // 4) Same key, different payload -> 409 and no new row.
  const conflict = await post({ ...payload("attempt_retry-0001"), resultType: "ISTJ",
    answers: { ...answers, 0: '["I"]' } });
  assert.equal(conflict.status, 409);
  assert.equal(conflict.body.code, "ATTEMPT_CONFLICT");
  assert.equal(await count("test_results"), 2);

  // 5) Concurrent identical requests -> exactly one row, one shared id.
  const concurrent = await Promise.all(Array.from({ length: 8 }, () => post(payload("attempt_concurrent-01"))));
  const ids = new Set(concurrent.map((item) => item.body.id));
  assert.equal(ids.size, 1);
  assert.equal(concurrent.filter((item) => item.status === 201).length, 1);
  assert.equal(concurrent.filter((item) => item.status === 200).length, 7);
  assert.equal(await count("test_results"), 3);
  assert.equal(await count("result_attempts"), 2);

  // 6) Invalid attempt id rejected before any write; no key keeps legacy behavior.
  assert.equal((await post(payload("bad id!"))).status, 400);
  assert.equal((await post(payload(undefined))).status, 201);
  assert.equal((await post(payload(undefined))).status, 201);
  assert.equal(await count("test_results"), 5);

  // 7) Dynamic submit route: same attempt replays, different answers conflict.
  async function submitPost(body) {
    const response = await submit.POST(new Request("https://temon.kr/api/tests/fixture-slug/submit", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    }), { params: { testId: "fixture-slug" } });
    return { status: response.status, body: await response.json() };
  }
  const dynamicAnswers = { q1: 0, q2: 0, q3: 0, q4: 0 };
  const d1 = await submitPost({ answers: dynamicAnswers, attemptId: "attempt_dynamic-001" });
  const d2 = await submitPost({ answers: { q4: 0, q3: 0, q2: 0, q1: 0 }, attemptId: "attempt_dynamic-001" });
  assert.equal(d1.status, 200);
  assert.equal(d2.body.resultId, d1.body.resultId);
  assert.equal(d2.body.replayed, true);
  const d3 = await submitPost({ answers: { ...dynamicAnswers, q1: 1 }, attemptId: "attempt_dynamic-001" });
  assert.equal(d3.status, 409);
  assert.equal((await submitPost({ answers: dynamicAnswers, attemptId: 42 })).status, 400);
  assert.equal(await count("test_results"), 6);
  const stored = (await client.execute("SELECT answers FROM test_results WHERE id = ?", [d1.body.resultId])).rows[0];
  assert.deepEqual(JSON.parse(stored.answers), dynamicAnswers, "answers stored as single-encoded JSON");

  // 8) Deleting a result cascades its attempt key (retention/deletion stays simple).
  await client.execute("DELETE FROM test_results WHERE id = ?", [first.body.id]);
  assert.equal(await count("result_attempts"), 2);

  console.log("PASS result idempotency: legacy fallback, replay, conflict, concurrency, dynamic submit, cascade");
  await client.close();
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
