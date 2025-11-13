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
    text: "여행 준비를 시작할 때",
    choices: [
      { id: "a", text: "리스트부터 만든다", tags: ["J"] },
      { id: "b", text: "짐은 전날 감으로 챙긴다", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "옷 고를 때",
    choices: [
      { id: "a", text: "날짜별 코디를 미리 정한다", tags: ["S"] },
      { id: "b", text: "가서 분위기에 맞춘다", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "캐리어를 쌀 때",
    choices: [
      { id: "a", text: "무게 확인 필수", tags: ["T"] },
      { id: "b", text: "감으로 대충 맞춘다", tags: ["F"] },
    ],
  },
  {
    id: 4,
    text: "비상약 챙기기",
    choices: [
      { id: "a", text: "혹시 몰라 다 넣는다", tags: ["J"] },
      { id: "b", text: "약국은 어디든 있지", tags: ["P"] },
    ],
  },
  {
    id: 5,
    text: "날씨가 갑자기 변한다면",
    choices: [
      { id: "a", text: "예비 옷을 꺼낸다", tags: ["S"] },
      { id: "b", text: "그날 쇼핑으로 해결", tags: ["N"] },
    ],
  },
  {
    id: 6,
    text: "친구가 늦게 온다면",
    choices: [
      { id: "a", text: "일정 체크하며 기다림", tags: ["T"] },
      { id: "b", text: "커피 마시며 여유", tags: ["F"] },
    ],
  },
  {
    id: 7,
    text: "짐을 정리할 때",
    choices: [
      { id: "a", text: "옷, 화장품, 전자기기 구역별 정리", tags: ["J"] },
      { id: "b", text: "남는 공간에 막 넣는다", tags: ["P"] },
    ],
  },
  {
    id: 8,
    text: "기념품은",
    choices: [
      { id: "a", text: "리스트대로 구매", tags: ["S"] },
      { id: "b", text: "눈에 띄는 대로 구매", tags: ["N"] },
    ],
  },
  {
    id: 9,
    text: "공항 도착 시간",
    choices: [
      { id: "a", text: "비행 2시간 전 도착", tags: ["J"] },
      { id: "b", text: "딱 맞춰 가도 됨", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "여행지에서의 식사",
    choices: [
      { id: "a", text: "맛집 예약 필수", tags: ["T"] },
      { id: "b", text: "돌아다니다 끌리는 곳", tags: ["F"] },
    ],
  },
  {
    id: 11,
    text: "사진 찍을 때",
    choices: [
      { id: "a", text: "배경·구도 완벽하게", tags: ["T"] },
      { id: "b", text: "순간 감성 우선", tags: ["F"] },
    ],
  },
  {
    id: 12,
    text: "짐 풀 때",
    choices: [
      { id: "a", text: "도착하자마자 정리", tags: ["J"] },
      { id: "b", text: "귀찮으면 내일 하지 뭐", tags: ["P"] },
    ],
  },
]

export default function TravelStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'travel-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/travel-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/travel-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('travel-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('travel-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950 dark:via-blue-950 dark:to-indigo-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg">
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
                      ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-950 dark:to-indigo-950 shadow-lg"
                      : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50 dark:border-gray-700 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-cyan-500 bg-cyan-500"
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

