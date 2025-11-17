"use client"

/**
 * Component: MidnightSnackTest
 * 야식 테스트 페이지
 * @example <MidnightSnackTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "야식을 먹다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "즉시 배달을 주문한다", tags: ["E", "P"] },
    a2: { text: "냉장고를 확인하고 계획한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "야식을 먹다가 냉장고에 아무것도 없을 때",
    a1: { text: "즉시 배달을 주문한다", tags: ["E", "P"] },
    a2: { text: "편의점을 가거나 참는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "야식을 먹다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "야식을 먹다가 배가 너무 부를 때",
    a1: { text: "계속 먹는다", tags: ["E", "P"] },
    a2: { text: "그만 먹는다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "야식을 먹다가 음식이 맛없을 때",
    a1: { text: "다른 야식을 주문한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹거나 포기한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "야식을 먹다가 새로운 메뉴를 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "리뷰를 확인하고 신중하게 선택한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "야식을 먹다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "야식을 먹다가 음식이 너무 매울 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "야식을 먹다가 음식이 너무 짤 때",
    a1: { text: "물을 많이 마시거나 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "야식을 먹다가 음식이 너무 달 때",
    a1: { text: "반응하거나 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "야식을 먹다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "먹는 게 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "야식을 먹다가 계산할 때",
    a1: { text: "빨리 계산하고 끝낸다", tags: ["E", "P"] },
    a2: { text: "여유롭게 계산하고 끝낸다", tags: ["I", "J"] },
  },
]

export default function MidnightSnackTest() {
  const quizLogic = useQuizLogic({
    testId: "midnight-snack",
    questions,
    resultPath: "/tests/midnight-snack/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
