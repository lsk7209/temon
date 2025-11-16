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
    q: "메뉴 가격이 예상보다 비쌀 때",
    a1: { text: "가격 대비 품질을 따져본다", tags: ["T", "S"] },
    a2: { text: "분위기나 경험을 고려해 선택한다", tags: ["F", "N"] },
  },
  {
    id: 2,
    q: "저렴한 식당과 비싼 식당 중 선택할 때",
    a1: { text: "예산에 맞는 저렴한 식당을 선택한다", tags: ["T", "J"] },
    a2: { text: "특별한 날이면 비싼 식당도 간다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "가격이 비싸지만 맛있다는 평이 많을 때",
    a1: { text: "한 번쯤 경험해보고 싶다", tags: ["N", "P"] },
    a2: { text: "가격이 부담스러워서 망설인다", tags: ["S", "J"] },
  },
  {
    id: 4,
    q: "친구들이 비싼 식당을 가자고 할 때",
    a1: { text: "함께 가서 즐긴다", tags: ["E", "F"] },
    a2: { text: "예산을 고려해 다른 곳을 제안한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "할인 쿠폰이 있는 식당을 선택할 때",
    a1: { text: "할인 받을 수 있어서 좋다", tags: ["T", "S"] },
    a2: { text: "할인 여부보다 맛과 분위기가 중요하다", tags: ["F", "N"] },
  },
  {
    id: 6,
    q: "가격이 비슷한 식당들 중 선택할 때",
    a1: { text: "리뷰와 평점을 비교해 선택한다", tags: ["T", "J"] },
    a2: { text: "느낌과 분위기로 선택한다", tags: ["F", "P"] },
  },
  {
    id: 7,
    q: "예산을 초과하는 식당을 발견했을 때",
    a1: { text: "예산을 조정하거나 다른 날로 미룬다", tags: ["J", "T"] },
    a2: { text: "가끔은 예산을 넘어서도 간다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "가격이 저렴하지만 평이 나쁜 식당일 때",
    a1: { text: "가격이 저렴하면 한 번쯤 시도해본다", tags: ["N", "P"] },
    a2: { text: "평이 나쁘면 가지 않는다", tags: ["S", "J"] },
  },
  {
    id: 9,
    q: "혼자 식사할 때 가격대 선택",
    a1: { text: "저렴하고 간단한 곳을 선택한다", tags: ["I", "T"] },
    a2: { text: "혼자여도 좋은 곳을 가고 싶다", tags: ["E", "F"] },
  },
  {
    id: 10,
    q: "가격이 비싸지만 특별한 경험이 보장될 때",
    a1: { text: "특별한 경험을 위해 선택한다", tags: ["N", "F"] },
    a2: { text: "가격 대비 가치를 따져본다", tags: ["S", "T"] },
  },
  {
    id: 11,
    q: "가격이 예상보다 저렴할 때",
    a1: { text: "예상보다 저렴해서 만족한다", tags: ["S", "J"] },
    a2: { text: "품질이 걱정되기도 한다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "가격 정보 없이 식당을 선택할 때",
    a1: { text: "가격을 먼저 확인하고 결정한다", tags: ["T", "J"] },
    a2: { text: "일단 가보고 결정한다", tags: ["F", "P"] },
  },
]

export default function RestaurantPriceTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-price",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-price/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-price/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("restaurant-price")
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
      router.push("/tests/restaurant-price")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-yellow-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />
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
                    ? "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
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
              <p className="text-yellow-600 dark:text-yellow-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

