// T03 회귀 테스트: 결과 프로필의 정직성·범위·문구.
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

const { mapLevelToBaseProfile, normalizeToBandKey } = require(path.join(root, "lib/ntrpMath.ts"));
const { NTRP_LEVELS } = require(path.join(root, "lib/ntrp-result.ts"));

// 1) 모든 레벨(1.0~5.0 + legacy 5.0+)에서 레이더 값이 0<=value<=max, 유한수여야 한다.
const allLevels = [...NTRP_LEVELS, "5.0+"];
for (const level of allLevels) {
  const bandKey = normalizeToBandKey(level);
  const profile = mapLevelToBaseProfile(bandKey);
  assert.ok(profile.length > 0, `profile for ${level} must not be empty`);
  for (const item of profile) {
    assert.ok(Number.isFinite(item.value), `${level}/${item.key} value must be finite, got ${item.value}`);
    assert.ok(item.max > 0 && Number.isFinite(item.max), `${level}/${item.key} max must be a positive finite number`);
    assert.ok(
      item.value >= 0 && item.value <= item.max,
      `${level}/${item.key} value ${item.value} out of range [0, ${item.max}] (F04 regression)`,
    );
  }
}

// 2) 5.0+ 안정성 항목은 정확히 clamp된 100이어야 한다 (이전엔 105).
{
  const profile = mapLevelToBaseProfile("5.0+");
  const stability = profile.find((item) => item.key === "안정성");
  assert.equal(stability.value, 100);
}

// 3) 결과 화면 소스에 자기보고식/비공식 등급 고지 문구가 있어야 한다 (R02).
{
  const source = fs.readFileSync(path.join(root, "app/results/ntrp-test/page.tsx"), "utf8");
  assert.ok(/USTA/.test(source), "result page must mention USTA to disambiguate from official ratings");
  assert.ok(/자기보고식/.test(source), "result page must disclose self-reported nature of the result");
  // 레이더 카드가 "개별 능력 측정값이 아닙니다" 등 참고용 문구를 포함해야 한다.
  assert.ok(/측정값이 아닙니다/.test(source), "radar section must disclaim it is not an individual measurement");
}

// 4) q13이 없을 때 기본 페르소나를 "측정 결과"처럼 표시하지 않고 추정임을 밝혀야 한다.
{
  const source = fs.readFileSync(path.join(root, "app/results/ntrp-test/page.tsx"), "utf8");
  assert.ok(/hasPersonaInput/.test(source), "page must distinguish input-provided persona from default");
  assert.ok(/추정 유형/.test(source), "default persona must be labeled as an estimate, not a measured trait");
}

// 5) 질문 화면(producer)은 실제로 q13을 보내지 않는다 — 문서화된 현실과 일치해야 한다.
{
  const source = fs.readFileSync(path.join(root, "app/tests/ntrp-test/test/page.tsx"), "utf8");
  assert.ok(!/q13=/.test(source), "producer does not send q13; result page must not assume it always exists");
}

console.log("PASS ntrp-profile-invariants: radar clamp for all levels incl. 5.0+, USTA/self-report disclaimer, persona honesty");
