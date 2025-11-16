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
    q: "새로운 매장을 발견했을 때",
    a1: { text: "즉시 들어가서 둘러본다", tags: ["E", "P"] },
    a2: { text: "리뷰를 확인하고 신중하게 결정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "매장 선택 기준",
    a1: { text: "가격, 위치, 평점 등 객관적 정보를 비교한다", tags: ["T", "S"] },
    a2: { text: "분위기와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "단골 매장이 생겼을 때",
    a1: { text: "계속 같은 매장을 이용한다", tags: ["S", "J"] },
    a2: { text: "다양한 매장을 시도하고 싶다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "매장에 갈 때",
    a1: { text: "친구나 가족과 함께 가는 게 좋다", tags: ["E", "F"] },
    a2: { text: "혼자 가는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "매장이 예상과 다를 때",
    a1: { text: "그냥 받아들이고 즐긴다", tags: ["P", "F"] },
    a2: { text: "불만스럽고 다른 매장을 찾는다", tags: ["J", "T"] },
  },
  {
    id: 6,
    q: "매장 선택을 미리 계획할 때",
    a1: { text: "시간과 장소를 정확히 계획한다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 생각하고 유연하게 결정한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "매장 직원이 친절할 때",
    a1: { text: "직원과 대화하며 즐겁게 쇼핑한다", tags: ["E", "F"] },
    a2: { text: "최소한의 대화만 하고 조용히 쇼핑한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "매장에서 물건을 고를 때",
    a1: { text: "여러 제품을 비교하고 신중하게 선택한다", tags: ["T", "J"] },
    a2: { text: "첫 인상 좋은 제품을 바로 선택한다", tags: ["F", "P"] },
  },
  {
    id: 9,
    q: "매장이 북적일 때",
    a1: { text: "활기차고 좋다", tags: ["E", "F"] },
    a2: { text: "시끄러워서 불편하다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "매장에서 할인 상품을 발견했을 때",
    a1: { text: "할인율과 품질을 확인하고 구매한다", tags: ["T", "S"] },
    a2: { text: "할인이라면 바로 구매한다", tags: ["F", "N"] },
  },
  {
    id: 11,
    q: "매장 선택 후",
    a1: { text: "친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "혼자만의 경험으로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "매장 선택 스타일",
    a1: { text: "계획적이고 체계적으로 선택한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 선택한다", tags: ["P", "F"] },
  },
]

export default function StoreChoiceTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "store-choice",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/store-choice/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/store-choice/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("store-choice")
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
      router.push("/tests/store-choice")
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

