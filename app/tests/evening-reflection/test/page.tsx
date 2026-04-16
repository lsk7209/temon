"use client"

/**
 * Component: EveningReflectionTest
 * 저녁 성찰 테스트 페이지
 * @example <EveningReflectionTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "저녁에 하루를 돌아볼 때",
    a1: { text: "정해진 방식으로 돌아본다", tags: ["J", "S"] },
    a2: { text: "그때그때 선택한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "저녁에 내일 계획을 세울 때",
    a1: { text: "정해진 시간에 세운다", tags: ["J", "S"] },
    a2: { text: "그때그때 세운다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "저녁에 하루를 평가할 때",
    a1: { text: "정해진 기준으로 평가한다", tags: ["S", "J"] },
    a2: { text: "그때그때 평가한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 하루를 돌아보는 방식",
    a1: { text: "혼자 조용히 돌아본다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 돌아본다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 하루를 돌아보는 시간",
    a1: { text: "정해진 시간에 돌아본다", tags: ["J", "S"] },
    a2: { text: "그때그때 돌아본다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "저녁에 하루를 돌아보는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "저녁에 하루를 돌아볼 때 감정",
    a1: { text: "논리적으로 분석한다", tags: ["T", "S"] },
    a2: { text: "감정적으로 느낀다", tags: ["F", "N"] },
  },
  {
    id: 8,
    q: "새로운 저녁 성찰 방법을 시도할 때",
    a1: { text: "리뷰를 보고 신중하게 선택한다", tags: ["S", "I"] },
    a2: { text: "바로 시도해본다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "저녁에 하루를 돌아보는 강도",
    a1: { text: "정해진 강도만 한다", tags: ["J", "T"] },
    a2: { text: "기분에 따라 강도가 달라진다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "저녁 성찰 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁에 하루를 돌아보는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 하루를 돌아보는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
]

export default function EveningReflectionTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-reflection",
    questions,
    resultPath: "/tests/evening-reflection/test/result",
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
      colorClasses={getQuizColorScheme("rose-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
