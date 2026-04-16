"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { ZOMBIE_SURVIVAL_QUESTIONS } from "@/lib/data/zombie-survival-questions"
import { decideMBTI, type MBTITag } from "@/lib/utils/mbti-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = ZOMBIE_SURVIVAL_QUESTIONS.map((q) => ({
    id: q.id,
    q: q.text,
    a1: { text: q.options[0].label, tags: [q.options[0].tag] },
    a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

const calculateResult = (answers: string[][]): string => {
    const tags = answers.flat() as MBTITag[]
    return decideMBTI(tags)
}

export default function ZombieSurvivalTest() {
    const quizLogic = useQuizLogic({
        testId: "zombie-survival",
        questions,
        resultPath: "/tests/zombie-survival/test/result",
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
            colorClasses={getQuizColorScheme("red")} // red theme
            onChoiceSelect={quizLogic.handleChoiceSelect}
            onPrevious={quizLogic.handlePrevious}
        />
    )
}
