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
    q: "저녁에 업무를 해야 할 때",
    a1: { text: "즉시 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 쉬고 시작한다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "저녁 업무를 마무리할 때",
    a1: { text: "정해진 시간에 끝낸다", tags: ["J", "T"] },
    a2: { text: "완료할 때까지 한다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "저녁에 업무를 할 때",
    a1: { text: "정해진 순서대로 한다", tags: ["S", "J"] },
    a2: { text: "우선순위에 따라 한다", tags: ["N", "P"] },
  },
  {
    id: 4,
    q: "저녁에 업무를 하는 환경",
    a1: { text: "조용하고 집중할 수 있는 곳", tags: ["I", "S"] },
    a2: { text: "활기차고 사람들이 있는 곳", tags: ["E", "N"] },
  },
  {
    id: 5,
    q: "저녁에 업무를 하는 이유",
    a1: { text: "목표와 계획을 위해", tags: ["T", "J"] },
    a2: { text: "기분과 컨디션을 위해", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "저녁 업무 후 기분",
    a1: { text: "성취감을 느낀다", tags: ["E", "T"] },
    a2: { text: "피로감을 느낀다", tags: ["I", "F"] },
  },
  {
    id: 7,
    q: "저녁에 업무가 쌓였을 때",
    a1: { text: "체계적으로 정리한다", tags: ["J", "T"] },
    a2: { text: "하나씩 처리한다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "저녁에 새로운 업무가 생겼을 때",
    a1: { text: "즉시 시작한다", tags: ["E", "N"] },
    a2: { text: "신중하게 고려한다", tags: ["I", "S"] },
  },
  {
    id: 9,
    q: "저녁에 업무를 하는 시간",
    a1: { text: "정해진 시간에 한다", tags: ["J", "S"] },
    a2: { text: "그때그때 한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "저녁 업무 후 할 일",
    a1: { text: "즉시 할 일을 시작한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 여유롭게 즐긴다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "저녁에 업무를 선택하는 기준",
    a1: { text: "효율성과 목표를 위해", tags: ["T", "J"] },
    a2: { text: "기분과 관계를 위해", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "저녁에 업무를 처리하는 방식",
    a1: { text: "논리적이고 체계적으로", tags: ["T", "S"] },
    a2: { text: "감성적이고 자유롭게", tags: ["F", "N"] },
  },
]

export default function EveningWorkTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveTestResult, isSaving } = useTestResult()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("evening-work")
  }, [])

  const handleChoiceSelect = async (tags: string[]) => {
    if (isProcessing) return

    setIsProcessing(true)
    setSelectedChoice(tags.join(","))

    const newAnswers = [...answers, tags]
    setAnswers(newAnswers)

    trackTestProgress("evening-work", currentQuestion + 1, questions.length)

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
          testId: "evening-work",
          resultType: result,
          answers: answerRecord,
        })

        router.push(`/tests/evening-work/test/result?type=${result}&id=${resultId}`)
      } catch (error) {
        console.error("결과 저장 실패:", error)
        router.push(`/tests/evening-work/test/result?type=${result}`)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-400 to-gray-500 flex items-center justify-center shadow-lg">
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
                    ? "border-slate-500 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 shadow-lg"
                    : "border-gray-200 hover:border-slate-300 hover:bg-slate-50/50 dark:border-gray-700 dark:hover:border-slate-600 dark:hover:bg-slate-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-slate-500 bg-slate-500"
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
                    ? "border-slate-500 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 shadow-lg"
                    : "border-gray-200 hover:border-slate-300 hover:bg-slate-50/50 dark:border-gray-700 dark:hover:border-slate-600 dark:hover:bg-slate-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-slate-500 bg-slate-500"
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

