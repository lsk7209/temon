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
    q: "국물 있는 음식을 먹다가 국물이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "불어가면서 천천히 마신다", tags: ["F", "J"] },
    a2: { text: "국물은 건너뛰고 밥만 먹는다", tags: ["T", "P"] },
  },
  {
    id: 2,
    q: "비빔밥을 먹다가 재료들이 완전히 뒤섞여서 어지러울 때",
    a1: { text: "더 골고루 비벼서 완전히 섞는다", tags: ["N", "P"] },
    a2: { text: "한 가지씩 정돈해서 따로따로 먹는다", tags: ["S", "J"] },
  },
  {
    id: 3,
    q: "식당에서 '된장찌개'와 '비빔밥' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 된장찌개를 선택한다", tags: ["F", "N"] },
    a2: { text: "간편한 비빔밥을 선택한다", tags: ["T", "S"] },
  },
  {
    id: 4,
    q: "국물 있는 음식을 먹다가 국물이 다 떨어져서 밥만 남았을 때",
    a1: { text: "직원에게 국물을 더 달라고 요청한다", tags: ["E", "F"] },
    a2: { text: "그냥 남은 밥만 먹는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "비빔밥을 먹다가 맛을 보니 완전히 밋밋하고 재미없을 때",
    a1: { text: "고추장이나 양념을 더 넣어본다", tags: ["E", "P"] },
    a2: { text: "그냥 먹거나 포장한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "국물 있는 음식을 먹다가 국물이 너무 짜서 바다물 같을 때",
    a1: { text: "물을 넣거나 국물을 덜 마신다", tags: ["E", "F"] },
    a2: { text: "그냥 참고 먹는다", tags: ["I", "T"] },
  },
  {
    id: 7,
    q: "비빔밥을 먹다가 너무 매워서 입 안이 불타오를 것 같을 때",
    a1: { text: "밥을 더 넣어서 매운맛을 완화시킨다", tags: ["E", "F"] },
    a2: { text: "그냥 참고 먹거나 포장한다", tags: ["I", "T"] },
  },
  {
    id: 8,
    q: "국물 있는 음식을 먹다가 친구가 와서 '나도 먹고 싶어! 나눠줘!'라고 할 때",
    a1: { text: "즉시 국물을 나눠주고 함께 먹는다", tags: ["E", "F"] },
    a2: { text: "지금은 혼자 먹고 싶다고 말한다", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "비빔밥을 먹다가 양이 너무 많아서 절반도 못 먹었을 때",
    a1: { text: "포장해서 집에 가져간다", tags: ["J", "S"] },
    a2: { text: "그냥 남기고 나간다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "국물 있는 음식을 먹다가 국물이 너무 차가워서 맛이 없을 때",
    a1: { text: "따뜻한 국물을 더 달라고 요청한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹는다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "비빔밥을 먹다가 너무 달아서 당뇨 걸릴 것 같을 때",
    a1: { text: "고춧가루나 매운 양념을 넣어서 조정한다", tags: ["E", "F"] },
    a2: { text: "그냥 먹는다", tags: ["I", "T"] },
  },
  {
    id: 12,
    q: "점심시간에 '김치찌개'와 '돌솥비빔밥' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 김치찌개를 선택한다", tags: ["F", "N"] },
    a2: { text: "간편한 돌솥비빔밥을 선택한다", tags: ["T", "S"] },
  },
]

export default function SoupVsBibimTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "soup-vs-bibim",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/soup-vs-bibim/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/soup-vs-bibim/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("soup-vs-bibim")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("soup-vs-bibim", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center shadow-lg">
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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

