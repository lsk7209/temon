"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"

const questions = [
  {
    id: 1,
    q: "점심 30분 전에 점심을 준비할 때",
    a1: { text: "동료 일정을 확인하고 후보를 미리 정리한다", tags: ["J"] },
    a2: { text: "그때 상황을 보고 즉흥적으로 정한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "회사 근처에 새 식당이 생겼을 때",
    a1: { text: "검증된 단골집으로 간다", tags: ["S"] },
    a2: { text: "신규 식당을 먼저 시도한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "점심 멤버를 정할 때",
    a1: { text: "누가 갈지 먼저 물어보고 맞춘다", tags: ["E"] },
    a2: { text: "혼밥도 괜찮고 조용히 움직인다", tags: ["I"] },
  },
  {
    id: 4,
    q: "점심 메뉴를 선택할 때 1순위로 생각하는 것",
    a1: { text: "가성비와 영양, 업무 집중에 도움", tags: ["T"] },
    a2: { text: "오늘 기분과 위로, 만족감", tags: ["F"] },
  },
  {
    id: 5,
    q: "줄이 길다. 어떻게 할까?",
    a1: { text: "대기 허용 시간을 정하고 안 되면 다른 곳", tags: ["J"] },
    a2: { text: "메뉴 바꾸거나 포장으로 유연 대응", tags: ["P"] },
  },
  {
    id: 6,
    q: "점심 메뉴에서 처음 보는 메뉴를 고를 때",
    a1: { text: "후기, 사진, 성분을 확인한다", tags: ["S"] },
    a2: { text: "조합을 상상하며 새롭게 시도한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "팀 점심 약속이 잦아졌을 때",
    a1: { text: "함께 먹는 자리를 즐기고 대화를 이끈다", tags: ["E"] },
    a2: { text: "가끔만 참여하고 컨디션을 우선한다", tags: ["I"] },
  },
  {
    id: 8,
    q: "계산 방식에 의견 차이가 났다.",
    a1: { text: "원칙대로 N분의 1을 제안한다", tags: ["T"] },
    a2: { text: "상황에 맞게 조율해 마음 상하지 않게", tags: ["F"] },
  },
  {
    id: 9,
    q: "업무가 바쁠 때 점심을 정할 때",
    a1: { text: "시간을 고정하고 가까운 곳으로 신속히 간다", tags: ["J"] },
    a2: { text: "배달이나 간편식을 상황에 따라 선택한다", tags: ["P"] },
  },
  {
    id: 10,
    q: "색다른 조합 제안이 나왔다.",
    a1: { text: "검증된 조합을 선호한다", tags: ["S"] },
    a2: { text: "하나쯤 실험해보자고 제안한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "혼밥과 팀밥 중 더 편한 것을 선택할 때",
    a1: { text: "팀밥. 함께 고르는 과정이 즐겁다", tags: ["E"] },
    a2: { text: "혼밥. 빠르고 조용하게 해결한다", tags: ["I"] },
  },
  {
    id: 12,
    q: "식후에 커피나 디저트를 추가할 때",
    a1: { text: "예산과 시간을 보고 합리적으로 결정한다", tags: ["T"] },
    a2: { text: "컨디션과 기분이 좋으면 추가한다", tags: ["F"] },
  },
]

export default function LunchDeciderTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "lunch-decider",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/lunch-decider/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/lunch-decider/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("lunch-decider")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("lunch-decider", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleChoiceSelect = async (tags: string[]) => {
    setSelectedChoice(tags.join(","))
    const currentQuestionIndex = currentQuestion

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      const newAnswers = [...answers, tags]
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
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }

  const calculateMBTI = (answers: string[][]): string => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    answers.forEach((tags) => {
      tags.forEach((tag) => {
        if (tag in scores) {
          scores[tag as keyof typeof scores]++
        }
      })
    })

    // 동점 처리: 최근 응답 경향 우선
    const result =
      (scores.E >= scores.I ? "E" : "I") +
      (scores.S >= scores.N ? "S" : "N") +
      (scores.T >= scores.F ? "T" : "F") +
      (scores.J >= scores.P ? "J" : "P")

    return result
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="container max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Question Content */}
      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.q}
              </h1>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleChoiceSelect(currentQ.a1.tags)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a1.tags.join(",")
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedChoice === currentQ.a1.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a1.text}
                  </span>
                </div>
              </button>

              <button
                onClick={() => handleChoiceSelect(currentQ.a2.tags)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                  selectedChoice === currentQ.a2.tags.join(",")
                    ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-amber-500 bg-amber-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedChoice === currentQ.a2.tags.join(",") && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">
                    {currentQ.a2.text}
                  </span>
                </div>
              </button>
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50"
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

