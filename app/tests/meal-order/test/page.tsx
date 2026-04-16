"use client"

/**
 * Component: MealOrderTest
 * 식사 순서 테스트 페이지
 * @example <MealOrderTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "한식당에서 밥, 국, 반찬을 먹는 순서를 정할 때",
    a1: { text: "대충 순서를 정한다", tags: ["E", "P"] },
    a2: { text: "정확하게 계산해서 순서를 정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "코스 요리를 먹을 때 순서를 정할 때",
    a1: { text: "대충 순서를 정한다", tags: ["E", "P"] },
    a2: { text: "정확하게 계산해서 순서를 정한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 순서를 정할 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 순서를 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 순서를 정하다가 맛이 예상과 다를 때",
    a1: { text: "그래도 순서를 정한다", tags: ["E", "F"] },
    a2: { text: "순서를 포기하고 맛있는 걸 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "식사 순서를 정하다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 순서를 정한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "새로운 식사 순서를 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "식사 순서를 정하다가 순서가 너무 복잡할 때",
    a1: { text: "대충 간단하게 순서를 정한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 순서를 정한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "식사 순서를 정하다가 순서가 예상과 다를 때",
    a1: { text: "즉흥적으로 수정한다", tags: ["E", "P"] },
    a2: { text: "계획을 확인하고 수정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "식사 순서를 정하다가 순서가 너무 오래 걸릴 때",
    a1: { text: "빨리 간단하게 순서를 정한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 순서를 정한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "식사 순서를 정하다가 음식이 식어갈 때",
    a1: { text: "빨리 순서를 정하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 순서를 정한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "식사 순서를 정하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 순서를 정한다", tags: ["E", "F"] },
    a2: { text: "순서가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "식사 순서를 정하다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 순서를 정하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 순서를 정한다", tags: ["I", "J"] },
  },
]

export default function MealOrderTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-order",
    questions,
    resultPath: "/tests/meal-order/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
