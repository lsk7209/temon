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
    q: "화장실에서 핸드폰을 떨어뜨렸을 때",
    a1: { text: "당황해서 바로 주워서 확인한다", tags: ["E", "P"] },
    a2: { text: "침착하게 상황을 파악하고 처리한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "화장실 휴지가 다 떨어졌을 때",
    a1: { text: "당황해서 주변을 둘러본다", tags: ["E", "P"] },
    a2: { text: "침착하게 대안을 찾는다", tags: ["I", "J"] },
  },
  {
    id: 3,
    q: "화장실 문이 잠겨있는데 급할 때",
    a1: { text: "문을 두드리거나 소리를 낸다", tags: ["E", "F"] },
    a2: { text: "조용히 기다리거나 다른 곳을 찾는다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "화장실에서 이상한 소리가 들릴 때",
    a1: { text: "궁금해서 무슨 일인지 확인한다", tags: ["E", "N"] },
    a2: { text: "무시하고 빨리 나간다", tags: ["I", "S"] },
  },
  {
    id: 5,
    q: "화장실에서 옆 칸 사람이 이상한 소리를 낼 때",
    a1: { text: "웃음이 나오거나 반응한다", tags: ["E", "F"] },
    a2: { text: "무시하고 집중한다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "화장실에서 핸드폰 알림이 울렸을 때",
    a1: { text: "바로 확인하고 답장한다", tags: ["E", "P"] },
    a2: { text: "나중에 확인한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "화장실에서 거울을 보다가 시간 가는 줄 모를 때",
    a1: { text: "계속 보고 있다가 깨닫는다", tags: ["E", "P"] },
    a2: { text: "시간을 체크하며 빠르게 한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "화장실에서 손을 씻다가 물이 튈 때",
    a1: { text: "신경 쓰지 않고 그냥 간다", tags: ["P", "N"] },
    a2: { text: "다시 씻거나 닦는다", tags: ["J", "S"] },
  },
  {
    id: 9,
    q: "화장실에서 친구가 문 밖에서 기다리고 있을 때",
    a1: { text: "빨리 나가려고 서두른다", tags: ["E", "F"] },
    a2: { text: "여유롭게 마무리한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "화장실에서 냄새가 이상할 때",
    a1: { text: "궁금해서 원인을 찾아본다", tags: ["E", "N"] },
    a2: { text: "빨리 나간다", tags: ["I", "S"] },
  },
  {
    id: 11,
    q: "화장실에서 물이 안 나올 때",
    a1: { text: "당황해서 여러 번 시도한다", tags: ["E", "P"] },
    a2: { text: "침착하게 다른 방법을 찾는다", tags: ["I", "J"] },
  },
  {
    id: 12,
    q: "화장실에서 실수로 문을 안 잠갔을 때",
    a1: { text: "당황해서 바로 잠근다", tags: ["E", "F"] },
    a2: { text: "침착하게 잠그고 계속한다", tags: ["I", "T"] },
  },
]

export default function BathroomHabitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "bathroom-habit",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/bathroom-habit/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/bathroom-habit/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("bathroom-habit")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("bathroom-habit", currentQuestion + 1, questions.length)
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

