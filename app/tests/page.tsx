import type { Metadata } from "next"
import TestsPageClient from "./tests-page-client"

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기 | 테몬",
  description: "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요! 커피, 라면, 반려동물, 공부 습관 등 다양한 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "MBTI 테스트, 성격 테스트, MBTI 모음, 무료 테스트, 심리테스트, 테몬",
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기",
    description: "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요! 다양한 MBTI 테스트를 무료로 시작해보세요.",
    type: "website",
    url: "https://www.temon.kr/tests",
  },
}

export default function TestsPage() {
  return <TestsPageClient />
}
