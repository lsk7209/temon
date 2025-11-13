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
    text: "카페에 가면 먼저 하는 일은?",
    choices: [
      { id: "a", text: "자리를 찾는다", tags: ["J"] },
      { id: "b", text: "메뉴판부터 본다", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "커피 메뉴 고를 때",
    choices: [
      { id: "a", text: "늘 마시는 고정 메뉴", tags: ["S"] },
      { id: "b", text: "새로운 시그니처 시도", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "카페 분위기는?",
    choices: [
      { id: "a", text: "조용하고 집중 가능한 곳", tags: ["I"] },
      { id: "b", text: "북적북적 활기찬 곳", tags: ["E"] },
    ],
  },
  {
    id: 4,
    text: "대화 중 상대가 고민 얘기하면?",
    choices: [
      { id: "a", text: "조언과 해결책을 제시", tags: ["T"] },
      { id: "b", text: "감정적으로 공감", tags: ["F"] },
    ],
  },
  {
    id: 5,
    text: "주문이 밀릴 때",
    choices: [
      { id: "a", text: "기다리며 폰 확인", tags: ["T"] },
      { id: "b", text: "직원 응원하며 웃는다", tags: ["F"] },
    ],
  },
  {
    id: 6,
    text: "자리에 앉았을 때",
    choices: [
      { id: "a", text: "노트북·책 꺼내 준비", tags: ["J"] },
      { id: "b", text: "일단 커피 향 즐김", tags: ["P"] },
    ],
  },
  {
    id: 7,
    text: "음악 볼륨이 높을 때",
    choices: [
      { id: "a", text: "집중 방해라 자리 옮김", tags: ["S"] },
      { id: "b", text: "분위기라며 그냥 즐김", tags: ["N"] },
    ],
  },
  {
    id: 8,
    text: "카페 사진을 찍을 때",
    choices: [
      { id: "a", text: "음식·메뉴 중심", tags: ["T"] },
      { id: "b", text: "감성·분위기 중심", tags: ["F"] },
    ],
  },
  {
    id: 9,
    text: "동행이 늦는다면?",
    choices: [
      { id: "a", text: "폰으로 일정 확인", tags: ["J"] },
      { id: "b", text: "여유롭게 커피 한 모금", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "음료를 다 마셨을 때",
    choices: [
      { id: "a", text: "바로 나간다", tags: ["S"] },
      { id: "b", text: "수다 이어가거나 여운 즐김", tags: ["N"] },
    ],
  },
  {
    id: 11,
    text: "혼자 카페에 있을 때",
    choices: [
      { id: "a", text: "집중 모드 ON", tags: ["I"] },
      { id: "b", text: "사람 구경하며 힐링", tags: ["E"] },
    ],
  },
  {
    id: 12,
    text: "가끔 가는 이유는?",
    choices: [
      { id: "a", text: "생산성 향상", tags: ["T"] },
      { id: "b", text: "감정 환기", tags: ["F"] },
    ],
  },
]

export default function CafeStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'cafe-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cafe-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/cafe-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('cafe-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('cafe-style', currentQuestion + 1, questions.length)
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
                      ? "border-amber-500 bg-gradient-to-r from-amber-50 to-brown-50 dark:from-amber-950 dark:to-brown-950 shadow-lg"
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

