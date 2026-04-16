"use client"

/**
 * Component: CookingExperimentTest
 * 요리 실험 테스트 페이지
 * @example <CookingExperimentTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리 실험하다가 재료를 이상하게 조합했을 때",
    a1: { text: "기대하며 계속 만든다", tags: ["E", "N"] },
    a2: { text: "레시피를 확인하고 수정한다", tags: ["I", "S"] },
  },
  {
    id: 2,
    q: "요리 실험하다가 맛이 이상하게 나왔을 때",
    a1: { text: "재미있어서 계속 실험한다", tags: ["E", "P"] },
    a2: { text: "레시피를 확인하고 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "요리 실험하다가 친구가 와서 맛보자고 할 때",
    a1: { text: "즉시 맛보게 해주고 피드백을 받는다", tags: ["E", "F"] },
    a2: { text: "실험이 완성될 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리 실험하다가 실수로 망쳤을 때",
    a1: { text: "다시 처음부터 실험한다", tags: ["E", "F"] },
    a2: { text: "레시피를 확인하고 수정한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리 실험하다가 재료가 없을 때",
    a1: { text: "대체 재료로 계속 실험한다", tags: ["P", "N"] },
    a2: { text: "재료를 구매하거나 레시피를 확인한다", tags: ["J", "S"] },
  },
  {
    id: 6,
    q: "요리 실험하다가 시간이 부족할 때",
    a1: { text: "빨리 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리 실험하다가 배가 고파서 참을 수 없을 때",
    a1: { text: "빨리 만들어서 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리 실험하다가 실험이 너무 복잡해질 때",
    a1: { text: "계속 더 실험한다", tags: ["E", "P"] },
    a2: { text: "간단하게 정리한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리 실험하다가 실험이 예상과 다를 때",
    a1: { text: "재미있어서 계속 실험한다", tags: ["P", "N"] },
    a2: { text: "레시피를 확인하고 정확히 만든다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "요리 실험하다가 재료가 비쌀 때",
    a1: { text: "예쁘게 보이면 구매한다", tags: ["E", "F"] },
    a2: { text: "대체 재료를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리 실험하다가 실험이 너무 오래 걸릴 때",
    a1: { text: "빨리 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피대로 시간을 지킨다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리 실험하다가 음식이 식어갈 때",
    a1: { text: "빨리 만들어서 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingExperimentTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-experiment",
    questions,
    resultPath: "/tests/cooking-experiment/test/result",
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
      colorClasses={getQuizColorScheme("yellow-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

