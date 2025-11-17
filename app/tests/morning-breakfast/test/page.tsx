"use client"

/**
 * Component: MorningBreakfastTest
 * 아침 식사 테스트 페이지
 * @example <MorningBreakfastTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "아침에 배가 고플 때",
    a1: { text: "바로 간단하게 먹는다", tags: ["T", "J"] },
    a2: { text: "여유롭게 준비해서 먹는다", tags: ["F", "P"] },
  },
  {
    id: 2,
    q: "아침 식사 시간이 부족할 때",
    a1: { text: "빠르게 간단하게 먹는다", tags: ["T", "J"] },
    a2: { text: "시간을 내서 먹는다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "아침 식사를 준비할 때",
    a1: { text: "정해진 메뉴로 준비한다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 준비한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "아침 식사를 먹는 장소를 고를 때",
    a1: { text: "집에서 혼자 먹는다", tags: ["I"] },
    a2: { text: "밖에서 사람들과 먹는다", tags: ["E"] },
  },
  {
    id: 5,
    q: "아침 식사를 먹는 시간을 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 먹는다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 먹는다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "아침 식사를 먹으면서 할 일",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기며 쉰다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "아침 식사 메뉴가 마음에 안 들 때",
    a1: { text: "그냥 먹는다", tags: ["S", "T"] },
    a2: { text: "다른 메뉴를 찾는다", tags: ["N", "F"] },
  },
  {
    id: 8,
    q: "새로운 아침 식사를 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "아침 식사를 먹는 양을 정할 때",
    a1: { text: "정해진 양만 먹는다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 양이 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "아침 식사를 먹고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "아침 식사를 먹는 이유를 생각할 때",
    a1: { text: "에너지 충전과 효율성을 위해", tags: ["T", "S"] },
    a2: { text: "기분 전환과 즐거움을 위해", tags: ["F", "N"] },
  },
  {
    id: 12,
    q: "아침 식사를 먹는 환경을 고를 때",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function MorningBreakfastTest() {
  const quizLogic = useQuizLogic({
    testId: "morning-breakfast",
    questions,
    resultPath: "/tests/morning-breakfast/test/result",
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
