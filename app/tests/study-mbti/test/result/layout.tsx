import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Study MBTI Test",
  title: "Study Style Result",
  description:
    "See your study style result, learning habits, recommended methods, and compatibility patterns for focus and retention.",
  canonical: "/tests/study-mbti/test/result",
})

export default function StudyResultLayout({ children }: { children: ReactNode }) {
  return children
}
