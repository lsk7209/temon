"use client"

/**
 * Component: CookingComplexityTest
 * 복잡한 요리 테스트 페이지
 * @example <CookingComplexityTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "복잡한 요리를 하려는데 재료가 부족할 때",
    a1: { text: "대체 재료로 계속 만든다", tags: ["P", "N"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "복잡한 요리를 하려는데 시간이 부족할 때",
    a1: { text: "빨리 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "복잡한 요리를 하려는데 친구가 와서 먹자고 할 때",
    a1: { text: "빨리 만들어서 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "복잡한 요리를 하려는데 배가 고파서 참을 수 없을 때",
    a1: { text: "빨리 만들어서 먹는다", tags: ["E", "P"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "복잡한 요리를 하려는데 실수로 망쳤을 때",
    a1: { text: "다시 처음부터 만든다", tags: ["E", "F"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "복잡한 요리를 하려는데 너무 피곤할 때",
    a1: { text: "빨리 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "복잡한 요리를 하려는데 재료가 비쌀 때",
    a1: { text: "예쁘게 보이면 구매한다", tags: ["E", "F"] },
    a2: { text: "대체 재료를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "복잡한 요리를 하려는데 레시피가 어려울 때",
    a1: { text: "대충 이해하고 만든다", tags: ["E", "P"] },
    a2: { text: "레시피를 다시 확인한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "복잡한 요리를 하려는데 요리가 너무 복잡해질 때",
    a1: { text: "계속 더 추가한다", tags: ["E", "P"] },
    a2: { text: "간단하게 정리한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "복잡한 요리를 하려는데 요리가 맛이 없을 때",
    a1: { text: "예쁘게 보이면 그대로 둔다", tags: ["E", "F"] },
    a2: { text: "맛을 개선하는 게 우선이다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "복잡한 요리를 하려는데 요리가 너무 오래 걸릴 때",
    a1: { text: "빨리 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "간단한 요리로 바꾼다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "복잡한 요리를 하려는데 요리가 맛이 식어갈 때",
    a1: { text: "빨리 만들어서 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingComplexityTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-complexity",
    questions,
    resultPath: "/tests/cooking-complexity/test/result",
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
      colorClasses={getQuizColorScheme("violet-purple-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
