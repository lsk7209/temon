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
    q: "새로운 게임을 선택할 때 친구가 '이 게임 인기 많아!'라고 추천할 때",
    a1: { text: "인기 게임이라서 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 취향에 맞는 특별한 게임을 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "게임을 시작하기 전에 전략을 세울 때",
    a1: { text: "전략적이고 계획적으로 플레이한다", tags: ["J"] },
    a2: { text: "즉흥적이고 그때그때 플레이한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "친구가 '왜 게임을 해?'라고 물어볼 때",
    a1: { text: "승리하고 실력을 향상시키기 위해 한다고 말한다", tags: ["T"] },
    a2: { text: "즐거움과 힐링을 위해 한다고 말한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "게임을 할 시간을 정할 때",
    a1: { text: "계획적으로 시간을 정해서 플레이한다", tags: ["J"] },
    a2: { text: "그때그때 유연하게 플레이한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "게임을 할 때 친구가 와서 '나도 같이 하고 싶어!'라고 할 때",
    a1: { text: "혼자 조용히 플레이한다", tags: ["I"] },
    a2: { text: "사람들과 함께 플레이한다", tags: ["E"] },
  },
  {
    id: 6,
    q: "게임을 끝내고 나서 정말 재미있었을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만 즐긴다", tags: ["I"] },
  },
  {
    id: 7,
    q: "게임을 선택할 때 장르를 고를 때",
    a1: { text: "항상 같은 장르를 선택한다", tags: ["S"] },
    a2: { text: "다양한 장르를 시도해본다", tags: ["N"] },
  },
  {
    id: 8,
    q: "게임 난이도를 선택할 때",
    a1: { text: "쉬운 난이도를 선택해서 편안하게 플레이한다", tags: ["F"] },
    a2: { text: "어려운 난이도를 선택해서 도전한다", tags: ["T"] },
  },
  {
    id: 9,
    q: "게임을 플레이하기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 목표를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 플레이한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "게임을 선택할 때 선택하는 이유를 생각할 때",
    a1: { text: "인기와 트렌드 때문에 선택한다", tags: ["S"] },
    a2: { text: "특별함과 의미 때문에 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "게임을 플레이하고 있을 때 기분이 좋을 때",
    a1: { text: "즐거움과 재미를 느낀다", tags: ["E"] },
    a2: { text: "평온함과 집중을 느낀다", tags: ["I"] },
  },
  {
    id: 12,
    q: "게임에서 실패했을 때",
    a1: { text: "다시 도전해서 실력을 향상시킨다", tags: ["T"] },
    a2: { text: "즐거움을 중시해서 부담 없이 플레이한다", tags: ["F"] },
  },
]

export default function GamePlayStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "game-play-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/game-play-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/game-play-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("game-play-style")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("game-play-style", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 shadow-lg"
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 shadow-lg"
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

