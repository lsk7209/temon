"use client"

/**
 * Component: RestaurantChoiceTest
 * 식당 선택 테스트 페이지
 * @example <RestaurantChoiceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식사를 하려고 할 때 식당을 선택할 때",
    a1: { text: "미리 정하고 계획적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "식당을 선택할 때 선택 기준을 정할 때",
    a1: { text: "리뷰와 정보를 분석해서 선택한다", tags: ["T"] },
    a2: { text: "느낌과 직감으로 선택한다", tags: ["F"] },
  },
  {
    id: 3,
    q: "식당에 도착해서 메뉴를 선택할 때",
    a1: { text: "익숙한 메뉴나 기본 메뉴를 선택한다", tags: ["S"] },
    a2: { text: "새로운 메뉴나 특별한 메뉴를 선택한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "식당을 선택할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 선택한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 선택한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "식당을 선택할 때 친구가 와서 '나도 같이 가고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 간다", tags: ["E"] },
    a2: { text: "혼자 조용히 간다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그 식당을 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 분위기 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "식당을 찾을 때",
    a1: { text: "검색해서 정보를 수집한다", tags: ["J"] },
    a2: { text: "둘러보면서 탐색한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "식당을 선택하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "식당을 선택할 때 기준을 정할 때",
    a1: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "식당에 가기 전에 메뉴를 선택할 때",
    a1: { text: "미리 생각하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "식당에서 식사를 마치고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 리뷰를 쓴다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식당을 선택할 때 선택 기준을 생각할 때",
    a1: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
  },
]

export default function RestaurantChoiceTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-choice",
    questions,
    resultPath: "/tests/restaurant-choice/test/result",
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

