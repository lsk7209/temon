import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { buildGenericMbtiResults } from "@/lib/utils/mbti-generic-results"

const FOOD_BRAND_RESULTS = buildGenericMbtiResults("음식 브랜드")

export default function FoodBrandResultPage() {
  return (
    <MbtiResultPage
      testId="food-brand"
      title="음식 브랜드 선택 테스트"
      results={FOOD_BRAND_RESULTS}
      gradientClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950"
    />
  )
}
