"use client"

/**
 * Component: FoodCrunchyTest
 * 음식 아삭함 테스트 페이지
 * @example <FoodCrunchyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 메뉴를 고르다가 '아삭한 샐러드'와 '부드러운 스프' 중 선택할 때",
    a1: { text: "항상 아삭한 샐러드를 선택한다", tags: ["E"] },
    a2: { text: "가끔 아삭한 샐러드를 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "아삭한 음식을 먹다가 아삭함이 너무 강해서 입 안이 아플 것 같을 때",
    a1: { text: "아주 아삭한 맛을 더 선호한다", tags: ["N"] },
    a2: { text: "적당한 아삭함을 선호한다", tags: ["S"] },
  },
  {
    id: 3,
    q: "아삭한 음식을 선택할 때 메뉴판을 볼 때",
    a1: { text: "즉흥적으로 아삭해 보이는 걸 선택한다", tags: ["P"] },
    a2: { text: "계획적으로 아삭한 음식을 선택한다", tags: ["J"] },
  },
  {
    id: 4,
    q: "아삭한 음식을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "신선함과 만족감 때문에 선택한다", tags: ["F"] },
    a2: { text: "질감과 효율 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "아삭한 음식을 먹다가 아삭한 소리가 너무 크게 날 때",
    a1: { text: "빠르게 먹어서 소리를 줄인다", tags: ["E"] },
    a2: { text: "천천히 즐기면서 소리를 낸다", tags: ["I"] },
  },
  {
    id: 6,
    q: "아삭한 음식을 먹기 전에 계획을 세울 때",
    a1: { text: "즉시 먹고 즐긴다", tags: ["P"] },
    a2: { text: "미리 언제 어떻게 먹을지 계획한다", tags: ["J"] },
  },
  {
    id: 7,
    q: "아삭한 음식에 대한 정보를 확인할 때",
    a1: { text: "대략적으로 확인하고 선택한다", tags: ["N"] },
    a2: { text: "정확히 확인하고 선택한다", tags: ["S"] },
  },
  {
    id: 8,
    q: "아삭한 음식을 먹을 때 함께 먹고 싶은 사람이 있을 때",
    a1: { text: "친구들과 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 9,
    q: "아삭한 음식을 선택할 때 선택 기준이 있을 때",
    a1: { text: "감각과 직감으로 선택한다", tags: ["F"] },
    a2: { text: "논리와 정보로 선택한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "아삭한 음식을 먹기 전에 계획을 세울 때",
    a1: { text: "미리 언제 무엇을 먹을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "아삭한 음식을 선택할 때 과거 경험을 활용할 때",
    a1: { text: "과거에 먹었던 아삭한 음식을 다시 선택한다", tags: ["S"] },
    a2: { text: "새로운 아삭한 음식을 시도해본다", tags: ["N"] },
  },
  {
    id: 12,
    q: "아삭한 음식을 먹고 나서 다음 행동을 할 때",
    a1: { text: "즉시 다음 음식을 찾는다", tags: ["E"] },
    a2: { text: "여유롭게 아삭한 맛을 즐긴다", tags: ["I"] },
  },
]

export default function FoodCrunchyTest() {
  const quizLogic = useQuizLogic({
    testId: "food-crunchy",
    questions,
    resultPath: "/tests/food-crunchy/test/result",
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
