"use client"

/**
 * Component: BagOrganizingTest
 * 가방 정리 테스트 페이지
 * @example <BagOrganizingTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "가방에서 필요한 물건을 찾을 수 없을 때",
    a1: { text: "당황해서 가방을 다 뒤진다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리된 위치를 확인한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "가방이 너무 무거워서 어깨가 아플 때",
    a1: { text: "당장 정리하고 싶어서 바로 시작한다", tags: ["E", "J"] },
    a2: { text: "나중에 정리하고 일단 참는다", tags: ["I", "P"] },
  },
  {
    id: 3,
    q: "가방 정리하다가 깜빡 잊고 넣은 물건을 발견했을 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 정리하고 끝낸다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "가방 정리하다가 버릴까 말까 고민될 때",
    a1: { text: "감정적으로 보관한다", tags: ["F", "N"] },
    a2: { text: "실용적으로 버린다", tags: ["T", "S"] },
  },
  {
    id: 5,
    q: "가방 정리하다가 친구가 와서 나가자고 할 때",
    a1: { text: "정리를 멈추고 나간다", tags: ["E", "P"] },
    a2: { text: "정리를 끝내고 나간다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "가방 정리하다가 시간이 너무 오래 걸릴 때",
    a1: { text: "대충 빠르게 끝낸다", tags: ["E", "P"] },
    a2: { text: "꼼꼼하게 끝까지 한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "가방 정리하다가 예전에 잃어버린 물건을 발견했을 때",
    a1: { text: "기뻐서 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "조용히 보관한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "가방 정리하다가 정리가 끝났는데 또 넣을 게 생겼을 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "가방 정리하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 정리를 멈춘다", tags: ["E", "F"] },
    a2: { text: "정리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "가방 정리하다가 너무 피곤해서 정리가 싫을 때",
    a1: { text: "대충 끝내고 쉰다", tags: ["E", "P"] },
    a2: { text: "끝까지 정리하고 쉰다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "가방 정리하다가 정리한 게 또 어지러워질 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 다시 정리한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "가방 정리하다가 정리한 물건을 또 찾을 수 없을 때",
    a1: { text: "당황해서 가방을 다시 뒤진다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리된 위치를 확인한다", tags: ["I", "J"] },
  },
]

export default function BagOrganizingTest() {
  const quizLogic = useQuizLogic({
    testId: "bag-organizing",
    questions,
    resultPath: "/tests/bag-organizing/test/result",
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
      colorClasses={getQuizColorScheme("amber-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
