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

async function main() {
  const { POST, GET } = require("../app/api/results/route.ts");
  const { client } = require("../lib/db/client.ts");
  await client.executeMultiple(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE tests (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
      status TEXT NOT NULL, published_at INTEGER);
    CREATE TABLE questions (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
      question_order INTEGER NOT NULL, choice_1_tags TEXT NOT NULL, choice_2_tags TEXT NOT NULL);
    CREATE TABLE result_types (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
      type_code TEXT NOT NULL, label TEXT NOT NULL);
    CREATE TABLE test_results (id TEXT PRIMARY KEY, test_id TEXT NOT NULL REFERENCES tests(id),
      result_type TEXT NOT NULL, answers TEXT NOT NULL, user_ip TEXT, user_agent TEXT,
      created_at INTEGER NOT NULL);
    INSERT INTO tests VALUES ('fixture-id', 'fixture-slug', 'Fixture', 'published', NULL);
    INSERT INTO questions VALUES ('q1', 'fixture-id', 1, '["E"]', '["I"]');
    INSERT INTO questions VALUES ('q2', 'fixture-id', 2, '["S"]', '["N"]');
    INSERT INTO questions VALUES ('q3', 'fixture-id', 3, '["T"]', '["F"]');
    INSERT INTO questions VALUES ('q4', 'fixture-id', 4, '["J"]', '["P"]');
    INSERT INTO result_types VALUES ('r1', 'fixture-id', 'ESTJ', 'ESTJ');
    INSERT INTO result_types VALUES ('r2', 'fixture-id', 'ISTJ', 'ISTJ');
    INSERT INTO tests VALUES ('private-id', 'private-slug', 'Private', 'draft', NULL);
    INSERT INTO tests VALUES ('collision', 'other-slug', 'Collision', 'published', NULL);
    INSERT INTO tests VALUES ('other-id', 'collision', 'Other', 'published', NULL);
    INSERT INTO tests VALUES ('static-id', 'static-slug', 'Static', 'published', NULL);
    INSERT INTO tests VALUES ('numeric-id', 'numeric-slug', 'Numeric', 'published', NULL);
    INSERT INTO questions VALUES ('n1', 'numeric-id', 1, '["1"]', '["2"]');
    INSERT INTO result_types VALUES ('nr1', 'numeric-id', '2.5', '2.5');
  `);

  // Original failure: the slug is not a tests.id foreign key.
  await assert.rejects(client.execute({
    sql: "INSERT INTO test_results VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: ["old-path", "fixture-slug", "ESTJ", "{}", null, null, 1],
  }), /FOREIGN KEY/);

  const { NextRequest } = require("next/server");
  async function post(body) {
    const request = new NextRequest("https://temon.kr/api/results", {
      method: "POST", headers: { "Content-Type": "application/json", "User-Agent": "fixture-agent" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
    const response = await POST(request);
    return { status: response.status, body: await response.json() };
  }
  const valid = (testId) => ({ testId, resultType: "ESTJ",
    answers: { 0: '["E"]', 1: '["S"]', 2: '["T"]', 3: '["J"]' } });
  const byId = await post(valid("fixture-id"));
  const bySlug = await post(valid("fixture-slug"));
  assert.equal(byId.status, 201);
  assert.equal(bySlug.status, 201);
  assert.equal((await client.execute("SELECT count(*) AS n FROM test_results WHERE test_id = 'fixture-id'")).rows[0].n, 2);
  assert.equal((await post(valid("missing"))).body.code, "TEST_NOT_FOUND");
  assert.equal((await post(valid("private-id"))).body.code, "TEST_NOT_PUBLIC");
  assert.equal((await post(valid("collision"))).body.code, "AMBIGUOUS_TEST_ID");
  assert.equal((await post(valid("static-slug"))).body.code, "TEST_DEFINITION_UNAVAILABLE");
  assert.equal((await post({ testId: "numeric-slug", resultType: "2.5", answers: { 0: '["1"]' } })).body.code, "UNSUPPORTED_RESULT_ENGINE");
  assert.equal((await post({ ...valid("fixture-id"), resultType: "bad" })).body.code, "INVALID_RESULT_TYPE");
  assert.equal((await post({ ...valid("fixture-id"), resultType: "ISTJ" })).body.code, "INVALID_RESULT_TYPE");
  assert.equal((await post({ ...valid("fixture-id"), answers: { 0: "bad" } })).body.code, "INVALID_ANSWERS");
  assert.equal((await post("{" )).body.code, "INVALID_JSON");
  assert.equal((await post("x".repeat(65537))).body.code, "BODY_TOO_LARGE");
  assert.equal((await client.execute("SELECT count(*) AS n FROM test_results")).rows[0].n, 2);

  const response = await GET(new NextRequest(`https://temon.kr/api/results?id=${bySlug.body.id}`));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    id: bySlug.body.id, testId: "fixture-id", resultType: "ESTJ",
  });
  const originalFetch = global.fetch;
  const originalSetTimeout = global.setTimeout;
  try {
    global.setTimeout = (callback, delay) => {
      assert.equal(delay, 10_000);
      return originalSetTimeout(callback, 0);
    };
    global.fetch = (_url, options) => new Promise((_, reject) => {
      options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    });
    const { saveTestResult } = require("../lib/api-client.ts");
    await assert.rejects(saveTestResult(valid("fixture-id")), /RESULT_SAVE_TIMEOUT/);
  } finally {
    global.fetch = originalFetch;
    global.setTimeout = originalSetTimeout;
  }
  console.log("PASS results contract: FK reproduction, id/slug, invalid cases, public DTO");
  await client.close();
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
