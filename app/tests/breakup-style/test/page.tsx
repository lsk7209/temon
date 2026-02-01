"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { BREAKUP_STYLE_QUESTIONS } from "@/lib/data/breakup-style-questions"
import { decideMBTI, type MBTITag } from "@/lib/utils/mbti-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = BREAKUP_STYLE_QUESTIONS.map((q) => ({
    id: q.id,
    q: q.text,
    a1: { text: q.options[0].label, tags: [q.options[0].tag] },
    a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculateResult = (answers: string[][]): string => {
    const tags = answers.flat() as MBTITag[]
    return decideMBTI(tags)
}

export default function BreakupStyleTest() {
    const quizLogic = useQuizLogic({
        testId: "breakup-style",
        questions,
        resultPath: "/tests/breakup-style/test/result",
        calculateResult,
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
            colorClasses={getQuizColorScheme("rose")} // rose/pink theme
            onChoiceSelect={quizLogic.handleChoiceSelect}
            onPrevious={quizLogic.handlePrevious}
        />
    )
}
