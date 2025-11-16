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
    q: "선물 포장지를 뜯을 때",
    a1: { text: "조심스럽게 천천히 뜯는다", tags: ["J"] },
    a2: { text: "한 번에 빠르게 찢는다", tags: ["P"] },
  },
  {
    id: 2,
    q: "포장지를 뜯고 나서 포장지를 처리할 때",
    a1: { text: "깔끔하게 접어서 보관한다", tags: ["J"] },
    a2: { text: "바로 버린다", tags: ["P"] },
  },
  {
    id: 3,
    q: "선물 포장지를 뜯을 때 속도를 정할 때",
    a1: { text: "천천히 포장지를 아끼며 뜯는다", tags: ["F"] },
    a2: { text: "빠르게 내용물이 궁금해서 뜯는다", tags: ["T"] },
  },
  {
    id: 4,
    q: "포장지를 뜯을 때 도구를 선택할 때",
    a1: { text: "손으로만 자연스럽게 뜯는다", tags: ["S"] },
    a2: { text: "가위나 칼을 사용해서 정확하게 뜯는다", tags: ["N"] },
  },
  {
    id: 5,
    q: "포장지를 뜯고 나서 포장지를 정리할 때",
    a1: { text: "깔끔하게 정리하고 재활용을 고려한다", tags: ["F"] },
    a2: { text: "그냥 버리고 효율적으로 처리한다", tags: ["T"] },
  },
  {
    id: 6,
    q: "선물 포장지를 뜯을 때 기분이 좋을 때",
    a1: { text: "기대감에 설레는 마음으로 뜯는다", tags: ["E"] },
    a2: { text: "평온하게 차분하게 뜯는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "포장지를 뜯을 때 방법을 정할 때",
    a1: { text: "한 곳에서 시작해서 체계적으로 뜯는다", tags: ["J"] },
    a2: { text: "여러 곳에서 즉흥적으로 뜯는다", tags: ["P"] },
  },
  {
    id: 8,
    q: "포장지를 뜯을 때 포장지 상태를 생각할 때",
    a1: { text: "깔끔하게 뜯어서 포장지를 보존한다", tags: ["S"] },
    a2: { text: "찢어지게 뜯어서 내용물 중심으로 뜯는다", tags: ["N"] },
  },
  {
    id: 9,
    q: "선물 포장지를 뜯을 때",
    a1: { text: "혼자 조용히 뜯는다", tags: ["I"] },
    a2: { text: "사람들과 함께 분위기를 띄운다", tags: ["E"] },
  },
  {
    id: 10,
    q: "포장지를 뜯기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 순서를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 뜯는다", tags: ["P"] },
  },
  {
    id: 11,
    q: "포장지를 뜯을 때 이유를 생각할 때",
    a1: { text: "내용물을 확인하기 위해 실용적으로 뜯는다", tags: ["T"] },
    a2: { text: "포장지도 예쁘다고 생각해서 감성적으로 뜯는다", tags: ["F"] },
  },
  {
    id: 12,
    q: "선물 포장지를 뜯고 정말 좋아서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 특별한 순간으로 간직한다", tags: ["I"] },
  },
]

export default function GiftWrappingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "gift-wrapping",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/gift-wrapping/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/gift-wrapping/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("gift-wrapping")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("gift-wrapping", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
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
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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

