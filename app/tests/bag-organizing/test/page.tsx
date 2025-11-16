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
    q: "가방에서 필요한 물건을 찾을 수 없을 때",
    a1: { text: "당황해서 가방을 다 뒤진다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리된 위치를 확인한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "가방이 너무 무거워서 어깨가 아플 때",
    a1: { text: "당장 정리하고 싶어서 바로 시작한다", tags: ["E", "J"] },
    a2: { text: "나중에 정리하고 일단 참는다", tags: ["I", "P"] },
  },
  {
    id: 3,
    q: "가방 정리하다가 깜빡 잊고 넣은 물건을 발견했을 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 정리하고 끝낸다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "가방 정리하다가 버릴까 말까 고민될 때",
    a1: { text: "감정적으로 보관한다", tags: ["F", "N"] },
    a2: { text: "실용적으로 버린다", tags: ["T", "S"] },
  },
  {
    id: 5,
    q: "가방 정리하다가 친구가 와서 나가자고 할 때",
    a1: { text: "정리를 멈추고 나간다", tags: ["E", "P"] },
    a2: { text: "정리를 끝내고 나간다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "가방 정리하다가 시간이 너무 오래 걸릴 때",
    a1: { text: "대충 빠르게 끝낸다", tags: ["E", "P"] },
    a2: { text: "꼼꼼하게 끝까지 한다", tags: ["I", "J"] },
  },
  {
    id: 7,
    q: "가방 정리하다가 예전에 잃어버린 물건을 발견했을 때",
    a1: { text: "기뻐서 친구들에게 알려준다", tags: ["E", "F"] },
    a2: { text: "조용히 보관한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "가방 정리하다가 정리가 끝났는데 또 넣을 게 생겼을 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리한다", tags: ["I", "J"] },
  },
  {
    id: 9,
    q: "가방 정리하다가 핸드폰이 울렸을 때",
    a1: { text: "바로 받고 정리를 멈춘다", tags: ["E", "F"] },
    a2: { text: "정리가 끝날 때까지 무시한다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "가방 정리하다가 너무 피곤해서 정리가 싫을 때",
    a1: { text: "대충 끝내고 쉰다", tags: ["E", "P"] },
    a2: { text: "끝까지 정리하고 쉰다", tags: ["I", "J"] },
  },
  {
    id: 11,
    q: "가방 정리하다가 정리한 게 또 어지러워질 때",
    a1: { text: "당황해서 다시 정리한다", tags: ["E", "F"] },
    a2: { text: "침착하게 다시 정리한다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "가방 정리하다가 정리한 물건을 또 찾을 수 없을 때",
    a1: { text: "당황해서 가방을 다시 뒤진다", tags: ["E", "P"] },
    a2: { text: "침착하게 정리된 위치를 확인한다", tags: ["I", "J"] },
  },
]

export default function BagOrganizingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "bag-organizing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/bag-organizing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/bag-organizing/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("bag-organizing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("bag-organizing", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
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
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-amber-500 bg-amber-500"
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
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-amber-500 bg-amber-500"
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

