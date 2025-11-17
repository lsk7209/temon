"use client"

/**
 * Component: OnlineFoodTest
 * 온라인 주문 테스트 페이지
 * @example <OnlineFoodTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "온라인으로 음식을 주문할 때",
    a1: { text: "미리 생각한 메뉴를 바로 주문한다", tags: ["J", "S"] },
    a2: { text: "사이트를 보면서 새로 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "온라인 주문 사이트를 선택할 때",
    a1: { text: "항상 사용하던 사이트를 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 사이트도 시도해본다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "온라인 주문 메뉴를 고를 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인한다", tags: ["T", "S"] },
    a2: { text: "사진과 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "온라인 주문 옵션을 선택할 때",
    a1: { text: "필요한 옵션만 정확히 선택한다", tags: ["T", "J"] },
    a2: { text: "대략적으로 선택하거나 기본값을 사용한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "온라인 주문을 함께 할 때",
    a1: { text: "다른 사람과 함께 메뉴를 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 주문하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "온라인 주문 배송 시간",
    a1: { text: "정확한 시간에 맞춰 주문한다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 생각하고 주문한다", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "온라인 주문 후 변경하고 싶을 때",
    a1: { text: "바로 취소하고 다시 주문한다", tags: ["P", "E"] },
    a2: { text: "그냥 받고 다음에 주문한다", tags: ["J", "I"] },
  },
  {
    id: 8,
    q: "온라인 주문 쿠폰을 사용할 때",
    a1: { text: "쿠폰을 미리 확인하고 사용한다", tags: ["S", "J"] },
    a2: { text: "주문하다가 발견하면 사용한다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "온라인 주문 리뷰를 남길 때",
    a1: { text: "상세하게 리뷰를 작성한다", tags: ["S", "J"] },
    a2: { text: "간단하게만 작성하거나 작성하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "온라인 주문이 늦게 도착했을 때",
    a1: { text: "불만을 표현하고 해결을 요청한다", tags: ["T", "E"] },
    a2: { text: "그냥 받고 다음엔 다른 곳을 주문한다", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "온라인 주문 후",
    a1: { text: "배송 추적을 확인하고 기다린다", tags: ["J", "S"] },
    a2: { text: "다른 일을 하다가 도착하면 받는다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "온라인 주문 스타일",
    a1: { text: "계획적이고 체계적으로 주문한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 주문한다", tags: ["P", "F"] },
  },
]

export default function OnlineFoodTest() {
  const quizLogic = useQuizLogic({
    testId: "online-food",
    questions,
    resultPath: "/tests/online-food/test/result",
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
      colorClasses={getQuizColorScheme("blue-indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
