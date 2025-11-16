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
    q: "요리에 양념을 넣을 때 양념 사용량을 정할 때",
    a1: { text: "적게 절제적으로 양념을 넣는다", tags: ["T"] },
    a2: { text: "많이 풍부하게 양념을 넣는다", tags: ["F"] },
  },
  {
    id: 2,
    q: "요리에 양념을 선택할 때",
    a1: { text: "레시피를 따라 정확하게 양념을 선택한다", tags: ["S"] },
    a2: { text: "감으로 직관적으로 양념을 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "새로운 양념을 시도할 때",
    a1: { text: "익숙한 양념이나 기본 양념을 선택한다", tags: ["S"] },
    a2: { text: "새로운 양념을 실험적으로 시도한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "요리를 시작하기 전에 양념을 준비할 때",
    a1: { text: "미리 준비하고 계획해서 양념을 준비한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 양념을 준비한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "여러 양념을 조합할 때",
    a1: { text: "정해진 조합으로 체계적으로 조합한다", tags: ["J"] },
    a2: { text: "즉흥 조합으로 자유롭게 조합한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그 양념을 써?'라고 물어볼 때",
    a1: { text: "맛과 감성을 위해 사용한다고 말한다", tags: ["F"] },
    a2: { text: "건강과 실용을 위해 사용한다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "양념을 넣을 때 양념을 측정할 때",
    a1: { text: "정확히 측정해서 양념을 넣는다", tags: ["J"] },
    a2: { text: "대략적으로 감으로 양념을 넣는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "양념을 사용할 때 친구가 와서 '나도 써보고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 양념을 공유한다", tags: ["E"] },
    a2: { text: "혼자만 사용한다", tags: ["I"] },
  },
  {
    id: 9,
    q: "양념을 저장할 때",
    a1: { text: "체계적으로 정리해서 저장한다", tags: ["J"] },
    a2: { text: "자유롭게 보관한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "새로운 양념을 시도할 때 빈도를 생각할 때",
    a1: { text: "자주 시도하고 적극적으로 시도한다", tags: ["E"] },
    a2: { text: "가끔 시도하고 신중하게 시도한다", tags: ["I"] },
  },
  {
    id: 11,
    q: "양념을 선택할 때 양념 종류를 고를 때",
    a1: { text: "전통 양념이나 기본 양념을 선택한다", tags: ["S"] },
    a2: { text: "퓨전 양념이나 창의 양념을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "양념을 사용하고 나서 기분이 좋을 때",
    a1: { text: "만족감과 성취감을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
]

export default function FoodSeasoningTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "food-seasoning",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-seasoning/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-seasoning/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("food-seasoning")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("food-seasoning", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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

