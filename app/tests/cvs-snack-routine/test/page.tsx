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
    q: "편의점에 들어가기 전 당신은?",
    a1: { text: "행사 품목과 가격을 미리 확인한다", tags: ["J"] },
    a2: { text: "그때 끌리는 대로 고른다", tags: ["P"] },
  },
  {
    id: 2,
    q: "새로운 한정판 스낵을 봤다. 선택은?",
    a1: { text: "성분표와 후기를 보고 결정한다", tags: ["S"] },
    a2: { text: "호기심에 바로 시도한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "간식 추천을 받을 때의 태도는?",
    a1: { text: "직원이나 동행에게 먼저 물어본다", tags: ["E"] },
    a2: { text: "조용히 비교하고 혼자 결정한다", tags: ["I"] },
  },
  {
    id: 4,
    q: "간식 선택의 1순위 기준은?",
    a1: { text: "칼로리·영양·가성비", tags: ["T"] },
    a2: { text: "오늘 기분과 위로", tags: ["F"] },
  },
  {
    id: 5,
    q: "원하는 상품이 품절이다. 어떻게 할까?",
    a1: { text: "대체 리스트에서 가장 비슷한 걸 고른다", tags: ["J"] },
    a2: { text: "전혀 다른 간식으로 방향을 바꾼다", tags: ["P"] },
  },
  {
    id: 6,
    q: "신상품 코너를 볼 때 당신은?",
    a1: { text: "포장 정보와 원재료를 꼼꼼히 본다", tags: ["S"] },
    a2: { text: "컨셉과 조합 가능성을 상상한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "간식 먹는 순간의 선호는?",
    a1: { text: "함께 나눠 먹고 반응을 듣는 편", tags: ["E"] },
    a2: { text: "혼자 조용히 즐기는 편", tags: ["I"] },
  },
  {
    id: 8,
    q: "같이 계산할 때 의견이 갈리면?",
    a1: { text: "원칙대로 정확히 나눈다", tags: ["T"] },
    a2: { text: "서로 기분 좋게 유연하게 처리", tags: ["F"] },
  },
  {
    id: 9,
    q: "간식 바구니 구성 방식은?",
    a1: { text: "단백질·당·음료까지 균형 세트로 맞춘다", tags: ["J"] },
    a2: { text: "그 순간 끌리는 아이템을 섞는다", tags: ["P"] },
  },
  {
    id: 10,
    q: "낯선 해외 과자를 발견했다.",
    a1: { text: "실패 리스크를 고려해 소포장부터", tags: ["S"] },
    a2: { text: "처음부터 대표 맛으로 과감히", tags: ["N"] },
  },
  {
    id: 11,
    q: "편의점에서 가장 즐거운 순간은?",
    a1: { text: "직원과 수다·동행과 공유의 순간", tags: ["E"] },
    a2: { text: "고요하게 고르고 계산까지 빠르게", tags: ["I"] },
  },
  {
    id: 12,
    q: "간식 쇼핑의 목적은 무엇에 가까운가?",
    a1: { text: "필요 충족과 효율", tags: ["T"] },
    a2: { text: "기분 전환과 보상", tags: ["F"] },
  },
]

export default function CvsSnackRoutineTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "cvs-snack-routine",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/cvs-snack-routine/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/cvs-snack-routine/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("cvs-snack-routine")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("cvs-snack-routine", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-purple-500 bg-purple-500"
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

