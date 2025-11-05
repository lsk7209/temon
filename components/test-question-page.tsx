"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

export interface Question {
  id: number
  question?: string
  text?: string
  choices: {
    id: string
    text: string
    type?: string
    tags?: string[]
  }[]
}

export interface TestConfig {
  testId: string
  questions: Question[]
  calculateResult: (answers: Record<number, string>) => string
  resultPath: string
  colorTheme?: {
    bg: string
    border: string
    button: string
    text: string
  }
}

interface TestQuestionPageProps {
  config: TestConfig
}

export function TestQuestionPage({ config }: TestQuestionPageProps) {
  const { testId, questions, calculateResult, resultPath, colorTheme } = config

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId,
    onSuccess: (resultId, resultType) => {
      router.push(`${resultPath}?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`${resultPath}?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart(testId)
  }, [testId])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress(testId, currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, testId, questions.length])

  const handleChoiceSelect = async (choiceId: string) => {
    setSelectedChoice(choiceId)
    const currentQuestionIndex = currentQuestion

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const question = questions[currentQuestionIndex]
      const selectedChoiceObj = question.choices.find(c => c.id === choiceId)
      // choiceId를 직접 저장하거나, type이 있으면 type 사용
      const answerValue = selectedChoiceObj?.type || choiceId
      
      const newAnswers = { ...answers, [currentQuestionIndex]: answerValue }
      setAnswers(newAnswers)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
        setSelectedChoice("")
      } else {
        // 모든 질문 완료 - 결과 계산 및 저장
        const result = calculateResult(newAnswers)
        await saveResult(result, newAnswers)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const previousAnswer = answers[currentQuestion - 1]
      // Find the choice ID for the previous answer
      const question = questions[currentQuestion - 1]
      const choice = question.choices.find(c => c.type === previousAnswer || c.id === previousAnswer)
      setSelectedChoice(choice?.id || "")
    }
  }

  const question = questions[currentQuestion]
  const questionText = question.question || question.text || ""

  // 기본 색상 테마
  const theme = colorTheme || {
    bg: "from-violet-50 to-pink-50",
    border: "border-violet-200",
    button: "bg-violet-500 text-white border-violet-500",
    text: "text-violet-600",
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} py-8`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                질문 {currentQuestion + 1} / {questions.length}
              </span>
              <span className={`text-sm font-medium ${theme.text}`}>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className={`p-8 md:p-12 shadow-xl border-2 ${theme.border} bg-white/90 backdrop-blur`}>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center">
                {questionText}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  className={`w-full p-6 h-auto text-left justify-start ${
                    selectedChoice === choice.id
                      ? theme.button
                      : "border-gray-300 hover:" + theme.border.replace("border-", "border-")
                  }`}
                  onClick={() => handleChoiceSelect(choice.id)}
                  disabled={selectedChoice !== ""}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                      <span className="text-sm font-bold">{choice.id.toUpperCase()}</span>
                    </div>
                    <span>{choice.text}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
            {currentQuestion > 0 && (
              <div className="mt-6 px-6 pb-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="w-full"
                >
                  이전 질문
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

