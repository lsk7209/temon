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
    q: "햄버거집에서 패티를 고를 때",
    a1: { text: "항상 소고기 패티로 고정한다", tags: ["J"] },
    a2: { text: "그때그때 치킨이나 새우 등 다양하게 선택한다", tags: ["P"] },
  },
  {
    id: 2,
    q: "햄버거집에서 빵을 선택할 때",
    a1: { text: "클래식 번을 선택한다", tags: ["S"] },
    a2: { text: "브리오슈나 통밀 등 특별한 빵을 선호한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "햄버거에 야채를 넣을 때",
    a1: { text: "기본 야채만 간단하게 넣는다", tags: ["T"] },
    a2: { text: "추가 야채까지 가득 넣는다", tags: ["F"] },
  },
  {
    id: 4,
    q: "햄버거에 소스를 선택할 때",
    a1: { text: "케첩이나 머스타드 같은 기본만 선택한다", tags: ["S"] },
    a2: { text: "특제 소스 여러 개를 조합한다", tags: ["N"] },
  },
  {
    id: 5,
    q: "햄버거에 치즈를 추가할 때",
    a1: { text: "치즈 없으면 못 먹는다", tags: ["F"] },
    a2: { text: "치즈 빼도 OK, 맛이 더 깔끔하다", tags: ["T"] },
  },
  {
    id: 6,
    q: "햄버거집에서 주문할 때",
    a1: { text: "메뉴판을 미리 정해둔다", tags: ["J"] },
    a2: { text: "줄 서서 그때그때 결정한다", tags: ["P"] },
  },
  {
    id: 7,
    q: "햄버거와 함께 사이드 메뉴를 선택할 때",
    a1: { text: "감자튀김만 간단하게 선택한다", tags: ["I"] },
    a2: { text: "감자튀김+콜라+디저트 세트를 선택한다", tags: ["E"] },
  },
  {
    id: 8,
    q: "햄버거를 먹을 때",
    a1: { text: "한 입씩 차근차근 먹는다", tags: ["J"] },
    a2: { text: "먹다 보니 어느새 다 먹는다", tags: ["P"] },
  },
  {
    id: 9,
    q: "햄버거를 먹기 전에 사진을 찍을 때",
    a1: { text: "사진을 찍고 바로 먹기 시작한다", tags: ["E"] },
    a2: { text: "조용히 맛에 집중한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "햄버거를 먹다가 무너졌을 때",
    a1: { text: "포기하고 포크로 먹는다", tags: ["T"] },
    a2: { text: "다시 조립해서 도전한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "햄버거를 선택할 때 무엇을 중시할 때",
    a1: { text: "가격, 칼로리, 영양 정보를 중시한다", tags: ["T"] },
    a2: { text: "맛, 인기, 추천 메뉴를 중시한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "햄버거를 먹고 정말 맛있어서 공유하고 싶을 때",
    a1: { text: "즉시 후기를 작성하고 공유한다", tags: ["E"] },
    a2: { text: "조용히 소화하며 만족한다", tags: ["I"] },
  },
]

export default function HamburgerComboTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "hamburger-combo",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/hamburger-combo/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/hamburger-combo/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("hamburger-combo")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("hamburger-combo", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 shadow-lg"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 dark:border-gray-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-orange-500 bg-orange-500"
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

