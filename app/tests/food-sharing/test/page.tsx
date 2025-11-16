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
    q: "맛있는 음식을 친구들과 나눌 때",
    a1: { text: "계획적이고 체계적으로 나눈다", tags: ["J"] },
    a2: { text: "즉흥적이고 자연스럽게 나눈다", tags: ["P"] },
  },
  {
    id: 2,
    q: "음식을 나눌 때 누구에게 나눌지 정할 때",
    a1: { text: "모두에게 골고루 나눈다", tags: ["E"] },
    a2: { text: "가까운 사람 중심으로 나눈다", tags: ["I"] },
  },
  {
    id: 3,
    q: "친구가 '왜 음식을 나눠?'라고 물어볼 때",
    a1: { text: "감성과 즐거움을 위해 나눈다고 말한다", tags: ["F"] },
    a2: { text: "실용과 합리성을 위해 나눈다고 말한다", tags: ["T"] },
  },
  {
    id: 4,
    q: "음식을 나눌 때 양을 정할 때",
    a1: { text: "정확히 균등하게 나눈다", tags: ["S"] },
    a2: { text: "여유있게 넉넉히 나눈다", tags: ["N"] },
  },
  {
    id: 5,
    q: "음식을 나눌 때 분위기를 만들 때",
    a1: { text: "활발하고 즐겁게 나눈다", tags: ["E"] },
    a2: { text: "조용하고 차분하게 나눈다", tags: ["I"] },
  },
  {
    id: 6,
    q: "음식을 나누고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 뿌듯함을 느낀다", tags: ["F"] },
    a2: { text: "만족감과 효율성을 느낀다", tags: ["T"] },
  },
  {
    id: 7,
    q: "음식을 나눌 때 스타일을 선택할 때",
    a1: { text: "전통적이고 익숙한 방식으로 나눈다", tags: ["S"] },
    a2: { text: "창의적이고 새로운 방식으로 나눈다", tags: ["N"] },
  },
  {
    id: 8,
    q: "음식을 나누기 전에 준비할 때",
    a1: { text: "미리 계획한다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "음식을 나누고 나서 다음 활동을 할 때",
    a1: { text: "함께 즐긴다", tags: ["E"] },
    a2: { text: "조용히 쉰다", tags: ["I"] },
  },
  {
    id: 10,
    q: "음식을 나눌 때 선택 기준을 정할 때",
    a1: { text: "감성적으로 마음 가는 대로 나눈다", tags: ["F"] },
    a2: { text: "논리적으로 합리적으로 나눈다", tags: ["T"] },
  },
  {
    id: 11,
    q: "음식을 나눌 때 방법을 선택할 때",
    a1: { text: "정해진 방식대로 나눈다", tags: ["S"] },
    a2: { text: "상황에 맞게 응용해서 나눈다", tags: ["N"] },
  },
  {
    id: 12,
    q: "음식을 나누고 나서 마무리할 때",
    a1: { text: "체계적으로 정리한다", tags: ["J"] },
    a2: { text: "자연스럽게 마무리한다", tags: ["P"] },
  },
]

export default function FoodSharingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "food-sharing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-sharing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/food-sharing/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("food-sharing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("food-sharing", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, questions.length])

  const handleChoiceSelect = useCallback(
    async (tags: string[]) => {
      setSelectedChoice(tags.join(","))
      const currentQuestionIndex = currentQuestion

      setTimeout(async () => {
        const newAnswers = [...answers, tags]
        setAnswers(newAnswers)

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestion(currentQuestionIndex + 1)
          setSelectedChoice("")
        } else {
          const result = calculateMBTI(newAnswers)
          const answersRecord = convertAnswersToRecord(newAnswers)
          await saveResult(result, answersRecord)
        }
      }, 500)
    },
    [currentQuestion, answers, questions.length, saveResult]
  )

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

            <div className="space-y-4">
              <button
                onClick={() => handleChoiceSelect(currentQ.a1.tags)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg"
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
                onClick={() => handleChoiceSelect(currentQ.a2.tags)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg"
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
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50"
              >
                <span>이전</span>
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">
                <span>답변을 선택하면 자동으로 다음으로 이동합니다</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

