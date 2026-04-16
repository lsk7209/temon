"use client"

/**
 * Component: FoodDeliveryTest
 * 배달 음식 테스트 페이지
 * @example <FoodDeliveryTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "배달 앱을 켤 때",
    a1: { text: "먼저 카테고리부터 정함", tags: ["J"] },
    a2: { text: "추천 메뉴부터 봄", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식 고를 때",
    a1: { text: "익숙한 메뉴 위주", tags: ["S"] },
    a2: { text: "새롭고 특이한 메뉴 도전", tags: ["N"] },
  },
  {
    id: 3,
    q: "리뷰를 볼 때",
    a1: { text: "별점·사진 꼼꼼히 확인", tags: ["T"] },
    a2: { text: "평점보다 감정 리뷰 중심", tags: ["F"] },
  },
  {
    id: 4,
    q: "친구와 함께 주문 시",
    a1: { text: "다수 의견에 맞춤", tags: ["E"] },
    a2: { text: "내가 먹고 싶은 거 주장", tags: ["I"] },
  },
  {
    id: 5,
    q: "메뉴 선택 속도",
    a1: { text: "빠르게 결정", tags: ["J"] },
    a2: { text: "한참 고민함", tags: ["P"] },
  },
  {
    id: 6,
    q: "배달비가 비쌀 때",
    a1: { text: "묶음 주문으로 조정", tags: ["T"] },
    a2: { text: "그냥 시켜! 맛이 중요", tags: ["F"] },
  },
  {
    id: 7,
    q: "같은 가게 주문 빈도",
    a1: { text: "단골 위주", tags: ["S"] },
    a2: { text: "매번 다른 곳 탐험", tags: ["N"] },
  },
  {
    id: 8,
    q: "음식 도착 후",
    a1: { text: "포장 먼저 정리", tags: ["J"] },
    a2: { text: "바로 먹는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "맛이 별로일 때",
    a1: { text: "리뷰에 피드백 남김", tags: ["T"] },
    a2: { text: "'다음엔 안 시키지 뭐'로 끝", tags: ["F"] },
  },
  {
    id: 10,
    q: "배달 기다리는 시간",
    a1: { text: "방송·영상으로 시간 채움", tags: ["E"] },
    a2: { text: "조용히 기다림", tags: ["I"] },
  },
  {
    id: 11,
    q: "할인 쿠폰이 있을 때",
    a1: { text: "전략적으로 조합", tags: ["J"] },
    a2: { text: "그냥 눌러서 적용", tags: ["P"] },
  },
  {
    id: 12,
    q: "마지막 한 입 남았을 때",
    a1: { text: "누가 먹을지 합리적으로 정함", tags: ["T"] },
    a2: { text: "그냥 분위기 따라 감", tags: ["F"] },
  },
]

export default function FoodDeliveryTest() {
  const quizLogic = useQuizLogic({
    testId: "food-delivery",
    questions,
    resultPath: "/tests/food-delivery/test/result",
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
