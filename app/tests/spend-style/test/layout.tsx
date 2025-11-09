/**
 * 소비 성향 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소비 성향 테스트 | 12문항으로 보는 나의 소비 유형",
  description: "예산 관리, 가격 대비 가치, 충동구매 성향으로 16유형 분석. 결과 공유 가능",
  keywords: "소비, 구매, 예산, 가격, 충동구매, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/spend-style/test",
  },
  openGraph: {
    title: "소비 성향 테스트 | 12문항으로 보는 나의 소비 유형",
    description: "예산 관리, 가격 대비 가치, 충동구매 성향으로 16유형 분석. 결과 공유 가능",
    type: "website",
    url: "https://www.temon.kr/tests/spend-style/test",
  },
}

export default function SpendStyleTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

