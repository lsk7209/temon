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
  options: {
    text: string
    type: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "알람은 몇 개나 맞춰두시나요?",
    options: [
      { text: "하나만 맞춰두고 바로 일어난다", type: "J" },
      { text: "여러 개 맞춰두고 스누즈 활용", type: "P" },
    ],
  },
  {
    id: 2,
    question: "알람이 울리면 가장 먼저 하는 행동은?",
    options: [
      { text: "핸드폰을 확인한다", type: "E" },
      { text: "잠시 멍하니 있는다", type: "I" },
    ],
  },
  {
    id: 3,
    question: "기상 후 가장 중요하게 생각하는 것은?",
    options: [
      { text: "정해진 루틴을 따르는 것", type: "S" },
      { text: "그날의 기분과 컨디션", type: "N" },
    ],
  },
  {
    id: 4,
    question: "일어나기 힘든 날 어떻게 대처하나요?",
    options: [
      { text: "억지로라도 일어나야 한다고 생각", type: "T" },
      { text: "몸이 힘들면 조금 더 쉰다", type: "F" },
    ],
  },
  {
    id: 5,
    question: "잠자리에 드는 시간은?",
    options: [
      { text: "매일 비슷한 시간에", type: "J" },
      { text: "그날그날 다르게", type: "P" },
    ],
  },
  {
    id: 6,
    question: "아침에 일어나서 하고 싶은 활동은?",
    options: [
      { text: "사람들과 대화하거나 소식 확인", type: "E" },
      { text: "조용히 혼자만의 시간 갖기", type: "I" },
    ],
  },
  {
    id: 7,
    question: "기상 시간을 정하는 기준은?",
    options: [
      { text: "해야 할 일들을 고려해서", type: "S" },
      { text: "이상적인 하루를 상상해서", type: "N" },
    ],
  },
  {
    id: 8,
    question: "늦잠을 잤을 때 반응은?",
    options: [
      { text: "계획이 틀어져서 스트레스", type: "T" },
      { text: "어쩔 수 없다며 받아들임", type: "F" },
    ],
  },
  {
    id: 9,
    question: "주말 기상 시간은?",
    options: [
      { text: "평일과 비슷하게 규칙적으로", type: "J" },
      { text: "자연스럽게 깰 때까지", type: "P" },
    ],
  },
  {
    id: 10,
    question: "아침 준비는 어떻게 하나요?",
    options: [
      { text: "빠르게 효율적으로", type: "E" },
      { text: "천천히 여유롭게", type: "I" },
    ],
  },
  {
    id: 11,
    question: "알람 소리는 어떤 걸 선호하나요?",
    options: [
      { text: "익숙하고 확실한 소리", type: "S" },
      { text: "새롭고 특별한 소리", type: "N" },
    ],
  },
  {
    id: 12,
    question: "잠들기 전 마지막에 하는 일은?",
    options: [
      { text: "내일 할 일을 정리한다", type: "T" },
      { text: "편안한 마음으로 휴식한다", type: "F" },
    ],
  },
]

export default function AlarmHabitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'alarm-habit',
    onSuccess: (resultId, resultType) => {
      router.push(`/alarm-habit/test/result?result=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/alarm-habit/test/result?result=${resultType}`)
    },
  })

  const handleStart = () => {
    setIsStarted(true)
    trackTestStart("alarm-habit")
  }

  // 진행률 추적
  useEffect(() => {
    if (isStarted && currentQuestion > 0) {
      trackTestProgress('alarm-habit', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion, isStarted])

  const handleAnswer = async (optionIndex: number) => {
    setSelectedOption(optionIndex)

    // 1초 후 자동으로 다음 질문으로 이동
    setTimeout(async () => {
      const newAnswers = [...answers, questions[currentQuestion].options[optionIndex].type]
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // 테스트 완료 - 결과 계산 및 저장
        const result = calculateResult(newAnswers)
        // answers를 Record<number, string> 형식으로 변환
        const answersRecord: Record<number, string> = {}
        newAnswers.forEach((answer, index) => {
          answersRecord[index] = answer
        })
        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)
        await saveResult(result, answersRecord)
      }
    }, 1000)
  }

  const calculateResult = (answers: string[]) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    answers.forEach((answer) => {
      counts[answer as keyof typeof counts]++
    })

    const result =
      (counts.E >= counts.I ? "E" : "I") +
      (counts.S >= counts.N ? "S" : "N") +
      (counts.T >= counts.F ? "T" : "F") +
      (counts.J >= counts.P ? "J" : "P")

    return result
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">⏰</div>
            <CardTitle className="text-2xl">알람 습관 테스트</CardTitle>
            <CardDescription>당신의 기상 습관으로 알아보는 성격 유형</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">12개의 질문을 통해 당신의 아침 성향을 분석합니다</p>
            <Button onClick={handleStart} className="w-full">
              테스트 시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">진행률</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Q{currentQuestion + 1}. {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index ? "default" : "outline"}
                  className={`w-full p-6 h-auto text-left justify-start ${
                    selectedOption === index ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                      <span className="text-sm font-bold">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span>{option.text}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
