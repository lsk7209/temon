"use client"

/**
 * Component: FoodCreamyTest
 * 음식 부드러움 테스트 페이지
 * @example <FoodCreamyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 메뉴를 고르다가 '부드러운 크림 파스타'와 '바삭한 치킨' 중 선택할 때",
    a1: { text: "항상 부드러운 크림 파스타를 선택한다", tags: ["E"] },
    a2: { text: "가끔 부드러운 크림 파스타를 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "크림 파스타를 주문했는데 너무 부드러워서 맛이 밋밋하고 재미없을 때",
    a1: { text: "오히려 더 부드러운 맛을 좋아한다", tags: ["N"] },
    a2: { text: "적당한 부드러움을 선호한다", tags: ["S"] },
  },
  {
    id: 3,
    q: "식당에서 메뉴판을 보다가 '부드러운 크림 리소토'와 '바삭한 치킨' 중 고민될 때",
    a1: { text: "즉흥적으로 부드러운 크림 리소토를 선택한다", tags: ["P"] },
    a2: { text: "계획적으로 부드러운 크림 리소토를 선택한다", tags: ["J"] },
  },
  {
    id: 4,
    q: "부드러운 음식을 선택할 때 친구가 '왜 그거 골랐어?'라고 물어볼 때",
    a1: { text: "편안하고 만족스러워서 선택했다고 말한다", tags: ["F"] },
    a2: { text: "질감과 효율이 좋아서 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "부드러운 음식을 먹다가 너무 부드러워서 재미없고 밋밋할 때",
    a1: { text: "빨리 먹어서 끝낸다", tags: ["E"] },
    a2: { text: "천천히 부드러운 맛을 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "부드러운 음식을 먹기 전에 언제 먹을지 계획할 때",
    a1: { text: "즉시 먹고 즐긴다", tags: ["P"] },
    a2: { text: "미리 언제 어떻게 먹을지 계획한다", tags: ["J"] },
  },
  {
    id: 7,
    q: "부드러운 음식에 대한 리뷰나 정보를 확인할 때",
    a1: { text: "대략적으로 확인하고 바로 선택한다", tags: ["N"] },
    a2: { text: "정확히 확인하고 신중하게 선택한다", tags: ["S"] },
  },
  {
    id: 8,
    q: "부드러운 음식을 먹을 때 친구가 와서 '나도 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 9,
    q: "부드러운 음식을 선택할 때 선택 기준을 정할 때",
    a1: { text: "감각과 직감으로 선택한다", tags: ["F"] },
    a2: { text: "논리와 정보로 선택한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "부드러운 음식을 먹기 전에 메뉴를 미리 정해둘 때",
    a1: { text: "미리 언제 무엇을 먹을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "부드러운 음식을 선택할 때 과거에 먹었던 경험을 활용할 때",
    a1: { text: "과거에 먹었던 부드러운 음식을 다시 선택한다", tags: ["S"] },
    a2: { text: "새로운 부드러운 음식을 시도해본다", tags: ["N"] },
  },
  {
    id: 12,
    q: "부드러운 음식을 먹고 나서 다음에 무엇을 먹을지 생각할 때",
    a1: { text: "즉시 다음 음식을 찾는다", tags: ["E"] },
    a2: { text: "여유롭게 부드러운 맛을 즐긴다", tags: ["I"] },
  },
]

export default function FoodCreamyTest() {
  const quizLogic = useQuizLogic({
    testId: "food-creamy",
    questions,
    resultPath: "/tests/food-creamy/test/result",
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
      colorClasses={getQuizColorScheme("purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
