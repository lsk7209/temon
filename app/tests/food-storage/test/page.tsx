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
    q: "냉장고를 정리할 때 정리 빈도를 생각할 때",
    a1: { text: "정기적으로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "필요할 때만 자유롭게 정리한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식을 냉장고에 보관할 때 보관 방식을 정할 때",
    a1: { text: "카테고리별로 체계적으로 보관한다", tags: ["S"] },
    a2: { text: "사용 빈도에 따라 직관적으로 보관한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "음식을 냉장고에 보관할 때 용기를 사용할지 고민될 때",
    a1: { text: "용기를 사용해서 정리 정돈한다", tags: ["J"] },
    a2: { text: "그대로 자연스럽게 보관한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "냉장고에 음식을 보관할 때 유통기한을 확인할 때",
    a1: { text: "정확히 확인하고 관리한다", tags: ["T"] },
    a2: { text: "대략적으로 느낌으로 확인한다", tags: ["F"] },
  },
  {
    id: 5,
    q: "냉장고 보관 공간을 활용할 때",
    a1: { text: "최대한 활용해서 효율적으로 보관한다", tags: ["T"] },
    a2: { text: "여유롭게 편하게 보관한다", tags: ["F"] },
  },
  {
    id: 6,
    q: "냉장고를 정리할 시간을 정할 때",
    a1: { text: "계획된 시간에 정리한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 정리한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "냉장고를 정리할 때 정리 방식을 선택할 때",
    a1: { text: "모든 것을 꺼내서 정리한다", tags: ["E"] },
    a2: { text: "조용히 하나씩 정리한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "음식을 냉장고에 보관할 때 보관 기준을 정할 때",
    a1: { text: "실용성과 효율성을 기준으로 보관한다", tags: ["T"] },
    a2: { text: "감성과 보기 좋음을 기준으로 보관한다", tags: ["F"] },
  },
  {
    id: 9,
    q: "냉장고를 정리하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 10,
    q: "음식을 냉장고에 보관하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 보관한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 보관한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "냉장고를 확인할 때 확인 방식을 선택할 때",
    a1: { text: "정기적으로 확인한다", tags: ["S"] },
    a2: { text: "필요할 때만 확인한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "냉장고 보관 정보를 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 다른 사람과 공유한다", tags: ["E"] },
    a2: { text: "혼자만 관리한다", tags: ["I"] },
  },
]

export default function FoodStorageTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "food-storage",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-storage/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-storage/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("food-storage")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("food-storage", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
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
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 shadow-lg"
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
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 shadow-lg"
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

