"use client"

/**
 * Component: FoodUmamiTest
 * 음식 감칠맛 테스트 페이지
 * @example <FoodUmamiTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 메뉴를 고르다가 '감칠맛 음식'과 '밋밋한 음식' 중 선택할 때",
    a1: { text: "항상 감칠맛 음식을 선택한다", tags: ["E"] },
    a2: { text: "가끔 감칠맛 음식을 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "감칠맛 음식을 먹다가 감칠맛이 너무 강해서 입 안이 진할 것 같을 때",
    a1: { text: "오히려 더 진한 감칠맛을 선호한다", tags: ["N"] },
    a2: { text: "적당한 감칠맛을 선호한다", tags: ["S"] },
  },
  {
    id: 3,
    q: "식당에서 메뉴판을 보다가 감칠맛 음식을 선택할 때",
    a1: { text: "즉흥적으로 감칠맛 음식을 선택한다", tags: ["P"] },
    a2: { text: "계획적으로 감칠맛 음식을 선택한다", tags: ["J"] },
  },
  {
    id: 4,
    q: "친구가 '왜 감칠맛 음식을 골랐어?'라고 물어볼 때",
    a1: { text: "깊이와 풍부함 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "영양과 효율 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "감칠맛 음식을 먹다가 너무 진해서 입 안이 무거울 것 같을 때",
    a1: { text: "빨리 먹어서 끝낸다", tags: ["E"] },
    a2: { text: "천천히 감칠맛을 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "감칠맛 음식을 먹기 전에 계획을 세울 때",
    a1: { text: "즉시 먹고 즐긴다", tags: ["P"] },
    a2: { text: "미리 언제 어떻게 먹을지 계획한다", tags: ["J"] },
  },
  {
    id: 7,
    q: "감칠맛 음식에 대한 리뷰나 정보를 확인할 때",
    a1: { text: "대략적으로 확인하고 선택한다", tags: ["N"] },
    a2: { text: "정확히 확인하고 선택한다", tags: ["S"] },
  },
  {
    id: 8,
    q: "감칠맛 음식을 먹을 때 친구가 와서 '나도 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 9,
    q: "감칠맛 음식을 선택할 때 선택 기준을 정할 때",
    a1: { text: "감각과 직감으로 선택한다", tags: ["F"] },
    a2: { text: "논리와 정보로 선택한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "감칠맛 음식을 먹기 전에 메뉴를 미리 정해둘 때",
    a1: { text: "미리 언제 무엇을 먹을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "감칠맛 음식을 선택할 때 과거에 먹었던 경험을 활용할 때",
    a1: { text: "과거에 먹었던 감칠맛 음식을 다시 선택한다", tags: ["S"] },
    a2: { text: "새로운 감칠맛 음식을 시도해본다", tags: ["N"] },
  },
  {
    id: 12,
    q: "감칠맛 음식을 먹고 나서 다음에 무엇을 먹을지 생각할 때",
    a1: { text: "즉시 다음 음식을 찾는다", tags: ["E"] },
    a2: { text: "여유롭게 감칠맛을 즐긴다", tags: ["I"] },
  },
]

export default function FoodUmamiTest() {
  const quizLogic = useQuizLogic({
    testId: "food-umami",
    questions,
    resultPath: "/tests/food-umami/test/result",
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
      colorClasses={getQuizColorScheme("red-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
