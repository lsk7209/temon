"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
    id: string
    questionOrder: number
    questionText: string
    choice1Text: string
    choice2Text: string
}

interface Props {
    testId: string
    questions: Question[]
}

export default function ClientRunner({ testId, questions }: Props) {
    // Map DB questions to QuizQuestion format
    const quizQuestions = questions.map(q => {
        let tags1: string[] = []
        let tags2: string[] = []
        try { tags1 = JSON.parse(q.choice1Tags || '[]') } catch (e) { }
        try { tags2 = JSON.parse(q.choice2Tags || '[]') } catch (e) { }

        return {
            id: q.id,
            q: q.questionText,
            a1: { text: q.choice1Text, tags: tags1 },
            a2: { text: q.choice2Text, tags: tags2 }
        }
    })

    const quizLogic = useQuizLogic({
        testId,
        questions: quizQuestions,
        resultPath: `/tests/${testId}/test/result`,
        calculateResult: (answers) => {
            // Logic is handled in API for this one, but we can standard calculate here if needed.
            // Actually useQuizLogic submits to API? 
            // Wait, useQuizLogic in zombie-survival calls "calculateResult" function PASSED to it.
            // dynamic submit route does the calculation properly on server.
            // But useQuizLogic might expect client-side calc?
            // Let's check useQuizLogic again.
            // It calls `saveResult` from `useTestResult`.
            // `useTestResult` calls `/api/test-results` usually?
            // `dynamic submit` route is `/api/tests/[testId]/submit`.
            // The `useTestResult` hook might differ.
            // Let's look at `useQuizLogic` again in next step before committing this code.
            return ""
        }
    })

    // If useQuizLogic handles submission via API, we might need to adjust.
    // Re-reading useQuizLogic code from Step 155:
    // It calls `saveResult`.
    // It defaults to `calculateMBTI`.

    // Auto-generated tests result logic is in `/api/tests/[testId]/submit`.
    // We should probably USE that endpoint.
    // But `useQuizLogic` uses `useTestResult`.

    // If I use `useQuizLogic`, I force it to use the standard flow.
    // Does standard flow use `/api/tests/[testId]/submit`?
    // Probably not. Standard flow usually saves to `testResults` via `useTestResult`.

    // The previous `ClientRunner` called `/api/tests/[testId]/submit`.
    // If I switch to `useQuizLogic`, I need to make sure it uses the right API.

    // Strategy:
    // 1. Check `useTestResult` hook.
    // 2. If it is hardcoded to a different API, I might need to pass a custom save function or just modify `ClientRunner` to use `QuizContainer` but keep its own submission logic.

    // Better to KEEP `ClientRunner` submission logic (which hits the dynamic route) 
    // BUT use `QuizContainer` for UI.
    // AND map the state to what `QuizContainer` expects.

    // QuizContainer props:
    // currentQuestion, currentQ, selectedChoice, onChoiceSelect, etc.

    // So I will implement `useQuizLogic`-like state in `ClientRunner` but keep the `submitQuiz` logic 
    // (maybe slightly updated to use `questions` map).

    return null // Placeholder for now
}
