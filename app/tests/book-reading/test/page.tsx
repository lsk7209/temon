"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
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
    q: "책 읽는 방식은?",
    a1: { text: "정해진 순서, 체계적으로", tags: ["J"] },
    a2: { text: "그때그때, 유연하게", tags: ["P"] },
  },
  {
    id: 2,
    q: "읽는 속도는?",
    a1: { text: "천천히, 꼼꼼하게", tags: ["F"] },
    a2: { text: "빠르게, 실용적으로", tags: ["T"] },
  },
  {
    id: 3,
    q: "읽는 장소는?",
    a1: { text: "조용한 곳, 혼자", tags: ["I"] },
    a2: { text: "어디서나, 사람들과", tags: ["E"] },
  },
  {
    id: 4,
    q: "읽는 계획은?",
    a1: { text: "미리 계획, 목표 정함", tags: ["J"] },
    a2: { text: "즉흥적으로, 그때그때", tags: ["P"] },
  },
  {
    id: 5,
    q: "읽는 후기는?",
    a1: { text: "후기 작성, 꼼꼼하게", tags: ["F"] },
    a2: { text: "그냥 가기, 실용적으로", tags: ["T"] },
  },
  {
    id: 6,
    q: "읽는 사람은?",
    a1: { text: "혼자 조용히", tags: ["I"] },
    a2: { text: "사람들과 함께", tags: ["E"] },
  },
  {
    id: 7,
    q: "읽는 이유는?",
    a1: { text: "실용성, 효율", tags: ["S"] },
    a2: { text: "의미, 특별함", tags: ["N"] },
  },
  {
    id: 8,
    q: "읽는 방식은?",
    a1: { text: "정해진 순서, 체계적으로", tags: ["J"] },
    a2: { text: "자연스럽게, 유연하게", tags: ["P"] },
  },
  {
    id: 9,
    q: "읽는 감정은?",
    a1: { text: "평온함, 차분하게", tags: ["I"] },
    a2: { text: "즐거움, 기쁨", tags: ["E"] },
  },
  {
    id: 10,
    q: "읽는 기준은?",
    a1: { text: "감성, 의미", tags: ["F"] },
    a2: { text: "효율, 실용", tags: ["T"] },
  },
  {
    id: 11,
    q: "읽는 후기는?",
    a1: { text: "후기 공유, 경험 나누기", tags: ["E"] },
    a2: { text: "조용히 즐기기", tags: ["I"] },
  },
  {
    id: 12,
    q: "읽는 이유는?",
    a1: { text: "의미, 특별함", tags: ["N"] },
    a2: { text: "실용성, 효율", tags: ["S"] },
  },
]

export default function BookReadingTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "book-reading",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/book-reading/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/book-reading/test/result?type=${resultType}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  useEffect(() => {
    trackTestStart("book-reading")
  }, [])

  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("book-reading", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, questions.length])

  const handleChoiceSelect = useCallback(
    async (tags: string[]) => {
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
    },
    [currentQuestion, answers, questions.length, saveResult]
  )

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }, [currentQuestion, answers])

  const currentQ = useMemo(() => questions[currentQuestion], [currentQuestion])

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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                    ? "border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 shadow-lg"
                    : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-700 dark:hover:border-violet-600 dark:hover:bg-violet-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-violet-500 bg-violet-500"
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
                    ? "border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 shadow-lg"
                    : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-700 dark:hover:border-violet-600 dark:hover:bg-violet-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-violet-500 bg-violet-500"
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

