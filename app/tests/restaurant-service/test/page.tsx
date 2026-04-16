"use client"

/**
 * Component: RestaurantServiceTest
 * 식당 서비스 테스트 페이지
 * @example <RestaurantServiceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "웨이터가 친절하게 맞이해줄 때",
    a1: { text: "기분이 좋아지고 만족감이 높아진다", tags: ["F"] },
    a2: { text: "당연한 서비스로 생각하고 크게 신경 쓰지 않는다", tags: ["T"] },
  },
  {
    id: 2,
    q: "서비스 속도가 빠를 때",
    a1: { text: "효율적이라고 생각하고 좋아한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기고 싶어서 아쉽다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "추가 서비스(물, 수저, 냅킨 등)를 먼저 제공할 때",
    a1: { text: "신경 쓰는 서비스라고 느껴서 좋다", tags: ["F", "S"] },
    a2: { text: "필요할 때 요청하는 게 더 효율적이다", tags: ["T", "N"] },
  },
  {
    id: 4,
    q: "웨이터가 메뉴를 추천해줄 때",
    a1: { text: "추천을 듣고 결정하는 게 편하다", tags: ["E", "P"] },
    a2: { text: "미리 정한 메뉴가 있어서 거절한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "서비스 불만이 있을 때",
    a1: { text: "직접 말해서 해결하려고 한다", tags: ["E", "T"] },
    a2: { text: "참고 다음엔 안 가려고 한다", tags: ["I", "F"] },
  },
  {
    id: 6,
    q: "웨이터가 대화를 시도할 때",
    a1: { text: "즐겁게 대화하며 분위기를 좋게 만든다", tags: ["E", "F"] },
    a2: { text: "최소한의 대화만 하고 조용히 식사한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "서비스가 느릴 때",
    a1: { text: "기다리는 동안 다른 일을 하거나 계획을 세운다", tags: ["J", "N"] },
    a2: { text: "그냥 기다리며 주변을 관찰한다", tags: ["P", "S"] },
  },
  {
    id: 8,
    q: "웨이터가 실수했을 때",
    a1: { text: "바로 지적하고 정정을 요청한다", tags: ["T", "J"] },
    a2: { text: "상황을 이해하고 너그럽게 넘어간다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "서비스가 과도하게 친절할 때",
    a1: { text: "부담스럽지만 예의상 받아준다", tags: ["F", "E"] },
    a2: { text: "불편해서 거절하거나 다른 곳을 찾는다", tags: ["T", "I"] },
  },
  {
    id: 10,
    q: "웨이터가 주문을 확인해줄 때",
    a1: { text: "확인해주는 게 안심이 되어 좋다", tags: ["S", "J"] },
    a2: { text: "불필요하다고 생각하고 스킵한다", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "서비스 품질이 일관되지 않을 때",
    a1: { text: "과거 경험을 바탕으로 예측 가능한 곳을 선호한다", tags: ["S", "J"] },
    a2: { text: "매번 다른 경험을 시도하는 게 재미있다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "웨이터가 특별 서비스를 제공할 때",
    a1: { text: "즐겁게 받고 감사 인사를 한다", tags: ["E", "F"] },
    a2: { text: "필요 없으면 거절하고 원하는 것만 요청한다", tags: ["I", "T"] },
  },
]

export default function RestaurantServiceTest() {
  const quizLogic = useQuizLogic({
    testId: "restaurant-service",
    questions,
    resultPath: "/tests/restaurant-service/test/result",
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
      colorClasses={getQuizColorScheme("emerald-teal")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
