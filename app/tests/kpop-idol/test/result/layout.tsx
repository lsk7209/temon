import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "K-Pop Idol Test",
  title: "K-Pop Idol Position Result",
  description:
    "Review your K-pop idol position result with stage traits, strengths, compatibility, and practical notes for your public persona.",
  canonical: "/tests/kpop-idol/test/result",
})

export default function KPopIdolResultLayout({ children }: { children: ReactNode }) {
  return children
}
