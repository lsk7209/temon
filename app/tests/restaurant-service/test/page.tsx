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
    q: "웨이터가 친절하게 맞이해줄 때",
    a1: { text: "기분이 좋아지고 만족감이 높아진다", tags: ["F"] },
    a2: { text: "당연한 서비스로 생각하고 크게 신경 쓰지 않는다", tags: ["T"] },
  },
  {
    id: 2,
    q: "서비스 속도가 빠를 때",
    a1: { text: "효율적이라고 생각하고 좋아한다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기고 싶어서 아쉽다", tags: ["F", "P"] },
  },
  {
    id: 3,
    q: "추가 서비스(물, 수저, 냅킨 등)를 먼저 제공할 때",
    a1: { text: "신경 쓰는 서비스라고 느껴서 좋다", tags: ["F", "S"] },
    a2: { text: "필요할 때 요청하는 게 더 효율적이다", tags: ["T", "N"] },
  },
  {
    id: 4,
    q: "웨이터가 메뉴를 추천해줄 때",
    a1: { text: "추천을 듣고 결정하는 게 편하다", tags: ["E", "P"] },
    a2: { text: "미리 정한 메뉴가 있어서 거절한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "서비스 불만이 있을 때",
    a1: { text: "직접 말해서 해결하려고 한다", tags: ["E", "T"] },
    a2: { text: "참고 다음엔 안 가려고 한다", tags: ["I", "F"] },
  },
  {
    id: 6,
    q: "웨이터가 대화를 시도할 때",
    a1: { text: "즐겁게 대화하며 분위기를 좋게 만든다", tags: ["E", "F"] },
    a2: { text: "최소한의 대화만 하고 조용히 식사한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "서비스가 느릴 때",
    a1: { text: "기다리는 동안 다른 일을 하거나 계획을 세운다", tags: ["J", "N"] },
    a2: { text: "그냥 기다리며 주변을 관찰한다", tags: ["P", "S"] },
  },
  {
    id: 8,
    q: "웨이터가 실수했을 때",
    a1: { text: "바로 지적하고 정정을 요청한다", tags: ["T", "J"] },
    a2: { text: "상황을 이해하고 너그럽게 넘어간다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "서비스가 과도하게 친절할 때",
    a1: { text: "부담스럽지만 예의상 받아준다", tags: ["F", "E"] },
    a2: { text: "불편해서 거절하거나 다른 곳을 찾는다", tags: ["T", "I"] },
  },
  {
    id: 10,
    q: "웨이터가 주문을 확인해줄 때",
    a1: { text: "확인해주는 게 안심이 되어 좋다", tags: ["S", "J"] },
    a2: { text: "불필요하다고 생각하고 스킵한다", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "서비스 품질이 일관되지 않을 때",
    a1: { text: "과거 경험을 바탕으로 예측 가능한 곳을 선호한다", tags: ["S", "J"] },
    a2: { text: "매번 다른 경험을 시도하는 게 재미있다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "웨이터가 특별 서비스를 제공할 때",
    a1: { text: "즐겁게 받고 감사 인사를 한다", tags: ["E", "F"] },
    a2: { text: "필요 없으면 거절하고 원하는 것만 요청한다", tags: ["I", "T"] },
  },
]

export default function RestaurantServiceTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-service",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-service/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-service/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("restaurant-service")
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
      router.push("/tests/restaurant-service")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-emerald-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
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
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg transform scale-105"
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
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
