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
    q: "치킨을 시키기 전 당신은?",
    a1: { text: "항상 먹던 메뉴로 바로 결정", tags: ["J"] },
    a2: { text: "앱 할인·리뷰 보며 그때그때 결정", tags: ["P"] },
  },
  {
    id: 2,
    q: "신메뉴가 나왔다면?",
    a1: { text: "시그니처부터 확인", tags: ["S"] },
    a2: { text: "신메뉴 먼저 도전", tags: ["N"] },
  },
  {
    id: 3,
    q: "주문 인원 모집 상황에서 당신은?",
    a1: { text: "단톡에 먼저 모집 글 올림", tags: ["E"] },
    a2: { text: "조용히 혼자 주문", tags: ["I"] },
  },
  {
    id: 4,
    q: "정산 방식에 대한 생각은?",
    a1: { text: "원가 기준 정확히 N분의 1", tags: ["T"] },
    a2: { text: "상황 보고 조금 더 내거나 배려", tags: ["F"] },
  },
  {
    id: 5,
    q: "배달 오기 전 무엇을 하나요?",
    a1: { text: "소스·음료·접시 미리 세팅", tags: ["J"] },
    a2: { text: "오면 그때 상황 보고 준비", tags: ["P"] },
  },
  {
    id: 6,
    q: "후라이드 vs 양념 선택 기준은?",
    a1: { text: "기본의 맛과 식감 우선", tags: ["S"] },
    a2: { text: "소스 조합과 변주 우선", tags: ["N"] },
  },
  {
    id: 7,
    q: "치킨이 도착했다. 당신의 행동은?",
    a1: { text: "사진과 후기 실시간 공유", tags: ["E"] },
    a2: { text: "조용히 첫 조각에 집중", tags: ["I"] },
  },
  {
    id: 8,
    q: "뼈 vs 순살 논쟁이 벌어지면?",
    a1: { text: "가격·중량·식감 근거로 설득", tags: ["T"] },
    a2: { text: "서로 맞추는 타협안 제안", tags: ["F"] },
  },
  {
    id: 9,
    q: "사이드 메뉴 선택은?",
    a1: { text: "콜라·치킨무 등 기본만 계획대로", tags: ["J"] },
    a2: { text: "치즈볼·웨지감자 등 현장 추가", tags: ["P"] },
  },
  {
    id: 10,
    q: "리뷰를 볼 때 무엇을 중시하나?",
    a1: { text: "평균 평점·사진의 객관 정보", tags: ["S"] },
    a2: { text: "최근 트렌드·신메뉴 평판 흐름", tags: ["N"] },
  },
  {
    id: 11,
    q: "같이 먹을 때 당신은?",
    a1: { text: "한 조각씩 나눠 먹자고 제안", tags: ["E"] },
    a2: { text: "각자 접시에 조용히 담음", tags: ["I"] },
  },
  {
    id: 12,
    q: "남은 치킨 처리는?",
    a1: { text: "밀폐·재가열 가이드대로 보관", tags: ["T"] },
    a2: { text: "이웃·동료에게 기분 좋게 나눔", tags: ["F"] },
  },
]

export default function ChickenStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "chicken-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/chicken-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/chicken-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("chicken-style")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("chicken-style", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
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
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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
                    ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 shadow-lg"
                    : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50 dark:border-gray-700 dark:hover:border-yellow-600 dark:hover:bg-yellow-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-yellow-500 bg-yellow-500"
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
