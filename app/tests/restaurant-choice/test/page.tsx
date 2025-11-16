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
    q: "식사를 하려고 할 때 식당을 선택할 때",
    a1: { text: "미리 정하고 계획적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "식당을 선택할 때 선택 기준을 정할 때",
    a1: { text: "리뷰와 정보를 분석해서 선택한다", tags: ["T"] },
    a2: { text: "느낌과 직감으로 선택한다", tags: ["F"] },
  },
  {
    id: 3,
    q: "식당에 도착해서 메뉴를 선택할 때",
    a1: { text: "익숙한 메뉴나 기본 메뉴를 선택한다", tags: ["S"] },
    a2: { text: "새로운 메뉴나 특별한 메뉴를 선택한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "식당을 선택할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 선택한다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 선택한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "식당을 선택할 때 친구가 와서 '나도 같이 가고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 간다", tags: ["E"] },
    a2: { text: "혼자 조용히 간다", tags: ["I"] },
  },
  {
    id: 6,
    q: "친구가 '왜 그 식당을 골랐어?'라고 물어볼 때",
    a1: { text: "감성과 분위기 때문에 선택했다고 말한다", tags: ["F"] },
    a2: { text: "실용과 효율 때문에 선택했다고 말한다", tags: ["T"] },
  },
  {
    id: 7,
    q: "식당을 찾을 때",
    a1: { text: "검색해서 정보를 수집한다", tags: ["J"] },
    a2: { text: "둘러보면서 탐색한다", tags: ["P"] },
  },
  {
    id: 8,
    q: "식당을 선택하고 나서 기분이 좋을 때",
    a1: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 9,
    q: "식당을 선택할 때 기준을 정할 때",
    a1: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "식당에 가기 전에 메뉴를 선택할 때",
    a1: { text: "미리 생각하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 11,
    q: "식당에서 식사를 마치고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 리뷰를 쓴다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식당을 선택할 때 선택 기준을 생각할 때",
    a1: { text: "의미와 특별함을 기준으로 선택한다", tags: ["N"] },
    a2: { text: "실용성과 효율을 기준으로 선택한다", tags: ["S"] },
  },
]

export default function RestaurantChoiceTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "restaurant-choice",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/restaurant-choice/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/restaurant-choice/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("restaurant-choice")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("restaurant-choice", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 shadow-lg"
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 shadow-lg"
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

