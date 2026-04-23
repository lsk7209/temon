/**
 * 색인 제외 테스트 목록 (noindex + sitemap 제외).
 *
 * 왜 noindex 하는가:
 *   - 본문(prose)이 <150자로 AdSense "Thin Content" 기준에 미달
 *   - meal-* 클러스터 대부분이 동일 템플릿 + 유사 desc → Scaled Content Abuse 시그널
 *
 * 동작:
 *   - `lib/quiz-seo-utils.ts`의 generateQuizMetadata()가 이 Set을 확인해
 *     robots.index=false 로 오버라이드 (페이지 자체는 여전히 접근/사용 가능)
 *   - `app/sitemap.xml/route.ts`가 이 Set에 포함된 ID를 sitemap에서 제외
 *
 * 본문을 300자+ 로 확장하면 이 Set에서 제거 → 자동 색인 복귀.
 */
export const NOINDEX_TEST_IDS = new Set<string>([
  // meal-* 클러스터: 본문 <150자 (content-audit v2, 2026-04-23)
  "meal-frequency",
  "meal-pacing",
  "meal-order",
  "meal-balance",
  "meal-duration",
  "meal-planning",
  "meal-sharing",
  "meal-preparation",
  "meal-serving",
  "meal-social",
  "meal-cleanup",
  "meal-etiquette",
  "meal-group",
  "meal-leftover",
  "meal-prep",
  "meal-solo",
  // food/cooking 중 본문 얇은 항목
  "food-scooping",
  // 주의: cooking-shared는 next.config.mjs에서 cooking-share로 308 redirect 되므로
  // noindex 목록에 중복 등록하지 않음.
]);

export function isNoindexTest(id: string): boolean {
  return NOINDEX_TEST_IDS.has(id);
}
