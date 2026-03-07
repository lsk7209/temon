"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { SPICE_TOLERANCE_QUESTIONS } from "@/lib/data/spice-tolerance-questions"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = SPICE_TOLERANCE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

export default function SpiceToleranceTestPage() {
  const quizLogic = useQuizLogic({
    testId: "spice-tolerance",
    questions,
    resultPath: "/tests/spice-tolerance/test/result",
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
      colorClasses={getQuizColorScheme("red-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
