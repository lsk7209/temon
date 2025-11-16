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
    q: "레시피를 따라 요리할 때",
    a1: { text: "레시피를 그대로 정확히 따른다", tags: ["S", "J"] },
    a2: { text: "레시피를 참고만 하고 자유롭게 수정한다", tags: ["N", "P"] },
  },
  {
    id: 2,
    q: "레시피 수정 이유",
    a1: { text: "맛을 개선하거나 취향에 맞추기 위해", tags: ["F", "S"] },
    a2: { text: "새로운 시도를 하거나 실험하기 위해", tags: ["T", "N"] },
  },
  {
    id: 3,
    q: "레시피를 수정할 때",
    a1: { text: "한 가지씩 조금씩 수정한다", tags: ["S", "J"] },
    a2: { text: "여러 가지를 한 번에 바꾼다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "레시피 수정 결과",
    a1: { text: "수정한 내용을 기록하고 비교한다", tags: ["T", "J"] },
    a2: { text: "느낌으로 판단하고 기록하지 않는다", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "레시피 수정을 공유할 때",
    a1: { text: "즉시 다른 사람에게 알려준다", tags: ["E", "F"] },
    a2: { text: "혼자만 수정하고 공유하지 않는다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 수정 기준",
    a1: { text: "과거 경험과 검증된 방법을 사용한다", tags: ["S", "J"] },
    a2: { text: "직감과 새로운 아이디어를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "레시피 수정이 실패했을 때",
    a1: { text: "원래 레시피로 돌아간다", tags: ["S", "J"] },
    a2: { text: "다른 방법을 계속 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 수정 빈도",
    a1: { text: "같은 레시피를 여러 번 수정한다", tags: ["P", "N"] },
    a2: { text: "한 번 수정하면 그대로 유지한다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "레시피 수정 계획",
    a1: { text: "미리 어떤 부분을 수정할지 계획한다", tags: ["J", "T"] },
    a2: { text: "요리하면서 즉흥적으로 수정한다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "레시피 수정 후",
    a1: { text: "수정한 레시피를 정리하고 저장한다", tags: ["J", "S"] },
    a2: { text: "그냥 기억에만 남긴다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "레시피 수정 스타일",
    a1: { text: "조금씩 신중하게 수정한다", tags: ["S", "J"] },
    a2: { text: "대담하게 크게 수정한다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "레시피 수정 목적",
    a1: { text: "완벽한 레시피를 만들기 위해", tags: ["J", "T"] },
    a2: { text: "재미와 다양성을 위해", tags: ["P", "F"] },
  },
]

export default function CookingModifyTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-modify",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-modify/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-modify/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-modify")
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
      router.push("/tests/cooking-modify")
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

