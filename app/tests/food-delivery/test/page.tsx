"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { useEffect } from "react"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"

const questions = [
  {
    id: 1,
    text: "배달 앱을 켤 때",
    choices: [
      { id: "a", text: "먼저 카테고리부터 정함", tags: ["J"] },
      { id: "b", text: "추천 메뉴부터 봄", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "음식 고를 때",
    choices: [
      { id: "a", text: "익숙한 메뉴 위주", tags: ["S"] },
      { id: "b", text: "새롭고 특이한 메뉴 도전", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "리뷰를 볼 때",
    choices: [
      { id: "a", text: "별점·사진 꼼꼼히 확인", tags: ["T"] },
      { id: "b", text: "평점보다 감정 리뷰 중심", tags: ["F"] },
    ],
  },
  {
    id: 4,
    text: "친구와 함께 주문 시",
    choices: [
      { id: "a", text: "다수 의견에 맞춤", tags: ["E"] },
      { id: "b", text: "내가 먹고 싶은 거 주장", tags: ["I"] },
    ],
  },
  {
    id: 5,
    text: "메뉴 선택 속도",
    choices: [
      { id: "a", text: "빠르게 결정", tags: ["J"] },
      { id: "b", text: "한참 고민함", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "배달비가 비쌀 때",
    choices: [
      { id: "a", text: "묶음 주문으로 조정", tags: ["T"] },
      { id: "b", text: "그냥 시켜! 맛이 중요", tags: ["F"] },
    ],
  },
  {
    id: 7,
    text: "같은 가게 주문 빈도",
    choices: [
      { id: "a", text: "단골 위주", tags: ["S"] },
      { id: "b", text: "매번 다른 곳 탐험", tags: ["N"] },
    ],
  },
  {
    id: 8,
    text: "음식 도착 후",
    choices: [
      { id: "a", text: "포장 먼저 정리", tags: ["J"] },
      { id: "b", text: "바로 먹는다", tags: ["P"] },
    ],
  },
  {
    id: 9,
    text: "맛이 별로일 때",
    choices: [
      { id: "a", text: "리뷰에 피드백 남김", tags: ["T"] },
      { id: "b", text: "'다음엔 안 시키지 뭐'로 끝", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "배달 기다리는 시간",
    choices: [
      { id: "a", text: "방송·영상으로 시간 채움", tags: ["E"] },
      { id: "b", text: "조용히 기다림", tags: ["I"] },
    ],
  },
  {
    id: 11,
    text: "할인 쿠폰이 있을 때",
    choices: [
      { id: "a", text: "전략적으로 조합", tags: ["J"] },
      { id: "b", text: "그냥 눌러서 적용", tags: ["P"] },
    ],
  },
  {
    id: 12,
    text: "마지막 한 입 남았을 때",
    choices: [
      { id: "a", text: "누가 먹을지 합리적으로 정함", tags: ["T"] },
      { id: "b", text: "그냥 분위기 따라 감", tags: ["F"] },
    ],
  },
]

export default function FoodDeliveryTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'food-delivery',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/food-delivery/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/food-delivery/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('food-delivery')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('food-delivery', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (choiceId: string) => {
    setSelectedChoice(choiceId)
    const currentQuestionIndex = currentQuestion

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const newAnswers = { ...answers, [currentQuestionIndex]: choiceId }
      setAnswers(newAnswers)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
        setSelectedChoice("")
      } else {
        // 모든 질문 완료 - 결과 계산 및 저장
        const result = calculateMBTI(newAnswers)

        // 이미 Record<number, string> 형식이므로 변환 불필요


        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)

        await saveResult(result, newAnswers)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedChoice(answers[currentQuestion - 1] || "")
    }
  }

  const calculateMBTI = (answers: Record<number, string>): string => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    Object.entries(answers).forEach(([questionIndex, choiceId]) => {
      const question = questions[Number.parseInt(questionIndex)]
      const choice = question.choices.find((c) => c.id === choiceId)
      if (choice) {
        choice.tags.forEach((tag) => {
          scores[tag as keyof typeof scores]++
        })
      }
    })

    const result =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P")

    return result
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950">
      {/* Progress Bar */}
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Question Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.text}
              </h1>
            </div>

            <div className="space-y-4">
              {currentQ.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.id)}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedChoice === choice.id
                      ? "border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 shadow-lg"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-red-500 bg-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {selectedChoice === choice.id && <div className="w-3 h-3 rounded-full bg-white" />}
                    </div>
                    <span className="text-lg font-medium flex-1">{choice.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 bg-white/50"
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

