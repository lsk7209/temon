"use client"

import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { ZOMBIE_SURVIVAL_RESULTS } from "@/lib/data/zombie-survival-results"

export default function ZombieSurvivalResultPage() {
  return (
    <MbtiResultPage
      testId="zombie-survival"
      testPath="/tests/zombie-survival/test"
      results={ZOMBIE_SURVIVAL_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950",
        accent: "from-red-500 to-orange-500",
        spinner: "border-red-600",
      }}
    />
  )
}
