"use client"

/**
 * Component: RestaurantAmbianceTest
 * 식당 분위기 테스트 페이지
 * @example <RestaurantAmbianceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "조명이 어둡고 로맨틱한 분위기일 때",
    a1: { text: "분위기 좋아서 좋다", tags: ["F", "N"] },
    a2: { text: "너무 어두워서 불편하다", tags: ["T", "S"] },
  },
  {
    id: 2,
    q: "음악이 크게 나오는 식당일 때",
    a1: { text: "활기찬 분위기라 좋다", tags: ["E", "P"] },
    a2: { text: "시끄러워서 집중이 안 된다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "인테리어가 화려하고 독특한 식당일 때",
    a1: { text: "새롭고 재미있어서 좋다", tags: ["N", "P"] },
    a2: { text: "과해서 불편하다", tags: ["S", "J"] },
  },
  {
    id: 4,
    q: "조용하고 차분한 분위기의 식당일 때",
    a1: { text: "편안하고 좋다", tags: ["I", "J"] },
    a2: { text: "너무 조용해서 답답하다", tags: ["E", "P"] },
  },
  {
    id: 5,
    q: "사람들이 많아서 북적이는 식당일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄럽고 불편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "창가 자리와 안쪽 자리 중 선택할 때",
    a1: { text: "밖이 보이는 창가 자리를 선호한다", tags: ["N", "E"] },
    a2: { text: "조용한 안쪽 자리를 선호한다", tags: ["S", "I"] },
  },
  {
    id: 7,
    q: "테이블 간격이 좁아서 옆 테이블이 들릴 때",
    a1: { text: "불편하지만 참는다", tags: ["F", "I"] },
    a2: { text: "바로 다른 자리로 옮긴다", tags: ["T", "E"] },
  },
  {
    id: 8,
    q: "분위기가 익숙한 식당과 새로운 식당 중 선택할 때",
    a1: { text: "새로운 분위기를 경험하고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 분위기가 편하다", tags: ["S", "J"] },
  },
  {
    id: 9,
    q: "야외 테라스와 실내 중 선택할 때",
    a1: { text: "야외 분위기가 좋아서 선호한다", tags: ["E", "N"] },
    a2: { text: "실내가 편하고 안정적이다", tags: ["I", "S"] },
  },
  {
    id: 10,
    q: "분위기가 예상과 다를 때",
    a1: { text: "그냥 받아들이고 즐긴다", tags: ["P", "F"] },
    a2: { text: "불만스럽고 다른 곳을 찾는다", tags: ["J", "T"] },
  },
  {
    id: 11,
    q: "친구들과 함께 갈 때 분위기 선택",
    a1: { text: "친구들이 좋아하는 분위기를 고려한다", tags: ["E", "F"] },
    a2: { text: "내가 선호하는 분위기를 선택한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "분위기가 완벽한 식당을 찾았을 때",
    a1: { text: "자주 가는 단골 식당이 된다", tags: ["S", "J"] },
    a2: { text: "다음엔 또 다른 곳을 시도한다", tags: ["N", "P"] },
  },
]

export default function RestaurantAmbianceTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-ambiance",
    questions,
    resultPath: "/tests/restaurant-ambiance/test/result",
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
