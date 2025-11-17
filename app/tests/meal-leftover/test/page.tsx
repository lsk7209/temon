"use client"

/**
 * Component: MealLeftoverTest
 * 남은 음식 처리 테스트 페이지
 * @example <MealLeftoverTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "남은 음식을 처리하다가 냉장고에 공간이 없을 때",
    a1: { text: "당황해서 다른 곳에 보관한다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리하고 보관한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "남은 음식을 처리하다가 음식이 상했을 때",
    a1: { text: "당황해서 바로 버린다", tags: ["E", "F"] },
    a2: { text: "침착하게 확인하고 버린다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "남은 음식을 처리하다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "남은 음식을 처리하다가 음식이 너무 많을 때",
    a1: { text: "포장해서 나눠준다", tags: ["E", "F"] },
    a2: { text: "체계적으로 보관한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "남은 음식을 처리하다가 음식이 맛없을 때",
    a1: { text: "바로 버린다", tags: ["E", "P"] },
    a2: { text: "다시 확인하고 버린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "남은 음식을 처리하다가 새로운 방법을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "남은 음식을 처리하다가 음식이 너무 오래 되었을 때",
    a1: { text: "당황해서 바로 버린다", tags: ["E", "F"] },
    a2: { text: "침착하게 확인하고 버린다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "남은 음식을 처리하다가 음식이 너무 적을 때",
    a1: { text: "그냥 버린다", tags: ["E", "P"] },
    a2: { text: "보관하거나 활용한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "남은 음식을 처리하다가 음식이 너무 비쌀 때",
    a1: { text: "아까워서 보관한다", tags: ["E", "F"] },
    a2: { text: "상태를 확인하고 결정한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "남은 음식을 처리하다가 음식이 너무 많아서 다 못 먹을 때",
    a1: { text: "포장해서 나눠준다", tags: ["E", "F"] },
    a2: { text: "체계적으로 보관한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "남은 음식을 처리하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 처리한다", tags: ["E", "F"] },
    a2: { text: "처리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "남은 음식을 처리하다가 처리 방법이 너무 복잡할 때",
    a1: { text: "대충 빠르게 처리한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 처리한다", tags: ["I", "J"] },
  },
]

export default function MealLeftoverTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-leftover",
    questions,
    resultPath: "/tests/meal-leftover/test/result",
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
      colorClasses={getQuizColorScheme("slate-gray")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
