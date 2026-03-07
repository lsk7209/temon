import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Pet MBTI Test",
  title: "Best Pet Match Result",
  description:
    "Find your pet MBTI result, ideal companion type, fit reasons, care cautions, and compatible personality matches.",
  canonical: "/tests/pet-mbti/test/result",
})

export default function PetMbtiResultLayout({ children }: { children: ReactNode }) {
  return children
}
