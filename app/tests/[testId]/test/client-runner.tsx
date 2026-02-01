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
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({}) // questionId -> 0 or 1
    const [isSubmitting, setIsSubmitting] = useState(false)

    const currentQuestion = questions[currentIndex]
    const progress = ((currentIndex) / questions.length) * 100

    const handleAnswer = async (choiceIndex: number) => {
        const newAnswers = { ...answers, [currentQuestion.id]: choiceIndex }
        setAnswers(newAnswers)

        if (currentIndex < questions.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200) // Small delay for effect
        } else {
            // Finish
            await submitQuiz(newAnswers)
        }
    }

    const submitQuiz = async (finalAnswers: Record<string, number>) => {
        setIsSubmitting(true)
        try {
            const res = await fetch(`/api/tests/${testId}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers })
            })

            if (!res.ok) throw new Error('Submission failed')

            const data = await res.json()
            router.push(`/tests/${testId}/test/result/${data.resultId}`)
        } catch (error) {
            alert("결과를 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.")
            setIsSubmitting(false)
        }
    }

    if (isSubmitting) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                <h2 className="text-xl font-bold text-gray-800">결과 분석 중...</h2>
                <p className="text-gray-500">잠시만 기다려주세요.</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Question {currentIndex + 1}/{questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    <h2 className="text-2xl font-bold text-center text-gray-900 leading-relaxed min-h-[100px] flex items-center justify-center">
                        {currentQuestion.questionText}
                    </h2>

                    <div className="grid gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-auto py-6 text-lg text-left justify-start px-6 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all border-2"
                            onClick={() => handleAnswer(0)}
                        >
                            <span className="w-full break-keep">{currentQuestion.choice1Text}</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-auto py-6 text-lg text-left justify-start px-6 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all border-2"
                            onClick={() => handleAnswer(1)}
                        >
                            <span className="w-full break-keep">{currentQuestion.choice2Text}</span>
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
