import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ResultRouteAutoEnhancements } from "@/components/result-route-auto-enhancements";

export const metadata: Metadata = {
  title: "무료 퀴즈 테스트 모음 | 테몬",
  description:
    "성격, 취향, 일상 습관을 가볍게 확인하는 무료 퀴즈 테스트 모음입니다. 결과별 해석, 활용 가이드, FAQ와 관련 테스트를 함께 제공합니다.",
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "무료 퀴즈 테스트 모음 | 테몬",
    description:
      "테몬의 다양한 퀴즈 테스트를 통해 나의 선택 패턴과 취향을 확인해 보세요.",
    url: "https://temon.kr/tests",
    siteName: "테몬",
    locale: "ko_KR",
    type: "website",
  },
};

export default function TestsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ResultRouteAutoEnhancements />
    </>
  );
}
