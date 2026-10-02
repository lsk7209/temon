// 전체 회귀 테스트 스위트 일괄 실행 러너
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const testScripts = [
  "scripts/test-audit-quiz-flow-paths.cjs",
  "scripts/test-alarm-habit-question-count.cjs",
  "scripts/test-static-question-count-audit.cjs",
  "scripts/test-tests-pagination.cjs",
  "scripts/test-sitemap-degradation.cjs",
  "scripts/test-phone-social-metadata.cjs",
  "scripts/test-result-metadata-korean.cjs",
  "scripts/test-result-support-korean.cjs",
  "scripts/test-intro-placeholder-korean.cjs",
  "scripts/test-ntrp-result-contract.cjs",
  "scripts/test-share-result-contract.cjs",
  "scripts/test-ntrp-profile-invariants.cjs",
  "scripts/test-result-export-layout.cjs",
  "scripts/test-result-analytics-contract.cjs",
  "scripts/test-dashboard-data-states.cjs",
  "scripts/test-home-content-contract.cjs",
  "scripts/test-legacy-ntrp-duplicate-route.cjs",
  "scripts/test-a11y-perf-security-baseline.cjs",
  "scripts/test-google-indexing-eligibility.cjs",
  "scripts/test-sitemap-search-api-doc-sync.cjs",
  "scripts/test-t12-integration-check.cjs",
  "scripts/test-sitewide-aria-live.cjs",
];

console.log(`[test-runner] ${testScripts.length}개 회귀 테스트 실행 시작...\n`);
let failedCount = 0;

for (const relScript of testScripts) {
  const scriptPath = path.resolve(__dirname, "..", relScript);
  const result = spawnSync(process.execPath, [scriptPath], {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
  });
  if (result.status === 0) {
    console.log(`  ✓ ${relScript}`);
  } else {
    console.error(`  ✗ ${relScript}`);
    if (result.stdout) console.log(result.stdout.trim());
    if (result.stderr) console.error(result.stderr.trim());
    failedCount++;
  }
}

console.log(`\n[test-runner] 완료: ${testScripts.length - failedCount}개 통과 / ${failedCount}개 실패`);
process.exit(failedCount > 0 ? 1 : 0);
