// T12 통합 검수: T01(결과 계약)과 T05(계측 계약)가 서로 충돌하지 않는지 확인.
// - 유효하지 않은 결과 상태에서는 trackResultView가 호출되지 않아야 한다.
// - 공유 URL(T02)이 담고 있는 값과 결과 화면(T01)이 표시하는 값이 항상 같아야 한다.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith("@/")) request = path.join(root, request.slice(2));
  return resolveFilename.call(this, request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      fileName: filename,
    }).outputText,
    filename,
  );
};

const { parseNtrpResult, buildNtrpResultUrl } = require(path.join(root, "lib/ntrp-result.ts"));

// 1) 소스 레벨: trackResultView 호출이 parsed.ok 가드 뒤에만 있어야 한다 (T01/T05 충돌 방지).
{
  const source = fs.readFileSync(path.join(root, "app/results/ntrp-test/page.tsx"), "utf8");
  assert.ok(
    /if \(parsed\.ok\) \{\s*\n\s*trackResultView/.test(source),
    "trackResultView must only fire when parsed.ok is true, never on invalid/missing/conflicting results",
  );
}

// 2) 실제 값 왕복: 8개 레벨 전부에서 buildNtrpResultUrl -> parseNtrpResult -> (T05가 받는 값)이 동일해야 한다.
const levels = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"];
for (const level of levels) {
  const url = new URL(buildNtrpResultUrl(level, "https://temon.kr"));
  const parsed = parseNtrpResult(url.searchParams);
  assert.equal(parsed.ok, true, `level ${level} must parse successfully`);
  // parsed.level이 곧 trackResultView(testId, parsed.level)에 전달되는 값이다.
  assert.equal(parsed.level, level, `trackResultView would receive ${parsed.level}, expected ${level}`);
}

// 3) 무효 케이스: trackResultView가 호출되지 않는 경로에서 결과값도 없어야 한다 (가짜 계측 방지).
for (const query of ["", "type=RESULT", "level=999"]) {
  const parsed = parseNtrpResult(new URLSearchParams(query));
  assert.equal(parsed.ok, false, `query "${query}" must fail to parse (no trackResultView call, no fake result)`);
}

console.log("PASS T12 integration: T01 result contract and T05 analytics contract agree on every value, no conflicting event firing");
