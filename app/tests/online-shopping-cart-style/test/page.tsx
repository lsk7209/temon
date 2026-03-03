"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "장바구니에 상품을 담는 이유는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "위시리스트와 장바구니의 차이는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "할인 알림이 오면 반응은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "결제 전 비교하는 항목 1순위는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "무료배송 기준을 맞출 때 행동은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "충동구매를 막는 나만의 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "리뷰를 읽는 깊이는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "재구매 상품 관리 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "반품 가능성이 있으면?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "결제 타이밍을 정하는 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "동행 쇼핑 제안 시 반응은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "이상적인 온라인 쇼핑 경험은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  }
]

export default function OnlineShoppingCartStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "online-shopping-cart-style",
    questions,
    resultPath: "/tests/online-shopping-cart-style/test/result",
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
      colorClasses={getQuizColorScheme("red-orange-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
