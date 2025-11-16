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
    q: "식사 중 대화하다가 음식을 흘렸을 때",
    a1: { text: "웃으면서 계속 대화한다", tags: ["E", "F"] },
    a2: { text: "조용히 닦고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "식사 중 대화하다가 음식이 식어갈 때",
    a1: { text: "대화를 계속하고 나중에 먹는다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 먹는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "식사 중 대화하다가 친구가 와서 같이 먹자고 할 때",
    a1: { text: "기쁘게 함께 먹고 대화한다", tags: ["E", "F"] },
    a2: { text: "혼자 먹는 게 편하다고 거절한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "식사 중 대화하다가 음식이 맛없을 때",
    a1: { text: "대화하면서 맛에 대해 이야기한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "식사 중 대화하다가 음식이 너무 뜨거울 때",
    a1: { text: "대화하면서 식히고 먹는다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 식힌다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "식사 중 대화하다가 새로운 주제가 나올 때",
    a1: { text: "즉시 새로운 주제로 바꾼다", tags: ["E", "N"] },
    a2: { text: "기존 주제를 계속한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "식사 중 대화하다가 음식이 너무 매울 때",
    a1: { text: "대화하면서 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 물을 마시고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "식사 중 대화하다가 음식이 너무 짤 때",
    a1: { text: "대화하면서 물을 마신다", tags: ["E", "F"] },
    a2: { text: "조용히 물을 마시고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "식사 중 대화하다가 음식이 너무 달 때",
    a1: { text: "대화하면서 반응한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 대화를 멈춘다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "식사 중 대화하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 대화를 계속한다", tags: ["E", "F"] },
    a2: { text: "대화를 멈추고 전화를 받는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "식사 중 대화하다가 계산할 때",
    a1: { text: "대화하면서 계산한다", tags: ["E", "P"] },
    a2: { text: "대화를 멈추고 계산한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "식사 중 대화하다가 옆 테이블 사람들이 시끄러울 때",
    a1: { text: "신경 쓰지 않고 대화를 계속한다", tags: ["E", "P"] },
    a2: { text: "조용한 곳으로 이동한다", tags: ["I", "J"] },
  },
]

export default function MealSocialTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "meal-social",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/meal-social/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/meal-social/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("meal-social")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("meal-social", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950 dark:via-teal-950 dark:to-emerald-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950 dark:via-teal-950 dark:to-emerald-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
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

