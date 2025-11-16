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
    q: "샐러드바에서 드레싱을 고를 때",
    a1: { text: "올리브오일, 발사믹 같은 기본 드레싱을 선택한다", tags: ["S"] },
    a2: { text: "시저나 특별한 드레싱을 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "샐러드에 드레싱을 뿌릴 때",
    a1: { text: "많이 풍부하게 뿌린다", tags: ["T"] },
    a2: { text: "적게 적당히 뿌린다", tags: ["F"] },
  },
  {
    id: 3,
    q: "드레싱을 선택할 때 기준을 정할 때",
    a1: { text: "맛과 실용성을 기준으로 선택한다", tags: ["S"] },
    a2: { text: "건강과 의미를 기준으로 선택한다", tags: ["N"] },
  },
  {
    id: 4,
    q: "샐러드 재료를 고를 때",
    a1: { text: "기본 재료나 전통 재료를 선택한다", tags: ["S"] },
    a2: { text: "특별한 재료나 새로운 재료를 선택한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "샐러드를 먹을 때 순서를 정할 때",
    a1: { text: "정해진 순서로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 먹는다", tags: ["P"] },
  },
  {
    id: 6,
    q: "샐러드를 나눠 먹을 때",
    a1: { text: "기쁘게 함께 나눠 먹는다", tags: ["E"] },
    a2: { text: "혼자 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 7,
    q: "샐러드를 만들 때",
    a1: { text: "혼자 조용히 만든다", tags: ["I"] },
    a2: { text: "사람들과 함께 만든다", tags: ["E"] },
  },
  {
    id: 8,
    q: "샐러드를 선택할 때 이유를 생각할 때",
    a1: { text: "맛과 실용성 때문에 선택한다", tags: ["S"] },
    a2: { text: "건강과 의미 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "샐러드를 만들기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 만든다", tags: ["P"] },
  },
  {
    id: 10,
    q: "샐러드를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 11,
    q: "드레싱을 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "샐러드를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function SaladDressingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "salad-dressing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/salad-dressing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/salad-dressing/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("salad-dressing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("salad-dressing", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center shadow-lg">
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
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-950 dark:to-lime-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-green-500 bg-green-500"
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
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-950 dark:to-lime-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-green-500 bg-green-500"
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
