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
    q: "마트에서 할인 스티커를 발견했을 때",
    a1: { text: "할인율을 확인하고 필요한지 판단한다", tags: ["T", "J"] },
    a2: { text: "할인이라면 일단 관심이 생긴다", tags: ["F", "P"] },
  },
  {
    id: 2,
    q: "1+1 할인 상품을 볼 때",
    a1: { text: "정말 필요한지 생각하고 구매한다", tags: ["T", "S"] },
    a2: { text: "저렴하니까 일단 산다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "할인 정보를 알게 되었을 때",
    a1: { text: "친구들에게 공유하고 함께 간다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 가서 구매한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "할인 상품이 유통기한이 임박했을 때",
    a1: { text: "빨리 먹을 수 있으면 구매한다", tags: ["S", "J"] },
    a2: { text: "유통기한이 걱정되어 피한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "할인율이 높은 상품을 발견했을 때",
    a1: { text: "원래 가격과 품질을 비교해본다", tags: ["T", "S"] },
    a2: { text: "할인율이 높으면 바로 구매한다", tags: ["F", "N"] },
  },
  {
    id: 6,
    q: "할인 상품이 평소에 안 먹던 음식일 때",
    a1: { text: "새로운 음식을 시도해볼 기회라고 생각한다", tags: ["N", "P"] },
    a2: { text: "익숙한 음식만 할인해도 산다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "할인 쿠폰을 받았을 때",
    a1: { text: "계획적으로 사용할 곳을 정한다", tags: ["J", "T"] },
    a2: { text: "기회가 되면 바로 사용한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "할인 상품이 예상보다 많을 때",
    a1: { text: "필요한 것만 골라서 산다", tags: ["T", "J"] },
    a2: { text: "할인 상품을 많이 사서 재고를 만든다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "할인 정보를 찾을 때",
    a1: { text: "앱이나 광고지를 체계적으로 확인한다", tags: ["S", "J"] },
    a2: { text: "우연히 발견하거나 주변에서 듣는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "할인 상품을 구매한 후",
    a1: { text: "얼마나 절약했는지 계산해본다", tags: ["T", "S"] },
    a2: { text: "할인 받아서 기분이 좋다", tags: ["F", "N"] },
  },
  {
    id: 11,
    q: "할인 상품이 품질이 의심스러울 때",
    a1: { text: "품질을 확인하고 신중하게 결정한다", tags: ["T", "J"] },
    a2: { text: "할인이라면 한 번쯤 시도해본다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "할인 기간이 끝나기 전",
    a1: { text: "미리 계획해서 구매한다", tags: ["J", "S"] },
    a2: { text: "마지막 날에 가서 구매한다", tags: ["P", "N"] },
  },
]

export default function FoodSaleTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "food-sale",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-sale/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-sale/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("food-sale")
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
      router.push("/tests/food-sale")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-pink-600 dark:text-pink-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-pink-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-pink-400 via-rose-500 to-red-500" />
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
                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-lg transform scale-105"
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
              <p className="text-pink-600 dark:text-pink-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

