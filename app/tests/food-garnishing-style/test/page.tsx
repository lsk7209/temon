"use client"

/**
 * Component: FoodGarnishingStyleTest
 * 음식 장식 스타일 테스트 페이지
 * @example <FoodGarnishingStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "음식에 장식을 하다가 장식 재료가 없을 때",
    a1: { text: "대체 재료로 계속 장식한다", tags: ["E", "P"] },
    a2: { text: "재료를 구매하거나 계획을 수정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "음식에 장식을 하다가 시간이 부족할 때",
    a1: { text: "빨리 간단하게 장식한다", tags: ["E", "P"] },
    a2: { text: "계획을 수정하고 체계적으로 장식한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "음식에 장식을 하다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 장식한다", tags: ["E", "F"] },
    a2: { text: "혼자 장식하는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "음식에 장식을 하다가 실수로 망쳤을 때",
    a1: { text: "당황해서 다시 장식한다", tags: ["E", "F"] },
    a2: { text: "침착하게 수정하고 계속한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식에 장식을 하다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 간단하게 장식하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 장식한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "음식에 장식을 하다가 새로운 방법을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "음식에 장식을 하다가 장식이 너무 복잡할 때",
    a1: { text: "대충 간단하게 장식한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 장식한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "음식에 장식을 하다가 장식이 예상과 다를 때",
    a1: { text: "즉흥적으로 수정한다", tags: ["E", "P"] },
    a2: { text: "계획을 확인하고 수정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "음식에 장식을 하다가 장식 재료가 비쌀 때",
    a1: { text: "대체 재료를 찾는다", tags: ["E", "F"] },
    a2: { text: "계획을 수정하거나 구매한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "음식에 장식을 하다가 장식이 너무 오래 걸릴 때",
    a1: { text: "빨리 간단하게 장식한다", tags: ["E", "P"] },
    a2: { text: "계획대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "음식에 장식을 하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 장식한다", tags: ["E", "F"] },
    a2: { text: "장식이 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "음식에 장식을 하다가 음식이 식어갈 때",
    a1: { text: "빨리 장식하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 장식한다", tags: ["I", "J"] },
  },
]

export default function FoodGarnishingStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "food-garnishing-style",
    questions,
    resultPath: "/tests/food-garnishing-style/test/result",
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
