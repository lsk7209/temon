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
    q: "집에 들어가다가 문을 닫을 때 옆집에서 시끄러운 소리가 들릴 때",
    a1: { text: "조용히 천천히 닫는다", tags: ["I"] },
    a2: { text: "빠르게 확실하게 닫는다", tags: ["E"] },
  },
  {
    id: 2,
    q: "집을 나가다가 문을 잠글지 말지 고민될 때",
    a1: { text: "항상 잠그는 습관이 있어서 잠근다", tags: ["J"] },
    a2: { text: "상황에 따라 가끔 안 잠근다", tags: ["P"] },
  },
  {
    id: 3,
    q: "여러 개의 문을 닫아야 할 때",
    a1: { text: "정해진 순서대로 체계적으로 닫는다", tags: ["J"] },
    a2: { text: "그때그때 편한 대로 닫는다", tags: ["P"] },
  },
  {
    id: 4,
    q: "문을 닫다가 친구가 와서 '문 열어줘!'라고 외칠 때",
    a1: { text: "문 닫는 루틴을 끝내고 연다", tags: ["J"] },
    a2: { text: "즉시 문을 다시 연다", tags: ["P"] },
  },
  {
    id: 5,
    q: "문을 닫다가 문이 삐걱거리거나 이상한 소리가 날 때",
    a1: { text: "조용히 확인하고 천천히 닫는다", tags: ["I"] },
    a2: { text: "당황해서 빠르게 닫는다", tags: ["E"] },
  },
  {
    id: 6,
    q: "문을 닫고 나가다가 문이 제대로 잠겼는지 불안할 때",
    a1: { text: "다시 돌아가서 확인한다", tags: ["F"] },
    a2: { text: "그냥 가고 신경 안 쓴다", tags: ["T"] },
  },
  {
    id: 7,
    q: "문을 닫다가 가족이나 친구들이 함께 있을 때",
    a1: { text: "혼자 조용히 닫는다", tags: ["I"] },
    a2: { text: "함께 닫으면서 대화한다", tags: ["E"] },
  },
  {
    id: 8,
    q: "문을 닫다가 문 종류나 스타일을 선택할 수 있을 때",
    a1: { text: "실용적이고 효율적인 걸 선택한다", tags: ["S"] },
    a2: { text: "특별하고 의미 있는 걸 선택한다", tags: ["N"] },
  },
  {
    id: 9,
    q: "문을 닫기 전에 계획을 세울 수 있을 때",
    a1: { text: "미리 언제 어떻게 닫을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 닫는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "문을 닫다가 문 닫는 게 재미있고 즐거울 때",
    a1: { text: "조용히 혼자 즐긴다", tags: ["I"] },
    a2: { text: "친구들에게 공유하고 함께 즐긴다", tags: ["E"] },
  },
  {
    id: 11,
    q: "문을 닫다가 문 닫는 이유나 의미를 생각할 때",
    a1: { text: "감성적이고 의미 있는 이유를 생각한다", tags: ["F"] },
    a2: { text: "실용적이고 효율적인 이유만 생각한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "문을 닫다가 문 닫는 경험이 특별해서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 경험을 공유한다", tags: ["E"] },
    a2: { text: "혼자만의 특별한 경험으로 간직한다", tags: ["I"] },
  },
]

export default function DoorClosingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "door-closing",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/door-closing/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/door-closing/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("door-closing")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("door-closing", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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

