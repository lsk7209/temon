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
    q: "냉장고를 열어보니 계란, 양파, 당근만 있는데 배가 너무 고플 때",
    a1: { text: "즉흥적으로 조합해서 볶음밥을 만든다", tags: ["P", "N"] },
    a2: { text: "기존 레시피를 참고해서 만든다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "즉흥 요리를 시작하려고 하는데 뭘 만들지 정해지지 않았을 때",
    a1: { text: "계획 없이 바로 시작한다", tags: ["P", "F"] },
    a2: { text: "대략적인 계획을 세운다", tags: ["J", "T"] },
  },
  {
    id: 3,
    q: "즉흥 요리 중에 '고춧가루'가 필요한데 집에 없을 때",
    a1: { text: "다른 매운 양념으로 대체해서 계속한다", tags: ["P", "N"] },
    a2: { text: "고춧가루를 사러 가거나 중단한다", tags: ["J", "S"] },
  },
  {
    id: 4,
    q: "즉흥 요리를 하다가 맛을 보니 너무 밋밋할 때",
    a1: { text: "느낌으로 간을 맞춘다", tags: ["F", "P"] },
    a2: { text: "계량을 하거나 비율을 고려한다", tags: ["T", "J"] },
  },
  {
    id: 5,
    q: "즉흥 요리를 완성했는데 정말 맛있어서 놀랐을 때",
    a1: { text: "즉시 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "혼자 먹고 다음에 개선한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "즉흥 요리를 했는데 완전히 실패해서 맛이 이상할 때",
    a1: { text: "그냥 먹거나 버린다", tags: ["P", "F"] },
    a2: { text: "원인을 분석하고 다시 시도한다", tags: ["J", "T"] },
  },
  {
    id: 7,
    q: "즉흥 요리를 완성하고 나서 친구가 '레시피 알려줘!'라고 할 때",
    a1: { text: "대략적으로만 기억해서 설명한다", tags: ["P", "N"] },
    a2: { text: "레시피를 정리해서 기록해서 준다", tags: ["J", "S"] },
  },
  {
    id: 8,
    q: "즉흥 요리를 할 때 친구가 와서 '나도 같이 만들고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 즉흥 요리를 즐긴다", tags: ["E", "F"] },
    a2: { text: "혼자 집중해서 즉흥 요리를 한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "친구가 '즉흥 요리를 얼마나 자주 해?'라고 물어볼 때",
    a1: { text: "자주 즉흥 요리를 한다고 말한다", tags: ["P", "N"] },
    a2: { text: "가끔만 즉흥 요리를 한다고 말한다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "즉흥 요리를 할 때 새로운 아이디어가 떠오를 때",
    a1: { text: "새로운 조합과 아이디어를 시도한다", tags: ["N", "P"] },
    a2: { text: "과거 경험을 바탕으로 만든다", tags: ["S", "J"] },
  },
  {
    id: 11,
    q: "즉흥 요리를 할 때 요리 스타일을 선택할 때",
    a1: { text: "자유롭고 창의적으로 요리한다", tags: ["P", "N"] },
    a2: { text: "기본 원리는 지키며 요리한다", tags: ["J", "S"] },
  },
  {
    id: 12,
    q: "친구가 '왜 즉흥 요리를 해?'라고 물어볼 때",
    a1: { text: "재미와 새로운 경험을 위해 한다고 말한다", tags: ["P", "F"] },
    a2: { text: "효율적이고 실용적인 식사를 위해 한다고 말한다", tags: ["J", "T"] },
  },
]

export default function CookingImproviseTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-improvise",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-improvise/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-improvise/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-improvise")
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
      router.push("/tests/cooking-improvise")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-pink-600 dark:text-pink-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-pink-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-pink-400 via-rose-500 to-red-500" />
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
                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-lg transform scale-105"
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
              <p className="text-pink-600 dark:text-pink-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

