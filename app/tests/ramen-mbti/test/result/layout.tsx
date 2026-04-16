import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Ramen MBTI Test",
  title: "Ramen Personality Result",
  description:
    "Review your ramen personality result, topping style, flavor preference, and compatible types based on how you approach instant noodles.",
  canonical: "/tests/ramen-mbti/test/result",
})

export default function RamenResultLayout({ children }: { children: ReactNode }) {
  return children
}
