"use client"

import { useQuizLogic, type QuizQuestion } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"

interface Question {
  id: string
  questionOrder: number
  questionText: string
  choice1Text: string
  choice2Text: string
  choice1Tags?: string | null
  choice2Tags?: string | null
}

interface Props {
  testId: string
  questions: Question[]
}

function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export default function ClientRunner({ testId, questions }: Props) {
  const quizQuestions: QuizQuestion[] = questions.map((q) => ({
    id: Number(q.id) || q.questionOrder,
    q: q.questionText,
    a1: { text: q.choice1Text, tags: parseTags(q.choice1Tags) },
    a2: { text: q.choice2Text, tags: parseTags(q.choice2Tags) },
  }))

  const quizLogic = useQuizLogic({
    testId,
    questions: quizQuestions,
    resultPath: `/tests/${testId}/test/result`,
    calculateResult: (answers) => {
      const tally: Record<string, number> = {}
      for (const tag of answers.flat()) {
        tally[tag] = (tally[tag] || 0) + 1
      }

      const pick = (a: string, b: string) => ((tally[a] || 0) >= (tally[b] || 0) ? a : b)
      return `${pick("E", "I")}${pick("S", "N")}${pick("T", "F")}${pick("J", "P")}`
    },
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
      colorClasses={getQuizColorScheme("blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
