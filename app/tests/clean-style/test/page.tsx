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
    text: "청소 시작 전 마음가짐은?",
    choices: [
      { id: "a", text: "계획부터 세운다", tags: ["J"] },
      { id: "b", text: "일단 손부터 움직인다", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "책상 위 먼지를 보면?",
    choices: [
      { id: "a", text: "당장 닦는다", tags: ["S"] },
      { id: "b", text: "'나중에 해야지' 하고 넘긴다", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "청소할 때 음악은?",
    choices: [
      { id: "a", text: "없으면 안 된다", tags: ["E"] },
      { id: "b", text: "조용히 집중한다", tags: ["I"] },
    ],
  },
  {
    id: 4,
    text: "버릴까 말까 고민될 때",
    choices: [
      { id: "a", text: "과감히 버림", tags: ["T"] },
      { id: "b", text: "추억 생각나서 보관", tags: ["F"] },
    ],
  },
  {
    id: 5,
    text: "방 구조가 바뀌면?",
    choices: [
      { id: "a", text: "새로 배치 시도!", tags: ["N"] },
      { id: "b", text: "원래대로가 편함", tags: ["S"] },
    ],
  },
  {
    id: 6,
    text: "먼지 청소 중 예상보다 많을 때",
    choices: [
      { id: "a", text: "현실 직시 후 다시 계획", tags: ["J"] },
      { id: "b", text: "그냥 대충 끝냄", tags: ["P"] },
    ],
  },
  {
    id: 7,
    text: "정리할 때 기준은?",
    choices: [
      { id: "a", text: "필요/불필요", tags: ["T"] },
      { id: "b", text: "예쁨/감성", tags: ["F"] },
    ],
  },
  {
    id: 8,
    text: "청소 중 연락 오면?",
    choices: [
      { id: "a", text: "\"청소 끝나고 보자!\"", tags: ["I"] },
      { id: "b", text: "통화하며 청소", tags: ["E"] },
    ],
  },
  {
    id: 9,
    text: "대청소 빈도는?",
    choices: [
      { id: "a", text: "주기적으로 함", tags: ["J"] },
      { id: "b", text: "스트레스 쌓일 때만 함", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "청소 도구 구매 시",
    choices: [
      { id: "a", text: "기능/가격 비교", tags: ["T"] },
      { id: "b", text: "색감·디자인 중심", tags: ["F"] },
    ],
  },
  {
    id: 11,
    text: "갑자기 친구가 놀러 온다 하면?",
    choices: [
      { id: "a", text: "바로 청소 모드 ON", tags: ["J"] },
      { id: "b", text: "일단 문 닫고 수습", tags: ["P"] },
    ],
  },
  {
    id: 12,
    text: "청소 끝난 후 기분은?",
    choices: [
      { id: "a", text: "성취감 최고!", tags: ["S"] },
      { id: "b", text: "나름 감성 충전됨", tags: ["N"] },
    ],
  },
]

export default function CleanStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'clean-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/clean-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/clean-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('clean-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('clean-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
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
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-blue-500 bg-blue-500"
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

