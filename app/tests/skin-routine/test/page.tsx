/**
 * Component: SkinRoutineTest
 * 피부 루틴 성향 테스트 페이지
 * @example <SkinRoutineTest />
 */

"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { SKIN_ROUTINE_QUESTIONS } from "@/lib/data/skin-routine-questions"
import { decideType } from "@/lib/utils/skin-routine-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = SKIN_ROUTINE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculateSkinRoutineResult = (answers: string[][]): string => {
  // Flatten answers array to get all tags
  const tags = answers.flat()
  return decideType(tags as Array<"E" | "I" | "S" | "N" | "T" | "F" | "J" | "P">)
}

export default function SkinRoutineTest() {
  const quizLogic = useQuizLogic({
    testId: "skin-routine",
    questions,
    resultPath: "/tests/skin-routine/test/result",
    calculateResult: calculateSkinRoutineResult,
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

