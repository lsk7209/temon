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
    q: "레시피를 따라 요리하다가 '달걀 2개'라고 했는데 냉장고에 달걀이 하나만 있을 때",
    a1: { text: "대충 다른 걸로 대체하고 계속 만든다", tags: ["P", "N"] },
    a2: { text: "레시피를 중단하고 달걀을 사러 간다", tags: ["J", "S"] },
  },
  {
    id: 2,
    q: "레시피대로 만들었는데 맛이 레시피 사진과 완전히 다를 때",
    a1: { text: "재미있어 보이니 양념을 더 넣어본다", tags: ["P", "F"] },
    a2: { text: "레시피를 다시 꼼꼼히 읽어본다", tags: ["J", "T"] },
  },
  {
    id: 3,
    q: "레시피에 '30분 푹 끓이기'라고 했는데 10분 후에 배가 고파서 참을 수 없을 때",
    a1: { text: "대충 끓인 것 같으니 그냥 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 30분을 기다린다", tags: ["I", "J"] },
  },
  {
    id: 4,
    q: "레시피를 따라 요리하는 중에 친구가 와서 '뭐 만드는 거야? 나도 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 양을 늘려서 함께 만든다", tags: ["E", "F"] },
    a2: { text: "지금은 레시피대로 만들어야 한다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "레시피대로 만들다가 실수로 설탕 대신 소금을 넣었을 때",
    a1: { text: "당황해서 처음부터 다시 만든다", tags: ["E", "F"] },
    a2: { text: "레시피를 확인하고 어떻게 수정할지 생각한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "레시피에 '프랑스어로 된 요리 용어'가 나와서 이해가 안 될 때",
    a1: { text: "대충 비슷한 걸로 이해하고 만든다", tags: ["E", "P"] },
    a2: { text: "인터넷에서 정확한 뜻을 찾아본다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "레시피대로 만들었는데 맛이 너무 밋밋하고 재미없을 때",
    a1: { text: "즉시 고춧가루나 양념을 추가한다", tags: ["E", "F"] },
    a2: { text: "레시피가 맞는지 다시 확인한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "레시피에 '15단계'가 있는데 5단계만 해도 벌써 복잡할 때",
    a1: { text: "대충 중요한 것만 하고 끝낸다", tags: ["E", "P"] },
    a2: { text: "레시피를 끝까지 정확히 따라간다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "레시피대로 만들었는데 결과물이 레시피 사진과 색깔이 완전히 다를 때",
    a1: { text: "오히려 재미있어 보이니 그대로 둔다", tags: ["P", "N"] },
    a2: { text: "레시피를 다시 확인하고 뭐가 잘못됐는지 찾는다", tags: ["J", "S"] },
  },
  {
    id: 10,
    q: "레시피에 '트러플 오일'이 필요한데 가격이 너무 비쌀 때",
    a1: { text: "대체 재료로 만들거나 생략한다", tags: ["E", "F"] },
    a2: { text: "레시피대로 구매하거나 다른 레시피를 찾는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "레시피에 '하루 종일 재워두기'라고 했는데 당장 먹고 싶을 때",
    a1: { text: "대충 1시간만 재워두고 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 하루를 기다린다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "레시피를 따라 요리하는 중에 냄새가 너무 좋아서 참을 수 없을 때",
    a1: { text: "대충 익은 것 같으니 바로 먹는다", tags: ["E", "P"] },
    a2: { text: "레시피대로 완성될 때까지 기다린다", tags: ["I", "J"] },
  },
]

export default function CookingRecipeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-recipe",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-recipe/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-recipe/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("cooking-recipe")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cooking-recipe", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-green-500 bg-green-500"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-green-500 bg-green-500"
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

