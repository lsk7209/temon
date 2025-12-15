import type { Metadata } from "next"
import { generateTestPageMetadata } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "커피 MBTI 테스트 진행 중. 12문항으로 나의 커피 유형 발견!"
// Full description for Google/AI
const fullDescription = "커피 MBTI 테스트를 진행해보세요! 12개의 질문에 답변하여 나의 커피 취향과 성격 유형을 알아보세요. 약 3분 소요되며, 결과는 16가지 커피 유형 중 하나로 나타납니다."

export const metadata: Metadata = generateTestPageMetadata({
  quizId: "coffee-mbti",
  quizTitle: "커피 MBTI",
  shortDescription,
  fullDescription,
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트",
  canonical: "/coffee-mbti/test",
})

export default function CoffeeMBTITestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

