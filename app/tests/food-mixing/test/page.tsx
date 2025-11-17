"use client"

/**
 * Component: FoodMixingTest
 * 음식 섞기 테스트 페이지
 * @example <FoodMixingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "비빔밥을 먹을 때 밥과 반찬을 섞을 때",
    a1: { text: "완전히 섞어서 먹는다", tags: ["E", "N"] },
    a2: { text: "적당히 섞어서 먹는다", tags: ["I", "S"] },
  },
  {
    id: 2,
    q: "국밥을 먹을 때 밥과 국물을 섞을 때",
    a1: { text: "완전히 섞어서 먹는다", tags: ["E", "P"] },
    a2: { text: "적당히 섞어서 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "음식을 섞어 먹을 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "음식을 섞어 먹다가 맛이 예상과 다를 때",
    a1: { text: "새로운 맛이라 생각하고 즐긴다", tags: ["E", "F"] },
    a2: { text: "섞지 않고 따로 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식을 섞어 먹다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 섞어서 먹는다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "새로운 섞어 먹는 방법을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "음식을 섞어 먹다가 너무 매울 때",
    a1: { text: "완전히 섞어서 먹는다", tags: ["E", "F"] },
    a2: { text: "적당히 섞어서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "음식을 섞어 먹다가 너무 짤 때",
    a1: { text: "완전히 섞어서 먹는다", tags: ["E", "F"] },
    a2: { text: "적당히 섞어서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "음식을 섞어 먹다가 너무 달 때",
    a1: { text: "완전히 섞어서 먹는다", tags: ["E", "F"] },
    a2: { text: "적당히 섞어서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "음식을 섞어 먹다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "먹는 게 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "음식을 섞어 먹다가 음식이 다 떨어졌을 때",
    a1: { text: "음식을 더 달라고 요청한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹는다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "음식을 섞어 먹다가 음식이 식어갈 때",
    a1: { text: "빨리 섞어서 먹는다", tags: ["E", "P"] },
    a2: { text: "천천히 섞어서 먹는다", tags: ["I", "J"] },
  },
]

export default function FoodMixingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-mixing",
    questions,
    resultPath: "/tests/food-mixing/test/result",
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
