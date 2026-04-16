"use client"

/**
 * Component: FoodAromaTest
 * 음식 향 테스트 페이지
 * @example <FoodAromaTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 음식을 고르다가 '진한 향'과 '은은한 향' 중 선택할 때",
    a1: { text: "진한 향을 선택한다", tags: ["E", "N"] },
    a2: { text: "은은한 향을 선택한다", tags: ["I", "S"] },
  },
  {
    id: 2,
    q: "음식을 주문할 때 향을 고를 때",
    a1: { text: "강한 향을 선택한다", tags: ["E", "P"] },
    a2: { text: "적당한 향을 선택한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "음식을 먹을 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "음식을 먹다가 향이 예상과 다를 때",
    a1: { text: "새로운 경험이라 생각하고 즐긴다", tags: ["E", "F"] },
    a2: { text: "다른 향의 음식을 선택한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식을 먹다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식당에서 새로운 향의 음식을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "음식을 먹다가 향이 마음에 안 들 때",
    a1: { text: "그래도 먹어본다", tags: ["E", "F"] },
    a2: { text: "다른 향의 음식을 선택한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "음식을 선택할 때 향 조합을 고를 때",
    a1: { text: "다양한 향을 조합한다", tags: ["E", "F"] },
    a2: { text: "통일된 향을 선택한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "음식을 먹다가 향이 예쁘게 느껴질 때",
    a1: { text: "즉시 사진을 찍어서 공유한다", tags: ["E", "F"] },
    a2: { text: "조용히 감상한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "음식을 먹다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "식사가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식당에서 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 향을 선택하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 향을 선택한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "음식을 선택할 때 시간이 부족할 때",
    a1: { text: "빨리 향을 선택하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 향을 선택한다", tags: ["I", "J"] },
  },
]

export default function FoodAromaTest() {
  const quizLogic = useQuizLogic({
    testId: "food-aroma",
    questions,
    resultPath: "/tests/food-aroma/test/result",
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
      colorClasses={getQuizColorScheme("rose-pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
