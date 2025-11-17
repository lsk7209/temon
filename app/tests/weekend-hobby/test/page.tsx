"use client"

/**
 * Component: WeekendHobbyTest
 * 주말 취미 테스트 페이지
 * @example <WeekendHobbyTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "주말에 취미 활동을 할 때",
    a1: { text: "정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "주말에 새로운 취미를 시작할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 3,
    q: "주말에 취미 활동을 하는 방식",
    a1: { text: "혼자 조용히 한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 한다", tags: ["E", "N"] },
  },
  {
    id: 4,
    q: "주말에 취미 활동을 하는 시간",
    a1: { text: "정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "주말에 취미 활동을 하는 이유",
    a1: { text: "목표와 효율을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "주말에 취미 활동을 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "주말에 취미 활동이 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "주말에 취미 활동을 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 한다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "주말에 취미 활동을 하는 강도",
    a1: { text: "정해진 강도만 한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "주말 취미 활동 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "주말에 취미 활동을 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 12,
    q: "주말에 취미 활동을 하는 목적",
    a1: { text: "기술 향상과 목표 달성을 위해", tags: ["T", "J"] },
    a2: { text: "즐거움과 여유를 위해", tags: ["F", "P"] },
  },
]

export default function WeekendHobbyTest() {
  const quizLogic = useQuizLogic({
    testId: "weekend-hobby",
    questions,
    resultPath: "/tests/weekend-hobby/test/result",
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
      colorClasses={getQuizColorScheme("purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

