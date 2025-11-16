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
    q: "새로운 레시피를 만들 때",
    a1: { text: "완전히 새로운 조합을 시도한다", tags: ["N", "P"] },
    a2: { text: "기존 레시피를 변형해서 만든다", tags: ["S", "J"] },
  },
  {
    id: 2,
    q: "레시피를 창조하는 방식",
    a1: { text: "느낌과 직감으로 재료를 선택한다", tags: ["F", "N"] },
    a2: { text: "과학적 원리와 비율을 고려한다", tags: ["T", "S"] },
  },
  {
    id: 3,
    q: "레시피를 기록할 때",
    a1: { text: "대략적으로만 기억하거나 기록한다", tags: ["P", "N"] },
    a2: { text: "정확한 계량과 순서를 기록한다", tags: ["J", "S"] },
  },
  {
    id: 4,
    q: "레시피가 실패했을 때",
    a1: { text: "즉시 다른 방법을 시도한다", tags: ["E", "P"] },
    a2: { text: "원인을 분석하고 다시 계획한다", tags: ["I", "J"] },
  },
  {
    id: 5,
    q: "레시피를 공유할 때",
    a1: { text: "즉시 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "완성도가 높아지면 공유한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피 창조 영감",
    a1: { text: "새로운 음식이나 트렌드에서 얻는다", tags: ["N", "P"] },
    a2: { text: "과거 경험과 전통에서 얻는다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "레시피를 개선할 때",
    a1: { text: "여러 번 시도하며 점진적으로 개선한다", tags: ["S", "J"] },
    a2: { text: "큰 변화를 주며 실험한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "레시피 창조 환경",
    a1: { text: "다른 사람과 함께 만들며 아이디어를 나눈다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 만든다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "레시피 준비",
    a1: { text: "미리 재료와 계획을 세운다", tags: ["J", "S"] },
    a2: { text: "그때그때 있는 재료로 만든다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "레시피 완성 후",
    a1: { text: "즉시 다음 레시피를 생각한다", tags: ["E", "N"] },
    a2: { text: "이 레시피를 완벽하게 다듬는다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "레시피 창조 목적",
    a1: { text: "새로운 경험과 재미를 위해", tags: ["N", "F"] },
    a2: { text: "실용적이고 효율적인 레시피를 위해", tags: ["S", "T"] },
  },
  {
    id: 12,
    q: "레시피 창조 스타일",
    a1: { text: "자유롭고 유연하게 창조한다", tags: ["P", "N"] },
    a2: { text: "체계적이고 계획적으로 창조한다", tags: ["J", "S"] },
  },
]

export default function CookingCreateTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-create",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-create/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-create/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-create")
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
      router.push("/tests/cooking-create")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-amber-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
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
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg transform scale-105"
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
              <p className="text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

