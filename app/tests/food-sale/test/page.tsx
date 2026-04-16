"use client"

/**
 * Component: FoodSaleTest
 * 음식 할인 테스트 페이지
 * @example <FoodSaleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "마트에서 할인 스티커를 발견했을 때",
    a1: { text: "할인율을 확인하고 필요한지 판단한다", tags: ["T", "J"] },
    a2: { text: "할인이라면 일단 관심이 생긴다", tags: ["F", "P"] },
  },
  {
    id: 2,
    q: "1+1 할인 상품을 볼 때",
    a1: { text: "정말 필요한지 생각하고 구매한다", tags: ["T", "S"] },
    a2: { text: "저렴하니까 일단 산다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "할인 정보를 알게 되었을 때",
    a1: { text: "친구들에게 공유하고 함께 간다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 가서 구매한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "할인 상품이 유통기한이 임박했을 때",
    a1: { text: "빨리 먹을 수 있으면 구매한다", tags: ["S", "J"] },
    a2: { text: "유통기한이 걱정되어 피한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "할인율이 높은 상품을 발견했을 때",
    a1: { text: "원래 가격과 품질을 비교해본다", tags: ["T", "S"] },
    a2: { text: "할인율이 높으면 바로 구매한다", tags: ["F", "N"] },
  },
  {
    id: 6,
    q: "할인 상품이 평소에 안 먹던 음식일 때",
    a1: { text: "새로운 음식을 시도해볼 기회라고 생각한다", tags: ["N", "P"] },
    a2: { text: "익숙한 음식만 할인해도 산다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "할인 쿠폰을 받았을 때",
    a1: { text: "계획적으로 사용할 곳을 정한다", tags: ["J", "T"] },
    a2: { text: "기회가 되면 바로 사용한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "할인 상품이 예상보다 많을 때",
    a1: { text: "필요한 것만 골라서 산다", tags: ["T", "J"] },
    a2: { text: "할인 상품을 많이 사서 재고를 만든다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "할인 정보를 찾을 때",
    a1: { text: "앱이나 광고지를 체계적으로 확인한다", tags: ["S", "J"] },
    a2: { text: "우연히 발견하거나 주변에서 듣는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "할인 상품을 구매한 후",
    a1: { text: "얼마나 절약했는지 계산해본다", tags: ["T", "S"] },
    a2: { text: "할인 받아서 기분이 좋다", tags: ["F", "N"] },
  },
  {
    id: 11,
    q: "할인 상품이 품질이 의심스러울 때",
    a1: { text: "품질을 확인하고 신중하게 결정한다", tags: ["T", "J"] },
    a2: { text: "할인이라면 한 번쯤 시도해본다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "할인 기간이 끝나기 전",
    a1: { text: "미리 계획해서 구매한다", tags: ["J", "S"] },
    a2: { text: "마지막 날에 가서 구매한다", tags: ["P", "N"] },
  },
]

export default function FoodSaleTest() {
  const quizLogic = useQuizLogic({
    testId: "food-sale",
    questions,
    resultPath: "/tests/food-sale/test/result",
  })

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("red-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
