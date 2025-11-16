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
    q: "요리한 음식이 예쁘지 않게 나왔을 때",
    a1: { text: "다시 예쁘게 플레이팅한다", tags: ["J", "F"] },
    a2: { text: "그냥 먹는다", tags: ["P", "T"] },
  },
  {
    id: 2,
    q: "요리한 음식을 사진 찍으려는데 맛이 없을 때",
    a1: { text: "예쁘게 플레이팅해서 사진만 찍는다", tags: ["E", "F"] },
    a2: { text: "맛을 개선하는 게 우선이다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "요리한 음식을 친구에게 보여줬는데 반응이 없을 때",
    a1: { text: "플레이팅을 더 예쁘게 해본다", tags: ["E", "F"] },
    a2: { text: "맛에 집중한다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리한 음식이 너무 예뻐서 먹기 아까울 때",
    a1: { text: "사진을 많이 찍고 나중에 먹는다", tags: ["E", "F"] },
    a2: { text: "바로 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리한 음식을 인스타에 올리려는데 사진이 안 나올 때",
    a1: { text: "플레이팅을 다시 해서 찍는다", tags: ["E", "P"] },
    a2: { text: "그냥 먹는다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리한 음식이 예쁜데 접시가 안 맞을 때",
    a1: { text: "다른 접시를 찾아서 바꾼다", tags: ["E", "N"] },
    a2: { text: "그냥 그 접시에 담는다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "요리한 음식을 플레이팅하다가 시간이 오래 걸릴 때",
    a1: { text: "계속 예쁘게 만든다", tags: ["J", "F"] },
    a2: { text: "대충 하고 먹는다", tags: ["P", "T"] },
  },
  {
    id: 8,
    q: "요리한 음식을 플레이팅하다가 배가 고파질 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리한 음식을 플레이팅하다가 실수로 망쳤을 때",
    a1: { text: "다시 처음부터 한다", tags: ["J", "F"] },
    a2: { text: "그냥 먹는다", tags: ["P", "T"] },
  },
  {
    id: 10,
    q: "요리한 음식을 플레이팅하다가 재료가 부족할 때",
    a1: { text: "다른 재료로 대체해서 만든다", tags: ["P", "N"] },
    a2: { text: "그냥 간단하게 담는다", tags: ["J", "S"] },
  },
  {
    id: 11,
    q: "요리한 음식을 플레이팅하다가 친구가 와서 먹자고 할 때",
    a1: { text: "빨리 끝내고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "완성될 때까지 기다리게 한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "요리한 음식을 플레이팅하다가 맛이 식어갈 때",
    a1: { text: "빨리 끝내고 먹는다", tags: ["E", "P"] },
    a2: { text: "완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingPresentationTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-presentation",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-presentation/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-presentation/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-presentation")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-presentation", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:via-purple-950 dark:to-violet-950 shadow-lg"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-indigo-500 bg-indigo-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:via-purple-950 dark:to-violet-950 shadow-lg"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-indigo-500 bg-indigo-500"
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

