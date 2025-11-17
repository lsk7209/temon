"use client"

/**
 * Component: FoodTemperatureTest
 * 음식 온도 테스트 페이지
 * @example <FoodTemperatureTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 국물 음식을 주문할 때 '뜨거운 국물'과 '차가운 국물' 중 선택할 때",
    a1: { text: "뜨거운 국물을 선택한다", tags: ["F"] },
    a2: { text: "차가운 국물을 선택한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "카페에서 음료를 주문할 때 '뜨거운 음료'와 '차가운 음료' 중 선택할 때",
    a1: { text: "뜨거운 음료를 선택한다", tags: ["F"] },
    a2: { text: "차가운 음료를 선택한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "계절에 따라 음식 온도를 선택할 때",
    a1: { text: "계절에 따라 선택한다", tags: ["S"] },
    a2: { text: "계절과 무관하게 선호하는 온도를 선택한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "식사를 시작할 때 여러 온도의 음식이 있을 때",
    a1: { text: "뜨거운 것부터 먹는다", tags: ["J"] },
    a2: { text: "차가운 것부터 먹는다", tags: ["P"] },
  },
  {
    id: 5,
    q: "친구가 '왜 그 온도를 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 기분에 따라 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율에 따라 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "음식 온도가 예상과 다를 때",
    a1: { text: "즉시 바로 조정한다", tags: ["E"] },
    a2: { text: "천천히 여유롭게 조정한다", tags: ["I"] },
  },
  {
    id: 7,
    q: "음식 온도를 관리할 때",
    a1: { text: "계획적으로 온도를 유지한다", tags: ["J"] },
    a2: { text: "자연스럽게 온도가 변화하도록 둔다", tags: ["P"] },
  },
  {
    id: 8,
    q: "음식 온도 선호를 친구에게 공유하고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 9,
    q: "음식 온도를 선택할 때 기준을 정할 때",
    a1: { text: "익숙한 온도를 선택한다", tags: ["S"] },
    a2: { text: "새로운 온도를 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "음식 온도가 예상과 다르게 변화했을 때",
    a1: { text: "즉시 대응해서 조정한다", tags: ["J"] },
    a2: { text: "유연하게 대응한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "음식 온도를 선호하는 이유를 생각할 때",
    a1: { text: "감성적인 이유로 선호한다", tags: ["F"] },
    a2: { text: "논리적인 이유로 선호한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "음식 온도 경험을 친구에게 공유하고 싶을 때",
    a1: { text: "즐겁게 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function FoodTemperatureTest() {
  const quizLogic = useQuizLogic({
    testId: "food-temperature",
    questions,
    resultPath: "/tests/food-temperature/test/result",
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
