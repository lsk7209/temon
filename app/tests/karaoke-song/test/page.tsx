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
    q: "노래방에서 곡을 고를 때",
    a1: { text: "항상 같은 곡이나 단골 곡을 선택한다", tags: ["J"] },
    a2: { text: "그때그때 다른 곡을 다양하게 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "열정적으로 목소리를 크게 낸다", tags: ["E"] },
    a2: { text: "조용히 부드럽게 부른다", tags: ["I"] },
  },
  {
    id: 3,
    q: "노래방에 가기 전에 곡을 정할 때",
    a1: { text: "미리 정해두고 준비한다", tags: ["J"] },
    a2: { text: "그때그때 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "노래방에서 분위기가 시끄러울 때",
    a1: { text: "분위기를 띄우고 모두와 함께 즐긴다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 시간을 즐긴다", tags: ["I"] },
  },
  {
    id: 5,
    q: "노래방에서 장르를 선택할 때",
    a1: { text: "항상 같은 장르를 안정적으로 선택한다", tags: ["S"] },
    a2: { text: "다양한 장르를 새로운 시도로 선택한다", tags: ["N"] },
  },
  {
    id: 6,
    q: "노래방에서 노래를 부르고 정말 재미있을 때",
    a1: { text: "즉시 후기를 공유하고 경험을 나눈다", tags: ["E"] },
    a2: { text: "조용히 혼자만의 추억으로 간직한다", tags: ["I"] },
  },
  {
    id: 7,
    q: "노래방에서 곡을 선택할 때",
    a1: { text: "인기곡이나 트렌드를 따라 선택한다", tags: ["S"] },
    a2: { text: "나만의 취향이나 특별한 곡을 선택한다", tags: ["N"] },
  },
  {
    id: 8,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "감정을 표현해서 감성적으로 부른다", tags: ["F"] },
    a2: { text: "기술 중심으로 실력을 향상시킨다", tags: ["T"] },
  },
  {
    id: 9,
    q: "노래방에서 노래 순서를 정할 때",
    a1: { text: "미리 계획하고 순서를 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 그때그때 부른다", tags: ["P"] },
  },
  {
    id: 10,
    q: "노래방에서 노래를 부를 때",
    a1: { text: "사람들과 함께 분위기를 띄운다", tags: ["E"] },
    a2: { text: "혼자 조용히 부른다", tags: ["I"] },
  },
  {
    id: 11,
    q: "노래방에서 곡을 선택할 때 이유를 생각할 때",
    a1: { text: "기억에 남는 곡이나 추억 때문에 선택한다", tags: ["F"] },
    a2: { text: "실력 향상이나 도전 때문에 선택한다", tags: ["T"] },
  },
  {
    id: 12,
    q: "노래방에서 노래를 부르는 목적을 생각할 때",
    a1: { text: "즐거움과 힐링을 위해 부른다", tags: ["F"] },
    a2: { text: "실력 향상과 목표 달성을 위해 부른다", tags: ["T"] },
  },
]

export default function KaraokeSongTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "karaoke-song",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/karaoke-song/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/karaoke-song/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("karaoke-song")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("karaoke-song", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-lg">
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950 shadow-lg"
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950 dark:to-red-950 shadow-lg"
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

