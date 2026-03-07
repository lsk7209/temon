import type { Metadata } from "next"
import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { INVESTMENT_STYLE_RESULTS } from "@/lib/data/investment-style-results"
import { generateMbtiResultMetadata } from "@/lib/quiz-seo-utils"

const defaultResult = INVESTMENT_STYLE_RESULTS.ISTJ

export const metadata: Metadata = generateMbtiResultMetadata({
  quizTitle: "Investment Style Test",
  resultName: defaultResult.name,
  resultCode: defaultResult.mbti,
  summary: defaultResult.summary,
  canonical: "/tests/investment-style/test/result",
})

export default function InvestmentStyleResultPage() {
  return (
    <MbtiResultPage
      testId="investment-style"
      quizTitle="Investment Style Test"
      testPath="/tests/investment-style/test"
      results={INVESTMENT_STYLE_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
        accent: "from-green-500 to-emerald-500",
        spinner: "border-green-600",
      }}
    />
  )
}
