"use client"

/**
 * Component: CookingGarnishingTest
 * 요리 장식 테스트 페이지
 * @example <CookingGarnishingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리한 음식에 장식을 하려는데 재료가 없을 때",
    a1: { text: "다른 재료로 대체해서 만든다", tags: ["P", "N"] },
    a2: { text: "그냥 장식 없이 먹는다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "요리한 음식에 장식을 하려는데 시간이 없을 때",
    a1: { text: "빨리 간단하게 장식한다", tags: ["E", "P"] },
    a2: { text: "장식 없이 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "요리한 음식에 장식을 하려는데 맛이 없을 때",
    a1: { text: "예쁘게 장식해서 맛을 보완한다", tags: ["E", "F"] },
    a2: { text: "맛을 개선하는 게 우선이다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리한 음식에 장식을 하려는데 친구가 와서 먹자고 할 때",
    a1: { text: "빨리 장식하고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "장식이 끝날 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리한 음식에 장식을 하려는데 장식이 예쁘지 않게 나왔을 때",
    a1: { text: "다시 예쁘게 만든다", tags: ["J", "F"] },
    a2: { text: "그냥 먹는다", tags: ["P", "T"] },
  },
  {
    id: 6,
    q: "요리한 음식에 장식을 하려는데 배가 고파질 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리한 음식에 장식을 하려는데 장식이 너무 많아질 때",
    a1: { text: "계속 더 추가한다", tags: ["E", "P"] },
    a2: { text: "적당히 멈춘다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리한 음식에 장식을 하려는데 장식이 맛과 안 맞을 때",
    a1: { text: "예쁘게 보이면 그대로 둔다", tags: ["E", "F"] },
    a2: { text: "맛에 맞게 바꾼다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리한 음식에 장식을 하려는데 장식 재료가 비쌀 때",
    a1: { text: "예쁘게 보이면 구매한다", tags: ["E", "F"] },
    a2: { text: "대체 재료를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "요리한 음식에 장식을 하려는데 장식이 맛을 해칠 때",
    a1: { text: "예쁘게 보이면 그대로 둔다", tags: ["E", "F"] },
    a2: { text: "맛을 위해 제거한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리한 음식에 장식을 하려는데 장식이 너무 복잡해질 때",
    a1: { text: "계속 더 추가한다", tags: ["E", "P"] },
    a2: { text: "간단하게 정리한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리한 음식에 장식을 하려는데 장식이 맛이 식어갈 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingGarnishingTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-garnishing",
    questions,
    resultPath: "/tests/cooking-garnishing/test/result",
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
