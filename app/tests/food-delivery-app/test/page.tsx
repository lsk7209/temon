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
    q: "배달 앱을 켤 때",
    a1: { text: "먼저 카테고리부터 정한다", tags: ["J", "S"] },
    a2: { text: "추천 메뉴부터 본다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "배달 앱에서 메뉴를 고를 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인한다", tags: ["T", "S"] },
    a2: { text: "사진과 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "배달 앱 사용 빈도",
    a1: { text: "정기적으로 같은 시간에 주문한다", tags: ["J", "S"] },
    a2: { text: "필요할 때마다 즉흥적으로 주문한다", tags: ["P", "N"] },
  },
  {
    id: 4,
    q: "배달 앱에서 할인 쿠폰을 발견했을 때",
    a1: { text: "쿠폰을 확인하고 계획적으로 사용한다", tags: ["J", "T"] },
    a2: { text: "즉시 사용하거나 나중에 사용한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "배달 앱으로 함께 주문할 때",
    a1: { text: "다른 사람과 함께 메뉴를 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 주문하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "배달 앱에서 새로운 가게를 발견했을 때",
    a1: { text: "리뷰를 확인하고 신중하게 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 가게를 바로 시도해본다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "배달 앱에서 주문을 취소하고 싶을 때",
    a1: { text: "바로 취소하고 다시 주문한다", tags: ["P", "E"] },
    a2: { text: "취소하기 부담스러워서 그냥 받는다", tags: ["J", "I"] },
  },
  {
    id: 8,
    q: "배달 앱에서 배달 시간을 선택할 때",
    a1: { text: "정확한 시간에 맞춰 주문한다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 생각한다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "배달 앱에서 리뷰를 남길 때",
    a1: { text: "상세하게 리뷰를 작성한다", tags: ["S", "J"] },
    a2: { text: "간단하게만 작성하거나 작성하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "배달 앱에서 배달이 늦었을 때",
    a1: { text: "고객센터에 문의하고 해결을 요청한다", tags: ["T", "E"] },
    a2: { text: "그냥 기다리고 다음엔 다른 앱을 사용한다", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "배달 앱 사용 후",
    a1: { text: "배달 추적을 확인하고 기다린다", tags: ["J", "S"] },
    a2: { text: "다른 일을 하다가 도착하면 받는다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "배달 앱 사용 스타일",
    a1: { text: "계획적이고 체계적으로 사용한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 사용한다", tags: ["P", "F"] },
  },
]

export default function FoodDeliveryAppTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "food-delivery-app",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-delivery-app/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-delivery-app/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("food-delivery-app")
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
      router.push("/tests/food-delivery-app")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-cyan-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500" />
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
                    ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg transform scale-105"
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
              <p className="text-cyan-600 dark:text-cyan-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

