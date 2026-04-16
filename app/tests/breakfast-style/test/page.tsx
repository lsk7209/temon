"use client"

/**
 * Component: BreakfastStyleTest
 * 아침식사 스타일 테스트 페이지
 * @example <BreakfastStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 일어나서 아침식사를 준비할 때",
    a1: { text: "직접 요리해서 계획적으로 만든다", tags: ["J"] },
    a2: { text: "외부에서 구매해서 간편하게 먹는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "아침에 일어나서 아침식사를 할 시간을 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 3,
    q: "아침식사를 시작하기 전에 메뉴를 선택할 때",
    a1: { text: "미리 계획하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "아침식사를 할 때 양을 정할 때",
    a1: { text: "풍부하고 든든하게 먹는다", tags: ["E"] },
    a2: { text: "간단하고 가볍게 먹는다", tags: ["I"] },
  },
  {
    id: 5,
    q: "아침식사를 할 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "아침식사를 마치고 나서 다음 활동을 할 때",
    a1: { text: "계획을 세우고 체계적으로 시작한다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 시작한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "아침식사를 할 때 메뉴를 고를 때 기준을 정할 때",
    a1: { text: "영양과 건강을 기준으로 선택한다", tags: ["T"] },
    a2: { text: "맛과 감성을 기준으로 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "아침식사를 준비할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 만든다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 만든다", tags: ["T"] },
  },
  {
    id: 9,
    q: "아침식사를 할 때 메뉴를 선택할 때",
    a1: { text: "다양하고 새로운 메뉴를 선택한다", tags: ["N"] },
    a2: { text: "익숙하고 기본 메뉴를 선택한다", tags: ["S"] },
  },
  {
    id: 10,
    q: "아침식사를 할 때 장소를 선택할 때",
    a1: { text: "집에서 편안하게 먹는다", tags: ["I"] },
    a2: { text: "카페나 식당에서 분위기 있게 먹는다", tags: ["E"] },
  },
  {
    id: 11,
    q: "아침식사를 마치고 나서 기분이 좋을 때",
    a1: { text: "에너지 충전과 활기참을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "아침식사를 선택할 때 이유를 생각할 때",
    a1: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
  },
]

export default function BreakfastStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "breakfast-style",
    questions,
    resultPath: "/tests/breakfast-style/test/result",
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
      colorClasses={getQuizColorScheme("yellow-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
