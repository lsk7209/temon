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
    q: "레시피를 처음 따라할 때",
    a1: { text: "레시피를 정확히 그대로 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 참고만 하고 자유롭게 만든다", tags: ["N", "P"] },
  },
  {
    id: 2,
    q: "레시피 계량",
    a1: { text: "정확한 계량을 사용한다", tags: ["S", "J"] },
    a2: { text: "대략적인 계량으로 만든다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "레시피 순서",
    a1: { text: "레시피 순서를 정확히 따른다", tags: ["J", "S"] },
    a2: { text: "순서를 바꿔도 괜찮다고 생각한다", tags: ["P", "N"] },
  },
  {
    id: 4,
    q: "레시피에 없는 재료가 있을 때",
    a1: { text: "재료를 사러 가거나 레시피를 바꾼다", tags: ["J", "S"] },
    a2: { text: "비슷한 재료로 대체해서 만든다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "레시피를 따라 요리할 때",
    a1: { text: "다른 사람과 함께 따라하며 즐긴다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 따라한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 선택",
    a1: { text: "검증된 익숙한 레시피를 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 레시피를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "레시피 실패",
    a1: { text: "레시피를 다시 확인하고 정확히 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 수정하거나 다른 방법을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 기록",
    a1: { text: "레시피를 정확히 기록하고 보관한다", tags: ["J", "S"] },
    a2: { text: "대략적으로만 기억하거나 기록하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "레시피 준비",
    a1: { text: "미리 재료를 준비하고 레시피를 읽는다", tags: ["J", "S"] },
    a2: { text: "그때그때 레시피를 보며 만든다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "레시피 완성도",
    a1: { text: "레시피대로 완벽하게 만드는 게 중요하다", tags: ["J", "T"] },
    a2: { text: "맛있으면 레시피와 다르더라도 괜찮다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "레시피 공유",
    a1: { text: "레시피를 정확히 공유한다", tags: ["J", "T"] },
    a2: { text: "대략적으로만 공유하거나 공유하지 않는다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "레시피 따르기 스타일",
    a1: { text: "정확하고 체계적으로 레시피를 따른다", tags: ["J", "S"] },
    a2: { text: "유연하고 자유롭게 레시피를 따른다", tags: ["P", "N"] },
  },
]

export default function CookingFollowTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-follow",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-follow/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-follow/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-follow")
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
      router.push("/tests/cooking-follow")
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

