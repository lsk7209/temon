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
    q: "요리 후 주방이 전쟁터가 되었을 때",
    a1: { text: "당장 정리하고 싶어서 바로 시작한다", tags: ["E", "J"] },
    a2: { text: "나중에 정리하고 일단 쉰다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "요리 후 설거지가 산더미처럼 쌓였을 때",
    a1: { text: "체계적으로 하나씩 정리한다", tags: ["J", "S"] },
    a2: { text: "대충 빠르게 끝낸다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "요리 후 정리하다가 또 요리하고 싶을 때",
    a1: { text: "정리를 멈추고 다시 요리한다", tags: ["E", "P"] },
    a2: { text: "정리를 끝내고 나중에 한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리 후 정리하다가 깜빡 잊고 안 닦은 그릇을 발견했을 때",
    a1: { text: "당황해서 다시 닦는다", tags: ["E", "F"] },
    a2: { text: "침착하게 닦고 끝낸다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리 후 정리하다가 배가 또 고파질 때",
    a1: { text: "정리를 멈추고 간식을 먹는다", tags: ["E", "P"] },
    a2: { text: "정리를 끝내고 먹는다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리 후 정리하다가 친구가 와서 놀자고 할 때",
    a1: { text: "정리를 멈추고 친구와 논다", tags: ["E", "F"] },
    a2: { text: "정리를 끝내고 나중에 논다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "요리 후 정리하다가 시간이 너무 오래 걸릴 때",
    a1: { text: "대충 빠르게 끝낸다", tags: ["E", "P"] },
    a2: { text: "꼼꼼하게 끝까지 한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리 후 정리하다가 실수로 그릇을 깨뜨렸을 때",
    a1: { text: "당황해서 바로 치운다", tags: ["E", "F"] },
    a2: { text: "침착하게 치우고 계속한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 후 정리하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 정리를 멈춘다", tags: ["E", "F"] },
    a2: { text: "정리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "요리 후 정리하다가 물이 다 떨어졌을 때",
    a1: { text: "당황해서 다른 방법을 찾는다", tags: ["E", "P"] },
    a2: { text: "침착하게 물을 구해서 계속한다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "요리 후 정리하다가 정리가 끝났는데 또 더러운 게 보일 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 마저 정리한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "요리 후 정리하다가 너무 피곤해서 정리가 싫을 때",
    a1: { text: "대충 끝내고 쉰다", tags: ["E", "P"] },
    a2: { text: "끝까지 정리하고 쉰다", tags: ["I", "J"] },
  },
]

export default function CookingCleanupTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-cleanup",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-cleanup/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-cleanup/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-cleanup")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-cleanup", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-400 to-gray-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-slate-500 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 shadow-lg"
                    : "border-gray-200 hover:border-slate-300 hover:bg-slate-50/50 dark:border-gray-700 dark:hover:border-slate-600 dark:hover:bg-slate-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-slate-500 bg-slate-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-slate-500 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 shadow-lg"
                    : "border-gray-200 hover:border-slate-300 hover:bg-slate-50/50 dark:border-gray-700 dark:hover:border-slate-600 dark:hover:bg-slate-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-slate-500 bg-slate-500"
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

