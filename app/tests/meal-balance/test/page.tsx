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
    q: "한식당에서 밥, 국, 반찬의 균형을 맞출 때",
    a1: { text: "대충 균형을 맞춘다", tags: ["E", "P"] },
    a2: { text: "정확하게 계산해서 균형을 맞춘다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "식당에서 메인과 사이드의 균형을 맞출 때",
    a1: { text: "대충 균형을 맞춘다", tags: ["E", "P"] },
    a2: { text: "정확하게 계산해서 균형을 맞춘다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 균형을 맞출 때 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 균형을 맞춘다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 균형을 맞추다가 맛이 예상과 다를 때",
    a1: { text: "그래도 균형을 맞춘다", tags: ["E", "F"] },
    a2: { text: "균형을 포기하고 맛있는 걸 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "식사 균형을 맞추다가 음식이 너무 뜨거울 때",
    a1: { text: "바로 균형을 맞춘다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "새로운 식사 균형을 발견했을 때",
    a1: { text: "즉시 시도해본다", tags: ["E", "N"] },
    a2: { text: "신중하게 확인하고 시도한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "식사 균형을 맞추다가 균형이 너무 복잡할 때",
    a1: { text: "대충 간단하게 균형을 맞춘다", tags: ["E", "P"] },
    a2: { text: "체계적으로 균형을 맞춘다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "식사 균형을 맞추다가 균형이 예상과 다를 때",
    a1: { text: "즉흥적으로 수정한다", tags: ["E", "P"] },
    a2: { text: "계획을 확인하고 수정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "식사 균형을 맞추다가 균형이 너무 오래 걸릴 때",
    a1: { text: "빨리 간단하게 균형을 맞춘다", tags: ["E", "P"] },
    a2: { text: "체계적으로 균형을 맞춘다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "식사 균형을 맞추다가 음식이 식어갈 때",
    a1: { text: "빨리 균형을 맞추고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 균형을 맞춘다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "식사 균형을 맞추다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 균형을 맞춘다", tags: ["E", "F"] },
    a2: { text: "균형이 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "식사 균형을 맞추다가 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "빨리 균형을 맞추고 먹는다", tags: ["E", "P"] },
    a2: { text: "계획대로 균형을 맞춘다", tags: ["I", "J"] },
  },
]

export default function MealBalanceTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "meal-balance",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/meal-balance/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/meal-balance/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("meal-balance")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("meal-balance", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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

