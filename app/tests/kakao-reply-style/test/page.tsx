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
    q: "새 메시지가 오면 가장 먼저 하는 행동은?",
    a1: { text: "바로 열어보고 답장한다", tags: ["E"] },
    a2: { text: "상황 정리 후 천천히 답장한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "답장 길이는 보통?",
    a1: { text: "핵심만 짧게", tags: ["S"] },
    a2: { text: "맥락과 느낌까지 자세히", tags: ["N"] },
  },
  {
    id: 3,
    q: "의견이 다를 때의 톤은?",
    a1: { text: "논리로 설득한다", tags: ["T"] },
    a2: { text: "상대 감정 먼저 배려", tags: ["F"] },
  },
  {
    id: 4,
    q: "읽씹 논란이 생기지 않으려면?",
    a1: { text: "읽으면 반드시 답한다", tags: ["J"] },
    a2: { text: "상황에 따라 유연하게", tags: ["P"] },
  },
  {
    id: 5,
    q: "단체방에서의 태도는?",
    a1: { text: "적극적으로 주제 던지고 정리", tags: ["E"] },
    a2: { text: "필요할 때만 말한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "새 이모티콘·밈 사용에 대해",
    a1: { text: "검증된 것만 쓴다", tags: ["S"] },
    a2: { text: "새로운 걸 먼저 시도", tags: ["N"] },
  },
  {
    id: 7,
    q: "업무 연락에서 가장 중요한 것은?",
    a1: { text: "명확한 결론과 할 일", tags: ["T"] },
    a2: { text: "상대의 부담 줄이기", tags: ["F"] },
  },
  {
    id: 8,
    q: "답장 타이밍은?",
    a1: { text: "정해둔 시간대에 일괄 처리", tags: ["J"] },
    a2: { text: "상황·기분 따라 즉흥 처리", tags: ["P"] },
  },
  {
    id: 9,
    q: "약속 조율 메시지에서의 선택은?",
    a1: { text: "날짜·시간을 먼저 제안", tags: ["E"] },
    a2: { text: "상대 의견을 먼저 묻는다", tags: ["I"] },
  },
  {
    id: 10,
    q: "메시지 오해가 생기면?",
    a1: { text: "증거·사실을 정리해 설명", tags: ["T"] },
    a2: { text: "기분을 달래며 공감부터", tags: ["F"] },
  },
  {
    id: 11,
    q: "첨부·링크 공유 습관은?",
    a1: { text: "필요 최소한만 정확히", tags: ["S"] },
    a2: { text: "참고 자료를 넉넉히 제공", tags: ["N"] },
  },
  {
    id: 12,
    q: "읽지 못한 메시지는 어떻게 처리?",
    a1: { text: "미리 알림·고정핀으로 관리", tags: ["J"] },
    a2: { text: "그때그때 스와이프·검색", tags: ["P"] },
  },
]

export default function KakaoReplyStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "kakao-reply-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/kakao-reply-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/kakao-reply-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("kakao-reply-style")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("kakao-reply-style", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-blue-500 bg-blue-500"
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

