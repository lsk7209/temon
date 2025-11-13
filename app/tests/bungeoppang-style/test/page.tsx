"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

const questions = [
  {
    id: 1,
    q: "길에서 붕어빵 가게를 발견했다. 당신은?",
    a1: { text: "단골 집만 간다", tags: ["J"] },
    a2: { text: "분위기 봐서 즉흥 방문", tags: ["P"] },
  },
  {
    id: 2,
    q: "필링 선택의 기본값은?",
    a1: { text: "전통 팥이 정답", tags: ["S"] },
    a2: { text: "슈·피자·고구마 등 신상", tags: ["N"] },
  },
  {
    id: 3,
    q: "동행과 함께라면?",
    a1: { text: "묶음 구매해서 나눠 먹자 제안", tags: ["E"] },
    a2: { text: "각자 원하는 만큼 개별 구매", tags: ["I"] },
  },
  {
    id: 4,
    q: "가격이 올랐다. 당신의 판단은?",
    a1: { text: "단위 가격·크기 비교 후 결정", tags: ["T"] },
    a2: { text: "수고를 생각하며 기분 따라 선택", tags: ["F"] },
  },
  {
    id: 5,
    q: "몇 개 살지 정하는 방식은?",
    a1: { text: "미리 개수·예산을 정한다", tags: ["J"] },
    a2: { text: "현장 냄새에 끌리면 추가", tags: ["P"] },
  },
  {
    id: 6,
    q: "메뉴판을 볼 때 먼저 보는 것은?",
    a1: { text: "원재료·열량·구성 정보", tags: ["S"] },
    a2: { text: "시즌 한정·스토리 요소", tags: ["N"] },
  },
  {
    id: 7,
    q: "첫 한입 전 행동은?",
    a1: { text: "사진·후기 공유부터", tags: ["E"] },
    a2: { text: "조용히 뜨거움 식히며 한입", tags: ["I"] },
  },
  {
    id: 8,
    q: "줄에서 새치기 논쟁이 생겼다.",
    a1: { text: "원칙을 분명히 말한다", tags: ["T"] },
    a2: { text: "분위기 해치지 않게 완만히 중재", tags: ["F"] },
  },
  {
    id: 9,
    q: "첫 한입은 어디부터?",
    a1: { text: "항상 같은 루틴", tags: ["J"] },
    a2: { text: "상황 따라 매번 다름", tags: ["P"] },
  },
  {
    id: 10,
    q: "마지막 한 개가 남았다.",
    a1: { text: "공평하게 나눠 먹자", tags: ["T"] },
    a2: { text: "배고픈 사람에게 양보", tags: ["F"] },
  },
  {
    id: 11,
    q: "사장님과의 상호작용은?",
    a1: { text: "굽기 팁 묻고 대화도 나눔", tags: ["E"] },
    a2: { text: "필요한 말만 간단히", tags: ["I"] },
  },
  {
    id: 12,
    q: "다음 방문 계획은?",
    a1: { text: "검증된 메뉴 재구매", tags: ["S"] },
    a2: { text: "새 조합으로 재도전", tags: ["N"] },
  },
]

export default function BungeoppangStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "bungeoppang-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/bungeoppang-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/bungeoppang-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("bungeoppang-style")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("bungeoppang-style", currentQuestion + 1, questions.length)
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
        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)
        await saveResult(result, newAnswers)
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
