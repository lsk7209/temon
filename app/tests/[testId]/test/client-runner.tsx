"use client"

import { useMemo } from "react"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { useQuizLogic } from "@/hooks/use-quiz-logic"

interface Question {
  id: string
  questionOrder: number
  questionText: string
  choice1Text: string
  choice2Text: string
  choice1Tags: string | null
  choice2Tags: string | null
}

interface Props {
  testId: string
  questions: Question[]
}

const colorClasses = {
  selectedBorder: "border-blue-400",
  selectedBg: "bg-blue-50 dark:bg-blue-950/30",
  hoverBorder: "hover:border-blue-200",
  hoverBg: "hover:bg-blue-50/40 dark:hover:bg-blue-950/20",
  focusRing: "focus-visible:ring-blue-300",
  radioSelected: "border-blue-500 bg-blue-500",
  questionNumberBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
}

function parseTags(tags: string | null): string[] {
  if (!tags) return []

  try {
    const parsed = JSON.parse(tags)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function ClientRunner({ testId, questions }: Props) {
  const quizQuestions = useMemo(
    () =>
      questions.map((q) => ({
        id: q.id,
        q: q.questionText,
        a1: { text: q.choice1Text, tags: parseTags(q.choice1Tags) },
        a2: { text: q.choice2Text, tags: parseTags(q.choice2Tags) },
      })),
    [questions]
  )

  const {
    currentQuestion,
    currentQ,
    selectedChoice,
    isProcessing,
    isSaving,
    progress,
    handleChoiceSelect,
    handlePrevious,
    questionsLength,
  } = useQuizLogic({
    testId,
    questions: quizQuestions,
    resultPath: `/tests/${testId}/test/result`,
    buildSuccessPath: ({ resultPath, resultId }) => `${resultPath}/${resultId}`,
    buildErrorPath: ({ resultPath, resultType }) => `${resultPath}?type=${resultType}`,
  })

  return (
    <QuizContainer
      currentQuestion={currentQuestion}
      currentQ={currentQ}
      selectedChoice={selectedChoice}
      isProcessing={isProcessing}
      isSaving={isSaving}
      progress={progress}
      questionsLength={questionsLength}
      colorClasses={colorClasses}
      onChoiceSelect={handleChoiceSelect}
      onPrevious={handlePrevious}
    />
  )
}
