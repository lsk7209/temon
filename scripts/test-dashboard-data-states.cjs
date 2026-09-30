// T06 회귀 테스트: 관리자 통계의 임의 값 fallback 제거 (F09).
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

// 1) lib/analytics.ts에 Math.random 기반 시뮬레이션 통계 함수가 남아있지 않아야 한다.
{
  const source = fs.readFileSync(path.join(root, "lib/analytics.ts"), "utf8");
  assert.ok(!/getAdvancedStats/.test(source), "getAdvancedStats mock function must be removed from lib/analytics.ts");
  assert.ok(!/Math\.random/.test(source), "lib/analytics.ts must not use Math.random for stats");
}

// 2) components/analytics-dashboard.tsx: getAdvancedStats를 import/호출하지 않아야 한다.
{
  const source = fs.readFileSync(path.join(root, "components/analytics-dashboard.tsx"), "utf8");
  assert.ok(!/getAdvancedStats/.test(source), "analytics-dashboard.tsx must not reference getAdvancedStats");
  assert.ok(!/Math\.random/.test(source), "analytics-dashboard.tsx must not fabricate random stats");
  // 상태를 loading/live/empty/unavailable로 구분해야 한다.
  assert.ok(/"loading"/.test(source) && /"unavailable"/.test(source), "must distinguish loading vs unavailable state");
  assert.ok(/401.*403|403.*401/.test(source.replace(/\s+/g, " ")), "must special-case 401/403 as an authorization state, not a generic failure");
  assert.ok(!/실시간 데이터 수집 중/.test(source), "must not claim unverified real-time collection is happening");
}

// 3) components/enhanced-admin-dashboard.tsx (실제 렌더링되는 /admin 대시보드): 하드코딩된 표본 수치 제거.
{
  const source = fs.readFileSync(path.join(root, "components/enhanced-admin-dashboard.tsx"), "utf8");
  assert.ok(!/loadMockDetailedStats/.test(source), "loadMockDetailedStats fallback must be removed");
  assert.ok(!/getAdvancedStats/.test(source), "enhanced-admin-dashboard.tsx must not import getAdvancedStats (dead import)");
  // 하드코딩된 예시 수치(예: 4500, 1200 등 목데이터 특유의 값)가 남아있지 않아야 한다.
  assert.ok(!/Desktop.*4500|4500.*Desktop/.test(source.replace(/\s+/g, " ")), "hardcoded mock device count must be removed");
  assert.ok(!/mbti 테스트.*1200|1200.*mbti 테스트/.test(source.replace(/\s+/g, " ")), "hardcoded mock keyword count must be removed");
  // API 실패 시 빈 배열로 정리하고 unavailable 플래그를 세워야 한다.
  assert.ok(/clearDetailedStats/.test(source), "must clear detailed stats arrays on failure instead of filling mock data");
  assert.ok(/detailedStatsUnavailable/.test(source), "must track an explicit unavailable flag for detailed stats");
  assert.ok(/statsUnavailableReason/.test(source), "must track a human-readable unavailable reason for the main stats card");
}

// 4) 죽은 getAdvancedStats import가 완전히 정리됐는지 전체 코드베이스에서 재확인.
{
  const grepTargets = [
    "components/analytics-dashboard.tsx",
    "components/enhanced-admin-dashboard.tsx",
    "lib/analytics.ts",
  ];
  for (const file of grepTargets) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assert.ok(!/getAdvancedStats/.test(source), `${file} must not reference getAdvancedStats`);
  }
}

console.log("PASS dashboard-data-states: no Math.random fallback, loading/unavailable/empty states distinguished (F09)");
