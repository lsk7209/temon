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
    q: "요리에 양념을 넣다가 '소금 한 꼬집'이라고 했는데 손이 미끄러져서 반 통을 쏟았을 때",
    a1: { text: "당황해서 물을 부어서 희석시킨다", tags: ["E", "P"] },
    a2: { text: "침착하게 양념을 다시 계산하고 조정한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리에 양념을 넣다가 레시피에 '고춧가루'가 필요한데 집에 없을 때",
    a1: { text: "대충 고추장이나 다른 매운 양념으로 대체한다", tags: ["P", "N"] },
    a2: { text: "양념을 사러 가거나 다른 레시피를 찾는다", tags: ["J", "S"] },
  },
  {
    id: 3,
    q: "요리에 양념을 넣었는데 맛을 보니 완전히 이상하고 맛없을 때",
    a1: { text: "일단 다른 양념을 더 넣어본다", tags: ["E", "P"] },
    a2: { text: "레시피를 다시 확인하고 정확히 다시 만든다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "요리에 양념을 넣는 중에 친구가 와서 '나도 맛보고 싶어!'라고 할 때",
    a1: { text: "즉시 맛보게 해주고 '어때?'라고 물어본다", tags: ["E", "F"] },
    a2: { text: "양념이 완성될 때까지 기다리라고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리에 양념을 넣다가 실수로 설탕 대신 소금을 넣었을 때",
    a1: { text: "당황해서 처음부터 다시 만든다", tags: ["E", "F"] },
    a2: { text: "양념을 확인하고 어떻게 수정할지 생각한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "요리에 양념을 넣었는데 너무 매워서 입 안이 불타오를 것 같을 때",
    a1: { text: "대충 물을 넣거나 그냥 먹는다", tags: ["E", "P"] },
    a2: { text: "양념 비율을 다시 계산해서 조정한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "요리에 양념을 넣었는데 너무 달아서 당뇨 걸릴 것 같을 때",
    a1: { text: "그래도 먹고 싶어서 그대로 둔다", tags: ["E", "F"] },
    a2: { text: "양념을 다시 확인하고 조정한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "요리에 양념을 넣었는데 너무 짜서 바다물 같을 때",
    a1: { text: "물을 부어서 대충 조정한다", tags: ["E", "P"] },
    a2: { text: "양념을 다시 계산해서 정확히 조정한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "요리에 양념을 넣었는데 레시피 사진과 색깔이 완전히 다를 때",
    a1: { text: "오히려 재미있어 보이니 그대로 둔다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 확인하고 뭐가 잘못됐는지 찾는다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "요리에 양념을 넣다가 레시피에 '트러플 오일'이 필요한데 가격이 너무 비쌀 때",
    a1: { text: "대체 양념으로 만들거나 생략한다", tags: ["E", "F"] },
    a2: { text: "양념을 구매하거나 다른 레시피를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리에 양념을 넣다가 양념을 만드는 게 너무 복잡하고 시간이 오래 걸릴 때",
    a1: { text: "대충 간단하게 만들어서 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피대로 정확히 만든다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "요리에 양념을 넣는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 익은 것 같으니 바로 먹는다", tags: ["E", "P"] },
    a2: { text: "양념이 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingSeasoningTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-seasoning",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-seasoning/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-seasoning/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-seasoning")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-seasoning", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:via-pink-950 dark:to-rose-950 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-red-500 bg-red-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:via-pink-950 dark:to-rose-950 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-red-500 bg-red-500"
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

