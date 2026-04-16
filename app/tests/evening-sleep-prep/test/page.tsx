"use client"

/**
 * Component: EveningSleepPrepTest
 * 저녁 잠들기 전 준비 테스트 페이지
 * @example <EveningSleepPrepTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "잠들기 전 준비를 할 때",
    a1: { text: "정해진 루틴대로 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 선택한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "잠들기 전 루틴을 할 때",
    a1: { text: "정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "잠들기 전 환경을 준비할 때",
    a1: { text: "정해진 환경을 만든다", tags: ["S", "J"] },
    a2: { text: "그때그때 조정한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "잠들기 전 할 일",
    a1: { text: "정해진 일만 한다", tags: ["J", "T"] },
    a2: { text: "그때그때 선택한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "잠들기 전 기분",
    a1: { text: "평온하고 안정적이다", tags: ["S", "J"] },
    a2: { text: "기분에 따라 달라진다", tags: ["N", "P"] },
  },
  {
    id: 6,
    q: "잠들기 전 준비를 하는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "잠들기 전 준비가 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "새로운 잠들기 전 루틴을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "잠들기 전 준비를 하는 강도",
    a1: { text: "정해진 강도만 한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "잠들기 전 준비 후 할 일",
    a1: { text: "즉시 잠자리에 든다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "잠들기 전 준비를 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "잠들기 전 준비를 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function EveningSleepPrepTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-sleep-prep",
    questions,
    resultPath: "/tests/evening-sleep-prep/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
