import type { Metadata } from "next"
import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { FOOD_BRAND_RESULTS } from "@/lib/data/food-brand-results"
import { generateMbtiResultMetadata } from "@/lib/quiz-seo-utils"

const defaultResult = FOOD_BRAND_RESULTS.ISTJ

export const metadata: Metadata = generateMbtiResultMetadata({
  quizTitle: "Food Brand Style Test",
  resultName: defaultResult.name,
  resultCode: defaultResult.mbti,
  summary: defaultResult.summary,
  canonical: "/tests/food-brand/test/result",
})

export default function FoodBrandResultPage() {
  return (
    <MbtiResultPage
      testId="food-brand"
      testPath="/tests/food-brand/test"
      results={FOOD_BRAND_RESULTS}
      theme={{
        page: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
        accent: "from-blue-500 to-indigo-500",
        spinner: "border-blue-600",
      }}
    />
  )
}
