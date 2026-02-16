"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { BREAKUP_STYLE_RESULTS } from "@/lib/data/breakup-style-results"

export default function BreakupStyleResultPage() {
  return (
    <MbtiResultTemplate
      testId="breakup-style"
      testPath="/tests/breakup-style/test"
      heading="이별 후유증"
      gradientClass="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-950"
      badgeGradientClass="bg-gradient-to-r from-rose-600 to-pink-700"
      spinnerBorderClass="border-rose-600"
      results={BREAKUP_STYLE_RESULTS}
      shareTitleBuilder={(result) => `내 이별 후유증 유형은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="회복 루틴"
    />
  )
}
