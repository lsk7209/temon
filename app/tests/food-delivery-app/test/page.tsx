"use client"

/**
 * Component: FoodDeliveryAppTest
 * 배달 앱 테스트 페이지
 * @example <FoodDeliveryAppTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "배달 앱을 켤 때",
    a1: { text: "먼저 카테고리부터 정한다", tags: ["J", "S"] },
    a2: { text: "추천 메뉴부터 본다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "배달 앱에서 메뉴를 고를 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인한다", tags: ["T", "S"] },
    a2: { text: "사진과 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "배달 앱 사용 빈도",
    a1: { text: "정기적으로 같은 시간에 주문한다", tags: ["J", "S"] },
    a2: { text: "필요할 때마다 즉흥적으로 주문한다", tags: ["P", "N"] },
  },
  {
    id: 4,
    q: "배달 앱에서 할인 쿠폰을 발견했을 때",
    a1: { text: "쿠폰을 확인하고 계획적으로 사용한다", tags: ["J", "T"] },
    a2: { text: "즉시 사용하거나 나중에 사용한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "배달 앱으로 함께 주문할 때",
    a1: { text: "다른 사람과 함께 메뉴를 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 주문하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "배달 앱에서 새로운 가게를 발견했을 때",
    a1: { text: "리뷰를 확인하고 신중하게 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 가게를 바로 시도해본다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "배달 앱에서 주문을 취소하고 싶을 때",
    a1: { text: "바로 취소하고 다시 주문한다", tags: ["P", "E"] },
    a2: { text: "취소하기 부담스러워서 그냥 받는다", tags: ["J", "I"] },
  },
  {
    id: 8,
    q: "배달 앱에서 배달 시간을 선택할 때",
    a1: { text: "정확한 시간에 맞춰 주문한다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 생각한다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "배달 앱에서 리뷰를 남길 때",
    a1: { text: "상세하게 리뷰를 작성한다", tags: ["S", "J"] },
    a2: { text: "간단하게만 작성하거나 작성하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "배달 앱에서 배달이 늦었을 때",
    a1: { text: "고객센터에 문의하고 해결을 요청한다", tags: ["T", "E"] },
    a2: { text: "그냥 기다리고 다음엔 다른 앱을 사용한다", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "배달 앱 사용 후",
    a1: { text: "배달 추적을 확인하고 기다린다", tags: ["J", "S"] },
    a2: { text: "다른 일을 하다가 도착하면 받는다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "배달 앱 사용 스타일",
    a1: { text: "계획적이고 체계적으로 사용한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 사용한다", tags: ["P", "F"] },
  },
]

export default function FoodDeliveryAppTest() {
  const quizLogic = useQuizLogic({
    testId: "food-delivery-app",
    questions,
    resultPath: "/tests/food-delivery-app/test/result",
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
