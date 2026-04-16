"use client"

/**
 * Component: FoodLabelTest
 * 음식 라벨 테스트 페이지
 * @example <FoodLabelTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "마트에서 식품을 고를 때 라벨을 확인할 때",
    a1: { text: "항상 꼼꼼히 라벨을 확인한다", tags: ["J"] },
    a2: { text: "필요할 때만 라벨을 확인한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "식품 라벨을 확인할 때 어떤 정보를 확인할지 고민될 때",
    a1: { text: "전체 정보를 모두 확인한다", tags: ["S"] },
    a2: { text: "핵심 정보만 확인한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "식품 라벨을 읽을 때",
    a1: { text: "자세히 꼼꼼히 읽는다", tags: ["I"] },
    a2: { text: "빠르게 스캔한다", tags: ["E"] },
  },
  {
    id: 4,
    q: "친구가 '왜 라벨을 확인해?'라고 물어볼 때",
    a1: { text: "건강과 영양 정보를 확인하기 위해서라고 말한다", tags: ["F"] },
    a2: { text: "유통기한과 가격을 확인하기 위해서라고 말한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "식품 라벨을 확인할 때 시간이 부족할 때",
    a1: { text: "충분히 시간을 들여서 확인한다", tags: ["I"] },
    a2: { text: "빠르게 확인하고 결정한다", tags: ["E"] },
  },
  {
    id: 6,
    q: "식품 라벨을 확인하고 나서 구매를 결정할 때",
    a1: { text: "신중하게 고민한 후 결정한다", tags: ["J"] },
    a2: { text: "즉시 결정하고 구매한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "식품 라벨의 성분표를 확인할 때",
    a1: { text: "모든 성분을 하나하나 확인한다", tags: ["S"] },
    a2: { text: "주요 성분만 확인한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "식품 라벨 정보를 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 다른 사람과 정보를 공유한다", tags: ["E"] },
    a2: { text: "혼자만 확인하고 결정한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "식품 라벨 정보를 활용해서 선택할 때",
    a1: { text: "실제 정보에 기반해서 선택한다", tags: ["T"] },
    a2: { text: "감성과 직감에 따라 선택한다", tags: ["F"] },
  },
  {
    id: 10,
    q: "식품 라벨을 확인하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 확인한다", tags: ["J"] },
    a2: { text: "그때그때 확인한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "식품 라벨 정보를 신뢰할 때",
    a1: { text: "라벨 정보를 신뢰한다", tags: ["S"] },
    a2: { text: "추가로 검증이 필요하다고 생각한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "식품 라벨을 확인하고 나서 구매할 때",
    a1: { text: "확인 후 즉시 구매한다", tags: ["E"] },
    a2: { text: "확인 후 고민하고 결정한다", tags: ["I"] },
  },
]

export default function FoodLabelTest() {
  const quizLogic = useQuizLogic({
    testId: "food-label",
    questions,
    resultPath: "/tests/food-label/test/result",
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
      colorClasses={getQuizColorScheme("green-blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
