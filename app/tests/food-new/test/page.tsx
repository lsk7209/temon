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
    q: "마트에서 신상품을 발견했을 때",
    a1: { text: "즉시 관심이 생기고 바로 구매하고 싶다", tags: ["E", "P"] },
    a2: { text: "리뷰를 확인하고 신중하게 판단한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "신상품이 평이 좋다는 소식을 들었을 때",
    a1: { text: "친구들에게 물어보고 함께 시도해본다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 정보를 수집하고 결정한다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "신상품 가격이 비쌀 때",
    a1: { text: "가격보다 새로운 경험이 중요하다고 생각한다", tags: ["F", "N"] },
    a2: { text: "가격 대비 가치를 따져보고 결정한다", tags: ["T", "S"] },
  },
  {
    id: 4,
    q: "신상품이 예상과 다를 때",
    a1: { text: "새로운 경험이라 생각하고 즐긴다", tags: ["P", "N"] },
    a2: { text: "실망스럽고 다음에는 신중하게 선택한다", tags: ["J", "S"] },
  },
  {
    id: 5,
    q: "신상품을 시도한 후",
    a1: { text: "즉시 친구들에게 추천하거나 피드백을 준다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직하거나 기록한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "신상품이 트렌드일 때",
    a1: { text: "트렌드를 따라가며 시도하는 게 즐겁다", tags: ["E", "P"] },
    a2: { text: "트렌드보다 자신의 취향을 우선한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "신상품을 선택할 때",
    a1: { text: "포장지와 디자인이 마음에 들면 선택한다", tags: ["F", "N"] },
    a2: { text: "원재료와 영양 정보를 확인하고 선택한다", tags: ["T", "S"] },
  },
  {
    id: 8,
    q: "신상품이 실패했을 때",
    a1: { text: "다른 신상품을 계속 시도해본다", tags: ["P", "N"] },
    a2: { text: "익숙한 제품으로 돌아간다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "신상품 정보를 얻을 때",
    a1: { text: "SNS나 광고에서 우연히 발견한다", tags: ["E", "P"] },
    a2: { text: "체계적으로 정보를 수집하고 비교한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "신상품을 시도하는 빈도",
    a1: { text: "자주 새로운 상품을 시도하는 편이다", tags: ["E", "P"] },
    a2: { text: "가끔만 신중하게 시도한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "신상품과 기존 제품 중 선택할 때",
    a1: { text: "신상품을 먼저 시도해본다", tags: ["N", "P"] },
    a2: { text: "검증된 기존 제품을 선택한다", tags: ["S", "J"] },
  },
  {
    id: 12,
    q: "신상품 시도 스타일",
    a1: { text: "즉흥적이고 모험적으로 시도한다", tags: ["P", "N"] },
    a2: { text: "계획적이고 신중하게 시도한다", tags: ["J", "S"] },
  },
]

export default function FoodNewTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "food-new",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-new/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-new/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("food-new")
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
      router.push("/tests/food-new")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-purple-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500" />
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
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-lg transform scale-105"
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
              <p className="text-purple-600 dark:text-purple-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

