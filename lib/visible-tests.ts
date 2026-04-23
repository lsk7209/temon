/**
 * 공개 대상 테스트 필터 유틸.
 *
 * - `publishAt` (ISO)이 있으면 현재 시각 이후일 때 숨김 → 드립 공개
 * - `NOINDEX_TEST_IDS`는 sitemap/search engine 제외용 (페이지 자체 접근은 가능)
 *
 * 홈, /tests 인덱스, RSS/feed는 getVisibleTests() 사용.
 * sitemap.xml은 getIndexableTests() 사용 (noindex까지 제외).
 */

import { getAllTests, type Test } from "@/lib/tests-config";
import { NOINDEX_TEST_IDS } from "@/lib/noindex-tests";

/**
 * 테스트가 현 시점에 공개되어야 하는지 판정.
 * publishAt 없음 → 즉시 공개.
 * publishAt 과거 → 공개.
 * publishAt 미래 → 숨김 (드립 대기).
 */
export function isTestPublished(test: Test, now: Date = new Date()): boolean {
  if (!test.publishAt) return true;
  const scheduled = new Date(test.publishAt);
  if (Number.isNaN(scheduled.getTime())) return true; // 잘못된 포맷이면 즉시 공개
  return scheduled <= now;
}

/**
 * 홈/tests 인덱스/RSS·Atom 등 "사이트 내 노출" 대상.
 * noindex 페이지도 포함 — 내부 탐색은 허용, sitemap만 제외되므로.
 */
export function getVisibleTests(now: Date = new Date()): Test[] {
  return getAllTests().filter((t) => isTestPublished(t, now));
}

/**
 * sitemap.xml / 외부 검색엔진용.
 * 드립 대기 + noindex 제외한 최종 색인 대상.
 */
export function getIndexableTests(now: Date = new Date()): Test[] {
  return getVisibleTests(now).filter((t) => !NOINDEX_TEST_IDS.has(t.id));
}
