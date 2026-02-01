"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import { MEETING_VILLAIN_QUESTIONS } from "@/lib/data/meeting-villain-questions"
import { decideMBTI, type MBTITag } from "@/lib/utils/mbti-scorer"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

// Convert external questions to QuizQuestion format
const questions: QuizQuestion[] = MEETING_VILLAIN_QUESTIONS.map((q) => ({
    id: q.id,
    q: q.text,
    a1: { text: q.options[0].label, tags: [q.options[0].tag] },
    a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}))

// Custom result calculation function
const calculateResult = (answers: string[][]): string => {
    // Flatten answers array to get all tags
    const tags = answers.flat() as MBTITag[]
    return decideMBTI(tags)
}

export default function MeetingVillainTest() {
    const quizLogic = useQuizLogic({
        testId: "meeting-villain",
        questions,
        resultPath: "/tests/meeting-villain/test/result", // Assuming result page handling matches this path
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
            colorClasses={getQuizColorScheme("slate")} // gray/slate theme
            onChoiceSelect={quizLogic.handleChoiceSelect}
            onPrevious={quizLogic.handlePrevious}
        />
    )
}
