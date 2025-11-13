/**
 * 스마트폰 사용 스타일 테스트 페이지 (12문항)
 */

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { PHONE_USAGE_QUESTIONS, type OptionTag } from "@/lib/data/phone-usage-questions"
import { decideType } from "@/lib/utils/phone-usage-scorer"
import { convertStringArrayToRecord } from "@/lib/utils/test-answers"

export default function PhoneUsageTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<OptionTag[]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "phone-usage",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/phone-usage/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/phone-usage/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / PHONE_USAGE_QUESTIONS.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("phone-usage")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("phone-usage", currentQuestion + 1, PHONE_USAGE_QUESTIONS.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (tag: OptionTag) => {
    setSelectedChoice(tag)
    const currentQuestionIndex = currentQuestion

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const newAnswers = [...answers, tag]
      setAnswers(newAnswers)

      if (currentQuestionIndex < PHONE_USAGE_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
        setSelectedChoice("")
      } else {
        // 모든 질문 완료 - 결과 계산 및 저장
        const result = decideType(newAnswers)
        // string[]를 Record<number, string>로 변환
        const answersRecord = convertStringArrayToRecord(newAnswers)
        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)
        await saveResult(result, answersRecord)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }

  const currentQ = PHONE_USAGE_QUESTIONS[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-950 dark:via-indigo-950 dark:to-blue-950">
      {/* Progress Bar */}
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestion + 1} / {PHONE_USAGE_QUESTIONS.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Question Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.text}
              </h1>
            </div>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(option.tag)}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedChoice === option.tag
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === option.tag
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedChoice === option.tag && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
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

