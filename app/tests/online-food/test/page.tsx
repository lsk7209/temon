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
    q: "온라인으로 음식을 주문할 때",
    a1: { text: "미리 생각한 메뉴를 바로 주문한다", tags: ["J", "S"] },
    a2: { text: "사이트를 보면서 새로 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "온라인 주문 사이트를 선택할 때",
    a1: { text: "항상 사용하던 사이트를 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 사이트도 시도해본다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "온라인 주문 메뉴를 고를 때",
    a1: { text: "리뷰와 평점을 꼼꼼히 확인한다", tags: ["T", "S"] },
    a2: { text: "사진과 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "온라인 주문 옵션을 선택할 때",
    a1: { text: "필요한 옵션만 정확히 선택한다", tags: ["T", "J"] },
    a2: { text: "대략적으로 선택하거나 기본값을 사용한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "온라인 주문을 함께 할 때",
    a1: { text: "다른 사람과 함께 메뉴를 정한다", tags: ["E", "F"] },
    a2: { text: "혼자 주문하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "온라인 주문 배송 시간",
    a1: { text: "정확한 시간에 맞춰 주문한다", tags: ["J", "T"] },
    a2: { text: "대략적인 시간만 생각하고 주문한다", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "온라인 주문 후 변경하고 싶을 때",
    a1: { text: "바로 취소하고 다시 주문한다", tags: ["P", "E"] },
    a2: { text: "그냥 받고 다음에 주문한다", tags: ["J", "I"] },
  },
  {
    id: 8,
    q: "온라인 주문 쿠폰을 사용할 때",
    a1: { text: "쿠폰을 미리 확인하고 사용한다", tags: ["S", "J"] },
    a2: { text: "주문하다가 발견하면 사용한다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "온라인 주문 리뷰를 남길 때",
    a1: { text: "상세하게 리뷰를 작성한다", tags: ["S", "J"] },
    a2: { text: "간단하게만 작성하거나 작성하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "온라인 주문이 늦게 도착했을 때",
    a1: { text: "불만을 표현하고 해결을 요청한다", tags: ["T", "E"] },
    a2: { text: "그냥 받고 다음엔 다른 곳을 주문한다", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "온라인 주문 후",
    a1: { text: "배송 추적을 확인하고 기다린다", tags: ["J", "S"] },
    a2: { text: "다른 일을 하다가 도착하면 받는다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "온라인 주문 스타일",
    a1: { text: "계획적이고 체계적으로 주문한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 주문한다", tags: ["P", "F"] },
  },
]

export default function OnlineFoodTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "online-food",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/online-food/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/online-food/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("online-food")
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
      router.push("/tests/online-food")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-blue-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
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
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
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
              <p className="text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

