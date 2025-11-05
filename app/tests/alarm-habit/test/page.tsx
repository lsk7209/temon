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
    question: "알람은 몇 개나 맞춰두시나요?",
    choices: [
      { id: "a", text: "하나만 맞춰두고 바로 일어난다", type: "J" },
      { id: "b", text: "여러 개 맞춰두고 스누즈 활용", type: "P" },
    ],
  },
  {
    id: 2,
    question: "알람이 울리면 가장 먼저 하는 행동은?",
    choices: [
      { id: "a", text: "핸드폰을 확인한다", type: "E" },
      { id: "b", text: "잠시 멍하니 있는다", type: "I" },
    ],
  },
  {
    id: 3,
    question: "기상 후 가장 중요하게 생각하는 것은?",
    choices: [
      { id: "a", text: "정해진 루틴을 따르는 것", type: "S" },
      { id: "b", text: "그날의 기분과 컨디션", type: "N" },
    ],
  },
  {
    id: 4,
    question: "일어나기 힘든 날 어떻게 대처하나요?",
    choices: [
      { id: "a", text: "억지로라도 일어나야 한다고 생각", type: "T" },
      { id: "b", text: "몸이 힘들면 조금 더 쉰다", type: "F" },
    ],
  },
  {
    id: 5,
    question: "잠자리에 드는 시간은?",
    choices: [
      { id: "a", text: "매일 비슷한 시간에", type: "J" },
      { id: "b", text: "그날그날 다르게", type: "P" },
    ],
  },
  {
    id: 6,
    question: "아침에 일어나서 하고 싶은 활동은?",
    choices: [
      { id: "a", text: "사람들과 대화하거나 소식 확인", type: "E" },
      { id: "b", text: "조용히 혼자만의 시간 갖기", type: "I" },
    ],
  },
  {
    id: 7,
    question: "기상 시간을 정하는 기준은?",
    choices: [
      { id: "a", text: "해야 할 일들을 고려해서", type: "S" },
      { id: "b", text: "이상적인 하루를 상상해서", type: "N" },
    ],
  },
  {
    id: 8,
    question: "늦잠을 잤을 때 반응은?",
    choices: [
      { id: "a", text: "계획이 틀어져서 스트레스", type: "T" },
      { id: "b", text: "어쩔 수 없다며 받아들임", type: "F" },
    ],
  },
  {
    id: 9,
    question: "주말 기상 시간은?",
    choices: [
      { id: "a", text: "평일과 비슷하게 규칙적으로", type: "J" },
      { id: "b", text: "자연스럽게 깰 때까지", type: "P" },
    ],
  },
  {
    id: 10,
    question: "아침 준비는 어떻게 하나요?",
    choices: [
      { id: "a", text: "빠르게 효율적으로", type: "E" },
      { id: "b", text: "천천히 여유롭게", type: "I" },
    ],
  },
  {
    id: 11,
    question: "알람 소리는 어떤 걸 선호하나요?",
    choices: [
      { id: "a", text: "익숙하고 확실한 소리", type: "S" },
      { id: "b", text: "새롭고 특별한 소리", type: "N" },
    ],
  },
  {
    id: 12,
    question: "잠들기 전 마지막에 하는 일은?",
    choices: [
      { id: "a", text: "내일 할 일을 정리한다", type: "T" },
      { id: "b", text: "편안한 마음으로 휴식한다", type: "F" },
    ],
  },
]

export default function AlarmHabitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'alarm-habit',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/alarm-habit/test/result?result=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/alarm-habit/test/result?result=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('alarm-habit')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('alarm-habit', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                질문 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 md:p-12 shadow-xl border-2 border-blue-200 bg-white/90 backdrop-blur">
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
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:border-blue-300"
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
