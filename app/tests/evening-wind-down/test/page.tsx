"use client"

/**
 * Component: EveningWindDownTest
 * 저녁 휴식 테스트 페이지
 * @example <EveningWindDownTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "퇴근 후 집에 도착했을 때",
    a1: { text: "바로 휴식을 취한다", tags: ["F", "P"] },
    a2: { text: "할 일을 먼저 한다", tags: ["T", "J"] },
  },
  {
    id: 2,
    q: "저녁에 피곤할 때",
    a1: { text: "즉시 쉰다", tags: ["F", "P"] },
    a2: { text: "조금 더 일을 한다", tags: ["T", "J"] },
  },
  {
    id: 3,
    q: "저녁에 휴식을 취할 때",
    a1: { text: "정해진 방법으로 휴식한다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 휴식한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 휴식하는 장소",
    a1: { text: "조용한 곳에서 혼자 휴식한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 휴식한다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 휴식하는 시간",
    a1: { text: "정해진 시간에 휴식한다", tags: ["J", "S"] },
    a2: { text: "그때그때 휴식한다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "저녁에 휴식하는 이유",
    a1: { text: "효율성과 생산성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "저녁에 휴식하는 방식",
    a1: { text: "같은 방법을 반복한다", tags: ["S", "I"] },
    a2: { text: "다양한 방법을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 8,
    q: "저녁에 휴식하고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 9,
    q: "저녁에 휴식하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 10,
    q: "저녁에 휴식하는 기준",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "저녁에 휴식할 때 할 일",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기며 쉰다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 휴식하는 빈도",
    a1: { text: "정해진 시간에 규칙적으로 휴식한다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 휴식한다", tags: ["P", "N"] },
  },
]

export default function EveningWindDownTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-wind-down",
    questions,
    resultPath: "/tests/evening-wind-down/test/result",
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

