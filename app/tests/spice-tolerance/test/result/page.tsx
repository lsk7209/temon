"use client"

import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { SPICE_TOLERANCE_RESULTS } from "@/lib/data/spice-tolerance-results"

export default function SpiceToleranceResultPage() {
  return (
    <MbtiResultPage
      testId="spice-tolerance"
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
