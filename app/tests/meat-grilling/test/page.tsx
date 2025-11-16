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
    q: "고기를 굽다가 안 익었는데 친구들이 먹자고 할 때",
    a1: { text: "일단 먹게 해주고 나중에 더 굽는다", tags: ["P"] },
    a2: { text: "익을 때까지 기다리게 한다", tags: ["J"] },
  },
  {
    id: 2,
    q: "고기를 굽다가 불이 너무 세서 타기 시작할 때",
    a1: { text: "당황해서 바로 뒤집는다", tags: ["P"] },
    a2: { text: "침착하게 불을 조절한다", tags: ["J"] },
  },
  {
    id: 3,
    q: "고기를 굽다가 여러 개를 동시에 구워야 할 때",
    a1: { text: "그때그때 편한 대로 굽는다", tags: ["P"] },
    a2: { text: "정해진 순서대로 체계적으로 굽는다", tags: ["J"] },
  },
  {
    id: 4,
    q: "고기집에서 고기를 고를 때",
    a1: { text: "부드러운 고기를 선택한다", tags: ["F"] },
    a2: { text: "쫄깃한 고기를 선택한다", tags: ["T"] },
  },
  {
    id: 5,
    q: "고기를 굽다가 친구들이 와서 같이 굽자고 할 때",
    a1: { text: "기쁘게 함께 굽는다", tags: ["E"] },
    a2: { text: "혼자 굽는 게 편하다고 거절한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "고기를 먹다가 너무 커서 자를 때",
    a1: { text: "작게 예쁘게 자른다", tags: ["F"] },
    a2: { text: "크게 실용적으로 자른다", tags: ["T"] },
  },
  {
    id: 7,
    q: "고기집에서 메뉴를 고를 때",
    a1: { text: "인기 메뉴나 기본 메뉴를 선택한다", tags: ["S"] },
    a2: { text: "특별한 메뉴나 새로운 메뉴를 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "고기를 굽기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 굽는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "고기를 먹다가 정말 맛있어서 기분이 좋을 때",
    a1: { text: "즐거워서 친구들에게 알려준다", tags: ["E"] },
    a2: { text: "평온하게 조용히 즐긴다", tags: ["I"] },
  },
  {
    id: 10,
    q: "고기를 선택할 때 이유를 생각할 때",
    a1: { text: "감성과 의미 때문에 선택한다", tags: ["F"] },
    a2: { text: "효율과 실용 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 11,
    q: "고기를 굽는 방법을 선택할 때",
    a1: { text: "전통 방식이나 기본 방식을 선택한다", tags: ["S"] },
    a2: { text: "특별한 방식이나 새로운 방식을 선택한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "고기를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
]

export default function MeatGrillingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "meat-grilling",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/meat-grilling/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/meat-grilling/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("meat-grilling")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("meat-grilling", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg">
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-red-500 bg-red-500"
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-red-500 bg-red-500"
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

