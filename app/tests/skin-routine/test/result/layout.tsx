/**
 * 피부 루틴 성향 테스트 결과 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "피부 루틴 성향 테스트 결과 | 나의 스킨케어 유형 확인",
  description: "당신의 피부 루틴 성향을 확인하고, 맞춤형 스킨케어 가이드를 받아보세요.",
  keywords: "피부 루틴, 스킨케어, 성향 테스트, MBTI, 뷰티, 무료 테스트, 결과",
  alternates: {
    canonical: "/tests/skin-routine/test/result",
  },
  openGraph: {
    title: "피부 루틴 성향 테스트 결과 | 나의 스킨케어 유형 확인",
    description: "당신의 피부 루틴 성향을 확인하고, 맞춤형 스킨케어 가이드를 받아보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/skin-routine/test/result",
  },
}

export default function SkinRoutineResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

