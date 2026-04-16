"use client"

/**
 * Component: StoreChoiceTest
 * 매장 선택 테스트 페이지
 * @example <StoreChoiceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "새로운 매장을 발견했을 때",
    a1: { text: "즉시 들어가서 둘러본다", tags: ["E", "P"] },
    a2: { text: "리뷰를 확인하고 신중하게 결정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "매장 선택 기준",
    a1: { text: "가격, 위치, 평점 등 객관적 정보를 비교한다", tags: ["T", "S"] },
    a2: { text: "분위기와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "단골 매장이 생겼을 때",
    a1: { text: "계속 같은 매장을 이용한다", tags: ["S", "J"] },
    a2: { text: "다양한 매장을 시도하고 싶다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "매장에 갈 때",
    a1: { text: "친구나 가족과 함께 가는 게 좋다", tags: ["E", "F"] },
    a2: { text: "혼자 가는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "매장이 예상과 다를 때",
    a1: { text: "그냥 받아들이고 즐긴다", tags: ["P", "F"] },
    a2: { text: "불만스럽고 다른 매장을 찾는다", tags: ["J", "T"] },
  },
  {
    id: 6,
    q: "매장 선택을 미리 계획할 때",
    a1: { text: "시간과 장소를 정확히 계획한다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 생각하고 유연하게 결정한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "매장 직원이 친절할 때",
    a1: { text: "직원과 대화하며 즐겁게 쇼핑한다", tags: ["E", "F"] },
    a2: { text: "최소한의 대화만 하고 조용히 쇼핑한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "매장에서 물건을 고를 때",
    a1: { text: "여러 제품을 비교하고 신중하게 선택한다", tags: ["T", "J"] },
    a2: { text: "첫 인상 좋은 제품을 바로 선택한다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "매장이 북적일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄러워서 불편하다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "매장에서 할인 상품을 발견했을 때",
    a1: { text: "할인율과 품질을 확인하고 구매한다", tags: ["T", "S"] },
    a2: { text: "할인이라면 바로 구매한다", tags: ["F", "N"] },
  },
  {
    id: 11,
    q: "매장 선택 후",
    a1: { text: "친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "매장 선택 스타일",
    a1: { text: "계획적이고 체계적으로 선택한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 선택한다", tags: ["P", "F"] },
  },
]

export default function StoreChoiceTest() {
  const quizLogic = useQuizLogic({
    testId: "store-choice",
    questions,
    resultPath: "/tests/store-choice/test/result",
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
