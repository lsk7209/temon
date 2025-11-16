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
    q: "한 달 음식 예산을 정할 때",
    a1: { text: "구체적인 금액을 정하고 지킨다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 생각하고 유연하게 쓴다", tags: ["P", "F"] },
  },
  {
    id: 2,
    q: "예산을 초과할 것 같을 때",
    a1: { text: "다음 달로 미루거나 다른 곳에서 줄인다", tags: ["J", "T"] },
    a2: { text: "가끔은 초과해도 괜찮다고 생각한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "음식 예산을 기록할 때",
    a1: { text: "앱이나 가계부에 꼼꼼히 기록한다", tags: ["S", "J"] },
    a2: { text: "대략적으로만 기억하거나 기록하지 않는다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "예상치 못한 음식 지출이 생겼을 때",
    a1: { text: "예산을 재조정하고 계획을 수정한다", tags: ["J", "T"] },
    a2: { text: "그냥 지출하고 나중에 생각한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "친구들과 식사할 때 예산",
    a1: { text: "예산을 미리 말하거나 고려한다", tags: ["T", "I"] },
    a2: { text: "분위기에 맞춰서 결정한다", tags: ["F", "E"] },
  },
  {
    id: 6,
    q: "할인이나 특가를 발견했을 때",
    a1: { text: "예산 범위 내에서만 구매한다", tags: ["J", "S"] },
    a2: { text: "할인이라면 예산을 넘어서도 산다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "음식 예산을 나누어 관리할 때",
    a1: { text: "외식/배달/장보기 등으로 세분화한다", tags: ["S", "J"] },
    a2: { text: "전체적으로만 관리한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "예산이 남았을 때",
    a1: { text: "다음 달로 넘기거나 저축한다", tags: ["J", "T"] },
    a2: { text: "특별한 음식을 먹거나 친구를 만난다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "예산 계획을 세울 때",
    a1: { text: "과거 지출을 분석해 현실적으로 계획한다", tags: ["S", "J"] },
    a2: { text: "느낌과 상황에 맞춰 대략적으로 계획한다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "예산을 초과했는지 확인할 때",
    a1: { text: "정기적으로 확인하고 관리한다", tags: ["J", "S"] },
    a2: { text: "필요할 때만 확인하거나 확인하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "예산이 부족할 때",
    a1: { text: "계획을 세워서 절약한다", tags: ["J", "T"] },
    a2: { text: "그때그때 상황에 맞춰 대처한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "음식 예산 관리의 목적",
    a1: { text: "재정 관리와 계획을 위해 필요하다", tags: ["T", "J"] },
    a2: { text: "대략적인 가이드라인 정도로 생각한다", tags: ["F", "P"] },
  },
]

export default function FoodBudgetTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "food-budget",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-budget/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-budget/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("food-budget")
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
      router.push("/tests/food-budget")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-green-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
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
                    ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg transform scale-105"
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
              <p className="text-green-600 dark:text-green-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

