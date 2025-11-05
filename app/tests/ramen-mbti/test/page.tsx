"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { useTestResult } from "@/hooks/use-test-result"

interface Question {
  id: number
  question: string
  choices: {
    id: string
    text: string
    type: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "라면을 끓일 때 물의 양은?",
    choices: [
      { id: "a", text: "정확히 측정해서 넣는다", type: "J" },
      { id: "b", text: "대충 눈대중으로 넣는다", type: "P" },
    ],
  },
  {
    id: 2,
    question: "라면 스프는 언제 넣나요?",
    choices: [
      { id: "a", text: "물이 끓기 시작할 때 바로", type: "E" },
      { id: "b", text: "면이 어느 정도 익었을 때", type: "I" },
    ],
  },
  {
    id: 3,
    question: "라면에 추가 재료를 넣는다면?",
    choices: [
      { id: "a", text: "계란, 파 등 기본적인 재료", type: "S" },
      { id: "b", text: "치즈, 김치 등 특별한 재료", type: "N" },
    ],
  },
  {
    id: 4,
    question: "면의 익힘 정도는?",
    choices: [
      { id: "a", text: "꼬들꼬들하게 덜 익혀서", type: "T" },
      { id: "b", text: "부드럽게 충분히 익혀서", type: "F" },
    ],
  },
  {
    id: 5,
    question: "라면을 끓이는 동안 뭘 하나요?",
    choices: [
      { id: "a", text: "타이머 맞춰두고 다른 일", type: "J" },
      { id: "b", text: "계속 지켜보면서 조절", type: "P" },
    ],
  },
  {
    id: 6,
    question: "라면은 어디서 먹나요?",
    choices: [
      { id: "a", text: "식탁에서 정식으로", type: "E" },
      { id: "b", text: "방에서 혼자 조용히", type: "I" },
    ],
  },
  {
    id: 7,
    question: "새로운 라면 제품을 고를 때",
    choices: [
      { id: "a", text: "익숙한 브랜드 위주로", type: "S" },
      { id: "b", text: "새로운 맛에 도전", type: "N" },
    ],
  },
  {
    id: 8,
    question: "라면을 다 먹고 난 후",
    choices: [
      { id: "a", text: "그릇을 바로 설거지", type: "T" },
      { id: "b", text: "잠시 쉬었다가 나중에", type: "F" },
    ],
  },
  {
    id: 9,
    question: "라면 요리법을 정할 때",
    choices: [
      { id: "a", text: "미리 계획하고 준비", type: "J" },
      { id: "b", text: "그때그때 즉흥적으로", type: "P" },
    ],
  },
  {
    id: 10,
    question: "라면을 먹는 이유는?",
    choices: [
      { id: "a", text: "간편하고 빠르게 해결", type: "E" },
      { id: "b", text: "혼자만의 시간을 즐기며", type: "I" },
    ],
  },
  {
    id: 11,
    question: "라면 맛을 평가할 때",
    choices: [
      { id: "a", text: "맛, 면발 등 구체적으로", type: "S" },
      { id: "b", text: "전체적인 느낌으로", type: "N" },
    ],
  },
  {
    id: 12,
    question: "좋아하는 라면을 못 먹게 되면",
    choices: [
      { id: "a", text: "다른 대안을 찾는다", type: "T" },
      { id: "b", text: "아쉬워하며 포기한다", type: "F" },
    ],
  },
]

export default function RamenMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'ramen-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/ramen-mbti/test/result?result=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/ramen-mbti/test/result?result=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('ramen-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('ramen-mbti', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (choiceId: string) => {
    setSelectedChoice(choiceId)
    const currentQuestionIndex = currentQuestion

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const question = questions[currentQuestionIndex]
      const selectedChoiceObj = question.choices.find(c => c.id === choiceId)
      const choiceType = selectedChoiceObj?.type || ""
      
      const newAnswers = { ...answers, [currentQuestionIndex]: choiceType }
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
      const choice = question.choices.find(c => c.type === previousAnswer)
      setSelectedChoice(choice?.id || "")
    }
  }

  const calculateResult = (answers: Record<number, string>): string => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    Object.values(answers).forEach((answer) => {
      if (answer in counts) {
        counts[answer as keyof typeof counts]++
      }
    })

    const result =
      (counts.E >= counts.I ? "E" : "I") +
      (counts.S >= counts.N ? "S" : "N") +
      (counts.T >= counts.F ? "T" : "F") +
      (counts.J >= counts.P ? "J" : "P")

    return result
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                질문 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-orange-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 md:p-12 shadow-xl border-2 border-orange-200 bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant={selectedChoice === choice.id ? "default" : "outline"}
                  className={`w-full p-6 h-auto text-left justify-start ${
                    selectedChoice === choice.id
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 hover:border-orange-300"
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
