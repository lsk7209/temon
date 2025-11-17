"use client"

/**
 * Component: MealEtiquetteTest
 * 식사 예절 테스트 페이지
 * @example <MealEtiquetteTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사하다가 젓가락을 떨어뜨렸을 때",
    a1: { text: "당황해서 바로 주워서 계속 먹는다", tags: ["E", "P"] },
    a2: { text: "침착하게 주워서 정리하고 계속 먹는다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "식사하다가 음식을 흘렸을 때",
    a1: { text: "신경 쓰지 않고 계속 먹는다", tags: ["E", "P"] },
    a2: { text: "바로 닦고 정리한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사하다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사하다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "식사하다가 음식이 맛없을 때",
    a1: { text: "직원에게 말하거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 나간다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "식사하다가 음식이 너무 많아서 다 못 먹을 때",
    a1: { text: "포장해서 가져간다", tags: ["J", "S"] },
    a2: { text: "그냥 남긴다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "식사하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "식사가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "식사하다가 옆 테이블 사람들이 시끄러울 때",
    a1: { text: "신경 쓰지 않고 먹는다", tags: ["E", "P"] },
    a2: { text: "조용한 곳으로 이동한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "식사하다가 음식이 너무 매울 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "식사하다가 음식이 너무 짤 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식사하다가 음식이 너무 달 때",
    a1: { text: "반응하거나 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 먹는다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "식사하다가 계산할 때",
    a1: { text: "빨리 계산하고 나간다", tags: ["E", "P"] },
    a2: { text: "여유롭게 계산하고 나간다", tags: ["I", "J"] },
  },
]

export default function MealEtiquetteTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-etiquette",
    questions,
    resultPath: "/tests/meal-etiquette/test/result",
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
      colorClasses={getQuizColorScheme("emerald-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
