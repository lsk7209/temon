import type { Metadata } from "next"
import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { SPICE_TOLERANCE_RESULTS } from "@/lib/data/spice-tolerance-results"
import { generateMbtiResultMetadata } from "@/lib/quiz-seo-utils"

const defaultResult = SPICE_TOLERANCE_RESULTS.ISTJ

export const metadata: Metadata = generateMbtiResultMetadata({
  quizTitle: "Spice Tolerance Test",
  resultName: defaultResult.name,
  resultCode: defaultResult.mbti,
  summary: defaultResult.summary,
  canonical: "/tests/spice-tolerance/test/result",
})

export default function SpiceToleranceResultPage() {
  return (
    <MbtiResultPage
      testId="spice-tolerance"
      quizTitle="Spice Tolerance Test"
      testPath="/tests/spice-tolerance/test"
      results={SPICE_TOLERANCE_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950",
        accent: "from-red-500 to-orange-500",
        spinner: "border-red-600",
      }}
    />
  )
}
