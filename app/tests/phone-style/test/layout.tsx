/**
 * 스마트폰 사용 스타일 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "스마트폰 사용 스타일 테스트 | 12문항으로 보는 나의 사용 성향",
  description: "알림, 홈화면 정리, 배터리 관리 습관으로 16유형 분석. 결과 공유 가능",
  keywords: "스마트폰, 사용 스타일, 앱, 습관, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/phone-style/test",
  },
  openGraph: {
    title: "스마트폰 사용 스타일 테스트 | 12문항으로 보는 나의 사용 성향",
    description: "알림, 홈화면 정리, 배터리 관리 습관으로 16유형 분석. 결과 공유 가능",
    type: "website",
    url: "https://www.temon.kr/tests/phone-style/test",
  },
}

export default function PhoneStyleTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

