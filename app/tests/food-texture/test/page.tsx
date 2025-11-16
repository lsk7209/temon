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
    q: "디저트를 고를 때 '부드러운 질감'과 '쫄깃한 질감' 중 선택할 때",
    a1: { text: "부드러운 질감을 선택한다", tags: ["F"] },
    a2: { text: "쫄깃한 질감을 선택한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "면 요리를 주문할 때 '부드러운 면'과 '쫄깃한 면' 중 선택할 때",
    a1: { text: "부드러운 면을 선택한다", tags: ["F"] },
    a2: { text: "쫄깃한 면을 선택한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "친구가 '왜 그 질감을 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 기분에 따라 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율에 따라 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "새로운 질감의 음식을 시도할 때",
    a1: { text: "익숙한 질감을 선택한다", tags: ["S"] },
    a2: { text: "새로운 질감을 시도해본다", tags: ["N"] },
  },
  {
    id: 5,
    q: "맛있는 질감의 음식을 발견했을 때 친구에게 공유하고 싶을 때",
    a1: { text: "적극적으로 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 6,
    q: "음식의 질감을 즐길 때",
    a1: { text: "즉시 바로 즐긴다", tags: ["E"] },
    a2: { text: "천천히 여유롭게 즐긴다", tags: ["I"] },
  },
  {
    id: 7,
    q: "여러 질감의 음식을 조합할 때",
    a1: { text: "계획적으로 조합한다", tags: ["J"] },
    a2: { text: "즉흥적으로 조합한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "음식의 질감을 경험하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 효율성을 느낀다", tags: ["T"] },
  },
  {
    id: 9,
    q: "음식의 질감을 선호하는 이유를 생각할 때",
    a1: { text: "감성적인 이유로 선호한다", tags: ["F"] },
    a2: { text: "논리적인 이유로 선호한다", tags: ["T"] },
  },
  {
    id: 10,
    q: "음식의 질감이 예상과 다를 때",
    a1: { text: "즉시 대응해서 조정한다", tags: ["J"] },
    a2: { text: "유연하게 대응한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "음식의 질감을 선택할 때 스타일을 고를 때",
    a1: { text: "전통적이고 익숙한 질감을 선택한다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 질감을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "음식의 질감 경험을 친구에게 공유하고 싶을 때",
    a1: { text: "즐겁게 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
]

export default function FoodTextureTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "food-texture",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-texture/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-texture/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("food-texture")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("food-texture", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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

