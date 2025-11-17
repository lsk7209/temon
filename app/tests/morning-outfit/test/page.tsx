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
    q: "아침에 옷을 고를 때",
    a1: { text: "미리 정해둔 옷으로 바로 입는다", tags: ["J", "S"] },
    a2: { text: "그때그때 기분에 따라 고른다", tags: ["P", "N"] },
  },
  {
    id: 2,
    q: "옷이 다 빨래통에 있을 때",
    a1: { text: "빨래를 먼저 하고 깨끗한 옷을 입는다", tags: ["J", "T"] },
    a2: { text: "다른 옷을 찾거나 임시로 입는다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "옷을 입고 나서 마음에 안 들 때",
    a1: { text: "바로 갈아입고 더 나은 옷을 찾는다", tags: ["T", "J"] },
    a2: { text: "그냥 입고 간다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "옷을 조합할 때",
    a1: { text: "정해진 조합으로 체계적으로 입는다", tags: ["S", "J"] },
    a2: { text: "그때그때 다르게 실험한다", tags: ["N", "P"] },
  },
  {
    id: 5,
    q: "옷을 고르는 시간이 부족할 때",
    a1: { text: "빠르게 기본 옷으로 입는다", tags: ["T", "J"] },
    a2: { text: "시간을 내서 고른다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "옷을 고를 때 기준",
    a1: { text: "편안함과 실용성을 우선한다", tags: ["S", "T"] },
    a2: { text: "스타일과 멋을 우선한다", tags: ["N", "F"] },
  },
  {
    id: 7,
    q: "새로운 옷을 살 때",
    a1: { text: "신중하게 계획하고 구매한다", tags: ["S", "J"] },
    a2: { text: "즉흥적으로 구매한다", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "옷을 고를 때 날씨를 고려할 때",
    a1: { text: "날씨에 맞춰 실용적으로 고른다", tags: ["S", "T"] },
    a2: { text: "스타일을 우선하고 날씨는 차순위다", tags: ["N", "F"] },
  },
  {
    id: 9,
    q: "옷을 입고 나서 확인할 때",
    a1: { text: "거울을 보며 꼼꼼히 체크한다", tags: ["F", "I"] },
    a2: { text: "빠르게 확인하고 나간다", tags: ["T", "E"] },
  },
  {
    id: 10,
    q: "옷을 고르는 방식",
    a1: { text: "같은 스타일을 반복한다", tags: ["S", "I"] },
    a2: { text: "다양한 스타일을 시도한다", tags: ["N", "E"] },
  },
  {
    id: 11,
    q: "옷을 고를 때 사람들의 반응을 생각할 때",
    a1: { text: "사람들의 반응을 중시한다", tags: ["F", "E"] },
    a2: { text: "자신의 취향을 우선한다", tags: ["T", "I"] },
  },
  {
    id: 12,
    q: "옷을 고르는 이유",
    a1: { text: "필요와 실용성을 위해", tags: ["T", "S"] },
    a2: { text: "기분과 자기표현을 위해", tags: ["F", "N"] },
  },
]

export default function MorningOutfitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveTestResult, isSaving } = useTestResult()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("morning-outfit")
  }, [])

  const handleChoiceSelect = async (tags: string[]) => {
    if (isProcessing) return

    setIsProcessing(true)
    setSelectedChoice(tags.join(","))

    const newAnswers = [...answers, tags]
    setAnswers(newAnswers)

    trackTestProgress("morning-outfit", currentQuestion + 1, questions.length)

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
          testId: "morning-outfit",
          resultType: result,
          answers: answerRecord,
        })

        router.push(`/tests/morning-outfit/test/result?type=${result}&id=${resultId}`)
      } catch (error) {
        console.error("결과 저장 실패:", error)
        router.push(`/tests/morning-outfit/test/result?type=${result}`)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 shadow-lg"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-pink-500 bg-pink-500"
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 shadow-lg"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-pink-500 bg-pink-500"
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

