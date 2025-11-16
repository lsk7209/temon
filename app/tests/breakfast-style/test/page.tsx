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
    q: "아침에 일어나서 아침식사를 준비할 때",
    a1: { text: "직접 요리해서 계획적으로 만든다", tags: ["J"] },
    a2: { text: "외부에서 구매해서 간편하게 먹는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "아침에 일어나서 아침식사를 할 시간을 정할 때",
    a1: { text: "정해진 시간에 규칙적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 3,
    q: "아침식사를 시작하기 전에 메뉴를 선택할 때",
    a1: { text: "미리 계획하고 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "아침식사를 할 때 양을 정할 때",
    a1: { text: "풍부하고 든든하게 먹는다", tags: ["E"] },
    a2: { text: "간단하고 가볍게 먹는다", tags: ["I"] },
  },
  {
    id: 5,
    q: "아침식사를 할 때 친구가 와서 '나도 같이 먹고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "아침식사를 마치고 나서 다음 활동을 할 때",
    a1: { text: "계획을 세우고 체계적으로 시작한다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 시작한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "아침식사를 할 때 메뉴를 고를 때 기준을 정할 때",
    a1: { text: "영양과 건강을 기준으로 선택한다", tags: ["T"] },
    a2: { text: "맛과 감성을 기준으로 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "아침식사를 준비할 때 시간이 부족할 때",
    a1: { text: "여유롭게 천천히 만든다", tags: ["F"] },
    a2: { text: "빠르고 효율적으로 만든다", tags: ["T"] },
  },
  {
    id: 9,
    q: "아침식사를 할 때 메뉴를 선택할 때",
    a1: { text: "다양하고 새로운 메뉴를 선택한다", tags: ["N"] },
    a2: { text: "익숙하고 기본 메뉴를 선택한다", tags: ["S"] },
  },
  {
    id: 10,
    q: "아침식사를 할 때 장소를 선택할 때",
    a1: { text: "집에서 편안하게 먹는다", tags: ["I"] },
    a2: { text: "카페나 식당에서 분위기 있게 먹는다", tags: ["E"] },
  },
  {
    id: 11,
    q: "아침식사를 마치고 나서 기분이 좋을 때",
    a1: { text: "에너지 충전과 활기참을 느낀다", tags: ["E"] },
    a2: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "아침식사를 선택할 때 이유를 생각할 때",
    a1: { text: "실용성과 효율 때문에 선택한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 선택한다", tags: ["N"] },
  },
]

export default function BreakfastStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "breakfast-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/breakfast-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/breakfast-style/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("breakfast-style")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("breakfast-style", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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

