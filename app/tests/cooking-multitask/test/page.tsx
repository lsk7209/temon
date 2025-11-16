"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"
import { calculateMBTI } from "@/lib/utils/mbti-calculator"

const questions = [
  {
    id: 1,
    q: "요리하면서 다른 일을 할 때",
    a1: { text: "여러 일을 동시에 하는 게 효율적이다", tags: ["E", "P"] },
    a2: { text: "요리에만 집중하는 게 좋다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리 중 다른 일 계획",
    a1: { text: "미리 계획해서 동시에 처리한다", tags: ["J", "T"] },
    a2: { text: "그때그때 필요하면 한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "요리 중 전화나 메시지",
    a1: { text: "즉시 받고 대화한다", tags: ["E", "P"] },
    a2: { text: "요리가 끝난 후 확인한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리 중 청소나 정리",
    a1: { text: "요리하면서 동시에 정리한다", tags: ["E", "J"] },
    a2: { text: "요리 후에 정리한다", tags: ["I", "P"] },
  },
  {
    id: 5,
    q: "요리 중 TV나 음악",
    a1: { text: "TV를 보거나 음악을 들으며 요리한다", tags: ["E", "P"] },
    a2: { text: "조용히 집중해서 요리한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리 중 다른 요리 준비",
    a1: { text: "여러 요리를 동시에 준비한다", tags: ["E", "N"] },
    a2: { text: "하나씩 순서대로 준비한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "요리 중 실수",
    a1: { text: "빠르게 수정하고 계속 진행한다", tags: ["E", "P"] },
    a2: { text: "신중하게 확인하고 진행한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리 중 대화",
    a1: { text: "다른 사람과 대화하며 요리한다", tags: ["E", "F"] },
    a2: { text: "조용히 혼자 요리한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 중 시간 관리",
    a1: { text: "여러 일을 하면서 시간을 효율적으로 쓴다", tags: ["J", "T"] },
    a2: { text: "자연스럽게 흘러가게 둔다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "요리 중 집중도",
    a1: { text: "여러 일을 해도 집중할 수 있다", tags: ["E", "N"] },
    a2: { text: "한 가지에 집중해야 한다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "요리 중 스트레스",
    a1: { text: "여러 일을 하면서도 즐겁다", tags: ["E", "P"] },
    a2: { text: "여러 일을 하면 스트레스다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리 멀티태스킹 스타일",
    a1: { text: "자유롭게 여러 일을 동시에 한다", tags: ["P", "E"] },
    a2: { text: "계획적으로 순서를 정해 처리한다", tags: ["J", "I"] },
  },
]

export default function CookingMultitaskTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-multitask",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-multitask/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-multitask/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-multitask")
  }, [])

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  const handleChoiceSelect = useCallback(
    async (tags: string[]) => {
      if (isProcessing || isSaving) return

      setIsProcessing(true)
      setSelectedChoice(tags.join(","))
      const currentQuestionIndex = currentQuestion

      setTimeout(async () => {
        const newAnswers = [...answers, tags]
        setAnswers(newAnswers)

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestion(currentQuestionIndex + 1)
          setSelectedChoice("")
          setIsProcessing(false)
        } else {
          const mbti = calculateMBTI(newAnswers)
          await saveResult(mbti, convertAnswersToRecord(newAnswers))
          setIsProcessing(false)
        }
      }, 500)
    },
    [currentQuestion, answers, isProcessing, isSaving, questions.length, saveResult]
  )

  const handlePrevious = useCallback(() => {
    if (isProcessing || isSaving) return

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setAnswers((prev) => prev.slice(0, prev.length - 1))
      setSelectedChoice("")
    } else {
      router.push("/tests/cooking-multitask")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-cyan-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center leading-relaxed">
            {currentQ.q}
          </h2>

          <div className="space-y-4">
            {[currentQ.a1, currentQ.a2].map((choice, index) => (
              <Button
                key={index}
                className={`w-full h-auto py-4 px-6 text-lg md:text-xl rounded-xl transition-all duration-200 ease-in-out
                  ${selectedChoice === choice.tags.join(",")
                    ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }
                  ${isProcessing || isSaving ? "opacity-70 cursor-not-allowed" : "hover:shadow-md hover:-translate-y-1"}`}
                onClick={() => handleChoiceSelect(choice.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`Question ${currentQuestion + 1}, Choice ${index + 1}: ${choice.text}`}
                aria-pressed={selectedChoice === choice.tags.join(",")}
                role="radio"
              >
                {choice.text}
              </Button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isProcessing || isSaving}
              className="text-gray-600 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              이전
            </Button>
            {isSaving && (
              <p className="text-cyan-600 dark:text-cyan-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

