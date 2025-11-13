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
    text: "12시 땡! 점심 결정은",
    choices: [
      { id: "a", text: "미리 정해둔 곳으로", tags: ["J"] },
      { id: "b", text: "그때 기분 따라", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "새로운 맛집 제안이 오면",
    choices: [
      { id: "a", text: "일단 도전!", tags: ["N"] },
      { id: "b", text: "검증된 곳이 안전", tags: ["S"] },
    ],
  },
  {
    id: 3,
    text: "동료가 \"아무거나\"라면",
    choices: [
      { id: "a", text: "주도해서 정한다", tags: ["E"] },
      { id: "b", text: "후보만 던지고 의견 묻기", tags: ["I"] },
    ],
  },
  {
    id: 4,
    text: "기다림 vs 거리",
    choices: [
      { id: "a", text: "줄 길어도 맛있으면 감", tags: ["F"] },
      { id: "b", text: "가까운 곳이 우선", tags: ["T"] },
    ],
  },
  {
    id: 5,
    text: "메뉴 고르는 기준",
    choices: [
      { id: "a", text: "영양/가성비", tags: ["T"] },
      { id: "b", text: "오늘의 기분/감성", tags: ["F"] },
    ],
  },
  {
    id: 6,
    text: "비 오는 날 점심",
    choices: [
      { id: "a", text: "따끈한 국물", tags: ["S"] },
      { id: "b", text: "분위기 좋은 카페식", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "팀원과 취향 다를 때",
    choices: [
      { id: "a", text: "중간지점 타협", tags: ["F"] },
      { id: "b", text: "다수결/규칙", tags: ["T"] },
    ],
  },
  {
    id: 8,
    text: "라스트오더 5분 전",
    choices: [
      { id: "a", text: "바로 결제", tags: ["J"] },
      { id: "b", text: "더 찾아보는 나", tags: ["P"] },
    ],
  },
  {
    id: 9,
    text: "같은 곳 재방문",
    choices: [
      { id: "a", text: "단골을 만든다", tags: ["S"] },
      { id: "b", text: "매번 새로 가본다", tags: ["N"] },
    ],
  },
  {
    id: 10,
    text: "배달/포장 선택",
    choices: [
      { id: "a", text: "효율 위해 배달", tags: ["I"] },
      { id: "b", text: "걷기 겸 외식", tags: ["E"] },
    ],
  },
  {
    id: 11,
    text: "매운맛 선택",
    choices: [
      { id: "a", text: "단계 조절해서 안전하게", tags: ["S"] },
      { id: "b", text: "도전! 다음 단계로", tags: ["N"] },
    ],
  },
  {
    id: 12,
    text: "식사 후 루틴",
    choices: [
      { id: "a", text: "바로 자리 복귀/정리", tags: ["J"] },
      { id: "b", text: "카페 한 잔은 필수", tags: ["P"] },
    ],
  },
]

export default function LunchStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'lunch-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/lunch-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/lunch-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('lunch-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('lunch-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 dark:from-orange-950 dark:via-red-950 dark:to-amber-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
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
                      ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-orange-500 bg-orange-500"
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

