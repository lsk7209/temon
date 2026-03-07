import type { Metadata } from "next"
import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { BREAKUP_STYLE_RESULTS } from "@/lib/data/breakup-style-results"
import { generateMbtiResultMetadata } from "@/lib/quiz-seo-utils"

const defaultResult = BREAKUP_STYLE_RESULTS.ISTJ

export const metadata: Metadata = generateMbtiResultMetadata({
  quizTitle: "Breakup Style Test",
  resultName: defaultResult.name,
  resultCode: defaultResult.mbti,
  summary: defaultResult.summary,
  canonical: "/tests/breakup-style/test/result",
})

export default function BreakupStyleResultPage() {
  return (
    <MbtiResultPage
      testId="breakup-style"
      testPath="/tests/breakup-style/test"
      results={BREAKUP_STYLE_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950",
        accent: "from-rose-500 to-pink-500",
        spinner: "border-rose-600",
      }}
    />
  )
}
