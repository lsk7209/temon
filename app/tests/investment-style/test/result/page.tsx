"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { INVESTMENT_STYLE_RESULTS } from "@/lib/data/investment-style-results"

export default function InvestmentStyleResultPage() {
  return (
    <MbtiResultTemplate
      testId="investment-style"
      testPath="/tests/investment-style/test"
      heading="투자 스타일"
      gradientClass="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950"
      badgeGradientClass="bg-gradient-to-r from-green-600 to-emerald-700"
      spinnerBorderClass="border-green-600"
      results={INVESTMENT_STYLE_RESULTS}
      shareTitleBuilder={(result) => `내 투자 성향은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="투자 가이드"
    />
  )
}
