"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { ZOMBIE_SURVIVAL_RESULTS } from "@/lib/data/zombie-survival-results"

export default function ZombieSurvivalResultPage() {
  return (
    <MbtiResultTemplate
      testId="zombie-survival"
      testPath="/tests/zombie-survival/test"
      heading="좀비 생존"
      gradientClass="bg-gradient-to-br from-red-50 to-slate-100 dark:from-red-950 dark:to-slate-950"
      badgeGradientClass="bg-gradient-to-r from-red-600 to-slate-700"
      spinnerBorderClass="border-red-600"
      results={ZOMBIE_SURVIVAL_RESULTS}
      shareTitleBuilder={(result) => `내 좀비 생존 유형은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="생존 시나리오"
    />
  )
}
