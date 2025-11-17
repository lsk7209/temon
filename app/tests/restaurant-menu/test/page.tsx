"use client"

/**
 * Component: RestaurantMenuTest
 * 식당 메뉴 테스트 페이지
 * @example <RestaurantMenuTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "메뉴판을 받았을 때",
    a1: { text: "미리 생각한 메뉴를 바로 주문한다", tags: ["J", "S"] },
    a2: { text: "메뉴판을 보면서 새로 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "웨이터가 추천 메뉴를 제안할 때",
    a1: { text: "추천을 듣고 결정하는 게 편하다", tags: ["E", "P"] },
    a2: { text: "이미 정한 메뉴가 있어서 거절한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "메뉴 선택 기준",
    a1: { text: "리뷰와 평점을 보고 선택한다", tags: ["T", "S"] },
    a2: { text: "보고 싶은 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "단골 메뉴가 있을 때",
    a1: { text: "항상 같은 메뉴를 주문한다", tags: ["S", "J"] },
    a2: { text: "매번 다른 메뉴를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "친구들과 함께 메뉴를 선택할 때",
    a1: { text: "다른 사람 의견을 듣고 함께 결정한다", tags: ["E", "F"] },
    a2: { text: "내가 먹고 싶은 메뉴를 선택한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "신메뉴가 나왔을 때",
    a1: { text: "새로운 메뉴를 시도해보고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 메뉴가 더 안전하다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "메뉴 가격을 볼 때",
    a1: { text: "가격을 고려해서 선택한다", tags: ["T", "J"] },
    a2: { text: "가격보다 맛과 분위기가 중요하다", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "메뉴 설명이 복잡할 때",
    a1: { text: "설명을 꼼꼼히 읽고 이해한다", tags: ["S", "J"] },
    a2: { text: "대략적으로만 보고 선택한다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "메뉴를 고르는 시간",
    a1: { text: "빠르게 결정한다", tags: ["J", "T"] },
    a2: { text: "한참 고민한다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "메뉴가 마음에 안 들 때",
    a1: { text: "다른 메뉴로 변경한다", tags: ["P", "E"] },
    a2: { text: "그냥 선택한 메뉴를 주문한다", tags: ["J", "I"] },
  },
  {
    id: 11,
    q: "메뉴 선택 후",
    a1: { text: "다른 사람이 뭘 시키는지 궁금하다", tags: ["E", "F"] },
    a2: { text: "내 메뉴에만 집중한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "메뉴를 선택하는 스타일",
    a1: { text: "계획적이고 체계적으로 선택한다", tags: ["J", "S"] },
    a2: { text: "즉흥적이고 감성적으로 선택한다", tags: ["P", "N"] },
  },
]

export default function RestaurantMenuTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-menu",
    questions,
    resultPath: "/tests/restaurant-menu/test/result",
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
      colorClasses={getQuizColorScheme("violet-purple-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
