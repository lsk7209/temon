/**
 * 소비 성향 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소비 성향 테스트 | 12문항으로 알아보는 16유형",
  description: "계획 구매부터 즉흥 지출까지, 당신의 소비 패턴을 16유형으로 분석. 유형별 절약 팁과 추천 설정 제공.",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/spending-style/test",
  },
  openGraph: {
    title: "소비 성향 테스트 | 12문항으로 알아보는 16유형",
    description: "계획 구매부터 즉흥 지출까지, 당신의 소비 패턴을 16유형으로 분석. 유형별 절약 팁과 추천 설정 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/spending-style/test",
  },
}

export default function SpendingStyleTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

