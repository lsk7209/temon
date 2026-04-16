/**
 * Component: PhoneUsageTest
 * 스마트폰 사용 스타일 테스트 페이지
 * @example <PhoneUsageTest />
 */

"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { PHONE_USAGE_QUESTIONS } from "@/lib/data/phone-usage-questions"
import { decideType } from "@/lib/utils/phone-usage-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = PHONE_USAGE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculatePhoneUsageResult = (answers: string[][]): string => {
  // Flatten answers array to get all tags
  const tags = answers.flat()
  return decideType(tags as Array<"E" | "I" | "S" | "N" | "T" | "F" | "J" | "P">)
}

export default function PhoneUsageTest() {
  const quizLogic = useQuizLogic({
    testId: "phone-usage",
    questions,
    resultPath: "/tests/phone-usage/test/result",
    calculateResult: calculatePhoneUsageResult,
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
      colorClasses={getQuizColorScheme("blue-indigo")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}

