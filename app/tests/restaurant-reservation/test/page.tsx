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
    q: "식당 예약을 할 때",
    a1: { text: "일주일 전부터 미리 예약한다", tags: ["J", "S"] },
    a2: { text: "당일이나 하루 전에 예약한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "예약할 식당을 선택할 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인하고 선택한다", tags: ["T", "S"] },
    a2: { text: "사진과 분위기로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "예약 시간을 정할 때",
    a1: { text: "정확한 시간을 정하고 지킨다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 정하고 유연하게 조정한다", tags: ["P", "F"] },
  },
  {
    id: 4,
    q: "예약을 함께 할 때",
    a1: { text: "다른 사람과 함께 식당을 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 정하고 알려준다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "예약이 꽉 찼을 때",
    a1: { text: "다른 날짜나 시간을 찾아본다", tags: ["J", "T"] },
    a2: { text: "그냥 다른 식당을 찾는다", tags: ["P", "F"] },
  },
  {
    id: 6,
    q: "예약을 취소해야 할 때",
    a1: { text: "미리 취소하고 다른 계획을 세운다", tags: ["J", "T"] },
    a2: { text: "마지막 순간까지 기다리다 취소한다", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "예약한 식당이 예상과 다를 때",
    a1: { text: "예약을 취소하고 다른 곳을 찾는다", tags: ["T", "J"] },
    a2: { text: "그냥 가서 즐긴다", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "예약 없이 갈 수 있는 식당을 발견했을 때",
    a1: { text: "예약이 필요 없는 게 편하다", tags: ["P", "N"] },
    a2: { text: "예약이 있는 게 안정적이다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "예약 확인을 받을 때",
    a1: { text: "확인 메시지를 받아서 안심된다", tags: ["S", "J"] },
    a2: { text: "확인 없이도 괜찮다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "예약 시간에 늦을 것 같을 때",
    a1: { text: "미리 연락하고 시간을 조정한다", tags: ["J", "T"] },
    a2: { text: "그냥 가서 상황을 설명한다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "예약한 식당을 추천할 때",
    a1: { text: "친구들에게 적극적으로 추천한다", tags: ["E", "F"] },
    a2: { text: "물어보면 알려준다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "예약 스타일",
    a1: { text: "계획적이고 체계적으로 예약한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 유연하게 예약한다", tags: ["P", "F"] },
  },
]

export default function RestaurantReservationTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-reservation",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-reservation/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-reservation/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("restaurant-reservation")
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
      router.push("/tests/restaurant-reservation")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-red-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-red-400 via-rose-500 to-pink-500" />
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
                    ? "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white shadow-lg transform scale-105"
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
              <p className="text-red-600 dark:text-red-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

