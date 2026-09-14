import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "반려동물 MBTI 테스트",
  title: "나와 잘 맞는 반려동물 추천",
  description:
    "나와 잘 맞는 반려동물 유형을 확인하고, 잘 맞는 이유와 돌봄 시 주의할 점, 어울리는 성격 유형을 살펴보세요.",
  canonical: "/results/pet-mbti",
})

export default function PetMbtiResultLayout({ children }: { children: ReactNode }) {
  return children
}
