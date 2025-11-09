/**
 * 스마트폰 사용 스타일 테스트 결과 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "스마트폰 사용 스타일 테스트 결과 | 나의 사용 성향 확인",
  description: "당신의 스마트폰 사용 스타일을 확인하고, 맞춤형 설정 가이드를 받아보세요.",
  keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트, 결과",
  alternates: {
    canonical: "/tests/phone-style/test/result",
  },
  openGraph: {
    title: "스마트폰 사용 스타일 테스트 결과 | 나의 사용 성향 확인",
    description: "당신의 스마트폰 사용 스타일을 확인하고, 맞춤형 설정 가이드를 받아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/phone-style/test/result",
  },
}

export default function PhoneStyleResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

