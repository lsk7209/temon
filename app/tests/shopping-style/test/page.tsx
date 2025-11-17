"use client"

/**
 * Component: ShoppingStyleTest
 * 쇼핑 스타일 테스트 페이지
 * @example <ShoppingStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "세일 문구를 보면?",
    a1: { text: "일단 클릭!", tags: ["P"] },
    a2: { text: "계획에 없으면 패스", tags: ["J"] },
  },
  {
    id: 2,
    q: "쇼핑할 때 우선순위는?",
    a1: { text: "품질, 후기", tags: ["S"] },
    a2: { text: "디자인, 감성", tags: ["N"] },
  },
  {
    id: 3,
    q: "구매 전 고민 시간은?",
    a1: { text: "충분히 비교 후 결정", tags: ["J"] },
    a2: { text: "느낌 오면 바로 구매", tags: ["P"] },
  },
  {
    id: 4,
    q: "장바구니에 물건을 담을 때",
    a1: { text: "전부 계산해본다", tags: ["T"] },
    a2: { text: "그냥 담고 기분 봐서 결정", tags: ["F"] },
  },
  {
    id: 5,
    q: "친구가 \"이거 어때?\" 물을 때",
    a1: { text: "냉정하게 판단", tags: ["T"] },
    a2: { text: "\"너랑 잘 어울려!\"", tags: ["F"] },
  },
  {
    id: 6,
    q: "브랜드 고를 때",
    a1: { text: "신뢰도 중요", tags: ["S"] },
    a2: { text: "새로운 브랜드 도전", tags: ["N"] },
  },
  {
    id: 7,
    q: "쇼핑몰 추천 상품을 보면",
    a1: { text: "참고만 함", tags: ["I"] },
    a2: { text: "설레서 클릭", tags: ["E"] },
  },
  {
    id: 8,
    q: "할인 알림이 올 때",
    a1: { text: "무시하거나 저장", tags: ["I"] },
    a2: { text: "바로 들어가봄", tags: ["E"] },
  },
  {
    id: 9,
    q: "온라인 쇼핑 후 만족도는?",
    a1: { text: "예측한 그대로", tags: ["J"] },
    a2: { text: "예상 밖 발견이 즐거움", tags: ["P"] },
  },
  {
    id: 10,
    q: "옷장 정리할 때",
    a1: { text: "주기적으로 정리", tags: ["S"] },
    a2: { text: "입고 싶은 것만 남김", tags: ["N"] },
  },
  {
    id: 11,
    q: "반품 사유가 생기면",
    a1: { text: "절차대로 바로 진행", tags: ["T"] },
    a2: { text: "귀찮아서 그냥 둠", tags: ["F"] },
  },
  {
    id: 12,
    q: "결제 직전의 나",
    a1: { text: "할인·적립 계산 중", tags: ["J"] },
    a2: { text: "'몰라 그냥 사자!'", tags: ["P"] },
  },
]

export default function ShoppingStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "shopping-style",
    questions,
    resultPath: "/tests/shopping-style/test/result",
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

