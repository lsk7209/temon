import type { Metadata } from "next"
import type { ReactNode } from "react"
import { generateGenericResultMetadata } from "@/lib/quiz-seo-utils"

export const metadata: Metadata = generateGenericResultMetadata({
  quizTitle: "Phone Usage Style Test",
  title: "Phone Usage Result",
  description:
    "Review your smartphone usage result, usage traits, recommended settings, and risk-management tips based on your habit pattern.",
  canonical: "/tests/phone-usage/test/result",
})

export default function PhoneUsageResultLayout({ children }: { children: ReactNode }) {
  return children
}
