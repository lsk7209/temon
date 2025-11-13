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
    text: "카페에서 메뉴 고를 때",
    choices: [
      { id: "a", text: "늘 먹는 메뉴", tags: ["S"] },
      { id: "b", text: "오늘은 새로운 메뉴!", tags: ["N"] },
    ],
  },
  {
    id: 2,
    text: "디저트 취향",
    choices: [
      { id: "a", text: "달콤·진한 맛", tags: ["F"] },
      { id: "b", text: "담백·깔끔한 맛", tags: ["T"] },
    ],
  },
  {
    id: 3,
    text: "카페 자리를 고를 때",
    choices: [
      { id: "a", text: "창가 자리 필수", tags: ["I"] },
      { id: "b", text: "아무 자리나 상관없음", tags: ["E"] },
    ],
  },
  {
    id: 4,
    text: "사진 찍을 때",
    choices: [
      { id: "a", text: "음식 중심 구도", tags: ["S"] },
      { id: "b", text: "감성 분위기 중심", tags: ["N"] },
    ],
  },
  {
    id: 5,
    text: "케이크 고를 때",
    choices: [
      { id: "a", text: "생크림 고전파", tags: ["J"] },
      { id: "b", text: "무스·티라미수 등 신메뉴", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "친구가 고른 디저트가 더 맛있을 때",
    choices: [
      { id: "a", text: "나도 그걸 시킬 걸 후회", tags: ["F"] },
      { id: "b", text: "그냥 참고 내 것 먹음", tags: ["T"] },
    ],
  },
  {
    id: 7,
    text: "디저트 카페 고를 때",
    choices: [
      { id: "a", text: "후기를 꼼꼼히 확인", tags: ["J"] },
      { id: "b", text: "즉흥적으로 들어감", tags: ["P"] },
    ],
  },
  {
    id: 8,
    text: "쿠키 2개 중 1개를 고른다면",
    choices: [
      { id: "a", text: "초코칩 쿠키", tags: ["S"] },
      { id: "b", text: "말차 쿠키", tags: ["N"] },
    ],
  },
  {
    id: 9,
    text: "빵집에서 고를 때",
    choices: [
      { id: "a", text: "식사빵 위주", tags: ["T"] },
      { id: "b", text: "달달한 디저트빵 위주", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "디저트 먹는 속도",
    choices: [
      { id: "a", text: "천천히 음미", tags: ["I"] },
      { id: "b", text: "빠르게 흡입", tags: ["E"] },
    ],
  },
  {
    id: 11,
    text: "다이어트 중 디저트 제안받으면",
    choices: [
      { id: "a", text: "미련 없이 거절", tags: ["T"] },
      { id: "b", text: "\"오늘만 괜찮겠지?\"", tags: ["F"] },
    ],
  },
  {
    id: 12,
    text: "디저트를 고르는 기준",
    choices: [
      { id: "a", text: "가성비", tags: ["S"] },
      { id: "b", text: "감성비", tags: ["N"] },
    ],
  },
]

export default function DessertStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'dessert-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/dessert-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/dessert-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('dessert-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('dessert-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
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

