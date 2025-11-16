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
    q: "맛있는 요리를 만들었을 때",
    a1: { text: "즉시 사진을 찍어 SNS에 올린다", tags: ["E", "P"] },
    a2: { text: "먼저 맛을 보고 나중에 공유한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리 레시피를 공유할 때",
    a1: { text: "친구들에게 직접 설명하고 알려준다", tags: ["E", "F"] },
    a2: { text: "레시피를 정리해서 메시지로 보낸다", tags: ["I", "T"] },
  },
  {
    id: 3,
    q: "요리를 함께 만들 때",
    a1: { text: "다른 사람과 함께 요리하는 게 즐겁다", tags: ["E", "F"] },
    a2: { text: "혼자 요리하는 게 편하다", tags: ["I", "T"] },
  },
  {
    id: 4,
    q: "요리 사진을 올릴 때",
    a1: { text: "즉흥적으로 찍어서 올린다", tags: ["P", "N"] },
    a2: { text: "각도와 조명을 신경 써서 올린다", tags: ["J", "S"] },
  },
  {
    id: 5,
    q: "요리를 선물할 때",
    a1: { text: "즉시 만들어서 전달한다", tags: ["E", "P"] },
    a2: { text: "계획을 세워서 특별한 날에 전달한다", tags: ["I", "J"] },
  },
  {
    id: 6,
    q: "요리 공유 방식",
    a1: { text: "새로운 플랫폼이나 방법을 시도한다", tags: ["N", "P"] },
    a2: { text: "익숙한 방법으로 꾸준히 공유한다", tags: ["S", "J"] },
  },
  {
    id: 7,
    q: "요리 피드백을 받을 때",
    a1: { text: "즉시 반영하고 개선한다", tags: ["E", "P"] },
    a2: { text: "신중하게 검토하고 적용한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리를 공유하는 이유",
    a1: { text: "다른 사람의 반응이 좋아서 기쁘다", tags: ["E", "F"] },
    a2: { text: "레시피를 기록하고 보관하기 위해", tags: ["I", "T"] },
  },
  {
    id: 9,
    q: "요리 공유 준비",
    a1: { text: "미리 사진과 설명을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 즉흥적으로 공유한다", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "요리 공유 후",
    a1: { text: "댓글이나 반응을 확인하며 즐긴다", tags: ["E", "F"] },
    a2: { text: "공유만 하고 다른 일을 한다", tags: ["I", "T"] },
  },
  {
    id: 11,
    q: "요리를 공유하지 않을 때",
    a1: { text: "특별한 요리만 선별해서 공유한다", tags: ["J", "T"] },
    a2: { text: "모든 요리를 공유하고 싶다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "요리 공유 스타일",
    a1: { text: "계획적이고 체계적으로 공유한다", tags: ["J", "T"] },
    a2: { text: "즉흥적이고 감성적으로 공유한다", tags: ["P", "F"] },
  },
]

export default function CookingShareTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveResult, isSaving } = useTestResult({
    testId: "cooking-share",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cooking-share/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cooking-share/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("cooking-share")
  }, [])

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  const handleChoiceSelect = useCallback(
    async (tags: string[]) => {
      if (isProcessing || isSaving) return

      setIsProcessing(true)
      setSelectedChoice(tags.join(","))
      const currentQuestionIndex = currentQuestion

      setTimeout(async () => {
        const newAnswers = [...answers, tags]
        setAnswers(newAnswers)

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestion(currentQuestionIndex + 1)
          setSelectedChoice("")
          setIsProcessing(false)
        } else {
          const mbti = calculateMBTI(newAnswers)
          await saveResult(mbti, convertAnswersToRecord(newAnswers))
          setIsProcessing(false)
        }
      }, 500)
    },
    [currentQuestion, answers, isProcessing, isSaving, questions.length, saveResult]
  )

  const handlePrevious = useCallback(() => {
    if (isProcessing || isSaving) return

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setAnswers((prev) => prev.slice(0, prev.length - 1))
      setSelectedChoice("")
    } else {
      router.push("/tests/cooking-share")
    }
  }, [currentQuestion, isProcessing, isSaving, router])

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg p-6 md:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
              {currentQuestion + 1} / {questions.length}
            </p>
            <Progress value={progress} className="w-full mt-2 h-2 bg-sky-200 dark:bg-gray-600" indicatorClassName="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center leading-relaxed">
            {currentQ.q}
          </h2>

          <div className="space-y-4">
            {[currentQ.a1, currentQ.a2].map((choice, index) => (
              <Button
                key={index}
                className={`w-full h-auto py-4 px-6 text-lg md:text-xl rounded-xl transition-all duration-200 ease-in-out
                  ${selectedChoice === choice.tags.join(",")
                    ? "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }
                  ${isProcessing || isSaving ? "opacity-70 cursor-not-allowed" : "hover:shadow-md hover:-translate-y-1"}`}
                onClick={() => handleChoiceSelect(choice.tags)}
                disabled={isProcessing || isSaving}
                aria-label={`Question ${currentQuestion + 1}, Choice ${index + 1}: ${choice.text}`}
                aria-pressed={selectedChoice === choice.tags.join(",")}
                role="radio"
              >
                {choice.text}
              </Button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isProcessing || isSaving}
              className="text-gray-600 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              이전
            </Button>
            {isSaving && (
              <p className="text-sky-600 dark:text-sky-400 font-semibold animate-pulse">
                결과 분석 중...
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

