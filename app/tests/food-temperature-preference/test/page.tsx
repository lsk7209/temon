"use client"

/**
 * Component: FoodTemperaturePreferenceTest
 * 음식 온도 선호도 테스트 페이지
 * @example <FoodTemperaturePreferenceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "식당에서 메뉴를 고르다가 '뜨거운 음식'과 '차가운 음식' 중 선택할 때",
    a1: { text: "뜨거운 음식을 선택한다", tags: ["E", "P"] },
    a2: { text: "차가운 음식을 선택한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "음식을 주문할 때 온도를 고를 때",
    a1: { text: "뜨거운 온도를 선택한다", tags: ["E", "P"] },
    a2: { text: "차가운 온도를 선택한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "음식을 먹을 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "음식을 먹다가 온도가 예상과 다를 때",
    a1: { text: "새로운 경험이라 생각하고 즐긴다", tags: ["E", "F"] },
    a2: { text: "온도를 조절해서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "음식을 먹다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 먹으려고 시도한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식당에서 새로운 온도의 음식을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "음식을 먹다가 온도가 마음에 안 들 때",
    a1: { text: "그래도 먹어본다", tags: ["E", "F"] },
    a2: { text: "온도를 조절해서 먹는다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "음식을 선택할 때 온도 조합을 고를 때",
    a1: { text: "다양한 온도를 조합한다", tags: ["E", "F"] },
    a2: { text: "통일된 온도를 선택한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "음식을 먹다가 온도가 완벽할 때",
    a1: { text: "즉시 사진을 찍어서 공유한다", tags: ["E", "F"] },
    a2: { text: "조용히 감상한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "음식을 먹다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 먹는다", tags: ["E", "F"] },
    a2: { text: "식사가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식당에서 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 온도를 선택하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 온도를 선택한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "음식을 선택할 때 시간이 부족할 때",
    a1: { text: "빨리 온도를 선택하고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 온도를 선택한다", tags: ["I", "J"] },
  },
]

export default function FoodTemperaturePreferenceTest() {
  const quizLogic = useQuizLogic({
    testId: "food-temperature-preference",
    questions,
    resultPath: "/tests/food-temperature-preference/test/result",
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
