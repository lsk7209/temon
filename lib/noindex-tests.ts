/**
 * 색인 제외 테스트 목록(noindex + sitemap 제외).
 *
 * 기준:
 * - `scripts/content-audit.js`의 최신 prose 본문 길이가 150자 미만인 테스트
 * - 중복/유사 클러스터 중 AdSense thin content 리스크가 큰 테스트
 *
 * 페이지 접근은 유지하고 검색엔진 색인과 sitemap 노출만 막는다.
 * 본문을 300자 이상으로 보강하면 이 목록에서 제거해 색인을 복구한다.
 */
export const NOINDEX_TEST_IDS = new Set<string>([
  // content-audit v2, 2026-06-01: prose <150
  "commute-style",
  "meal-frequency",
  "meal-pacing",
  "meal-order",
  "meal-balance",
  "meal-duration",
  "clean-style",
  "pizza-topping",
  "weekend-rest",
  "meal-planning",
  "meal-sharing",
  "morning-alarm",
  "jachui",
  "morning-energy",
  "chair-sitting",
  "meal-preparation",
  "salad-dressing",
  "evening-social",
  "meal-serving",
  "meal-social",
  "morning-coffee",
  "food-scooping",
  "cooking-shared",
  "meal-solo",
  "cooking-solo",
  "food-dipping",
  "cooking-measurement",
  "meal-leftover",
  "food-layering",
  "restaurant-ambiance",
  "coffee-mbti",
  "grocery-shopping",
  "restaurant-service",

  // cooking-shared는 next.config.mjs에서 cooking-share로 308 redirect 처리되지만
  // 별도 라우트 파일이 남아 있어 직접 접근/메타 생성 시에도 noindex를 유지한다.
]);

export function isNoindexTest(id: string): boolean {
  return NOINDEX_TEST_IDS.has(id);
}
