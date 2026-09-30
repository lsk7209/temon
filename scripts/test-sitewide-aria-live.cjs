// 전사이트 aria-live 확대 회귀 테스트.
// 이 사이트에는 4개의 독립적인 퀴즈 문항 렌더링 구현이 있다:
// 1) components/quiz/quiz-container.tsx - DB 기반 동적 테스트 전체 (client-runner.tsx가 사용, ~1221개)
// 2) components/test-question-page.tsx - 정적 MBTI 테스트 전체 (~212개)
// 3) app/test/[slug]/play/test-play-client.tsx - 별도 퀴즈 플레이 라우트
// 4) app/tests/ntrp-test/test/page.tsx + app/ntrp-test/test/page.tsx - NTRP 전용/레거시 중복
// 문항이 바뀔 때 스크린리더 사용자에게 안내가 없던 공통 문제를 각 구현에 최소 침습으로 적용했다.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const targets = [
  "components/quiz/quiz-container.tsx",
  "components/test-question-page.tsx",
  "app/test/[slug]/play/test-play-client.tsx",
  "app/tests/ntrp-test/test/page.tsx",
  "app/ntrp-test/test/page.tsx",
];

for (const relPath of targets) {
  const source = fs.readFileSync(path.join(root, relPath), "utf8");
  assert.ok(/aria-live="polite"/.test(source), `${relPath} must announce question changes via aria-live`);
  assert.ok(/sr-only/.test(source), `${relPath}'s aria-live region must be visually hidden (not a duplicate visible heading)`);
}

console.log(`PASS sitewide aria-live: all ${targets.length} independent quiz question renderers announce question changes to screen readers`);
