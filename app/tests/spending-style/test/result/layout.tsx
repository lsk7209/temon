/**
 * 소비 성향 테스트 결과 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소비 성향 테스트 결과 | 나의 소비 유형 확인",
  description: "당신의 소비 패턴을 확인하고, 유형별 절약 팁과 추천 설정을 받아보세요.",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트, 결과",
  alternates: {
    canonical: "/tests/spending-style/test/result",
  },
  openGraph: {
    title: "소비 성향 테스트 결과 | 나의 소비 유형 확인",
    description: "당신의 소비 패턴을 확인하고, 유형별 절약 팁과 추천 설정을 받아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/spending-style/test/result",
  },
}

export default function SpendingStyleResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

