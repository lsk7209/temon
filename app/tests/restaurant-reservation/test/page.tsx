"use client"

/**
 * Component: RestaurantReservationTest
 * 식당 예약 테스트 페이지
 * @example <RestaurantReservationTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당 예약을 할 때",
    a1: { text: "일주일 전부터 미리 예약한다", tags: ["J", "S"] },
    a2: { text: "당일이나 하루 전에 예약한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "예약할 식당을 선택할 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인하고 선택한다", tags: ["T", "S"] },
    a2: { text: "사진과 분위기로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "예약 시간을 정할 때",
    a1: { text: "정확한 시간을 정하고 지킨다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 정하고 유연하게 조정한다", tags: ["P", "F"] },
  },
  {
    id: 4,
    q: "예약을 함께 할 때",
    a1: { text: "다른 사람과 함께 식당을 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 정하고 알려준다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "예약이 꽉 찼을 때",
    a1: { text: "다른 날짜나 시간을 찾아본다", tags: ["J", "T"] },
    a2: { text: "그냥 다른 식당을 찾는다", tags: ["P", "F"] },
  },
  {
    id: 6,
    q: "예약을 취소해야 할 때",
    a1: { text: "미리 취소하고 다른 계획을 세운다", tags: ["J", "T"] },
    a2: { text: "마지막 순간까지 기다리다 취소한다", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "예약한 식당이 예상과 다를 때",
    a1: { text: "예약을 취소하고 다른 곳을 찾는다", tags: ["T", "J"] },
    a2: { text: "그냥 가서 즐긴다", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "예약 없이 갈 수 있는 식당을 발견했을 때",
    a1: { text: "예약이 필요 없는 게 편하다", tags: ["P", "N"] },
    a2: { text: "예약이 있는 게 안정적이다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "예약 확인을 받을 때",
    a1: { text: "확인 메시지를 받아서 안심된다", tags: ["S", "J"] },
    a2: { text: "확인 없이도 괜찮다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "예약 시간에 늦을 것 같을 때",
    a1: { text: "미리 연락하고 시간을 조정한다", tags: ["J", "T"] },
    a2: { text: "그냥 가서 상황을 설명한다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "예약한 식당을 추천할 때",
    a1: { text: "친구들에게 적극적으로 추천한다", tags: ["E", "F"] },
    a2: { text: "물어보면 알려준다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "예약 스타일",
    a1: { text: "계획적이고 체계적으로 예약한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 유연하게 예약한다", tags: ["P", "F"] },
  },
]

export default function RestaurantReservationTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-reservation",
    questions,
    resultPath: "/tests/restaurant-reservation/test/result",
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
      colorClasses={getQuizColorScheme("red-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
