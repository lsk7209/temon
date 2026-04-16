/**
 * Component: SleepChronotypeTest
 * 수면 크로노타입 테스트 페이지
 * @example <SleepChronotypeTest />
 */

"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { SLEEP_CHRONOTYPE_QUESTIONS } from "@/lib/data/sleep-chronotype-questions"
import { decideType } from "@/lib/utils/sleep-chronotype-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = SLEEP_CHRONOTYPE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculateSleepChronotypeResult = (answers: string[][]): string => {
  // Flatten answers array to get all tags
  const tags = answers.flat()
  return decideType(tags as Array<"E" | "I" | "S" | "N" | "T" | "F" | "J" | "P">)
}

export default function SleepChronotypeTest() {
  const quizLogic = useQuizLogic({
    testId: "sleep-chronotype",
    questions,
    resultPath: "/tests/sleep-chronotype/test/result",
    calculateResult: calculateSleepChronotypeResult,
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

