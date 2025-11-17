"use client"

/**
 * Component: GroceryShoppingTest
 * 장보기 테스트 페이지
 * @example <GroceryShoppingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "장보기 리스트를 만들 때",
    a1: { text: "카테고리별로 정리해서 만든다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 적거나 만들지 않는다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "마트에서 장보기 순서",
    a1: { text: "계획된 순서대로 구매한다", tags: ["J", "T"] },
    a2: { text: "보이는 대로 구매한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "장보기할 때",
    a1: { text: "혼자 조용히 장보는 게 편하다", tags: ["I", "T"] },
    a2: { text: "가족이나 친구와 함께 가는 게 좋다", tags: ["E", "F"] },
  },
  {
    id: 4,
    q: "계획에 없는 상품을 발견했을 때",
    a1: { text: "필요한지 생각하고 구매한다", tags: ["T", "J"] },
    a2: { text: "마음에 들면 즉시 구매한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "상품을 고를 때",
    a1: { text: "유통기한, 원산지, 가격을 확인한다", tags: ["S", "J"] },
    a2: { text: "보이는 대로 느낌으로 선택한다", tags: ["N", "P"] },
  },
  {
    id: 6,
    q: "신상품을 발견했을 때",
    a1: { text: "새로운 상품을 시도해보고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 상품이 더 안전하다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "장보기 중 리스트를 잊어버렸을 때",
    a1: { text: "핸드폰으로 확인하거나 기억을 되살린다", tags: ["S", "J"] },
    a2: { text: "보이는 대로 필요한 것만 산다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "장보기 예산을 초과할 것 같을 때",
    a1: { text: "계획을 조정하고 필요한 것만 산다", tags: ["J", "T"] },
    a2: { text: "그냥 구매하고 나중에 생각한다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "장보기 빈도",
    a1: { text: "정기적으로 한 번에 많이 산다", tags: ["J", "S"] },
    a2: { text: "필요할 때마다 자주 간다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "장보기 후 계산할 때",
    a1: { text: "계산 전에 대략 금액을 예상한다", tags: ["T", "J"] },
    a2: { text: "계산할 때까지 금액을 생각하지 않는다", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "장보기 후",
    a1: { text: "구매한 물건을 정리하고 기록한다", tags: ["J", "S"] },
    a2: { text: "그냥 두고 필요할 때 사용한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "장보기 스타일",
    a1: { text: "체계적이고 계획적으로 장보기", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 장보기", tags: ["P", "F"] },
  },
]

export default function GroceryShoppingTest() {
  const quizLogic = useQuizLogic({
    testId: "grocery-shopping",
    questions,
    resultPath: "/tests/grocery-shopping/test/result",
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
      colorClasses={getQuizColorScheme("green-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
