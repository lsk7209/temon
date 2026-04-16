"use client"

/**
 * Component: MealServingTest
 * 식사 나누기 테스트 페이지
 * @example <MealServingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "피자를 친구들과 나눌 때",
    a1: { text: "대충 나눠준다", tags: ["E", "P"] },
    a2: { text: "정확하게 계산해서 나눠준다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "치킨을 여러 명이 나눌 때",
    a1: { text: "기쁘게 많이 나눠준다", tags: ["E", "F"] },
    a2: { text: "정확하게 계산해서 나눠준다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "음식을 나눌 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 나눠 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "음식을 나누다가 맛이 예상과 다를 때",
    a1: { text: "그래도 나눠준다", tags: ["E", "F"] },
    a2: { text: "나누지 않고 혼자 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식을 나누다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 나눠준다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "새로운 나누는 방법을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "음식을 나누다가 나누기가 너무 복잡할 때",
    a1: { text: "대충 간단하게 나눠준다", tags: ["E", "P"] },
    a2: { text: "체계적으로 나눠준다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "음식을 나누다가 나누기가 예상과 다를 때",
    a1: { text: "즉흥적으로 수정한다", tags: ["E", "P"] },
    a2: { text: "계획을 확인하고 수정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "음식을 나누다가 나누기가 너무 오래 걸릴 때",
    a1: { text: "빨리 간단하게 나눠준다", tags: ["E", "P"] },
    a2: { text: "체계적으로 나눠준다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "음식을 나누다가 음식이 식어갈 때",
    a1: { text: "빨리 나눠주고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 나눠준다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "음식을 나누다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 나눠준다", tags: ["E", "F"] },
    a2: { text: "나누기가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "음식을 나누다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 나눠주고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 나눠준다", tags: ["I", "J"] },
  },
]

export default function MealServingTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-serving",
    questions,
    resultPath: "/tests/meal-serving/test/result",
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
      colorClasses={getQuizColorScheme("amber-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
