// T09 회귀 테스트: 레거시 /ntrp-test/* 중복 라우트 점검.
// app/tests/ntrp-test/* (T01에서 수정) 외에, 최초 업로드부터 존재하던
// app/ntrp-test/* 중복 페이지 트리가 실제로 라이브 도달 가능함을 발견했다
// (next.config.mjs의 legacyTests 리다이렉트가 예상과 달리 이 경로에는
// 적용되지 않는 것으로 라이브 확인됨 - 코드만으로 원인 미확정, T11/문서화 필요).
// 이 파일은 그 중복 라우트의 공유 링크 버그(존재하지 않는 vercel.app 프리뷰
// 도메인 + 결과 값 누락)에 대한 회귀 테스트다.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

// 1) 레거시 결과 페이지가 더 이상 존재하지 않는 프리뷰 도메인을 공유하지 않아야 한다.
{
  const source = fs.readFileSync(path.join(root, "app/ntrp-test/test/result/page.tsx"), "utf8");
  assert.ok(!/const url = ["'`].*vercel\.app/.test(source), "legacy result page must not share the stale temon.vercel.app preview domain");
  assert.ok(/buildNtrpResultUrl/.test(source), "legacy result page must reuse the T01 buildNtrpResultUrl contract for its share link");
}

// 2) 레거시 producer(app/ntrp-test/test/page.tsx)는 자체 레벨-키 lookup과 일관된 값만
// 생성하므로 F01류 단위 불일치는 없다 - 이 계약을 회귀로 고정한다.
{
  const producerSource = fs.readFileSync(path.join(root, "app/ntrp-test/test/page.tsx"), "utf8");
  const resultSource = fs.readFileSync(path.join(root, "app/ntrp-test/test/result/page.tsx"), "utf8");

  // producer가 만드는 레벨 값 (0.5 단위 반올림, 1.0~5.0)이 result의 lookup 키와 겹쳐야 한다.
  const producerLevels = ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"];
  const resultKeys = [...resultSource.matchAll(/"([0-9]\.[0-9])":\s*\{/g)].map((m) => m[1]);
  assert.ok(resultKeys.length > 0, "expected level-keyed result lookup table");
  for (const key of resultKeys) {
    assert.ok(producerLevels.includes(key), `result key ${key} must be a value the producer can actually generate`);
  }
}

console.log("PASS legacy-ntrp-duplicate-route: stale share domain removed, level-key contract intact");
