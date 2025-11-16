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
    q: "요리할 때 레시피에 '밀가루 200g'이라고 했는데 계량컵이 없을 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["P", "N"] },
    a2: { text: "계량컵을 찾거나 저울을 사용한다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "요리할 때 계량하다가 실수로 '설탕 1컵'을 '소금 1컵'으로 잘못 측정했을 때",
    a1: { text: "당황해서 대충 조정한다", tags: ["E", "P"] },
    a2: { text: "침착하게 다시 정확히 측정한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "요리할 때 계량하다가 시간이 부족해서 배가 너무 고파질 때",
    a1: { text: "대충 눈대중으로 넣고 빨리 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리할 때 계량하는 중에 친구가 와서 '나도 먹고 싶어! 빨리 해줘!'라고 할 때",
    a1: { text: "빨리 계량하고 함께 만든다", tags: ["E", "F"] },
    a2: { text: "정확히 계량할 때까지 기다리라고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리할 때 계량하다가 레시피에 '달걀 3개'라고 했는데 냉장고에 1개만 있을 때",
    a1: { text: "대충 1개로 만든다", tags: ["E", "P"] },
    a2: { text: "달걀을 사러 가거나 레시피를 수정한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리할 때 계량대로 만들었는데 맛을 보니 완전히 이상할 때",
    a1: { text: "대충 조정해서 먹는다", tags: ["E", "P"] },
    a2: { text: "계량을 다시 확인하고 정확히 측정한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리할 때 계량하다가 계량컵을 떨어뜨려서 깨졌을 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["E", "P"] },
    a2: { text: "다른 계량 도구를 찾는다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리할 때 계량하다가 레시피를 잃어버려서 정확한 양을 모를 때",
    a1: { text: "대충 눈대중으로 넣는다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 찾거나 인터넷에서 확인한다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "요리할 때 계량하다가 배가 너무 고파서 계량하는 시간이 아까울 때",
    a1: { text: "빨리 대충 계량하고 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "요리할 때 계량하다가 레시피에 '15가지 재료'를 정확히 계량해야 할 때",
    a1: { text: "대충 중요한 것만 계량한다", tags: ["E", "P"] },
    a2: { text: "모든 재료를 정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "요리할 때 계량하다가 계량이 너무 복잡해서 시간이 오래 걸릴 때",
    a1: { text: "빨리 대충 계량하고 끝낸다", tags: ["E", "P"] },
    a2: { text: "정확히 계량한다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리할 때 계량하는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 계량하고 바로 만든다", tags: ["E", "P"] },
    a2: { text: "정확히 계량할 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingMeasurementTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-measurement",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-measurement/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-measurement/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-measurement")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-measurement", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, questions.length])

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
          const result = calculateMBTI(newAnswers)
          const answersRecord = convertAnswersToRecord(newAnswers)
          await saveResult(result, answersRecord)
        }
      }, 500)
    },
    [currentQuestion, answers, questions.length, saveResult, isProcessing, isSaving]
  )

  useEffect(() => {
    return () => {
      setIsProcessing(false)
    }
  }, [])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }, [currentQuestion, answers])

  const currentQ = useMemo(() => questions[currentQuestion], [currentQuestion])

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.q}
              </h1>
            </div>

            <div className="space-y-4" role="radiogroup" aria-label={`질문 ${currentQuestion + 1}: ${currentQ.q}`}>
              <button
                type="button"
                onClick={() => handleChoiceSelect(currentQ.a1.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`선택지 1: ${currentQ.a1.text}`}
                aria-pressed={selectedChoice === currentQ.a1.tags.join(",")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleChoiceSelect(currentQ.a1.tags)
                  }
                }}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950 dark:via-teal-950 dark:to-blue-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-hidden="true"
                  >
                    {selectedChoice === currentQ.a1.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a1.text}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChoiceSelect(currentQ.a2.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`선택지 2: ${currentQ.a2.text}`}
                aria-pressed={selectedChoice === currentQ.a2.tags.join(",")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleChoiceSelect(currentQ.a2.tags)
                  }
                }}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950 dark:via-teal-950 dark:to-blue-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-hidden="true"
                  >
                    {selectedChoice === currentQ.a2.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a2.text}
                  </span>
                </div>
              </button>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0 || isProcessing || isSaving}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50"
                aria-label="이전 질문으로 이동"
              >
                <span>이전</span>
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">
                {isSaving ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin">⏳</span>
                    <span>결과 저장 중...</span>
                  </span>
                ) : (
                  <span>답변을 선택하면 자동으로 다음으로 이동합니다</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

