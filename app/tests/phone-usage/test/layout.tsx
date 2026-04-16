/**
 * 스마트폰 사용 스타일 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "스마트폰 사용 스타일 테스트 | 12문항으로 알아보는 16유형",
  description: "알림 처리, 앱 정리, 집중 방해 요인, 소통 방식으로 16유형 분석. 결과 기반 생산성 팁 제공.",
  keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/phone-usage/test",
  },
  openGraph: {
    title: "스마트폰 사용 스타일 테스트 | 12문항으로 알아보는 16유형",
    description: "알림 처리, 앱 정리, 집중 방해 요인, 소통 방식으로 16유형 분석. 결과 기반 생산성 팁 제공.",
    type: "website",
    url: "https://www.temon.kr/tests/phone-usage/test",
  },
}

export default function PhoneUsageTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

