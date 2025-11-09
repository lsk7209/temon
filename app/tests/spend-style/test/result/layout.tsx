/**
 * 소비 성향 테스트 결과 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소비 성향 테스트 결과 | 나의 소비 유형 확인",
  description: "당신의 소비 성향을 확인하고, 맞춤형 소비 전략 가이드를 받아보세요.",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트, 결과",
  alternates: {
    canonical: "/tests/spend-style/test/result",
  },
  openGraph: {
    title: "소비 성향 테스트 결과 | 나의 소비 유형 확인",
    description: "당신의 소비 성향을 확인하고, 맞춤형 소비 전략 가이드를 받아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/spend-style/test/result",
  },
}

export default function SpendStyleResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

