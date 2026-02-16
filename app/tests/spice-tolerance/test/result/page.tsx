"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { buildGenericMbtiResultMap } from "@/lib/data/mbti-generic-results"

const SPICE_TOLERANCE_RESULTS = buildGenericMbtiResultMap("매운맛", ["선호 패턴", "대처 방식", "회복 팁"])

export default function SpiceToleranceResultPage() {
  return (
    <MbtiResultTemplate
      testId="spice-tolerance"
      testPath="/tests/spice-tolerance/test"
      heading="매운맛 선호"
      gradientClass="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950 dark:to-orange-950"
      badgeGradientClass="bg-gradient-to-r from-red-600 to-orange-700"
      spinnerBorderClass="border-red-600"
      results={SPICE_TOLERANCE_RESULTS}
      shareTitleBuilder={(result) => `내 매운맛 유형은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="매운맛 가이드"
    />
  )
}
