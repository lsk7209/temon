"use client"

/**
 * Component: MealCleanupTest
 * 식사 후 정리 테스트 페이지
 * @example <MealCleanupTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사 후 정리하다가 설거지가 산더미처럼 쌓였을 때",
    a1: { text: "당장 정리하고 싶어서 바로 시작한다", tags: ["E", "J"] },
    a2: { text: "나중에 정리하고 일단 쉰다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "식사 후 정리하다가 또 먹고 싶을 때",
    a1: { text: "정리를 멈추고 다시 먹는다", tags: ["E", "P"] },
    a2: { text: "정리를 끝내고 나중에 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 후 정리하다가 깜빡 잊고 안 닦은 그릇을 발견했을 때",
    a1: { text: "당황해서 다시 닦는다", tags: ["E", "F"] },
    a2: { text: "침착하게 닦고 끝낸다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 후 정리하다가 친구가 와서 놀자고 할 때",
    a1: { text: "정리를 멈추고 친구와 논다", tags: ["E", "F"] },
    a2: { text: "정리를 끝내고 나중에 논다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "식사 후 정리하다가 시간이 너무 오래 걸릴 때",
    a1: { text: "대충 빠르게 끝낸다", tags: ["E", "P"] },
    a2: { text: "꼼꼼하게 끝까지 한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식사 후 정리하다가 실수로 그릇을 깨뜨렸을 때",
    a1: { text: "당황해서 바로 치운다", tags: ["E", "F"] },
    a2: { text: "침착하게 치우고 계속한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "식사 후 정리하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 정리를 멈춘다", tags: ["E", "F"] },
    a2: { text: "정리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "식사 후 정리하다가 물이 다 떨어졌을 때",
    a1: { text: "당황해서 다른 방법을 찾는다", tags: ["E", "P"] },
    a2: { text: "침착하게 물을 구해서 계속한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "식사 후 정리하다가 정리가 끝났는데 또 더러운 게 보일 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 마저 정리한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "식사 후 정리하다가 너무 피곤해서 정리가 싫을 때",
    a1: { text: "대충 끝내고 쉰다", tags: ["E", "P"] },
    a2: { text: "끝까지 정리하고 쉰다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "식사 후 정리하다가 정리한 게 또 어지러워질 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 다시 정리한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "식사 후 정리하다가 정리한 그릇을 또 찾을 수 없을 때",
    a1: { text: "당황해서 다시 찾는다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리된 위치를 확인한다", tags: ["I", "J"] },
  },
]

export default function MealCleanupTest() {
  const quizLogic = useQuizLogic({
    testId: "meal-cleanup",
    questions,
    resultPath: "/tests/meal-cleanup/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
