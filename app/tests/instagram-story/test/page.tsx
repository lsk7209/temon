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
    q: "인스타 스토리를 올릴 때 필터를 선택할 때",
    a1: { text: "필터 없이 바로 올린다", tags: ["S"] },
    a2: { text: "필터 여러 개를 시도해서 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "인스타 스토리를 올릴 때 빈도를 생각할 때",
    a1: { text: "하루 여러 개를 올린다", tags: ["E"] },
    a2: { text: "가끔씩만 올린다", tags: ["I"] },
  },
  {
    id: 3,
    q: "인스타 스토리에 올릴 내용을 선택할 때",
    a1: { text: "일상 공유나 소소한 순간들을 올린다", tags: ["S"] },
    a2: { text: "특별한 순간이나 의미 있는 것만 올린다", tags: ["N"] },
  },
  {
    id: 4,
    q: "인스타 스토리 하이라이트를 관리할 때",
    a1: { text: "여러 개를 관리하고 카테고리를 정리한다", tags: ["J"] },
    a2: { text: "만들지 않거나 가끔만 만든다", tags: ["P"] },
  },
  {
    id: 5,
    q: "인스타 스토리에 댓글이 올 때",
    a1: { text: "댓글을 많이 받고 답장을 활발히 한다", tags: ["E"] },
    a2: { text: "조용히만 보고 답장은 간단히 한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "인스타 스토리를 보관할 때",
    a1: { text: "하이라이트에 보관해서 추억을 기록한다", tags: ["F"] },
    a2: { text: "그냥 지나가고 보관하지 않는다", tags: ["T"] },
  },
  {
    id: 7,
    q: "인스타 스토리에 스티커를 사용할 때",
    a1: { text: "스티커를 많이 사용해서 재미있게 만든다", tags: ["E"] },
    a2: { text: "최소한만 사용해서 깔끔하게 만든다", tags: ["I"] },
  },
  {
    id: 8,
    q: "인스타 스토리에 음악을 추가할 때",
    a1: { text: "트렌디한 음악을 추가해서 분위기를 중시한다", tags: ["F"] },
    a2: { text: "음악 없이 내용 중심으로 만든다", tags: ["T"] },
  },
  {
    id: 9,
    q: "인스타 스토리를 올리기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 컨셉을 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 올린다", tags: ["P"] },
  },
  {
    id: 10,
    q: "인스타 스토리에 위치 태그를 사용할 때",
    a1: { text: "위치 태그를 자주 사용한다", tags: ["E"] },
    a2: { text: "위치 태그를 거의 사용하지 않는다", tags: ["I"] },
  },
  {
    id: 11,
    q: "인스타 스토리 질문 기능을 사용할 때",
    a1: { text: "질문 박스를 자주 사용해서 소통을 활발히 한다", tags: ["E"] },
    a2: { text: "질문 박스를 거의 사용하지 않는다", tags: ["I"] },
  },
  {
    id: 12,
    q: "인스타 스토리를 올리고 나서 후회할 때",
    a1: { text: "올리고 바로 삭제하고 신중하게 처리한다", tags: ["T"] },
    a2: { text: "올린 것을 그대로 둔다", tags: ["F"] },
  },
]

export default function InstagramStoryTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "instagram-story",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/instagram-story/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/instagram-story/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    trackTestStart("instagram-story")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("instagram-story", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 shadow-lg"
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 shadow-lg"
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

