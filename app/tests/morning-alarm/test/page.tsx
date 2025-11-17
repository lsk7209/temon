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
    q: "아침 알람이 울렸을 때",
    a1: { text: "바로 일어나서 끈다", tags: ["J"] },
    a2: { text: "스누즈를 누르고 다시 잔다", tags: ["P"] },
  },
  {
    id: 2,
    q: "알람을 여러 개 맞췄을 때",
    a1: { text: "첫 알람에 일어난다", tags: ["J", "T"] },
    a2: { text: "마지막 알람까지 기다린다", tags: ["P", "F"] },
  },
  {
    id: 3,
    q: "알람 소리가 너무 시끄러울 때",
    a1: { text: "바로 끄고 조용한 소리로 바꾼다", tags: ["T", "J"] },
    a2: { text: "조금 더 듣고 기분이 좋아진다", tags: ["F", "P"] },
  },
  {
    id: 4,
    q: "알람을 깜빡 잊고 안 맞췄을 때",
    a1: { text: "다음 날 더 일찍 맞춘다", tags: ["J", "S"] },
    a2: { text: "자연스럽게 깬다", tags: ["P", "N"] },
  },
  {
    id: 5,
    q: "알람이 울렸는데 아직 졸릴 때",
    a1: { text: "억지로라도 일어난다", tags: ["T", "J"] },
    a2: { text: "조금 더 잔다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "알람 시간을 정할 때",
    a1: { text: "정확한 시간으로 맞춘다", tags: ["S", "J"] },
    a2: { text: "여유 있게 맞춘다", tags: ["N", "P"] },
  },
  {
    id: 7,
    q: "알람이 울리기 전에 깨어났을 때",
    a1: { text: "알람을 끄고 일어난다", tags: ["J", "T"] },
    a2: { text: "알람이 울릴 때까지 기다린다", tags: ["P", "F"] },
  },
  {
    id: 8,
    q: "알람 소리를 선택할 때",
    a1: { text: "같은 소리를 계속 사용한다", tags: ["S", "I"] },
    a2: { text: "자주 바꿔서 신선하게 한다", tags: ["N", "E"] },
  },
  {
    id: 9,
    q: "알람이 울렸는데 핸드폰이 멀리 있을 때",
    a1: { text: "바로 가서 끈다", tags: ["E", "J"] },
    a2: { text: "조금 더 누워있다가 간다", tags: ["I", "P"] },
  },
  {
    id: 10,
    q: "알람을 끄고 나서",
    a1: { text: "즉시 일어나서 준비한다", tags: ["E", "J"] },
    a2: { text: "잠시 더 누워있다가 일어난다", tags: ["I", "P"] },
  },
  {
    id: 11,
    q: "주말에도 알람을 맞출 때",
    a1: { text: "평일과 같은 시간으로 맞춘다", tags: ["S", "J"] },
    a2: { text: "늦게 맞추거나 안 맞춘다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "알람이 울렸는데 날씨가 안 좋을 때",
    a1: { text: "그래도 일어난다", tags: ["T", "J"] },
    a2: { text: "조금 더 쉰다", tags: ["F", "P"] },
  },
]

export default function MorningAlarmTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { saveTestResult, isSaving } = useTestResult()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("morning-alarm")
  }, [])

  const handleChoiceSelect = async (tags: string[]) => {
    if (isProcessing) return

    setIsProcessing(true)
    setSelectedChoice(tags.join(","))

    const newAnswers = [...answers, tags]
    setAnswers(newAnswers)

    trackTestProgress("morning-alarm", currentQuestion + 1, questions.length)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedChoice(null)
        setIsProcessing(false)
      }, 500)
    } else {
      // 마지막 질문
      const result = calculateMBTI(newAnswers)
      const answerRecord = convertAnswersToRecord(newAnswers, questions.length)

      try {
        const resultId = await saveTestResult({
          testId: "morning-alarm",
          resultType: result,
          answers: answerRecord,
        })

        router.push(`/tests/morning-alarm/test/result?type=${result}&id=${resultId}`)
      } catch (error) {
        console.error("결과 저장 실패:", error)
        router.push(`/tests/morning-alarm/test/result?type=${result}`)
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
      {/* Progress Bar */}
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Question Content */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
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
                disabled={isProcessing}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
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

