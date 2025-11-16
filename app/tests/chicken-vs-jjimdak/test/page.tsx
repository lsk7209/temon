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
    q: "배가 고파서 '찜닭'과 '치킨' 중 하나를 선택해야 할 때",
    a1: { text: "따뜻한 국물이 있는 찜닭을 선택한다", tags: ["F"] },
    a2: { text: "바삭한 맛의 치킨을 선택한다", tags: ["T"] },
  },
  {
    id: 2,
    q: "찜닭을 먹다가 국물이 너무 뜨거워서 입 안이 데일 것 같을 때",
    a1: { text: "국물을 불어가면서 천천히 마신다", tags: ["F"] },
    a2: { text: "치킨처럼 바삭한 부분만 먹는다", tags: ["T"] },
  },
  {
    id: 3,
    q: "힘든 하루를 보내고 위로가 필요할 때",
    a1: { text: "따뜻한 찜닭으로 위로받는다", tags: ["F"] },
    a2: { text: "바삭한 치킨으로 스트레스를 푼다", tags: ["T"] },
  },
  {
    id: 4,
    q: "찜닭이나 치킨을 먹을 때 함께 먹고 싶은 음식이 있을 때",
    a1: { text: "밥과 함께 따뜻하게 먹는다", tags: ["F"] },
    a2: { text: "맥주와 함께 상쾌하게 먹는다", tags: ["T"] },
  },
  {
    id: 5,
    q: "찜닭이나 치킨을 주문할 때 매운 정도를 선택할 때",
    a1: { text: "매운맛을 선택해서 자극을 받는다", tags: ["E"] },
    a2: { text: "순한맛을 선택해서 편안하게 먹는다", tags: ["I"] },
  },
  {
    id: 6,
    q: "찜닭을 먹다가 따뜻한 국물이 너무 좋아서 감동받을 때",
    a1: { text: "따뜻함과 위로를 느낀다", tags: ["F"] },
    a2: { text: "상쾌하고 즐거운 느낌을 받는다", tags: ["T"] },
  },
  {
    id: 7,
    q: "찜닭이나 치킨을 먹을 때 함께 먹고 싶은 사람이 있을 때",
    a1: { text: "혼자 조용히 먹는다", tags: ["I"] },
    a2: { text: "친구들과 함께 먹는다", tags: ["E"] },
  },
  {
    id: 8,
    q: "찜닭이나 치킨을 먹기 전에 계획을 세울 때",
    a1: { text: "미리 언제 어디서 먹을지 계획한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "찜닭이나 치킨을 선택할 때 메뉴를 고를 때",
    a1: { text: "인기 메뉴나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 특별한 취향으로 선택한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "찜닭이나 치킨을 먹고 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 친구들에게 후기를 공유한다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 맛집으로 간직한다", tags: ["I"] },
  },
  {
    id: 11,
    q: "찜닭이나 치킨을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "감성적이고 위로받는 이유로 선택한다", tags: ["F"] },
    a2: { text: "효율적이고 실용적인 이유로 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "찜닭이나 치킨을 먹을 때 먹는 순서가 있을 때",
    a1: { text: "정해진 순서대로 체계적으로 먹는다", tags: ["J"] },
    a2: { text: "그때그때 편한 대로 먹는다", tags: ["P"] },
  },
]

export default function ChickenVsJjimdakTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "chicken-vs-jjimdak",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/chicken-vs-jjimdak/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/chicken-vs-jjimdak/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("chicken-vs-jjimdak")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("chicken-vs-jjimdak", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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

