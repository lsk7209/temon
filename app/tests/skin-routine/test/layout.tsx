/**
 * 피부 루틴 성향 테스트 페이지 레이아웃 (SEO 메타 정보)
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "피부 루틴 성향 테스트 | 12문항으로 보는 나의 스킨케어 유형",
  description: "세안, 토너, 보습, 선크림 습관으로 성향을 16유형으로 분석합니다. 2분 완성.",
  keywords: "피부 루틴, 스킨케어, 성향 테스트, MBTI, 뷰티, 무료 테스트",
  alternates: {
    canonical: "/tests/skin-routine/test",
  },
  openGraph: {
    title: "피부 루틴 성향 테스트 | 12문항으로 보는 나의 스킨케어 유형",
    description: "세안, 토너, 보습, 선크림 습관으로 성향을 16유형으로 분석합니다. 2분 완성.",
    type: "website",
    url: "https://www.temon.kr/tests/skin-routine/test",
  },
}

export default function SkinRoutineTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

