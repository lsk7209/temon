/**
 * Component: SpendingStyleTest
 * 소비 성향 테스트 페이지
 * @example <SpendingStyleTest />
 */

"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { SPENDING_STYLE_QUESTIONS } from "@/lib/data/spending-style-questions"
import { decideType } from "@/lib/utils/spending-style-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = SPENDING_STYLE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculateSpendingStyleResult = (answers: string[][]): string => {
  // Flatten answers array to get all tags
  const tags = answers.flat()
  return decideType(tags as Array<"E" | "I" | "S" | "N" | "T" | "F" | "J" | "P">)
}

export default function SpendingStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "spending-style",
    questions,
    resultPath: "/tests/spending-style/test/result",
    calculateResult: calculateSpendingStyleResult,
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
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

