// T01 회귀 테스트: NTRP 계산 단위·레거시 URL 계약.
// 실제 lib/ntrp-result.ts와 lib/ntrpMath.ts를 require()로 실행해 검증한다
// (애플리케이션 계산식을 테스트 안에 복제하지 않음).
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
const { getNTRPLevelInfo, normalizeToBandKey, mapLevelToBaseProfile } = require(path.join(root, "lib/ntrpMath.ts"));

function parse(query) {
  return parseNtrpResult(new URLSearchParams(query));
}

// --- 질문 화면(producer)의 실제 계산 로직을 재현: 15문항 평균의 0.5 단위 반올림 ---
function producerLevel(scores) {
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return Math.round(average * 2) / 2;
}

// 1) 핵심 단언: 최고 선택 답안 → 전달 레벨 5.0 → URL 파싱 → 화면 표시 5.0.
{
  const maxChoices = [3.5, 5, 5, 4.5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
  const level = producerLevel(maxChoices);
  assert.equal(level, 5);
  const url = `/tests/ntrp-test/test/result?v=2&level=${level}`;
  const params = new URLSearchParams(url.split("?")[1]);
  const parsed = parseNtrpResult(params);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.level, "5.0");
  assert.notEqual(parsed.level, "1.5"); // 이전 F01 버그였던 총점 구간 오해석 방지
}

// 2) 최저 선택 답안 → 1.5
{
  const minChoices = [1, 1, 1, 1, 1.5, 1.5, 1.5, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 2, 1];
  const level = producerLevel(minChoices);
  assert.equal(level, 1.5);
  const parsed = parse(`v=2&level=${level}`);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.level, "1.5");
}

// 3) 도달 가능한 8개 레벨(1.5~5.0, 0.5 단위) 모두 왕복 일치, 2.0 포함.
for (const level of ["1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"]) {
  const parsed = parse(`v=2&level=${level}`);
  assert.equal(parsed.ok, true, `level ${level} should parse`);
  assert.equal(parsed.level, level);
  // 2.0처럼 참고 콘텐츠 밴드가 없는 레벨도 정상적으로 표시 정보를 반환해야 한다.
  const info = getNTRPLevelInfo(parsed.level);
  assert.equal(info.level, level);
  assert.ok(Number.isFinite(info.level ? 1 : 0));
  const bandKey = normalizeToBandKey(parsed.level);
  assert.ok(typeof bandKey === "string" && bandKey.length > 0);
}

// 4) URL 호환 표: 문서화된 의미로만 파싱.
const compatCases = [
  { query: "v=2&level=3.5", expect: "3.5" },
  { query: "v=2&level=5.0", expect: "5.0" },
  { query: "level=3.5", expect: "3.5" }, // legacy level (producer 값)
  { query: "level=45", expect: "3.5" }, // legacy raw score, 15~75 범위
  { query: "score=65", expect: "4.5" }, // legacy raw score
  { query: "type=4.0", expect: "4.0" }, // legacy type (NTRP 전용 허용)
];
for (const { query, expect } of compatCases) {
  const parsed = parse(query);
  assert.equal(parsed.ok, true, `query "${query}" should parse`);
  assert.equal(parsed.level, expect, `query "${query}" expected ${expect}, got ${parsed.level}`);
}

// 5) 오류 케이스: 가짜 결과를 만들지 않고 명확한 실패 사유를 반환해야 한다.
const invalidCases = [
  "", // 입력 없음
  "type=RESULT",
  "type=ENTP",
  "level=Infinity",
  "level=NaN",
  "level=-5",
  "level=999",
  "level=3.5abc", // parseFloat 부분 허용 금지
  "type=abc",
];
for (const query of invalidCases) {
  const parsed = parse(query);
  assert.equal(parsed.ok, false, `query "${query}" should fail`);
  assert.ok(["missing", "invalid"].includes(parsed.reason), `query "${query}" got reason ${parsed.reason}`);
}

// 6) 상충 값: 서로 다른 결과를 가리키는 매개변수 조합은 conflicting.
{
  const parsed = parse("level=45&score=65"); // 3.5 vs 4.5
  assert.equal(parsed.ok, false);
  assert.equal(parsed.reason, "conflicting");
}
{
  // v=2에 score/type이 같이 오면 v2 계약 위반으로 conflicting.
  const parsed = parse("v=2&level=3.5&score=65");
  assert.equal(parsed.ok, false);
  assert.equal(parsed.reason, "conflicting");
}

// 7) UTM 등 무관한 매개변수는 계산에 영향이 없어야 한다.
{
  const parsed = parse("v=2&level=3.5&utm_source=kakao&utm_medium=share");
  assert.equal(parsed.ok, true);
  assert.equal(parsed.level, "3.5");
}

// 8) buildNtrpResultUrl: v2 계약, 불필요한 매개변수 없음.
{
  const relative = buildNtrpResultUrl("4.0");
  assert.equal(relative, "/results/ntrp-test?v=2&level=4.0");
  const absolute = buildNtrpResultUrl("4.0", "https://temon.kr");
  assert.equal(absolute, "https://temon.kr/results/ntrp-test?v=2&level=4.0");
}

// 9) F04 회귀 방지: 5.0+ 레이더 프로필의 모든 값이 0<=value<=max, 유한수.
{
  const profile = mapLevelToBaseProfile("5.0+");
  for (const item of profile) {
    assert.ok(Number.isFinite(item.value), `${item.key} value must be finite`);
    assert.ok(item.value >= 0 && item.value <= item.max, `${item.key} value ${item.value} must be within [0, ${item.max}]`);
  }
  const stability = profile.find((item) => item.key === "안정성");
  assert.equal(stability.value, 100); // clamp 이전엔 105였음 (F04)
}

// 10) legacy 5.0+ (raw score >= 71)도 화면에서 안전하게 처리 가능해야 한다.
{
  const parsed = parse("score=73");
  assert.equal(parsed.ok, true);
  assert.equal(parsed.level, "5.0+");
  const info = getNTRPLevelInfo(parsed.level);
  assert.equal(info.level, "5.0+");
  const bandKey = normalizeToBandKey(parsed.level);
  const profile = mapLevelToBaseProfile(bandKey);
  for (const item of profile) {
    assert.ok(item.value >= 0 && item.value <= item.max);
  }
}

console.log("PASS ntrp-result-contract: producer/consumer round trip, legacy URL compat, invalid/conflicting inputs, F04 clamp");
