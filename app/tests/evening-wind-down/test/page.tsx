"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"

const questions = [
  {
    id: 1,
    q: "퇴근 후 집에 도착했을 때",
    a1: { text: "바로 휴식을 취한다", tags: ["F", "P"] },
    a2: { text: "할 일을 먼저 한다", tags: ["T", "J"] },
  },
  {
    id: 2,
    q: "저녁에 피곤할 때",
    a1: { text: "즉시 쉰다", tags: ["F", "P"] },
    a2: { text: "조금 더 일을 한다", tags: ["T", "J"] },
  },
  {
    id: 3,
    q: "저녁에 휴식을 취할 때",
    a1: { text: "정해진 방법으로 휴식한다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 휴식한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 휴식하는 장소",
    a1: { text: "조용한 곳에서 혼자 휴식한다", tags: ["I", "S"] },
    a2: { text: "사람들과 함께 휴식한다", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 휴식하는 시간",
    a1: { text: "정해진 시간에 휴식한다", tags: ["J", "S"] },
    a2: { text: "그때그때 휴식한다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "저녁에 휴식하는 이유",
    a1: { text: "효율성과 생산성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "저녁에 휴식하는 방식",
    a1: { text: "같은 방법을 반복한다", tags: ["S", "I"] },
    a2: { text: "다양한 방법을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 8,
    q: "저녁에 휴식하고 나서",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 9,
    q: "저녁에 휴식하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 10,
    q: "저녁에 휴식하는 기준",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "저녁에 휴식할 때 할 일",
    a1: { text: "일을 하거나 계획을 세운다", tags: ["T", "J"] },
    a2: { text: "여유롭게 즐기며 쉰다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 휴식하는 빈도",
    a1: { text: "정해진 시간에 규칙적으로 휴식한다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 휴식한다", tags: ["P", "N"] },
  },
]

export default function EveningWindDownTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveTestResult, isSaving } = useTestResult()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("evening-wind-down")
  }, [])

  const handleChoiceSelect = async (tags: string[]) => {
    if (isProcessing) return

    setIsProcessing(true)
    setSelectedChoice(tags.join(","))

    const newAnswers = [...answers, tags]
    setAnswers(newAnswers)

    trackTestProgress("evening-wind-down", currentQuestion + 1, questions.length)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedChoice(null)
        setIsProcessing(false)
      }, 500)
    } else {
      const result = calculateMBTI(newAnswers)
      const answerRecord = convertAnswersToRecord(newAnswers, questions.length)

      try {
        const resultId = await saveTestResult({
          testId: "evening-wind-down",
          resultType: result,
          answers: answerRecord,
        })

        router.push(`/tests/evening-wind-down/test/result?type=${result}&id=${resultId}`)
      } catch (error) {
        console.error("결과 저장 실패:", error)
        router.push(`/tests/evening-wind-down/test/result?type=${result}`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice(null)
    }
  }

  const calculateMBTI = (answers: string[][]): string => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    answers.forEach((tags) => {
      tags.forEach((tag) => {
        if (tag in scores) {
          scores[tag as keyof typeof scores]++
        }
      })
    })

    const result =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P")

    return result
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.q}
              </h1>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleChoiceSelect(currentQ.a1.tags)}
                disabled={isProcessing}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 shadow-lg"
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
                disabled={isProcessing}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 shadow-lg"
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

