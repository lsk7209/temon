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
    q: "요리 시간을 정할 때",
    a1: { text: "정해진 시간에 요리한다", tags: ["J", "S"] },
    a2: { text: "기분이나 상황에 따라 요리한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "요리 타이머 사용",
    a1: { text: "타이머를 사용해서 정확히 시간을 맞춘다", tags: ["J", "T"] },
    a2: { text: "느낌으로 시간을 판단한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "요리 시간이 부족할 때",
    a1: { text: "시간에 맞춰 빠르게 요리한다", tags: ["J", "T"] },
    a2: { text: "시간을 조정하거나 다른 요리를 선택한다", tags: ["P", "F"] },
  },
  {
    id: 4,
    q: "요리 시간 계획",
    a1: { text: "미리 시간을 계산하고 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 시간을 확인한다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "요리 시간 공유",
    a1: { text: "다른 사람과 함께 시간을 맞춰 요리한다", tags: ["E", "F"] },
    a2: { text: "혼자 시간을 관리하며 요리한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "요리 시간 패턴",
    a1: { text: "같은 시간에 요리하는 게 편하다", tags: ["S", "J"] },
    a2: { text: "다양한 시간에 요리하는 게 좋다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "요리 시간 실수",
    a1: { text: "시간을 정확히 확인하고 다시 시작한다", tags: ["J", "S"] },
    a2: { text: "대략적으로 시간을 맞춘다", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "요리 시간 기록",
    a1: { text: "요리 시간을 기록하고 관리한다", tags: ["J", "T"] },
    a2: { text: "시간을 기록하지 않는다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "요리 시간 준비",
    a1: { text: "미리 시간을 확인하고 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 시간을 확인한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "요리 시간 완성도",
    a1: { text: "정확한 시간에 완성하는 게 중요하다", tags: ["J", "T"] },
    a2: { text: "시간보다 맛이 중요하다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "요리 시간 스트레스",
    a1: { text: "시간에 맞춰 요리하는 게 스트레스다", tags: ["P", "F"] },
    a2: { text: "시간을 관리하는 게 편하다", tags: ["J", "T"] },
  },
  {
    id: 12,
    q: "요리 타이밍 스타일",
    a1: { text: "계획적이고 체계적으로 시간을 관리한다", tags: ["J", "T"] },
    a2: { text: "유연하고 자유롭게 시간을 관리한다", tags: ["P", "F"] },
  },
]

export default function CookingTimingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-timing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-timing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-timing/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-timing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-timing", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, questions.length])

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
          const result = calculateMBTI(newAnswers)
          const answersRecord = convertAnswersToRecord(newAnswers)
          await saveResult(result, answersRecord)
        }
      }, 500)
    },
    [currentQuestion, answers, questions.length, saveResult, isProcessing, isSaving]
  )

  useEffect(() => {
    return () => {
      setIsProcessing(false)
    }
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }, [currentQuestion, answers])

  const currentQ = useMemo(() => questions[currentQuestion], [currentQuestion])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.q}
              </h1>
            </div>

            <div className="space-y-4" role="radiogroup" aria-label={`질문 ${currentQuestion + 1}: ${currentQ.q}`}>
              <button
                type="button"
                onClick={() => handleChoiceSelect(currentQ.a1.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`선택지 1: ${currentQ.a1.text}`}
                aria-pressed={selectedChoice === currentQ.a1.tags.join(",")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleChoiceSelect(currentQ.a1.tags)
                  }
                }}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-hidden="true"
                  >
                    {selectedChoice === currentQ.a1.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a1.text}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChoiceSelect(currentQ.a2.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`선택지 2: ${currentQ.a2.text}`}
                aria-pressed={selectedChoice === currentQ.a2.tags.join(",")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleChoiceSelect(currentQ.a2.tags)
                  }
                }}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-hidden="true"
                  >
                    {selectedChoice === currentQ.a2.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a2.text}
                  </span>
                </div>
              </button>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || isProcessing || isSaving}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50"
                aria-label="이전 질문으로 이동"
              >
                <span>이전</span>
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">
                {isSaving ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin">⏳</span>
                    <span>결과 저장 중...</span>
                  </span>
                ) : (
                  <span>답변을 선택하면 자동으로 다음으로 이동합니다</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

