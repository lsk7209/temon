"use client"

/**
 * Component: MealDurationTest
 * 식사 시간 테스트 페이지
 * @example <MealDurationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "점심시간이 짧아서 서둘러야 할 때",
    a1: { text: "빨리 먹고 끝낸다", tags: ["E", "P"] },
    a2: { text: "계획대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "회의 전에 식사할 시간이 부족할 때",
    a1: { text: "빨리 먹는다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 중에 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 중에 음식이 맛없을 때",
    a1: { text: "빨리 먹고 끝낸다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "식사 중에 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식당에서 새로운 메뉴를 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "식사 중에 음식이 너무 매울 때",
    a1: { text: "빨리 먹고 끝낸다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "식사 중에 음식이 너무 짤 때",
    a1: { text: "빨리 먹고 끝낸다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "식사 중에 음식이 너무 달 때",
    a1: { text: "빨리 먹고 끝낸다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "식사 중에 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "식사가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식사를 마치고 계산할 때",
    a1: { text: "빨리 계산하고 나간다", tags: ["E", "P"] },
    a2: { text: "여유롭게 계산하고 나간다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "식사 중에 음식이 식어갈 때",
    a1: { text: "빨리 먹는다", tags: ["E", "P"] },
    a2: { text: "천천히 먹는다", tags: ["I", "J"] },
  },
]

export default function MealDurationTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-duration",
    questions,
    resultPath: "/tests/meal-duration/test/result",
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
      colorClasses={getQuizColorScheme("violet-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
