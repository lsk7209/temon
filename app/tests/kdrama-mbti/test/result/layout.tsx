import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "K-Drama MBTI Test",
  title: "K-Drama Character Result",
  description:
    "Check your K-drama character style result, compare key traits, and review relationship tendencies, strengths, and watchouts.",
  canonical: "/tests/kdrama-mbti/test/result",
})

export default function KDramaResultLayout({ children }: { children: ReactNode }) {
  return children
}
