import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Snow White MBTI Test",
  title: "Fairy Tale Character Result",
  description:
    "Check your Snow White style result with personality summary, daily-life traits, growth tips, and compatibility clues.",
  canonical: "/tests/snowwhite-mbti/test/result",
})

export default function SnowWhiteResultLayout({ children }: { children: ReactNode }) {
  return children
}
