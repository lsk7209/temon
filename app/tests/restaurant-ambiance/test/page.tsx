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
    q: "조명이 어둡고 로맨틱한 분위기일 때",
    a1: { text: "분위기 좋아서 좋다", tags: ["F", "N"] },
    a2: { text: "너무 어두워서 불편하다", tags: ["T", "S"] },
  },
  {
    id: 2,
    q: "음악이 크게 나오는 식당일 때",
    a1: { text: "활기찬 분위기라 좋다", tags: ["E", "P"] },
    a2: { text: "시끄러워서 집중이 안 된다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "인테리어가 화려하고 독특한 식당일 때",
    a1: { text: "새롭고 재미있어서 좋다", tags: ["N", "P"] },
    a2: { text: "과해서 불편하다", tags: ["S", "J"] },
  },
  {
    id: 4,
    q: "조용하고 차분한 분위기의 식당일 때",
    a1: { text: "편안하고 좋다", tags: ["I", "J"] },
    a2: { text: "너무 조용해서 답답하다", tags: ["E", "P"] },
  },
  {
    id: 5,
    q: "사람들이 많아서 북적이는 식당일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄럽고 불편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "창가 자리와 안쪽 자리 중 선택할 때",
    a1: { text: "밖이 보이는 창가 자리를 선호한다", tags: ["N", "E"] },
    a2: { text: "조용한 안쪽 자리를 선호한다", tags: ["S", "I"] },
  },
  {
    id: 7,
    q: "테이블 간격이 좁아서 옆 테이블이 들릴 때",
    a1: { text: "불편하지만 참는다", tags: ["F", "I"] },
    a2: { text: "바로 다른 자리로 옮긴다", tags: ["T", "E"] },
  },
  {
    id: 8,
    q: "분위기가 익숙한 식당과 새로운 식당 중 선택할 때",
    a1: { text: "새로운 분위기를 경험하고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 분위기가 편하다", tags: ["S", "J"] },
  },
  {
    id: 9,
    q: "야외 테라스와 실내 중 선택할 때",
    a1: { text: "야외 분위기가 좋아서 선호한다", tags: ["E", "N"] },
    a2: { text: "실내가 편하고 안정적이다", tags: ["I", "S"] },
  },
  {
    id: 10,
    q: "분위기가 예상과 다를 때",
    a1: { text: "그냥 받아들이고 즐긴다", tags: ["P", "F"] },
    a2: { text: "불만스럽고 다른 곳을 찾는다", tags: ["J", "T"] },
  },
  {
    id: 11,
    q: "친구들과 함께 갈 때 분위기 선택",
    a1: { text: "친구들이 좋아하는 분위기를 고려한다", tags: ["E", "F"] },
    a2: { text: "내가 선호하는 분위기를 선택한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "분위기가 완벽한 식당을 찾았을 때",
    a1: { text: "자주 가는 단골 식당이 된다", tags: ["S", "J"] },
    a2: { text: "다음엔 또 다른 곳을 시도한다", tags: ["N", "P"] },
  },
]

export default function RestaurantAmbianceTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-ambiance",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-ambiance/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-ambiance/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("restaurant-ambiance")
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
      router.push("/tests/restaurant-ambiance")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-indigo-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-indigo-400 via-blue-500 to-sky-500" />
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
                    ? "bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 text-white shadow-lg transform scale-105"
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
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

