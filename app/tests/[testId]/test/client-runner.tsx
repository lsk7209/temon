"use client"

import { QuizContainer } from "@/components/quiz/quiz-container"
import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"

interface Question {
  id: string
  questionOrder: number
  questionText: string
  choice1Text: string
  choice2Text: string
  choice1Tags: string
  choice2Tags: string
}

interface Props {
  testId: string
  questions: Question[]
}

export default function ClientRunner({ testId, questions }: Props) {
  const quizQuestions = questions.map((q) => {
    let tags1: string[] = []
    let tags2: string[] = []

    try {
      tags1 = JSON.parse(q.choice1Tags || "[]")
    } catch {
      tags1 = []
    }

    try {
      tags2 = JSON.parse(q.choice2Tags || "[]")
    } catch {
      tags2 = []
    }

    return {
      id: q.id,
      q: q.questionText,
      a1: { text: q.choice1Text, tags: tags1 },
      a2: { text: q.choice2Text, tags: tags2 },
    }
  })

  const quizLogic = useQuizLogic({
    testId,
    questions: quizQuestions,
    resultPath: `/tests/${testId}/test/result`,
  })

  return (
    <QuizContainer
      {...{
        currentQuestion: quizLogic.currentQuestion,
        currentQ: quizLogic.currentQ,
        selectedChoice: quizLogic.selectedChoice,
        isProcessing: quizLogic.isProcessing,
        isSaving: quizLogic.isSaving,
        progress: quizLogic.progress,
        questionsLength: quizLogic.questionsLength,
        colorClasses: getQuizColorScheme("blue"),
        onChoiceSelect: quizLogic.handleChoiceSelect,
        onPrevious: quizLogic.handlePrevious,
      }}
    />
  )
}
