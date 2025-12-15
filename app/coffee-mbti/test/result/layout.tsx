import type { Metadata } from "next"
import { generateResultPageMetadata } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "커피 MBTI 테스트 결과 확인. 나의 커피 유형은?"
// Full description for Google/AI
const fullDescription = "커피 MBTI 테스트 결과를 확인해보세요! 16가지 커피 유형 중 당신의 유형과 특징, 추천 원두, 잘 맞는 커피 친구들을 알아보세요. 결과를 친구들과 공유하고 비교해보세요!"

export const metadata: Metadata = generateResultPageMetadata({
  quizId: "coffee-mbti",
  quizTitle: "커피 MBTI",
  shortDescription,
  fullDescription,
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, 결과",
  canonical: "/coffee-mbti/test/result",
})

export default function CoffeeMBTIResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

