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
    q: "편의점에 들어서자마자 당신은?",
    a1: { text: "살 것만 빠르게 담고 계산", tags: ["J"] },
    a2: { text: "한 바퀴 돌며 신상품부터 훑어봄", tags: ["P"] },
  },
  {
    id: 2,
    q: "시즌 한정 신상품을 보면?",
    a1: { text: "기본 메뉴부터 확인", tags: ["S"] },
    a2: { text: "바로 시도해봄", tags: ["N"] },
  },
  {
    id: 3,
    q: "동행과 함께라면?",
    a1: { text: "대화하며 서로 추천·공유", tags: ["E"] },
    a2: { text: "각자 조용히 장바구니 채움", tags: ["I"] },
  },
  {
    id: 4,
    q: "결제·정산 스타일은?",
    a1: { text: "정확한 금액·영수증 기준으로 계산", tags: ["T"] },
    a2: { text: "상황 봐서 내가 조금 더 부담", tags: ["F"] },
  },
  {
    id: 5,
    q: "장바구니를 채우는 방식은?",
    a1: { text: "리스트대로 차례대로 담음", tags: ["J"] },
    a2: { text: "발견한 것들을 즉흥적으로 조합", tags: ["P"] },
  },
  {
    id: 6,
    q: "라벨을 볼 때 무엇을 중시하나?",
    a1: { text: "원재료·칼로리·당류 같은 객관 정보", tags: ["S"] },
    a2: { text: "브랜드 스토리·패키지 컨셉", tags: ["N"] },
  },
  {
    id: 7,
    q: "맛있는 조합을 찾았을 때?",
    a1: { text: "단톡방에 바로 공유", tags: ["E"] },
    a2: { text: "개인 기록으로만 남김", tags: ["I"] },
  },
  {
    id: 8,
    q: "품절 상황에 대처하는 법은?",
    a1: { text: "가격·중량·성분 비교해 대체품 선택", tags: ["T"] },
    a2: { text: "직원에게 문의하고 추천받음", tags: ["F"] },
  },
  {
    id: 9,
    q: "야식 타임에 편의점 간다면?",
    a1: { text: "정해둔 시간·양만 구매", tags: ["J"] },
    a2: { text: "그때 느낌대로 담음", tags: ["P"] },
  },
  {
    id: 10,
    q: "컵라면 물 높이는?",
    a1: { text: "표시선에 정확히 맞춤", tags: ["S"] },
    a2: { text: "상황·식감에 따라 감으로 조절", tags: ["N"] },
  },
  {
    id: 11,
    q: "포인트·쿠폰 관리 습관은?",
    a1: { text: "최대 적립·할인 최적화", tags: ["T"] },
    a2: { text: "귀찮으면 넘기고 기분이 더 중요", tags: ["F"] },
  },
  {
    id: 12,
    q: "혼밥·혼스낵 루틴은?",
    a1: { text: "늘 먹는 안정 조합 고정", tags: ["S"] },
    a2: { text: "무드에 따라 조합을 바꿈", tags: ["N"] },
  },
]

export default function CvsComboTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cvs-combo",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cvs-combo/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cvs-combo/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("cvs-combo")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cvs-combo", currentQuestion + 1, questions.length)
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

