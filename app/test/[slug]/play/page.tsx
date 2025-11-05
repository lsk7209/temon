"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { trackTestStart } from "@/lib/analytics"

// 테스트 데이터 (실제로는 API에서 가져올 수 있음)
const testData: Record<string, any> = {
  "ramen-mbti": {
    title: "라면 MBTI 테스트",
    questions: [
      {
        id: 1,
        question: "라면을 끓일 때 가장 먼저 하는 일은?",
        options: [
          { id: "A", text: "물부터 끓인다", type: "J" },
          { id: "B", text: "재료를 먼저 준비한다", type: "P" },
          { id: "C", text: "레시피를 찾아본다", type: "T" },
          { id: "D", text: "그냥 바로 시작한다", type: "F" },
        ],
      },
      {
        id: 2,
        question: "라면에 넣고 싶은 토핑은?",
        options: [
          { id: "A", text: "계란", type: "S" },
          { id: "B", text: "치즈", type: "N" },
          { id: "C", text: "김치", type: "T" },
          { id: "D", text: "파", type: "F" },
        ],
      },
      {
        id: 3,
        question: "라면을 먹는 방식은?",
        options: [
          { id: "A", text: "뜨거울 때 후후 불면서", type: "E" },
          { id: "B", text: "식을 때까지 기다린다", type: "I" },
          { id: "C", text: "국물부터 마신다", type: "S" },
          { id: "D", text: "면부터 먹는다", type: "N" },
        ],
      },
    ],
  },
  "coffee-mbti": {
    title: "커피 MBTI 테스트",
    questions: [
      {
        id: 1,
        question: "선호하는 커피는?",
        options: [
          { id: "A", text: "아메리카노", type: "T" },
          { id: "B", text: "라떼", type: "F" },
          { id: "C", text: "에스프레소", type: "J" },
          { id: "D", text: "프라푸치노", type: "P" },
        ],
      },
      {
        id: 2,
        question: "커피를 마시는 시간은?",
        options: [
          { id: "A", text: "아침 일찍", type: "E" },
          { id: "B", text: "오후 늦게", type: "I" },
          { id: "C", text: "정해진 시간", type: "J" },
          { id: "D", text: "생각날 때마다", type: "P" },
        ],
      },
    ],
  },
}

export default function TestPlayPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isStarted, setIsStarted] = useState(false)

  const test = testData[slug]

  useEffect(() => {
    if (test && !isStarted) {
      trackTestStart(slug)
      setIsStarted(true)
    }
  }, [test, slug, isStarted])

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">테스트를 찾을 수 없습니다</h1>
          <Button onClick={() => router.push("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    )
  }

  const handleAnswer = (optionId: string, type: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: type,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // 결과 계산 및 페이지 이동
      const result = calculateResult(answers)
      router.push(`/${slug}/result?result=${result}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResult = (answers: Record<string, string>) => {
    // 간단한 결과 계산 로직
    const types = Object.values(answers)
    const counts: Record<string, number> = {}

    types.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1
    })

    // 가장 많이 선택된 타입들로 MBTI 구성
    return "ENFP" // 예시 결과
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100
  const question = test.questions[currentQuestion]
  const hasAnswer = answers[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
          <div className="text-sm text-gray-600">
            {currentQuestion + 1} / {test.questions.length}
          </div>
        </div>

        {/* 진행률 */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* 질문 카드 */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6 text-center">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option: any) => (
                <Button
                  key={option.id}
                  variant={answers[currentQuestion] === option.type ? "default" : "outline"}
                  className="w-full p-4 h-auto text-left justify-start"
                  onClick={() => handleAnswer(option.id, option.type)}
                >
                  <span className="font-semibold mr-3">{option.id}.</span>
                  {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 네비게이션 */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {currentQuestion === test.questions.length - 1 ? "결과 보기" : "다음"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
