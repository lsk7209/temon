"use client"

/**
 * Component: LunchboxStyleTest
 * 도시락 스타일 테스트 페이지
 * @example <LunchboxStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "도시락을 만들 때 구성을 정할 때",
    a1: { text: "정해진 구성으로 항상 같게 만든다", tags: ["J"] },
    a2: { text: "그때그때 다양하게 만든다", tags: ["P"] },
  },
  {
    id: 2,
    q: "도시락을 포장할 때",
    a1: { text: "깔끔하게 정리해서 예쁘게 포장한다", tags: ["F"] },
    a2: { text: "간단하게 효율적으로 포장한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "도시락을 준비할 때 시간을 정할 때",
    a1: { text: "미리 준비해서 계획적으로 만든다", tags: ["J"] },
    a2: { text: "당일 아침에 즉흥적으로 만든다", tags: ["P"] },
  },
  {
    id: 4,
    q: "도시락을 정리할 때",
    a1: { text: "체계적으로 구역별로 정리한다", tags: ["J"] },
    a2: { text: "간단하게 자연스럽게 정리한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "도시락 재료를 고를 때",
    a1: { text: "다양한 재료를 풍부하게 선택한다", tags: ["N"] },
    a2: { text: "기본 재료를 간단하게 선택한다", tags: ["S"] },
  },
  {
    id: 6,
    q: "도시락을 먹을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 7,
    q: "도시락을 먹기 전에 사진을 찍을 때",
    a1: { text: "사진을 찍고 공유한다", tags: ["E"] },
    a2: { text: "조용히 먹기만 한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "도시락을 선택할 때",
    a1: { text: "영양 균형과 건강을 기준으로 선택한다", tags: ["T"] },
    a2: { text: "맛과 즐거움을 기준으로 선택한다", tags: ["F"] },
  },
  {
    id: 9,
    q: "도시락을 준비하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 메뉴를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 만든다", tags: ["P"] },
  },
  {
    id: 10,
    q: "도시락을 먹을 때",
    a1: { text: "사람들과 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 11,
    q: "도시락을 준비할 때 이유를 생각할 때",
    a1: { text: "건강과 영양을 위해 준비한다", tags: ["T"] },
    a2: { text: "맛과 즐거움을 위해 준비한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "도시락을 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function LunchboxStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "lunchbox-style",
    questions,
    resultPath: "/tests/lunchbox-style/test/result",
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
      colorClasses={getQuizColorScheme("amber-yellow")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

