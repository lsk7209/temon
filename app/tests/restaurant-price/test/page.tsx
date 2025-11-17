"use client"

/**
 * Component: RestaurantPriceTest
 * 식당 가격 테스트 페이지
 * @example <RestaurantPriceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "메뉴 가격이 예상보다 비쌀 때",
    a1: { text: "가격 대비 품질을 따져본다", tags: ["T", "S"] },
    a2: { text: "분위기나 경험을 고려해 선택한다", tags: ["F", "N"] },
  },
  {
    id: 2,
    q: "저렴한 식당과 비싼 식당 중 선택할 때",
    a1: { text: "예산에 맞는 저렴한 식당을 선택한다", tags: ["T", "J"] },
    a2: { text: "특별한 날이면 비싼 식당도 간다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "가격이 비싸지만 맛있다는 평이 많을 때",
    a1: { text: "한 번쯤 경험해보고 싶다", tags: ["N", "P"] },
    a2: { text: "가격이 부담스러워서 망설인다", tags: ["S", "J"] },
  },
  {
    id: 4,
    q: "친구들이 비싼 식당을 가자고 할 때",
    a1: { text: "함께 가서 즐긴다", tags: ["E", "F"] },
    a2: { text: "예산을 고려해 다른 곳을 제안한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "할인 쿠폰이 있는 식당을 선택할 때",
    a1: { text: "할인 받을 수 있어서 좋다", tags: ["T", "S"] },
    a2: { text: "할인 여부보다 맛과 분위기가 중요하다", tags: ["F", "N"] },
  },
  {
    id: 6,
    q: "가격이 비슷한 식당들 중 선택할 때",
    a1: { text: "리뷰와 평점을 비교해 선택한다", tags: ["T", "J"] },
    a2: { text: "느낌과 분위기로 선택한다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "예산을 초과하는 식당을 발견했을 때",
    a1: { text: "예산을 조정하거나 다른 날로 미룬다", tags: ["J", "T"] },
    a2: { text: "가끔은 예산을 넘어서도 간다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "가격이 저렴하지만 평이 나쁜 식당일 때",
    a1: { text: "가격이 저렴하면 한 번쯤 시도해본다", tags: ["N", "P"] },
    a2: { text: "평이 나쁘면 가지 않는다", tags: ["S", "J"] },
  },
  {
    id: 9,
    q: "혼자 식사할 때 가격대 선택",
    a1: { text: "저렴하고 간단한 곳을 선택한다", tags: ["I", "T"] },
    a2: { text: "혼자여도 좋은 곳을 가고 싶다", tags: ["E", "F"] },
  },
  {
    id: 10,
    q: "가격이 비싸지만 특별한 경험이 보장될 때",
    a1: { text: "특별한 경험을 위해 선택한다", tags: ["N", "F"] },
    a2: { text: "가격 대비 가치를 따져본다", tags: ["S", "T"] },
  },
  {
    id: 11,
    q: "가격이 예상보다 저렴할 때",
    a1: { text: "예상보다 저렴해서 만족한다", tags: ["S", "J"] },
    a2: { text: "품질이 걱정되기도 한다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "가격 정보 없이 식당을 선택할 때",
    a1: { text: "가격을 먼저 확인하고 결정한다", tags: ["T", "J"] },
    a2: { text: "일단 가보고 결정한다", tags: ["F", "P"] },
  },
]

export default function RestaurantPriceTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-price",
    questions,
    resultPath: "/tests/restaurant-price/test/result",
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
      colorClasses={getQuizColorScheme("yellow-amber")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
