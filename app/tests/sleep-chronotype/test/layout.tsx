/**
 * 수면 크로노타입 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "수면 크로노타입 테스트 | 12문항으로 보는 나의 리듬",
  description: "기상·취침·집중 타이밍과 낮잠 습관으로 16유형 분석. 결과 공유 가능",
  keywords: "수면, 크로노타입, 리듬, 기상, 취침, 성향 테스트, MBTI, 무료 테스트",
  alternates: {
    canonical: "/tests/sleep-chronotype/test",
  },
  openGraph: {
    title: "수면 크로노타입 테스트 | 12문항으로 보는 나의 리듬",
    description: "기상·취침·집중 타이밍과 낮잠 습관으로 16유형 분석. 결과 공유 가능",
    type: "website",
    url: "https://www.temon.kr/tests/sleep-chronotype/test",
  },
}

export default function SleepChronotypeTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

