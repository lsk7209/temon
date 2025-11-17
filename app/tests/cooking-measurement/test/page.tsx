"use client"

/**
 * Component: CookingMeasurementTest
 * 요리 계량 테스트 페이지
 * @example <CookingMeasurementTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리할 때 레시피에 '밀가루 200g'이라고 했는데 계량컵이 없을 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["P", "N"] },
    a2: { text: "계량컵을 찾거나 저울을 사용한다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "요리할 때 계량하다가 실수로 '설탕 1컵'을 '소금 1컵'으로 잘못 측정했을 때",
    a1: { text: "당황해서 대충 조정한다", tags: ["E", "P"] },
    a2: { text: "침착하게 다시 정확히 측정한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "요리할 때 계량하다가 시간이 부족해서 배가 너무 고파질 때",
    a1: { text: "대충 눈대중으로 넣고 빨리 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리할 때 계량하는 중에 친구가 와서 '나도 먹고 싶어! 빨리 해줘!'라고 할 때",
    a1: { text: "빨리 계량하고 함께 만든다", tags: ["E", "F"] },
    a2: { text: "정확히 계량할 때까지 기다리라고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리할 때 계량하다가 레시피에 '달걀 3개'라고 했는데 냉장고에 1개만 있을 때",
    a1: { text: "대충 1개로 만든다", tags: ["E", "P"] },
    a2: { text: "달걀을 사러 가거나 레시피를 수정한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리할 때 계량대로 만들었는데 맛을 보니 완전히 이상할 때",
    a1: { text: "대충 조정해서 먹는다", tags: ["E", "P"] },
    a2: { text: "계량을 다시 확인하고 정확히 측정한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리할 때 계량하다가 계량컵을 떨어뜨려서 깨졌을 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["E", "P"] },
    a2: { text: "다른 계량 도구를 찾는다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리할 때 계량하다가 레시피를 잃어버려서 정확한 양을 모를 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 찾거나 인터넷에서 확인한다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "요리할 때 계량하다가 배가 너무 고파서 계량하는 시간이 아까울 때",
    a1: { text: "빨리 대충 계량하고 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "요리할 때 계량하다가 레시피에 '15가지 재료'를 정확히 계량해야 할 때",
    a1: { text: "대충 중요한 것만 계량한다", tags: ["E", "P"] },
    a2: { text: "모든 재료를 정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "요리할 때 계량하다가 계량이 너무 복잡해서 시간이 오래 걸릴 때",
    a1: { text: "빨리 대충 계량하고 끝낸다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리할 때 계량하는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 계량하고 바로 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량할 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingMeasurementTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-measurement",
    questions,
    resultPath: "/tests/cooking-measurement/test/result",
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
      colorClasses={getQuizColorScheme("teal-cyan")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
