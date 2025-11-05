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
    text: "예매할 때 선호는?",
    choices: [
      { id: "a", text: "개봉 전 미리 예매", tags: ["J"] },
      { id: "b", text: "당일/즉흥 예매", tags: ["P"] },
    ],
  },
  {
    id: 2,
    text: "좌석을 고를 때?",
    choices: [
      { id: "a", text: "가운데·황금좌석 규칙대로", tags: ["S"] },
      { id: "b", text: "화면/사운드 감으로 선택", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "동행과의 대화템?",
    choices: [
      { id: "a", text: "영화관람 전부터 떠들썩", tags: ["E"] },
      { id: "b", text: "상영 전 집중 모드", tags: ["I"] },
    ],
  },
  {
    id: 4,
    text: "팝콘 사이즈 논쟁!",
    choices: [
      { id: "a", text: "데이터: 가성비 계산 후 결정", tags: ["T"] },
      { id: "b", text: "취향: 맛/기분이 먼저", tags: ["F"] },
    ],
  },
  {
    id: 5,
    text: "트레일러(예고편) 시간은?",
    choices: [
      { id: "a", text: "제시간 맞춰 예고편 포함", tags: ["J"] },
      { id: "b", text: "시작 직전에 들어감", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "신작 선택 기준은?",
    choices: [
      { id: "a", text: "평점/리뷰/수상 여부", tags: ["S"] },
      { id: "b", text: "감독·장르 실험/신선함", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "단체 관람에서의 나는?",
    choices: [
      { id: "a", text: "모두가 즐길 무난작 추천", tags: ["E"] },
      { id: "b", text: "내가 보고 싶은 작품 우선", tags: ["I"] },
    ],
  },
  {
    id: 8,
    text: "스포일러를 만났다면?",
    choices: [
      { id: "a", text: "감정 배제, 정보로 정리", tags: ["T"] },
      { id: "b", text: "기분 상함, 몰입이 깨짐", tags: ["F"] },
    ],
  },
  {
    id: 9,
    text: "상영 중 관람 태도는?",
    choices: [
      { id: "a", text: "음료 소리·폰 밝기 철저 관리", tags: ["S"] },
      { id: "b", text: "감정이입 과다, 리액션 큼", tags: ["N"] },
    ],
  },
  {
    id: 10,
    text: "엔딩크레딧은?",
    choices: [
      { id: "a", text: "쿠키·크레딧 확인 후 퇴장", tags: ["J"] },
      { id: "b", text: "분위기 따라 바로 나감", tags: ["P"] },
    ],
  },
  {
    id: 11,
    text: "굿즈 구매 기준은?",
    choices: [
      { id: "a", text: "활용도·가격 먼저", tags: ["T"] },
      { id: "b", text: "디자인·영감·소장가치", tags: ["F"] },
    ],
  },
  {
    id: 12,
    text: "영화관 선택 기준은?",
    choices: [
      { id: "a", text: "접근성·좌석·음향 스펙", tags: ["S"] },
      { id: "b", text: "상영관 무드·브랜드 경험", tags: ["N"] },
    ],
  },
]

export default function MovieTheaterStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'movie-theater-style',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/movie-theater-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/movie-theater-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('movie-theater-style')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('movie-theater-style', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                      ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 shadow-lg"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-indigo-500 bg-indigo-500"
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

