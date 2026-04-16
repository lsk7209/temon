/**
 * 수면 크로노타입 테스트 결과 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "수면 크로노타입 테스트 결과 | 나의 리듬 확인",
  description: "당신의 수면 크로노타입을 확인하고, 맞춤형 루틴 가이드를 받아보세요.",
  keywords: "수면, 크로노타입, 리듬, 기상, 취침, 성향 테스트, MBTI, 무료 테스트, 결과",
  alternates: {
    canonical: "/tests/sleep-chronotype/test/result",
  },
  openGraph: {
    title: "수면 크로노타입 테스트 결과 | 나의 리듬 확인",
    description: "당신의 수면 크로노타입을 확인하고, 맞춤형 루틴 가이드를 받아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/sleep-chronotype/test/result",
  },
}

export default function SleepChronotypeResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

