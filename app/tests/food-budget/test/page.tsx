"use client"

/**
 * Component: FoodBudgetTest
 * 음식 예산 테스트 페이지
 * @example <FoodBudgetTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "한 달 음식 예산을 정할 때",
    a1: { text: "구체적인 금액을 정하고 지킨다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 생각하고 유연하게 쓴다", tags: ["P", "F"] },
  },
  {
    id: 2,
    q: "예산을 초과할 것 같을 때",
    a1: { text: "다음 달로 미루거나 다른 곳에서 줄인다", tags: ["J", "T"] },
    a2: { text: "가끔은 초과해도 괜찮다고 생각한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "음식 예산을 기록할 때",
    a1: { text: "앱이나 가계부에 꼼꼼히 기록한다", tags: ["S", "J"] },
    a2: { text: "대략적으로만 기억하거나 기록하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "예상치 못한 음식 지출이 생겼을 때",
    a1: { text: "예산을 재조정하고 계획을 수정한다", tags: ["J", "T"] },
    a2: { text: "그냥 지출하고 나중에 생각한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "친구들과 식사할 때 예산",
    a1: { text: "예산을 미리 말하거나 고려한다", tags: ["T", "I"] },
    a2: { text: "분위기에 맞춰서 결정한다", tags: ["F", "E"] },
  },
  {
    id: 6,
    q: "할인이나 특가를 발견했을 때",
    a1: { text: "예산 범위 내에서만 구매한다", tags: ["J", "S"] },
    a2: { text: "할인이라면 예산을 넘어서도 산다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "음식 예산을 나누어 관리할 때",
    a1: { text: "외식/배달/장보기 등으로 세분화한다", tags: ["S", "J"] },
    a2: { text: "전체적으로만 관리한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "예산이 남았을 때",
    a1: { text: "다음 달로 넘기거나 저축한다", tags: ["J", "T"] },
    a2: { text: "특별한 음식을 먹거나 친구를 만난다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "예산 계획을 세울 때",
    a1: { text: "과거 지출을 분석해 현실적으로 계획한다", tags: ["S", "J"] },
    a2: { text: "느낌과 상황에 맞춰 대략적으로 계획한다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "예산을 초과했는지 확인할 때",
    a1: { text: "정기적으로 확인하고 관리한다", tags: ["J", "S"] },
    a2: { text: "필요할 때만 확인하거나 확인하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "예산이 부족할 때",
    a1: { text: "계획을 세워서 절약한다", tags: ["J", "T"] },
    a2: { text: "그때그때 상황에 맞춰 대처한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "음식 예산 관리의 목적",
    a1: { text: "재정 관리와 계획을 위해 필요하다", tags: ["T", "J"] },
    a2: { text: "대략적인 가이드라인 정도로 생각한다", tags: ["F", "P"] },
  },
]

export default function FoodBudgetTest() {
  const quizLogic = useQuizLogic({
    testId: "food-budget",
    questions,
    resultPath: "/tests/food-budget/test/result",
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
