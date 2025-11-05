"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { useEffect } from "react"

const questions = [
  {
    id: 1,
    text: "카페 도착 후 주문 순서?",
    choices: [
      { id: "a", text: "메뉴판 미리 정해둠", tags: ["J"] },
      { id: "b", text: "줄 서서 즉흥 선택", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "첫 모닝커피?",
    choices: [
      { id: "a", text: "따뜻한 아메리카노", tags: ["S"] },
      { id: "b", text: "오늘 신메뉴 콜드폼!", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: '"시럽 넣어 드릴까요?"',
    choices: [
      { id: "a", text: "단맛 NO, 본연 맛", tags: ["T"] },
      { id: "b", text: "당 충전이 행복♥", tags: ["F"] },
    ],
  },
  {
    id: 4,
    text: "바쁜 아침 대기줄 발견했을 때",
    choices: [
      { id: "a", text: "다른 지점 즉시 이동", tags: ["E"] },
      { id: "b", text: "앱 주문으로 해결", tags: ["I"] },
    ],
  },
  {
    id: 5,
    text: "커피 온도 선택",
    choices: [
      { id: "a", text: "뜨거워야 제맛", tags: ["J"] },
      { id: "b", text: "얼음 가득", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "원두 고를 때",
    choices: [
      { id: "a", text: "로스팅·산미표 참고", tags: ["S"] },
      { id: "b", text: "바리스타 추천 수용", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "테이크아웃 컵 VS 머그컵",
    choices: [
      { id: "a", text: "일회용 컵 실용적", tags: ["T"] },
      { id: "b", text: "머그컵 분위기 중요", tags: ["F"] },
    ],
  },
  {
    id: 8,
    text: "첫 모금 후 맛이 기대와 다르면?",
    choices: [
      { id: "a", text: "바로 리메이크 요청", tags: ["E"] },
      { id: "b", text: "그냥 마시며 적응", tags: ["I"] },
    ],
  },
  {
    id: 9,
    text: "회의 중 커피가 식었다!",
    choices: [
      { id: "a", text: "새로 뽑아옴", tags: ["J"] },
      { id: "b", text: "얼음 넣어 아이스로", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "디카페인 옵션",
    choices: [
      { id: "a", text: "카페인은 필수", tags: ["S"] },
      { id: "b", text: "밤엔 디카페인", tags: ["N"] },
    ],
  },
  {
    id: 11,
    text: "친구가 주문 못 정할 때",
    choices: [
      { id: "a", text: "추천 메뉴 콕 집어줌", tags: ["E"] },
      { id: "b", text: "기다리며 앱 구경", tags: ["I"] },
    ],
  },
  {
    id: 12,
    text: "커피 한 잔과 어울리는 순간?",
    choices: [
      { id: "a", text: "할 일 리스트 작성", tags: ["T"] },
      { id: "b", text: "음악·풍경 감상", tags: ["F"] },
    ],
  },
]

export default function CoffeeMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'coffee-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/coffee-mbti/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/coffee-mbti/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('coffee-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('coffee-mbti', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 dark:from-amber-950 dark:via-orange-950 dark:to-brown-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-brown-500 flex items-center justify-center shadow-lg">
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
                      ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-lg"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-amber-500 bg-amber-500"
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
