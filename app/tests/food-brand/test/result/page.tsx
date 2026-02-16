"use client"

import { MbtiResultTemplate } from "@/components/quiz/mbti-result-template"
import { buildGenericMbtiResultMap } from "@/lib/data/mbti-generic-results"

const FOOD_BRAND_RESULTS = buildGenericMbtiResultMap("브랜드", ["선택 기준", "소비 전략", "추천 습관"])

export default function FoodBrandResultPage() {
  return (
    <MbtiResultTemplate
      testId="food-brand"
      testPath="/tests/food-brand/test"
      heading="브랜드 선호"
      gradientClass="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950"
      badgeGradientClass="bg-gradient-to-r from-blue-600 to-indigo-700"
      spinnerBorderClass="border-blue-600"
      results={FOOD_BRAND_RESULTS}
      shareTitleBuilder={(result) => `내 브랜드 선호 유형은 '${result.name}(${result.mbti})' 타입`}
      presetsTitle="브랜드 선택 가이드"
    />
  )
}
