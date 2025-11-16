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
    q: "항상 사던 브랜드가 품절되었을 때",
    a1: { text: "다른 매장을 찾아서라도 같은 브랜드를 찾는다", tags: ["J", "S"] },
    a2: { text: "비슷한 다른 브랜드를 시도해본다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "새로운 브랜드가 더 저렴할 때",
    a1: { text: "가격 대비 품질을 비교하고 신중하게 결정한다", tags: ["T", "S"] },
    a2: { text: "저렴하니까 한 번 시도해본다", tags: ["F", "N"] },
  },
  {
    id: 3,
    q: "브랜드 이미지와 품질 중 선택할 때",
    a1: { text: "품질을 우선시하고 선택한다", tags: ["T", "S"] },
    a2: { text: "브랜드 이미지와 느낌으로 선택한다", tags: ["F", "N"] },
  },
  {
    id: 4,
    q: "단골 브랜드가 가격을 올렸을 때",
    a1: { text: "여전히 같은 브랜드를 선택한다", tags: ["J", "F"] },
    a2: { text: "다른 브랜드를 찾아본다", tags: ["P", "T"] },
  },
  {
    id: 5,
    q: "브랜드를 선택할 때",
    a1: { text: "친구들과 브랜드에 대해 이야기하며 선택한다", tags: ["E", "F"] },
    a2: { text: "혼자 조용히 비교하고 선택한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "브랜드가 실망스러웠을 때",
    a1: { text: "다른 브랜드를 계속 시도해본다", tags: ["P", "N"] },
    a2: { text: "검증된 브랜드로 돌아간다", tags: ["J", "S"] },
  },
  {
    id: 7,
    q: "브랜드 선택 기준",
    a1: { text: "과거 경험과 검증된 정보를 바탕으로 선택한다", tags: ["S", "J"] },
    a2: { text: "새로운 브랜드와 트렌드를 시도한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "브랜드 충성도",
    a1: { text: "특정 브랜드에 충성하는 편이다", tags: ["J", "F"] },
    a2: { text: "상황에 따라 다양한 브랜드를 선택한다", tags: ["P", "T"] },
  },
  {
    id: 9,
    q: "브랜드 정보를 얻을 때",
    a1: { text: "체계적으로 브랜드 정보를 수집하고 비교한다", tags: ["J", "T"] },
    a2: { text: "우연히 발견하거나 주변에서 듣는다", tags: ["P", "F"] },
  },
  {
    id: 10,
    q: "브랜드를 추천할 때",
    a1: { text: "즉시 친구들에게 추천하고 공유한다", tags: ["E", "F"] },
    a2: { text: "물어보면 알려주거나 기록한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "브랜드 선택 스타일",
    a1: { text: "계획적이고 일관되게 선택한다", tags: ["J", "S"] },
    a2: { text: "즉흥적이고 다양하게 선택한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "브랜드 가치",
    a1: { text: "브랜드 신뢰와 안정성을 중시한다", tags: ["J", "S"] },
    a2: { text: "새로운 경험과 다양성을 중시한다", tags: ["P", "N"] },
  },
]

export default function FoodBrandTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "food-brand",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-brand/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-brand/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("food-brand")
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
      router.push("/tests/food-brand")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-blue-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
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
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
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
              <p className="text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

