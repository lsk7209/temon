// T05 회귀 테스트: 시작→완료→저장 계측 계약의 attemptId 전파 및 오류 코드 허용 목록.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const source = fs.readFileSync("lib/analytics.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const events = [];
const window = { gtag: undefined };
const isolatedModule = { exports: {} };
const context = {
  module: isolatedModule,
  exports: isolatedModule.exports,
  window,
  console,
  fetch: async () => ({ ok: true }),
  setInterval: () => 1,
  clearInterval: () => {},
  require: (id) => {
    if (id === "./consent") return { isAnalyticsAllowed: () => true };
    throw new Error(`unexpected require ${id}`);
  },
};
vm.runInNewContext(compiled, context);
const analytics = isolatedModule.exports;

window.gtag = (_command, name, params) => events.push({ name, params });

// 1) attemptId를 넘기면 GA4 이벤트 파라미터에 attempt_id로 실린다 (F07).
analytics.trackTestComplete("quiz", "3.5", "attempt_abc");
{
  const event = events.at(-1);
  assert.equal(event.name, "test_complete");
  assert.equal(event.params.attempt_id, "attempt_abc");
  assert.equal(event.params.test_result, "3.5");
}

// 2) attemptId 없이 호출해도 기존처럼 동작해야 한다 (하위 호환).
analytics.trackTestComplete("quiz", "3.5");
{
  const event = events.at(-1);
  assert.equal(event.name, "test_complete");
  assert.equal(event.params.attempt_id, undefined);
}

// 3) trackResultSave: attemptId + errorCode가 정상 전달된다.
analytics.trackResultSave("quiz", "error", { attemptId: "attempt_abc", errorCode: "timeout" });
{
  const event = events.at(-1);
  assert.equal(event.name, "result_save_error");
  assert.equal(event.params.attempt_id, "attempt_abc");
  assert.equal(event.params.error_code, "timeout");
}

// 4) 허용 목록에 없는 임의 문자열은 서버 원본 메시지를 그대로 보내지 않고 server_error로 정규화된다 (F08).
analytics.trackResultSave("quiz", "error", { errorCode: "Database connection refused at 10.0.0.5:5432" });
{
  const event = events.at(-1);
  assert.equal(event.params.error_code, "server_error");
}

// 5) errorCode 미지정 시에도 server_error로 안전하게 fallback한다.
analytics.trackResultSave("quiz", "error");
{
  const event = events.at(-1);
  assert.equal(event.params.error_code, "server_error");
}

// 6) success 이벤트에는 error_code가 없어야 한다.
analytics.trackResultSave("quiz", "success", { attemptId: "attempt_abc" });
{
  const event = events.at(-1);
  assert.equal(event.name, "result_save_success");
  assert.equal(event.params.error_code, undefined);
  assert.equal(event.params.attempt_id, "attempt_abc");
}

// 7) RESULT_SAVE_ERROR_CODES가 export되어 있고 문서화된 허용 코드를 포함한다.
assert.ok(Array.isArray(analytics.RESULT_SAVE_ERROR_CODES));
for (const code of ["invalid_input", "not_found", "conflict", "invalid_answers", "unsupported_engine", "rate_limited", "timeout", "network", "server_error"]) {
  assert.ok(analytics.RESULT_SAVE_ERROR_CODES.includes(code), `missing documented error code: ${code}`);
}

// 8) use-test-result.ts와 client-runner.tsx가 attemptId를 실제로 전달하도록 소스에 반영됐는지 확인.
{
  const hookSource = fs.readFileSync("hooks/use-test-result.ts", "utf8");
  assert.ok(/trackTestComplete\(testId, resultType, attemptIdRef\.current\)/.test(hookSource), "hook must pass attemptId to trackTestComplete");
  assert.ok(/trackResultSave\(testId, 'error', \{ attemptId:/.test(hookSource), "hook must pass attemptId on save error");
  assert.ok(/trackResultSave\(testId, 'success', \{ attemptId:/.test(hookSource), "hook must pass attemptId on save success");

  const runnerSource = fs.readFileSync("app/tests/[testId]/test/client-runner.tsx", "utf8");
  assert.ok(/trackTestComplete\(routeTestId, undefined, attemptIdRef\.current/.test(runnerSource), "client-runner must pass attemptId to trackTestComplete");
  assert.ok(/trackResultSave\(routeTestId, "error", \{ attemptId:/.test(runnerSource), "client-runner must pass attemptId on save error");
}

console.log("PASS result-analytics-contract: attemptId propagation (F07), error code allow-list normalization (F08)");
