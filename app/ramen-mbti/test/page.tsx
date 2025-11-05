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
    question: "라면을 끓일 때 물의 양은?",
    options: [
      { text: "정확히 측정해서 넣는다", type: "J" },
      { text: "대충 눈대중으로 넣는다", type: "P" },
    ],
  },
  {
    id: 2,
    question: "라면 스프는 언제 넣나요?",
    options: [
      { text: "물이 끓기 시작할 때 바로", type: "E" },
      { text: "면이 어느 정도 익었을 때", type: "I" },
    ],
  },
  {
    id: 3,
    question: "라면에 추가 재료를 넣는다면?",
    options: [
      { text: "계란, 파 등 기본적인 재료", type: "S" },
      { text: "치즈, 김치 등 특별한 재료", type: "N" },
    ],
  },
  {
    id: 4,
    question: "면의 익힘 정도는?",
    options: [
      { text: "꼬들꼬들하게 덜 익혀서", type: "T" },
      { text: "부드럽게 충분히 익혀서", type: "F" },
    ],
  },
  {
    id: 5,
    question: "라면을 끓이는 동안 뭘 하나요?",
    options: [
      { text: "타이머 맞춰두고 다른 일", type: "J" },
      { text: "계속 지켜보면서 조절", type: "P" },
    ],
  },
  {
    id: 6,
    question: "라면은 어디서 먹나요?",
    options: [
      { text: "식탁에서 정식으로", type: "E" },
      { text: "방에서 혼자 조용히", type: "I" },
    ],
  },
  {
    id: 7,
    question: "새로운 라면 제품을 고를 때",
    options: [
      { text: "익숙한 브랜드 위주로", type: "S" },
      { text: "새로운 맛에 도전", type: "N" },
    ],
  },
  {
    id: 8,
    question: "라면을 다 먹고 난 후",
    options: [
      { text: "그릇을 바로 설거지", type: "T" },
      { text: "잠시 쉬었다가 나중에", type: "F" },
    ],
  },
  {
    id: 9,
    question: "라면 요리법을 정할 때",
    options: [
      { text: "미리 계획하고 준비", type: "J" },
      { text: "그때그때 즉흥적으로", type: "P" },
    ],
  },
  {
    id: 10,
    question: "라면을 먹는 이유는?",
    options: [
      { text: "간편하고 빠르게 해결", type: "E" },
      { text: "혼자만의 시간을 즐기며", type: "I" },
    ],
  },
  {
    id: 11,
    question: "라면 맛을 평가할 때",
    options: [
      { text: "맛, 면발 등 구체적으로", type: "S" },
      { text: "전체적인 느낌으로", type: "N" },
    ],
  },
  {
    id: 12,
    question: "좋아하는 라면을 못 먹게 되면",
    options: [
      { text: "다른 대안을 찾는다", type: "T" },
      { text: "아쉬워하며 포기한다", type: "F" },
    ],
  },
]

export default function RamenMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'ramen-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/ramen-mbti/test/result?result=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/ramen-mbti/test/result?result=${resultType}`)
    },
  })

  const handleStart = () => {
    setIsStarted(true)
    trackTestStart("ramen-mbti")
  }

  // 진행률 추적
  useEffect(() => {
    if (isStarted && currentQuestion > 0) {
      trackTestProgress('ramen-mbti', currentQuestion + 1, questions.length)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🍜</div>
            <CardTitle className="text-2xl">라면 MBTI 테스트</CardTitle>
            <CardDescription>당신의 라면 취향으로 알아보는 성격 유형</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">12개의 질문을 통해 당신의 라면 성향을 분석합니다</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
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
