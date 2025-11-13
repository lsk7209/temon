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
    q: "편의점에 가는 가장 큰 이유는?",
    a1: { text: "필요한 것만 빠르게 사기", tags: ["S", "T"] },
    a2: { text: "새로운 조합 찾고 기분 전환", tags: ["N", "F"] },
  },
  {
    id: 2,
    q: "신상품을 봤을 때의 선택은?",
    a1: { text: "후기·행사 여부 보고 결정", tags: ["S", "J"] },
    a2: { text: "바로 한 번 시도해 본다", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "둘이 갈 때 메뉴 고르는 법은?",
    a1: { text: "상대 취향 묻고 투표로 정함", tags: ["E", "J"] },
    a2: { text: "조용히 추천 몇 개만 던짐", tags: ["I", "P"] },
  },
  {
    id: 4,
    q: "1+1 또는 2+1 행사에 대한 태도는?",
    a1: { text: "실속·단가 계산 후 선택", tags: ["T", "J"] },
    a2: { text: "오늘 즐거움이면 충분", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "대표 간식 루틴은?",
    a1: { text: "늘 먹던 빵·우유 등 고정", tags: ["S", "I"] },
    a2: { text: "상황 따라 즉흥 조합", tags: ["N", "E"] },
  },
  {
    id: 6,
    q: "전자레인지·핫바를 고를 때 기준은?",
    a1: { text: "성분·중량·가격 등을 먼저 본다", tags: ["S", "T"] },
    a2: { text: "향·식감 상상과 그때의 욕구", tags: ["N", "F"] },
  },
  {
    id: 7,
    q: "음료 선택 패턴은?",
    a1: { text: "기본 탄산·커피로 루틴 유지", tags: ["S", "J"] },
    a2: { text: "이색 맛·한정 제품 탐색", tags: ["N", "P"] },
  },
  {
    id: 8,
    q: "야식 시간 방문 시 당신은?",
    a1: { text: "과하게 사지 않도록 리스트 작성", tags: ["I", "J"] },
    a2: { text: "그때 그 분위기에 맞게 픽", tags: ["E", "P"] },
  },
  {
    id: 9,
    q: "품절을 마주했을 때의 반응은?",
    a1: { text: "대체 메뉴 빠르게 찾음", tags: ["T", "J"] },
    a2: { text: "기분이 식어 다른 날 재도전", tags: ["F", "P"] },
  },
  {
    id: 10,
    q: "결제 직전 당신의 점검 포인트는?",
    a1: { text: "영수증·포인트·유통기한 체크", tags: ["S", "J"] },
    a2: { text: "전체 조합 밸런스 상상", tags: ["N", "F"] },
  },
  {
    id: 11,
    q: "혼자 vs 함께 방문의 선호는?",
    a1: { text: "혼자 빠르게 다녀오기", tags: ["I", "T"] },
    a2: { text: "같이 가서 고르는 재미", tags: ["E", "F"] },
  },
  {
    id: 12,
    q: "재구매 판단 기준은?",
    a1: { text: "가격 대비 만족도와 일관성", tags: ["T", "S"] },
    a2: { text: "그날의 감정·상황과의 궁합", tags: ["F", "N"] },
  },
]

export default function ConvenienceSnackTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "convenience-snack",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/convenience-snack/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/convenience-snack/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("convenience-snack")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("convenience-snack", currentQuestion + 1, questions.length)
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
      <main className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
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
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-green-500 bg-green-500"
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
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50/50 dark:border-gray-700 dark:hover:border-green-600 dark:hover:bg-green-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-green-500 bg-green-500"
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

