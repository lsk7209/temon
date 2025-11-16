"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"
import { calculateMBTI } from "@/lib/utils/mbti-calculator"

const questions = [
  {
    id: 1,
    q: "친구 생일 선물을 고르다가 '실용적인 물건'과 '의미 있는 물건' 중 고민될 때",
    a1: { text: "친구가 필요로 하는 실용적인 선물을 선택한다", tags: ["T"] },
    a2: { text: "친구에게 의미 있는 감성적인 선물을 선택한다", tags: ["F"] },
  },
  {
    id: 2,
    q: "선물을 포장하다가 포장지가 너무 예쁘거나 복잡할 때",
    a1: { text: "예쁘게 정성스럽게 포장한다", tags: ["F"] },
    a2: { text: "간단하고 효율적으로 포장한다", tags: ["T"] },
  },
  {
    id: 3,
    q: "선물을 준비하다가 생일이 내일인데 아직 선물을 안 샀을 때",
    a1: { text: "미리 계획해서 준비했어야 한다고 후회한다", tags: ["J"] },
    a2: { text: "당일 구매해도 괜찮다고 생각한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "선물을 선택하다가 여러 가지 옵션이 있을 때",
    a1: { text: "리스트를 작성해서 계획적으로 선택한다", tags: ["J"] },
    a2: { text: "그때그때 느낌으로 즉흥적으로 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "선물을 고르다가 예산보다 비싼 선물이 마음에 들 때",
    a1: { text: "예산 내에서 합리적인 선물을 선택한다", tags: ["T"] },
    a2: { text: "의미가 중요해서 가격은 부차적이라고 생각한다", tags: ["F"] },
  },
  {
    id: 6,
    q: "선물을 주기 전에 친구가 반응을 기대할 때",
    a1: { text: "기대감에 설레는 마음으로 준다", tags: ["E"] },
    a2: { text: "평온하고 차분하게 준다", tags: ["I"] },
  },
  {
    id: 7,
    q: "선물을 선택할 때 메뉴판이나 카탈로그를 볼 때",
    a1: { text: "인기 선물이나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "특별하고 독특한 선물을 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "선물을 줄 때 함께 줄 사람이 있을 때",
    a1: { text: "혼자 조용히 준다", tags: ["I"] },
    a2: { text: "친구들과 함께 준다", tags: ["E"] },
  },
  {
    id: 9,
    q: "선물을 준비하기 전에 계획을 세울 때",
    a1: { text: "미리 언제 무엇을 어떻게 준비할지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 준비한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "선물을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "필요하고 실용적인 이유로 선택한다", tags: ["T"] },
    a2: { text: "의미 있고 감성적인 이유로 선택한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "선물을 주고 친구가 좋아하는 모습을 볼 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "선물을 포장하다가 포장 스타일을 선택할 때",
    a1: { text: "예쁘고 정성스러운 스타일로 포장한다", tags: ["F"] },
    a2: { text: "간단하고 효율적인 스타일로 포장한다", tags: ["T"] },
  },
]

export default function GiftChoosingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "gift-choosing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/gift-choosing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/gift-choosing/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("gift-choosing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("gift-choosing", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 shadow-lg"
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
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 shadow-lg"
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

