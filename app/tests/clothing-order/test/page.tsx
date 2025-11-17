"use client"

/**
 * Component: ClothingOrderTest
 * 옷 입는 순서 테스트 페이지
 * @example <ClothingOrderTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 옷을 입을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 입는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 입는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "옷을 선택할 때 기준을 정할 때",
    a1: { text: "기본 옷이나 전통 옷을 선택한다", tags: ["S"] },
    a2: { text: "특별한 옷이나 새로운 옷을 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "옷을 입을 때 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 입는다", tags: ["F"] },
    a2: { text: "빠르게 실용적으로 입는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "옷을 조합할 때 조합 방식을 정할 때",
    a1: { text: "정돈된 조합으로 체계적으로 조합한다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 조합한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "옷을 입기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 입는다", tags: ["P"] },
  },
  {
    id: 6,
    q: "옷을 입고 나서 확인할 때",
    a1: { text: "확인하고 꼼꼼하게 체크한다", tags: ["F"] },
    a2: { text: "그냥 가고 실용적으로 처리한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "옷을 입을 때 친구가 와서 '나도 같이 입고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 입는다", tags: ["E"] },
    a2: { text: "혼자 조용히 입는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "친구가 '왜 그 옷을 골랐어?'라고 물어볼 때",
    a1: { text: "실용성과 효율 때문에 선택했다고 말한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택했다고 말한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "옷을 입기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 입는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "옷을 입고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 11,
    q: "옷을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "옷을 입고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function ClothingOrderTest() {
  const quizLogic = useQuizLogic({
    testId: "clothing-order",
    questions,
    resultPath: "/tests/clothing-order/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
