import { MbtiResultPage } from "@/components/quiz/mbti-result-page"
import { FOOD_BRAND_RESULTS } from "@/lib/data/food-brand-results"

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
