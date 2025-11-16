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
    q: "피자 토핑을 고를 때",
    a1: { text: "항상 페퍼로니로 고정한다", tags: ["J"] },
    a2: { text: "그때그때 다양한 토핑을 시도한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "치즈는 필수인가요?",
    a1: { text: "치즈 더블 필수", tags: ["F"] },
    a2: { text: "기본 치즈만, 과하면 느끼해", tags: ["T"] },
  },
  {
    id: 3,
    q: "피자에 야채 토핑을 추가할 때",
    a1: { text: "야채는 빼고 고기만 선택한다", tags: ["T"] },
    a2: { text: "야채를 가득 넣고 영양을 고려한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "피자를 주문할 때",
    a1: { text: "메뉴를 미리 정해둔다", tags: ["J"] },
    a2: { text: "그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "피자 조각을 선택할 때",
    a1: { text: "가장 큰 조각을 선택한다", tags: ["S"] },
    a2: { text: "토핑이 많은 조각을 선택한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "피자를 먹을 때 순서를 정할 때",
    a1: { text: "가장자리부터 차근차근 먹는다", tags: ["J"] },
    a2: { text: "가운데부터 가장 맛있는 부분을 먹는다", tags: ["P"] },
  },
  {
    id: 7,
    q: "피자 사진을 찍을 때?",
    a1: { text: "사진 찍고 바로 먹기 시작", tags: ["E"] },
    a2: { text: "조용히 맛에 집중", tags: ["I"] },
  },
  {
    id: 8,
    q: "피자 조각이 떨어졌을 때?",
    a1: { text: "포기하고 포크로 먹기", tags: ["T"] },
    a2: { text: "다시 올려서 도전", tags: ["F"] },
  },
  {
    id: 9,
    q: "피자를 고를 때 무엇을 중시하나요?",
    a1: { text: "가격·칼로리·영양 정보", tags: ["T"] },
    a2: { text: "맛·인기·추천 메뉴", tags: ["F"] },
  },
  {
    id: 10,
    q: "피자 토핑 조합을 정할 때",
    a1: { text: "클래식 조합만 선택한다", tags: ["S"] },
    a2: { text: "신기한 조합을 시도한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "피자를 먹고 난 후?",
    a1: { text: "후기 바로 작성", tags: ["E"] },
    a2: { text: "조용히 소화하며 만족", tags: ["I"] },
  },
  {
    id: 12,
    q: "피자 나눠 먹을 때?",
    a1: { text: "한 조각씩 나눠 먹자고 제안", tags: ["E"] },
    a2: { text: "각자 접시에 조용히 담음", tags: ["I"] },
  },
]

export default function PizzaToppingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "pizza-topping",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/pizza-topping/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/pizza-topping/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("pizza-topping")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("pizza-topping", currentQuestion + 1, questions.length)
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

