import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "라면 테스트",
  title: "라면 취향과 성격 유형",
  description:
    "라면을 끓이고 먹는 취향으로 알아본 성격 유형과 토핑 스타일, 맛 선호도, 잘 맞는 유형을 확인해 보세요.",
  canonical: "/results/ramen-mbti",
})

export default function RamenResultLayout({ children }: { children: ReactNode }) {
  return children
}
