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
    q: "카페에 가서 의자에 앉을 때",
    a1: { text: "정해진 자세로 체계적으로 앉는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 앉는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "의자에 앉을 때 자세를 정할 때",
    a1: { text: "똑바로 정돈되게 앉는다", tags: ["T"] },
    a2: { text: "편하게 자연스럽게 앉는다", tags: ["F"] },
  },
  {
    id: 3,
    q: "의자에 앉을 때 속도를 정할 때",
    a1: { text: "천천히 꼼꼼하게 앉는다", tags: ["F"] },
    a2: { text: "빠르게 실용적으로 앉는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "의자에 앉기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 앉는다", tags: ["P"] },
  },
  {
    id: 5,
    q: "의자에 앉고 나서 확인할 때",
    a1: { text: "확인하고 꼼꼼하게 체크한다", tags: ["F"] },
    a2: { text: "그냥 가고 실용적으로 처리한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "의자에 앉을 때 친구가 와서 '나도 같이 앉고 싶어!'라고 할 때",
    a1: { text: "즉시 함께 앉는다", tags: ["E"] },
    a2: { text: "혼자 조용히 앉는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "친구가 '왜 그 의자에 앉아?'라고 물어볼 때",
    a1: { text: "실용성과 효율 때문에 앉는다고 말한다", tags: ["S"] },
    a2: { text: "의미와 특별함 때문에 앉는다고 말한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "의자에 앉을 때 방식을 정할 때",
    a1: { text: "정해진 순서로 체계적으로 앉는다", tags: ["J"] },
    a2: { text: "자연스럽고 유연하게 앉는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "의자에 앉고 나서 기분이 좋을 때",
    a1: { text: "평온함과 차분함을 느낀다", tags: ["I"] },
    a2: { text: "즐거움과 기쁨을 느낀다", tags: ["E"] },
  },
  {
    id: 10,
    q: "의자를 선택할 때 기준을 정할 때",
    a1: { text: "감성과 의미를 기준으로 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용을 기준으로 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "의자에 앉고 나서 친구에게 공유하고 싶을 때",
    a1: { text: "즉시 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 12,
    q: "의자에 앉는 이유를 생각할 때",
    a1: { text: "의미와 특별함을 위해 앉는다", tags: ["N"] },
    a2: { text: "실용성과 효율을 위해 앉는다", tags: ["S"] },
  },
]

export default function ChairSittingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "chair-sitting",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/chair-sitting/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/chair-sitting/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("chair-sitting")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("chair-sitting", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
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
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-emerald-500 bg-emerald-500"
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

