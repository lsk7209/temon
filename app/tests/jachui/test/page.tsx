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
    text: "냉장고를 열었을 때",
    choices: [
      { id: "a", text: "재료가 정리되어 있다", tags: ["J"] },
      { id: "b", text: "반쯤 비어있고 배달 쿠폰만", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "밥 먹기 전 고민은",
    choices: [
      { id: "a", text: "반찬 구성과 영양", tags: ["T"] },
      { id: "b", text: "메뉴 맛과 기분", tags: ["F"] },
    ],
  },
  {
    id: 3,
    text: "식사 시간은",
    choices: [
      { id: "a", text: "일정하게 맞춘다", tags: ["J"] },
      { id: "b", text: "배고프면 먹는다", tags: ["P"] },
    ],
  },
  {
    id: 4,
    text: "조리 도구 정리는",
    choices: [
      { id: "a", text: "다 쓰면 바로 씻기", tags: ["S"] },
      { id: "b", text: "내일 아침에 하지 뭐", tags: ["N"] },
    ],
  },
  {
    id: 5,
    text: "배달앱을 켰을 때",
    choices: [
      { id: "a", text: "평점/후기부터 본다", tags: ["S"] },
      { id: "b", text: "썸네일/사진 맛집부터 본다", tags: ["N"] },
    ],
  },
  {
    id: 6,
    text: "친구가 집에 온다면",
    choices: [
      { id: "a", text: "한상 차림 준비!", tags: ["E"] },
      { id: "b", text: "배달 시키자고 제안", tags: ["I"] },
    ],
  },
  {
    id: 7,
    text: "냉장고에 남은 김치로",
    choices: [
      { id: "a", text: "김치볶음밥 만든다", tags: ["J"] },
      { id: "b", text: "그냥 컵라면 먹는다", tags: ["P"] },
    ],
  },
  {
    id: 8,
    text: "밥 먹을 때",
    choices: [
      { id: "a", text: "영상 or 음악 틀어놓는다", tags: ["I"] },
      { id: "b", text: "친구에게 사진 보낸다", tags: ["E"] },
    ],
  },
  {
    id: 9,
    text: "요리 레시피는",
    choices: [
      { id: "a", text: "정확히 계량한다", tags: ["T"] },
      { id: "b", text: "감으로 맞춘다", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "야식 생각날 때",
    choices: [
      { id: "a", text: "물 마시며 참는다", tags: ["T"] },
      { id: "b", text: "배달앱을 킨다", tags: ["F"] },
    ],
  },
  {
    id: 11,
    text: "장보기 습관은",
    choices: [
      { id: "a", text: "필요한 것만 사서 채운다", tags: ["S"] },
      { id: "b", text: "할인/신상 위주로 산다", tags: ["N"] },
    ],
  },
  {
    id: 12,
    text: "설거지를 앞에 두고",
    choices: [
      { id: "a", text: "바로 처리한다", tags: ["J"] },
      { id: "b", text: "내일의 내가 한다", tags: ["P"] },
    ],
  },
]

export default function JachuiTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'jachui',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/jachui/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/jachui/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('jachui')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('jachui', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
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
                      ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 shadow-lg"
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

