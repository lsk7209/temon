"use client"

/**
 * Component: MarketChoiceTest
 * 시장 선택 테스트 페이지
 * @example <MarketChoiceTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "전통 시장과 대형마트 중 선택할 때",
    a1: { text: "가격과 신선도를 비교해 선택한다", tags: ["T", "S"] },
    a2: { text: "분위기와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 2,
    q: "시장을 선택할 때",
    a1: { text: "항상 가던 익숙한 시장을 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 시장을 탐험하고 싶다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "시장에 갈 때",
    a1: { text: "친구나 가족과 함께 가는 게 좋다", tags: ["E", "F"] },
    a2: { text: "혼자 가는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "시장에서 물건을 살 때",
    a1: { text: "여러 곳을 비교하고 구매한다", tags: ["T", "J"] },
    a2: { text: "첫 인상 좋은 곳에서 바로 산다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "시장 상인과 흥정할 때",
    a1: { text: "적극적으로 흥정한다", tags: ["E", "T"] },
    a2: { text: "부끄러워서 흥정하지 않는다", tags: ["I", "F"] },
  },
  {
    id: 6,
    q: "시장에서 길을 잃었을 때",
    a1: { text: "지도를 보거나 물어본다", tags: ["S", "J"] },
    a2: { text: "그냥 돌아다니며 발견한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "시장에서 샘플을 받았을 때",
    a1: { text: "고맙게 받고 구매한다", tags: ["F", "E"] },
    a2: { text: "필요 없으면 거절한다", tags: ["T", "I"] },
  },
  {
    id: 8,
    q: "시장에서 계획에 없는 물건을 발견했을 때",
    a1: { text: "계획대로 필요한 것만 산다", tags: ["J", "T"] },
    a2: { text: "마음에 들면 즉흥적으로 산다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "시장 분위기가 북적일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄러워서 불편하다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "시장에서 물건을 고를 때",
    a1: { text: "품질과 신선도를 꼼꼼히 확인한다", tags: ["S", "J"] },
    a2: { text: "대략적으로 보고 선택한다", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "시장에서 쇼핑 후",
    a1: { text: "친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "시장 선택 기준",
    a1: { text: "가격, 위치, 품질 등 객관적 기준으로 선택한다", tags: ["T", "S"] },
    a2: { text: "느낌과 분위기로 선택한다", tags: ["F", "N"] },
  },
]

export default function MarketChoiceTest() {
  const quizLogic = useQuizLogic({
    testId: "market-choice",
    questions,
    resultPath: "/tests/market-choice/test/result",
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
      colorClasses={getQuizColorScheme("orange-amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
