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
    q: "혼밥하다가 친구가 갑자기 와서 '야 나도 배고파! 같이 먹자!'라고 할 때",
    a1: { text: "즉시 자리를 옮기고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "지금은 혼자 먹고 싶다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 2,
    q: "혼밥하다가 옆 테이블에서 커플이 너무 달달해서 눈치가 보일 때",
    a1: { text: "신경 안 쓰고 내 음식에 집중한다", tags: ["E", "P"] },
    a2: { text: "조용한 구석자리로 이동한다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "혼밥하다가 메뉴판을 10분째 들여다봐도 결정이 안 될 때",
    a1: { text: "대충 맛있어 보이는 걸 선택한다", tags: ["E", "P"] },
    a2: { text: "핸드폰으로 리뷰를 검색해서 결정한다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "혼밥하다가 주문한 음식이 생각보다 3배는 더 나왔을 때",
    a1: { text: "포장해서 집에 가져간다", tags: ["J", "S"] },
    a2: { text: "대충 먹고 남긴다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "혼밥하다가 유튜브 영상을 보다가 음식이 식어갈 때",
    a1: { text: "영상 보면서 계속 먹는다", tags: ["E", "P"] },
    a2: { text: "영상을 멈추고 음식에 집중한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "혼밥하다가 이 식당이 진짜 맛있어서 놀랐을 때",
    a1: { text: "즉시 친구들에게 카톡을 보낸다", tags: ["E", "F"] },
    a2: { text: "혼자만의 맛집으로 비밀로 간직한다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "혼밥하다가 배가 너무 고파서 메뉴 고르는 시간이 아까울 때",
    a1: { text: "첫 번째 메뉴를 바로 주문한다", tags: ["E", "P"] },
    a2: { text: "메뉴를 꼼꼼히 보고 결정한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "혼밥하다가 주문한 음식이 완전히 맛없고 실망스러울 때",
    a1: { text: "직원에게 맛이 이상하다고 말한다", tags: ["E", "F"] },
    a2: { text: "조용히 먹고 나간다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "혼밥하다가 계산할 때 계산대에 사람이 많을 때",
    a1: { text: "빨리 계산하고 나간다", tags: ["E", "P"] },
    a2: { text: "여유롭게 줄을 서서 기다린다", tags: ["I", "J"] },
  },
  {
    id: 10,
    q: "혼밥하다가 메뉴판에 '신메뉴'라고 써있는 걸 발견했을 때",
    a1: { text: "호기심에 바로 주문해본다", tags: ["E", "N"] },
    a2: { text: "리뷰를 먼저 확인하고 주문한다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "혼밥하다가 음식이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "대충 불어서 바로 먹으려고 한다", tags: ["E", "P"] },
    a2: { text: "식을 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "혼밥하다가 주변 사람들이 모두 단체로 와서 혼자만 혼자일 때",
    a1: { text: "신경 안 쓰고 내 할 일 한다", tags: ["E", "F"] },
    a2: { text: "벽 쪽 구석자리로 이동한다", tags: ["I", "T"] },
  },
]

export default function MealSoloTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "meal-solo",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/meal-solo/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/meal-solo/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("meal-solo")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("meal-solo", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-400 to-slate-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-gray-500 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-gray-500 bg-gray-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-gray-500 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-gray-500 bg-gray-500"
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

