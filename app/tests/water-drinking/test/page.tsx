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
    q: "물을 마시다가 목이 너무 말라서 참을 수 없을 때",
    a1: { text: "정해진 시간까지 기다린다", tags: ["J"] },
    a2: { text: "그때그때 바로 마신다", tags: ["P"] },
  },
  {
    id: 2,
    q: "물을 마시다가 물이 너무 차가워서 목이 아플 것 같을 때",
    a1: { text: "조금씩 천천히 마신다", tags: ["F"] },
    a2: { text: "빨리 마시고 끝낸다", tags: ["T"] },
  },
  {
    id: 3,
    q: "물을 마시다가 물이 너무 많아서 다 못 마실 것 같을 때",
    a1: { text: "조금씩 나눠서 마신다", tags: ["S"] },
    a2: { text: "한 번에 다 마시려고 한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "물을 마시다가 하루 물 섭취량 목표가 있을 때",
    a1: { text: "시간표를 세워서 체계적으로 마신다", tags: ["J"] },
    a2: { text: "그때그때 목이 마르면 마신다", tags: ["P"] },
  },
  {
    id: 5,
    q: "물을 마시다가 물맛이 이상하거나 맛없을 때",
    a1: { text: "물맛을 확인하고 다른 물을 찾는다", tags: ["F"] },
    a2: { text: "그냥 마시고 끝낸다", tags: ["T"] },
  },
  {
    id: 6,
    q: "물을 마시다가 친구들이 와서 '우리도 마시고 싶어!'라고 할 때",
    a1: { text: "혼자 조용히 마신다", tags: ["I"] },
    a2: { text: "함께 물을 나눠 마신다", tags: ["E"] },
  },
  {
    id: 7,
    q: "생일이나 기념일 같은 특별한 날에 물을 마실 때",
    a1: { text: "평범하게 그냥 마신다", tags: ["S"] },
    a2: { text: "특별한 물이나 의미를 부여해서 마신다", tags: ["N"] },
  },
  {
    id: 8,
    q: "건강 앱에서 '아침에 물 2잔, 점심에 물 1잔' 같은 순서를 알려줄 때",
    a1: { text: "정해진 순서대로 체계적으로 마신다", tags: ["J"] },
    a2: { text: "자연스럽게 편한 대로 마신다", tags: ["P"] },
  },
  {
    id: 9,
    q: "물을 마시다가 정말 맛있고 시원해서 기분이 좋아질 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 10,
    q: "편의점에서 물을 고르다가 '일반 물'과 '미네랄 워터' 중 선택할 때",
    a1: { text: "감성적으로 맛이나 느낌으로 선택한다", tags: ["F"] },
    a2: { text: "실용적으로 효율적인 걸 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "여행지에서 정말 맛있는 물을 발견했을 때",
    a1: { text: "즉시 친구들에게 추천한다", tags: ["E"] },
    a2: { text: "혼자만의 비밀로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "친구가 '왜 물을 마셔?'라고 물어볼 때",
    a1: { text: "특별한 의미나 목적이 있다고 설명한다", tags: ["N"] },
    a2: { text: "단순히 목마르니까 마신다고 말한다", tags: ["S"] },
  },
]

export default function WaterDrinkingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "water-drinking",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/water-drinking/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/water-drinking/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("water-drinking")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("water-drinking", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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

