"use client";

import { usePathname } from "next/navigation";
import { ResultAdUnit } from "@/components/redesign/result-ad-unit";

function isLegacyResultPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return /^\/results\/[^/]+\/?$/.test(pathname);
}

/**
 * 레거시 정적 결과 페이지(/results/{slug}, 212개 개별 파일)는
 * DB 기반 결과 라우트(/results/{testId}/{resultId})와 달리
 * 공용 결과 컴포넌트를 쓰지 않는다. 이 페이지들을 하나씩 수정하는 대신
 * 모든 /results/* 라우트를 감싸는 app/results/layout.tsx에서 경로를 감지해
 * 같은 ResultAdUnit을 주입한다(ResultRouteAutoEnhancements와 동일한 패턴).
 */
export function LegacyResultAdSlot() {
  const pathname = usePathname();

  if (!isLegacyResultPath(pathname)) return null;

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 pb-6">
      <ResultAdUnit />
    </div>
  );
}
