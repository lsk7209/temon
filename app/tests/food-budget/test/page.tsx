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
    q: "예산 관리 빈도는?",
    a1: { text: "정기적으로 같은 예산", tags: ["J"] },
    a2: { text: "매번 다른 예산", tags: ["P"] },
  },
  {
    id: 2,
    q: "예산 관리 계획은?",
    a1: { text: "미리 계획하고 관리", tags: ["J"] },
    a2: { text: "즉흥적으로 관리", tags: ["P"] },
  },
  {
    id: 3,
    q: "예산 관리 기준은?",
    a1: { text: "감각과 직감", tags: ["F"] },
    a2: { text: "논리와 정보", tags: ["T"] },
  },
  {
    id: 4,
    q: "예산 관리 변경은?",
    a1: { text: "고정된 예산 유지", tags: ["J"] },
    a2: { text: "자주 변경", tags: ["P"] },
  },
  {
    id: 5,
    q: "예산 관리 참여는?",
    a1: { text: "다른 사람과 함께 관리", tags: ["E"] },
    a2: { text: "혼자 관리", tags: ["I"] },
  },
  {
    id: 6,
    q: "예산 관리 패턴은?",
    a1: { text: "새로운 예산 시도", tags: ["N"] },
    a2: { text: "익숙한 예산 선택", tags: ["S"] },
  },
  {
    id: 7,
    q: "예산 관리 이유는?",
    a1: { text: "감각과 직감", tags: ["F"] },
    a2: { text: "논리와 정보", tags: ["T"] },
  },
  {
    id: 8,
    q: "예산 관리 대상은?",
    a1: { text: "다른 사람과 함께", tags: ["E"] },
    a2: { text: "혼자만 관리", tags: ["I"] },
  },
  {
    id: 9,
    q: "예산 관리 준비는?",
    a1: { text: "미리 준비", tags: ["J"] },
    a2: { text: "그때그때 관리", tags: ["P"] },
  },
  {
    id: 10,
    q: "예산 관리 경험 활용은?",
    a1: { text: "과거 경험 활용", tags: ["S"] },
    a2: { text: "새로운 시도", tags: ["N"] },
  },
  {
    id: 11,
    q: "예산 관리 후 행동은?",
    a1: { text: "즉시 다음 일", tags: ["E"] },
    a2: { text: "여유롭게 즐기기", tags: ["I"] },
  },
  {
    id: 12,
    q: "예산 관리 유연성은?",
    a1: { text: "유연하게 변경", tags: ["P"] },
    a2: { text: "고정된 방식 유지", tags: ["J"] },
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

