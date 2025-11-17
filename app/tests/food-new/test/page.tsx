"use client"

/**
 * Component: FoodNewTest
 * 신상품 테스트 페이지
 * @example <FoodNewTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "마트에서 신상품을 발견했을 때",
    a1: { text: "즉시 관심이 생기고 바로 구매하고 싶다", tags: ["E", "P"] },
    a2: { text: "리뷰를 확인하고 신중하게 판단한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "신상품이 평이 좋다는 소식을 들었을 때",
    a1: { text: "친구들에게 물어보고 함께 시도해본다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 정보를 수집하고 결정한다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "신상품 가격이 비쌀 때",
    a1: { text: "가격보다 새로운 경험이 중요하다고 생각한다", tags: ["F", "N"] },
    a2: { text: "가격 대비 가치를 따져보고 결정한다", tags: ["T", "S"] },
  },
  {
    id: 4,
    q: "신상품이 예상과 다를 때",
    a1: { text: "새로운 경험이라 생각하고 즐긴다", tags: ["P", "N"] },
    a2: { text: "실망스럽고 다음에는 신중하게 선택한다", tags: ["J", "S"] },
  },
  {
    id: 5,
    q: "신상품을 시도한 후",
    a1: { text: "즉시 친구들에게 추천하거나 피드백을 준다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직하거나 기록한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "신상품이 트렌드일 때",
    a1: { text: "트렌드를 따라가며 시도하는 게 즐겁다", tags: ["E", "P"] },
    a2: { text: "트렌드보다 자신의 취향을 우선한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "신상품을 선택할 때",
    a1: { text: "포장지와 디자인이 마음에 들면 선택한다", tags: ["F", "N"] },
    a2: { text: "원재료와 영양 정보를 확인하고 선택한다", tags: ["T", "S"] },
  },
  {
    id: 8,
    q: "신상품이 실패했을 때",
    a1: { text: "다른 신상품을 계속 시도해본다", tags: ["P", "N"] },
    a2: { text: "익숙한 제품으로 돌아간다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "신상품 정보를 얻을 때",
    a1: { text: "SNS나 광고에서 우연히 발견한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 정보를 수집하고 비교한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "신상품을 시도하는 빈도",
    a1: { text: "자주 새로운 상품을 시도하는 편이다", tags: ["E", "P"] },
    a2: { text: "가끔만 신중하게 시도한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "신상품과 기존 제품 중 선택할 때",
    a1: { text: "신상품을 먼저 시도해본다", tags: ["N", "P"] },
    a2: { text: "검증된 기존 제품을 선택한다", tags: ["S", "J"] },
  },
  {
    id: 12,
    q: "신상품 시도 스타일",
    a1: { text: "즉흥적이고 모험적으로 시도한다", tags: ["P", "N"] },
    a2: { text: "계획적이고 신중하게 시도한다", tags: ["J", "S"] },
  },
]

export default function FoodNewTest() {
  const quizLogic = useQuizLogic({
    testId: "food-new",
    questions,
    resultPath: "/tests/food-new/test/result",
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
      colorClasses={getQuizColorScheme("rose-pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
