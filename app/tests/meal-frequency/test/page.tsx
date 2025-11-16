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
    q: "아침에 일어나서 배가 고픈데 점심시간까지 3시간 남았을 때",
    a1: { text: "규칙적으로 3끼를 먹기 위해 참고 기다린다", tags: ["J", "S"] },
    a2: { text: "기분에 따라 간단히 먹고 나중에 다시 먹는다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "점심시간이 12시인데 11시 30분에 배가 너무 고파서 참을 수 없을 때",
    a1: { text: "정해진 시간인 12시까지 기다린다", tags: ["J", "S"] },
    a2: { text: "배고플 때 바로 먹는다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "평소 아침 8시에 먹는데 주말에 늦잠을 자서 10시에 일어났을 때",
    a1: { text: "일정한 패턴을 유지하기 위해 아침식사를 건너뛴다", tags: ["S", "J"] },
    a2: { text: "상황에 맞춰 늦은 아침식사를 한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "다음 주 식사 일정을 친구가 '언제 먹을 거야?'라고 물어볼 때",
    a1: { text: "미리 식사 계획을 세워서 알려준다", tags: ["J", "T"] },
    a2: { text: "그때그때 결정한다고 말한다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "친구가 '왜 그렇게 규칙적으로 먹어?'라고 물어볼 때",
    a1: { text: "건강과 규칙성을 위해 먹는다고 설명한다", tags: ["T", "J"] },
    a2: { text: "기분과 상황에 맞춰 먹는다고 설명한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "식사 앱에서 식사 시간을 기록하라고 할 때",
    a1: { text: "식사 빈도를 기록하고 관리한다", tags: ["J", "S"] },
    a2: { text: "기록하지 않고 느낌으로 판단한다", tags: ["P", "N"] },
  },
  {
    id: 7,
    q: "식사 시간에 친구가 와서 '나도 배고파! 같이 먹자!'라고 할 때",
    a1: { text: "즉시 함께 식사한다", tags: ["E", "F"] },
    a2: { text: "혼자 식사하는 게 편하다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "평소 아침식사를 안 먹는데 오늘은 먹고 싶을 때",
    a1: { text: "같은 패턴을 유지하기 위해 안 먹는다", tags: ["S", "J"] },
    a2: { text: "다양한 패턴을 시도해서 먹어본다", tags: ["N", "P"] },
  },
  {
    id: 9,
    q: "내일 중요한 일이 있어서 식사 시간을 미리 정해야 할 때",
    a1: { text: "미리 식사 시간을 준비하고 계획한다", tags: ["J", "S"] },
    a2: { text: "그때그때 상황에 맞춰 준비한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "친구가 '규칙적으로 먹는 게 중요해?'라고 물어볼 때",
    a1: { text: "규칙적으로 먹는 게 중요하다고 말한다", tags: ["J", "T"] },
    a2: { text: "유연하게 먹는 게 좋다고 말한다", tags: ["P", "F"] },
  },
  {
    id: 11,
    q: "규칙적으로 먹으려고 하는데 스케줄이 너무 바빠서 부담스러울 때",
    a1: { text: "규칙적으로 먹는 게 편하다고 생각한다", tags: ["J", "S"] },
    a2: { text: "규칙적으로 먹는 게 부담스럽다고 생각한다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "식사 스타일에 대해 설명할 때",
    a1: { text: "계획적이고 체계적으로 식사한다고 설명한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 유연하게 식사한다고 설명한다", tags: ["P", "F"] },
  },
]

export default function MealFrequencyTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "meal-frequency",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/meal-frequency/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/meal-frequency/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("meal-frequency")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("meal-frequency", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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

