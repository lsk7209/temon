"use client"

/**
 * Component: PhonePaymentTest
 * 폰 결제 습관 테스트 페이지
 * @example <PhonePaymentTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에서 결제할 때",
    a1: { text: "즉시 결제 수단을 선택한다", tags: ["E", "J"] },
    a2: { text: "신중하게 선택한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "결제 오류가 났을 때",
    a1: { text: "빠르게 다시 시도한다", tags: ["J", "T"] },
    a2: { text: "신중하게 확인한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "친구들과 함께 결제할 때",
    a1: { text: "혼자 조용히 결제한다", tags: ["I", "S"] },
    a2: { text: "함께 이야기하며 결제한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "결제를 하는 시간",
    a1: { text: "정해진 시간에 결제한다", tags: ["J", "S"] },
    a2: { text: "그때그때 결제한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "결제 수단을 선택할 때",
    a1: { text: "목표에 맞게 선택한다", tags: ["T", "J"] },
    a2: { text: "기분에 맞게 선택한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "여러 결제 수단이 있을 때",
    a1: { text: "효율적으로 빠르게 선택한다", tags: ["T", "J"] },
    a2: { text: "하나씩 재미있게 비교한다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "중요한 결제를 할 때",
    a1: { text: "체계적으로 빠르게 결제한다", tags: ["J", "T"] },
    a2: { text: "하나씩 신중하게 결제한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 결제 앱을 사용할 때",
    a1: { text: "리뷰를 보고 신중하게 시도한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "결제 금액을 확인할 때",
    a1: { text: "정해진 방식만 확인한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 확인 방식이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "결제를 한 후",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "결제를 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "만족할 때까지 확인한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "결제를 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function PhonePaymentTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-payment",
    questions,
    resultPath: "/tests/phone-payment/test/result",
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}


