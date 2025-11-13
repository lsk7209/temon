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
    text: "세일 문구를 보면?",
    choices: [
      { id: "a", text: "일단 클릭!", tags: ["P"] },
      { id: "b", text: "계획에 없으면 패스", tags: ["J"] },
    ],
  },
  {
    id: 2,
    text: "쇼핑할 때 우선순위는?",
    choices: [
      { id: "a", text: "품질, 후기", tags: ["S"] },
      { id: "b", text: "디자인, 감성", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "구매 전 고민 시간은?",
    choices: [
      { id: "a", text: "충분히 비교 후 결정", tags: ["J"] },
      { id: "b", text: "느낌 오면 바로 구매", tags: ["P"] },
    ],
  },
  {
    id: 4,
    text: "장바구니에 물건을 담을 때",
    choices: [
      { id: "a", text: "전부 계산해본다", tags: ["T"] },
      { id: "b", text: "그냥 담고 기분 봐서 결정", tags: ["F"] },
    ],
  },
  {
    id: 5,
    text: "친구가 \"이거 어때?\" 물을 때",
    choices: [
      { id: "a", text: "냉정하게 판단", tags: ["T"] },
      { id: "b", text: "\"너랑 잘 어울려!\"", tags: ["F"] },
    ],
  },
  {
    id: 6,
    text: "브랜드 고를 때",
    choices: [
      { id: "a", text: "신뢰도 중요", tags: ["S"] },
      { id: "b", text: "새로운 브랜드 도전", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "쇼핑몰 추천 상품을 보면",
    choices: [
      { id: "a", text: "참고만 함", tags: ["I"] },
      { id: "b", text: "설레서 클릭", tags: ["E"] },
    ],
  },
  {
    id: 8,
    text: "할인 알림이 올 때",
    choices: [
      { id: "a", text: "무시하거나 저장", tags: ["I"] },
      { id: "b", text: "바로 들어가봄", tags: ["E"] },
    ],
  },
  {
    id: 9,
    text: "온라인 쇼핑 후 만족도는?",
    choices: [
      { id: "a", text: "예측한 그대로", tags: ["J"] },
      { id: "b", text: "예상 밖 발견이 즐거움", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "옷장 정리할 때",
    choices: [
      { id: "a", text: "주기적으로 정리", tags: ["S"] },
      { id: "b", text: "입고 싶은 것만 남김", tags: ["N"] },
    ],
  },
  {
    id: 11,
    text: "반품 사유가 생기면",
    choices: [
      { id: "a", text: "절차대로 바로 진행", tags: ["T"] },
      { id: "b", text: "귀찮아서 그냥 둠", tags: ["F"] },
    ],
  },
  {
    id: 12,
    text: "결제 직전의 나",
    choices: [
      { id: "a", text: "할인·적립 계산 중", tags: ["J"] },
      { id: "b", text: "'몰라 그냥 사자!'", tags: ["P"] },
    ],
  },
]

export default function ShoppingStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'shopping-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/shopping-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/shopping-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('shopping-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('shopping-style', currentQuestion + 1, questions.length)
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

        // string[][]를 Record<number, string>로 변환

        const answersRecord = convertAnswersToRecord(newAnswers)

        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)

        await saveResult(result, answersRecord)
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950 dark:to-fuchsia-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
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
                      ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 shadow-lg"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-pink-500 bg-pink-500"
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

