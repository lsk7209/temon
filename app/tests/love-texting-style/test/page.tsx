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
    q: "호감 있는 사람에게 첫 연락 주기?",
    a1: { text: "먼저 건넨다", tags: ["E"] },
    a2: { text: "상대 반응을 보고 움직인다", tags: ["I"] },
  },
  {
    id: 2,
    q: "답장 길이 스타일은?",
    a1: { text: "핵심만 짧게", tags: ["S"] },
    a2: { text: "감정과 맥락까지 자세히", tags: ["N"] },
  },
  {
    id: 3,
    q: "데이트 일정 정할 때?",
    a1: { text: "날짜·시간·장소를 먼저 제안", tags: ["J"] },
    a2: { text: "서로 아이디어를 주고받으며 정함", tags: ["P"] },
  },
  {
    id: 4,
    q: "애매한 메시지 톤을 느끼면?",
    a1: { text: "사실관계를 확인해본다", tags: ["T"] },
    a2: { text: "기분이 상하지 않았는지 묻는다", tags: ["F"] },
  },
  {
    id: 5,
    q: "하루 연락 빈도는?",
    a1: { text: "정해진 타이밍에 꾸준히", tags: ["J"] },
    a2: { text: "상황·기분 따라 유동적", tags: ["P"] },
  },
  {
    id: 6,
    q: "대화 소재 선택은?",
    a1: { text: "오늘 있었던 구체적 일상", tags: ["S"] },
    a2: { text: "앞날·상상·취향 토크", tags: ["N"] },
  },
  {
    id: 7,
    q: "다툼 조짐이 보이면?",
    a1: { text: "논점을 정리해 합의점 찾기", tags: ["T"] },
    a2: { text: "감정 진정부터 하고 이야기", tags: ["F"] },
  },
  {
    id: 8,
    q: "읽고 답장 늦어질 때?",
    a1: { text: "미리 알림·약속 메시지 남김", tags: ["J"] },
    a2: { text: "나중에 한 번에 길게 회신", tags: ["P"] },
  },
  {
    id: 9,
    q: "썸 단계 분위기 만들기?",
    a1: { text: "전화·만남 제안으로 텐션 업", tags: ["E"] },
    a2: { text: "글·사진으로 잔잔한 관심 표현", tags: ["I"] },
  },
  {
    id: 10,
    q: "선물·이벤트 소통은?",
    a1: { text: "실용적 힌트로 니즈 파악", tags: ["T"] },
    a2: { text: "의미·감정 담아 서프라이즈", tags: ["F"] },
  },
  {
    id: 11,
    q: "연락 채널 선택은?",
    a1: { text: "메신저 고정, 기록 관리 중시", tags: ["S"] },
    a2: { text: "상황에 맞춰 통화·영상 전환", tags: ["N"] },
  },
  {
    id: 12,
    q: "데이트 직후 메시지?",
    a1: { text: "오늘의 하이라이트·다음 액션 정리", tags: ["T"] },
    a2: { text: "함께한 감정·여운을 나눔", tags: ["F"] },
  },
]

export default function LoveTextingStyleTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "love-texting-style",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/love-texting-style/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/love-texting-style/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("love-texting-style")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("love-texting-style", currentQuestion + 1, questions.length)
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 shadow-lg"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-pink-500 bg-pink-500"
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
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 shadow-lg"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-pink-500 bg-pink-500"
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

