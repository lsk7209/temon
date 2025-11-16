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
    q: "메뉴판을 받았을 때",
    a1: { text: "미리 생각한 메뉴를 바로 주문한다", tags: ["J", "S"] },
    a2: { text: "메뉴판을 보면서 새로 결정한다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "웨이터가 추천 메뉴를 제안할 때",
    a1: { text: "추천을 듣고 결정하는 게 편하다", tags: ["E", "P"] },
    a2: { text: "이미 정한 메뉴가 있어서 거절한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "메뉴 선택 기준",
    a1: { text: "리뷰와 평점을 보고 선택한다", tags: ["T", "S"] },
    a2: { text: "보고 싶은 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "단골 메뉴가 있을 때",
    a1: { text: "항상 같은 메뉴를 주문한다", tags: ["S", "J"] },
    a2: { text: "매번 다른 메뉴를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "친구들과 함께 메뉴를 선택할 때",
    a1: { text: "다른 사람 의견을 듣고 함께 결정한다", tags: ["E", "F"] },
    a2: { text: "내가 먹고 싶은 메뉴를 선택한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "신메뉴가 나왔을 때",
    a1: { text: "새로운 메뉴를 시도해보고 싶다", tags: ["N", "P"] },
    a2: { text: "익숙한 메뉴가 더 안전하다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "메뉴 가격을 볼 때",
    a1: { text: "가격을 고려해서 선택한다", tags: ["T", "J"] },
    a2: { text: "가격보다 맛과 분위기가 중요하다", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "메뉴 설명이 복잡할 때",
    a1: { text: "설명을 꼼꼼히 읽고 이해한다", tags: ["S", "J"] },
    a2: { text: "대략적으로만 보고 선택한다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "메뉴를 고르는 시간",
    a1: { text: "빠르게 결정한다", tags: ["J", "T"] },
    a2: { text: "한참 고민한다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "메뉴가 마음에 안 들 때",
    a1: { text: "다른 메뉴로 변경한다", tags: ["P", "E"] },
    a2: { text: "그냥 선택한 메뉴를 주문한다", tags: ["J", "I"] },
  },
  {
    id: 11,
    q: "메뉴 선택 후",
    a1: { text: "다른 사람이 뭘 시키는지 궁금하다", tags: ["E", "F"] },
    a2: { text: "내 메뉴에만 집중한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "메뉴를 선택하는 스타일",
    a1: { text: "계획적이고 체계적으로 선택한다", tags: ["J", "S"] },
    a2: { text: "즉흥적이고 감성적으로 선택한다", tags: ["P", "N"] },
  },
]

export default function RestaurantMenuTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-menu",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-menu/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-menu/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("restaurant-menu")
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
      router.push("/tests/restaurant-menu")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-violet-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500" />
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
                    ? "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg transform scale-105"
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
              <p className="text-violet-600 dark:text-violet-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

