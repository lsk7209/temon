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
    text: "아침에 눈 뜨자마자 하는 일",
    choices: [
      { id: "a", text: "폰 확인부터", tags: ["E"] },
      { id: "b", text: "스트레칭이나 생각 정리", tags: ["I"] },
    ],
  },
  {
    id: 2,
    text: "배터리 10% 남았을 때",
    choices: [
      { id: "a", text: "불안해서 바로 충전", tags: ["J"] },
      { id: "b", text: "그냥 버틸 때까지 사용", tags: ["P"] },
    ],
  },
  {
    id: 3,
    text: "SNS 알림이 뜨면",
    choices: [
      { id: "a", text: "바로 확인", tags: ["E"] },
      { id: "b", text: "나중에 한꺼번에 봄", tags: ["I"] },
    ],
  },
  {
    id: 4,
    text: "사진 정리할 때",
    choices: [
      { id: "a", text: "주기적으로 삭제", tags: ["J"] },
      { id: "b", text: "쌓여도 그대로 둠", tags: ["P"] },
    ],
  },
  {
    id: 5,
    text: "폰 배경화면",
    choices: [
      { id: "a", text: "깔끔·심플", tags: ["T"] },
      { id: "b", text: "감성·사진형", tags: ["F"] },
    ],
  },
  {
    id: 6,
    text: "새로운 앱 설치",
    choices: [
      { id: "a", text: "필요할 때만", tags: ["S"] },
      { id: "b", text: "재밌어 보여서 시도", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "폰 사용 시간 알림을 보면",
    choices: [
      { id: "a", text: "관리해야겠다 생각", tags: ["J"] },
      { id: "b", text: "'에이 뭐 어때'", tags: ["P"] },
    ],
  },
  {
    id: 8,
    text: "친구와 채팅할 때",
    choices: [
      { id: "a", text: "바로 답장", tags: ["E"] },
      { id: "b", text: "생각나면 답장", tags: ["I"] },
    ],
  },
  {
    id: 9,
    text: "앱 정리 기준",
    choices: [
      { id: "a", text: "효율·생산성 중심", tags: ["T"] },
      { id: "b", text: "감정·분위기 중심", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "폰으로 하는 일",
    choices: [
      { id: "a", text: "일정·업무 확인", tags: ["S"] },
      { id: "b", text: "음악·영상 감상", tags: ["N"] },
    ],
  },
  {
    id: 11,
    text: "폰이 없어졌을 때",
    choices: [
      { id: "a", text: "바로 찾기모드 ON", tags: ["J"] },
      { id: "b", text: "\"언젠가 나오겠지\"", tags: ["P"] },
    ],
  },
  {
    id: 12,
    text: "화면 밝기",
    choices: [
      { id: "a", text: "낮게 조정", tags: ["T"] },
      { id: "b", text: "눈부시게 밝게", tags: ["F"] },
    ],
  },
]

export default function PhoneStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'phone-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/phone-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/phone-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('phone-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('phone-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950 dark:via-purple-950 dark:to-fuchsia-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-lg">
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
                      ? "border-violet-500 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 shadow-lg"
                      : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-700 dark:hover:border-violet-600 dark:hover:bg-violet-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-violet-500 bg-violet-500"
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
