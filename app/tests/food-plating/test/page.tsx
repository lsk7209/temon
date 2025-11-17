"use client"

/**
 * Component: FoodPlatingTest
 * 음식 플레이팅 테스트 페이지
 * @example <FoodPlatingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "접시에 음식을 담다가 접시가 없을 때",
    a1: { text: "당황해서 다른 접시를 찾는다", tags: ["E", "P"] },
    a2: { text: "침착하게 접시를 구하거나 계획을 수정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "접시에 음식을 담다가 시간이 부족할 때",
    a1: { text: "빨리 간단하게 담는다", tags: ["E", "P"] },
    a2: { text: "계획을 수정하고 체계적으로 담는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "접시에 음식을 담다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 담는다", tags: ["E", "F"] },
    a2: { text: "혼자 담는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "접시에 음식을 담다가 실수로 망쳤을 때",
    a1: { text: "당황해서 다시 담는다", tags: ["E", "F"] },
    a2: { text: "침착하게 수정하고 계속한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "접시에 음식을 담다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 간단하게 담고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 담는다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "접시에 음식을 담다가 새로운 방법을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "접시에 음식을 담다가 담기가 너무 복잡할 때",
    a1: { text: "대충 간단하게 담는다", tags: ["E", "P"] },
    a2: { text: "체계적으로 담는다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "접시에 음식을 담다가 담기가 예상과 다를 때",
    a1: { text: "즉흥적으로 수정한다", tags: ["E", "P"] },
    a2: { text: "계획을 확인하고 수정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "접시에 음식을 담다가 접시가 비쌀 때",
    a1: { text: "대체 방법을 찾는다", tags: ["E", "F"] },
    a2: { text: "계획을 수정하거나 구매한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "접시에 음식을 담다가 담기가 너무 오래 걸릴 때",
    a1: { text: "빨리 간단하게 담는다", tags: ["E", "P"] },
    a2: { text: "계획대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "접시에 음식을 담다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 담는다", tags: ["E", "F"] },
    a2: { text: "담기가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "접시에 음식을 담다가 음식이 식어갈 때",
    a1: { text: "빨리 담고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 담는다", tags: ["I", "J"] },
  },
]

export default function FoodPlatingTest() {
  const quizLogic = useQuizLogic({
    testId: "food-plating",
    questions,
    resultPath: "/tests/food-plating/test/result",
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
