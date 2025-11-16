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
    q: "전통 시장과 대형마트 중 선택할 때",
    a1: { text: "가격과 신선도를 비교해 선택한다", tags: ["T", "S"] },
    a2: { text: "분위기와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 2,
    q: "시장을 선택할 때",
    a1: { text: "항상 가던 익숙한 시장을 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 시장을 탐험하고 싶다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "시장에 갈 때",
    a1: { text: "친구나 가족과 함께 가는 게 좋다", tags: ["E", "F"] },
    a2: { text: "혼자 가는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "시장에서 물건을 살 때",
    a1: { text: "여러 곳을 비교하고 구매한다", tags: ["T", "J"] },
    a2: { text: "첫 인상 좋은 곳에서 바로 산다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "시장 상인과 흥정할 때",
    a1: { text: "적극적으로 흥정한다", tags: ["E", "T"] },
    a2: { text: "부끄러워서 흥정하지 않는다", tags: ["I", "F"] },
  },
  {
    id: 6,
    q: "시장에서 길을 잃었을 때",
    a1: { text: "지도를 보거나 물어본다", tags: ["S", "J"] },
    a2: { text: "그냥 돌아다니며 발견한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "시장에서 샘플을 받았을 때",
    a1: { text: "고맙게 받고 구매한다", tags: ["F", "E"] },
    a2: { text: "필요 없으면 거절한다", tags: ["T", "I"] },
  },
  {
    id: 8,
    q: "시장에서 계획에 없는 물건을 발견했을 때",
    a1: { text: "계획대로 필요한 것만 산다", tags: ["J", "T"] },
    a2: { text: "마음에 들면 즉흥적으로 산다", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "시장 분위기가 북적일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄러워서 불편하다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "시장에서 물건을 고를 때",
    a1: { text: "품질과 신선도를 꼼꼼히 확인한다", tags: ["S", "J"] },
    a2: { text: "대략적으로 보고 선택한다", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "시장에서 쇼핑 후",
    a1: { text: "친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "시장 선택 기준",
    a1: { text: "가격, 위치, 품질 등 객관적 기준으로 선택한다", tags: ["T", "S"] },
    a2: { text: "느낌과 분위기로 선택한다", tags: ["F", "N"] },
  },
]

export default function MarketChoiceTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "market-choice",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/market-choice/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/market-choice/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("market-choice")
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
      router.push("/tests/market-choice")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-orange-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500" />
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
                    ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg transform scale-105"
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
              <p className="text-orange-600 dark:text-orange-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

