"use client"

/**
 * Component: MealSocialTest
 * 식사 중 대화 테스트 페이지
 * @example <MealSocialTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사 중 대화하다가 음식을 흘렸을 때",
    a1: { text: "웃으면서 계속 대화한다", tags: ["E", "F"] },
    a2: { text: "조용히 닦고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "식사 중 대화하다가 음식이 식어갈 때",
    a1: { text: "대화를 계속하고 나중에 먹는다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 중 대화하다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹고 대화한다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 중 대화하다가 음식이 맛없을 때",
    a1: { text: "대화하면서 맛에 대해 이야기한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "식사 중 대화하다가 음식이 너무 뜨거울 때",
    a1: { text: "대화하면서 식히고 먹는다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 식힌다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식사 중 대화하다가 새로운 주제가 나올 때",
    a1: { text: "즉시 새로운 주제로 바꾼다", tags: ["E", "N"] },
    a2: { text: "기존 주제를 계속한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "식사 중 대화하다가 음식이 너무 매울 때",
    a1: { text: "대화하면서 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 물을 마시고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "식사 중 대화하다가 음식이 너무 짤 때",
    a1: { text: "대화하면서 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 물을 마시고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "식사 중 대화하다가 음식이 너무 달 때",
    a1: { text: "대화하면서 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "식사 중 대화하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 대화를 계속한다", tags: ["E", "F"] },
    a2: { text: "대화를 멈추고 전화를 받는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식사 중 대화하다가 계산할 때",
    a1: { text: "대화하면서 계산한다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 계산한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "식사 중 대화하다가 옆 테이블 사람들이 시끄러울 때",
    a1: { text: "신경 쓰지 않고 대화를 계속한다", tags: ["E", "P"] },
    a2: { text: "조용한 곳으로 이동한다", tags: ["I", "J"] },
  },
]

export default function MealSocialTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-social",
    questions,
    resultPath: "/tests/meal-social/test/result",
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
      colorClasses={getQuizColorScheme("teal-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
