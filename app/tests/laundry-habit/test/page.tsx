"use client"

import { useState, useEffect } from "react"
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
    q: "세탁을 하다가 세탁물이 산더미처럼 쌓였을 때",
    a1: { text: "정해진 순서대로 체계적으로 정리한다", tags: ["J"] },
    a2: { text: "그때그때 필요한 것만 빨리 한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "세탁을 하다가 옷을 분류할 때",
    a1: { text: "색깔, 재질, 온도별로 논리적으로 분류한다", tags: ["T"] },
    a2: { text: "느낌이나 기분에 따라 의미 있게 분류한다", tags: ["F"] },
  },
  {
    id: 3,
    q: "세탁을 하다가 시간이 부족해서 급할 때",
    a1: { text: "천천히 꼼꼼하게 끝까지 한다", tags: ["F"] },
    a2: { text: "빨리 중요한 것만 하고 끝낸다", tags: ["T"] },
  },
  {
    id: 4,
    q: "세탁을 하기 전에 계획을 세울 때",
    a1: { text: "미리 언제 무엇을 어떻게 할지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "세탁을 끝내고 나가다가 세탁물이 제대로 되었는지 불안할 때",
    a1: { text: "다시 돌아가서 확인한다", tags: ["F"] },
    a2: { text: "그냥 가고 신경 안 쓴다", tags: ["T"] },
  },
  {
    id: 6,
    q: "세탁을 하다가 가족이나 친구들이 함께 있을 때",
    a1: { text: "혼자 조용히 한다", tags: ["I"] },
    a2: { text: "함께 하면서 대화한다", tags: ["E"] },
  },
  {
    id: 7,
    q: "세탁을 하다가 세탁 방법이나 제품을 선택할 때",
    a1: { text: "실용적이고 효율적인 걸 선택한다", tags: ["S"] },
    a2: { text: "특별하고 의미 있는 걸 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "세탁을 하다가 여러 옷을 세탁해야 할 때",
    a1: { text: "정해진 순서대로 체계적으로 한다", tags: ["J"] },
    a2: { text: "자연스럽게 편한 대로 한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "세탁을 하다가 세탁하는 게 재미있고 즐거울 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 10,
    q: "세탁을 하다가 세탁 기준이나 원칙을 정할 때",
    a1: { text: "감성적이고 의미 있는 기준을 정한다", tags: ["F"] },
    a2: { text: "실용적이고 효율적인 기준만 정한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "세탁을 끝내고 세탁 경험이 특별해서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "세탁을 하다가 세탁하는 이유나 의미를 생각할 때",
    a1: { text: "특별한 의미나 목적을 부여한다", tags: ["N"] },
    a2: { text: "단순히 옷이 더러워서 한다", tags: ["S"] },
  },
]

export default function LaundryHabitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "laundry-habit",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/laundry-habit/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/laundry-habit/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("laundry-habit")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("laundry-habit", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (tags: string[]) => {
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
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }

  const currentQ = questions[currentQuestion]

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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
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
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
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
                    ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 shadow-lg"
                    : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-cyan-500 bg-cyan-500"
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

