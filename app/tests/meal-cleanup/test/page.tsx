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
    q: "설거지가 산더미처럼 쌓였을 때",
    a1: { text: "바로 시작해서 끝까지 해치운다", tags: ["J"] },
    a2: { text: "일단 미뤄두고 나중에 한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "그릇을 정리할 때",
    a1: { text: "종류·크기별로 맞춰서 넣는다", tags: ["S"] },
    a2: { text: "일단 들어가는 자리에 넣는다", tags: ["N"] },
  },
  {
    id: 3,
    q: "설거지하다 그릇을 깨뜨렸을 때",
    a1: { text: "빠르게 치우고 조심할 점을 생각한다", tags: ["T"] },
    a2: { text: "일단 놀라고 속상해한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "정리하는 도중 친구가 놀자고 하면",
    a1: { text: "바로 나가서 논다", tags: ["E"] },
    a2: { text: "정리부터 끝내고 논다", tags: ["I"] },
  },
  {
    id: 5,
    q: "정리하는 순서는",
    a1: { text: "그릇 → 조리도구 → 식탁 순서를 정해둔다", tags: ["J"] },
    a2: { text: "손에 잡히는 대로 치운다", tags: ["P"] },
  },
  {
    id: 6,
    q: "세제 양을 잴 때",
    a1: { text: "늘 쓰던 만큼 정확히 짠다", tags: ["S"] },
    a2: { text: "그때그때 감으로 짠다", tags: ["N"] },
  },
  {
    id: 7,
    q: "정리 중 전화가 왔을 때",
    a1: { text: "정리가 끝날 때까지 무시한다", tags: ["T"] },
    a2: { text: "바로 받고 정리를 멈춘다", tags: ["F"] },
  },
  {
    id: 8,
    q: "정리하면서",
    a1: { text: "음악을 틀어놓고 신나게 한다", tags: ["E"] },
    a2: { text: "조용히 혼자 집중해서 한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "정리 도중 갑자기 다른 할 일이 생기면",
    a1: { text: "정리부터 끝내고 넘어간다", tags: ["J"] },
    a2: { text: "일단 그 일부터 처리하고 돌아온다", tags: ["P"] },
  },
  {
    id: 10,
    q: "새로운 정리 방법을 보면",
    a1: { text: "실제로 효과 있었는지부터 확인한다", tags: ["S"] },
    a2: { text: "일단 재미있어 보이면 따라해본다", tags: ["N"] },
  },
  {
    id: 11,
    q: "같이 사는 사람이 정리를 안 해놨을 때",
    a1: { text: "정리 규칙부터 다시 얘기한다", tags: ["T"] },
    a2: { text: "그냥 내가 마저 치운다", tags: ["F"] },
  },
  {
    id: 12,
    q: "정리를 다 끝낸 뒤에는",
    a1: { text: "바로 누군가에게 연락하거나 나간다", tags: ["E"] },
    a2: { text: "혼자 여유롭게 쉰다", tags: ["I"] },
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
