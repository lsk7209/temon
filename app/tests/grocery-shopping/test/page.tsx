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
    q: "장보기 리스트를 만들 때",
    a1: { text: "카테고리별로 정리해서 만든다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 적거나 만들지 않는다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "마트에서 장보기 순서",
    a1: { text: "계획된 순서대로 구매한다", tags: ["J", "T"] },
    a2: { text: "보이는 대로 구매한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "장보기할 때",
    a1: { text: "혼자 조용히 장보는 게 편하다", tags: ["I", "T"] },
    a2: { text: "가족이나 친구와 함께 가는 게 좋다", tags: ["E", "F"] },
  },
  {
    id: 4,
    q: "계획에 없는 상품을 발견했을 때",
    a1: { text: "필요한지 생각하고 구매한다", tags: ["T", "J"] },
    a2: { text: "마음에 들면 즉시 구매한다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "상품을 고를 때",
    a1: { text: "유통기한, 원산지, 가격을 확인한다", tags: ["S", "J"] },
    a2: { text: "보이는 대로 느낌으로 선택한다", tags: ["N", "P"] },
  },
  {
    id: 6,
    q: "신상품을 발견했을 때",
    a1: { text: "새로운 상품을 시도해보고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 상품이 더 안전하다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "장보기 중 리스트를 잊어버렸을 때",
    a1: { text: "핸드폰으로 확인하거나 기억을 되살린다", tags: ["S", "J"] },
    a2: { text: "보이는 대로 필요한 것만 산다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "장보기 예산을 초과할 것 같을 때",
    a1: { text: "계획을 조정하고 필요한 것만 산다", tags: ["J", "T"] },
    a2: { text: "그냥 구매하고 나중에 생각한다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "장보기 빈도",
    a1: { text: "정기적으로 한 번에 많이 산다", tags: ["J", "S"] },
    a2: { text: "필요할 때마다 자주 간다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "장보기 후 계산할 때",
    a1: { text: "계산 전에 대략 금액을 예상한다", tags: ["T", "J"] },
    a2: { text: "계산할 때까지 금액을 생각하지 않는다", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "장보기 후",
    a1: { text: "구매한 물건을 정리하고 기록한다", tags: ["J", "S"] },
    a2: { text: "그냥 두고 필요할 때 사용한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "장보기 스타일",
    a1: { text: "체계적이고 계획적으로 장보기", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 장보기", tags: ["P", "F"] },
  },
]

export default function GroceryShoppingTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "grocery-shopping",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/grocery-shopping/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/grocery-shopping/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("grocery-shopping")
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
      router.push("/tests/grocery-shopping")
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

