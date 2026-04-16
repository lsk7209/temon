"use client"

/**
 * Component: CookingMethodTest
 * 요리 방법 테스트 페이지
 * @example <CookingMethodTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리할 때 조리 방법을 선택하다가 재료가 없을 때",
    a1: { text: "대체 방법으로 계속 만든다", tags: ["P", "N"] },
    a2: { text: "재료를 구매하거나 레시피를 확인한다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "요리할 때 조리 방법을 선택하다가 시간이 부족할 때",
    a1: { text: "빨리 만드는 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "요리할 때 조리 방법을 선택하다가 친구가 와서 먹자고 할 때",
    a1: { text: "빨리 만드는 방법으로 바꾼다", tags: ["E", "F"] },
    a2: { text: "레시피대로 완성될 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리할 때 조리 방법을 선택하다가 실수로 망쳤을 때",
    a1: { text: "다시 처음부터 만든다", tags: ["E", "F"] },
    a2: { text: "레시피를 확인하고 수정한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리할 때 조리 방법을 선택하다가 배가 고파서 참을 수 없을 때",
    a1: { text: "빨리 만드는 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리할 때 조리 방법을 선택하다가 맛이 이상할 때",
    a1: { text: "다른 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피를 확인하고 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리할 때 조리 방법을 선택하다가 방법이 너무 어려울 때",
    a1: { text: "대충 간단한 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피를 다시 확인하고 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리할 때 조리 방법을 선택하다가 방법이 너무 복잡할 때",
    a1: { text: "대충 간단하게 만든다", tags: ["E", "P"] },
    a2: { text: "레시피대로 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리할 때 조리 방법을 선택하다가 방법이 예상과 다를 때",
    a1: { text: "다른 방법으로 바꾼다", tags: ["P", "N"] },
    a2: { text: "레시피대로 만든다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "요리할 때 조리 방법을 선택하다가 방법이 비쌀 때",
    a1: { text: "대체 방법을 찾는다", tags: ["E", "F"] },
    a2: { text: "레시피대로 구매한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리할 때 조리 방법을 선택하다가 방법이 너무 오래 걸릴 때",
    a1: { text: "빨리 만드는 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리할 때 조리 방법을 선택하다가 방법이 맛이 식어갈 때",
    a1: { text: "빨리 만드는 방법으로 바꾼다", tags: ["E", "P"] },
    a2: { text: "레시피대로 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingMethodTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-method",
    questions,
    resultPath: "/tests/cooking-method/test/result",
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
      colorClasses={getQuizColorScheme("orange-red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
