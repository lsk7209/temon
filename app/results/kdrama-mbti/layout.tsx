import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "K-드라마 클리셰 테스트",
  title: "K-드라마 캐릭터",
  description:
    "나와 닮은 K-드라마 캐릭터 유형을 확인하고, 핵심 성향과 관계 스타일, 강점, 주의할 점을 함께 살펴보세요.",
  canonical: "/results/kdrama-mbti",
})

export default function KDramaResultLayout({ children }: { children: ReactNode }) {
  return children
}
