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
    q: "유튜브 홈 화면에 떴을 때",
    a1: { text: "검색으로 정확히 찾는다", tags: ["J", "T", "S"] },
    a2: { text: "눈에 띄는 것부터 눌러본다", tags: ["P", "F", "N"] },
  },
  {
    id: 2,
    q: "유튜브 구독 채널을 관리할 때",
    a1: { text: "폴더와 알림 설정까지 체계적으로 관리한다", tags: ["J", "S"] },
    a2: { text: "대충 보다가 정리하려고 생각만 한다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "유튜브 영상을 시청 중에 댓글을 볼 때",
    a1: { text: "정보나 타임스탬프 위주로 확인한다", tags: ["T", "I"] },
    a2: { text: "공감 댓글에 반응하고 대화에 참여한다", tags: ["F", "E"] },
  },
  {
    id: 4,
    q: "유튜브 영상 길이를 선호할 때",
    a1: { text: "10분 내외 핵심 요약을 선호한다", tags: ["S", "T"] },
    a2: { text: "길어도 깊게 보는 편이다", tags: ["N", "F"] },
  },
  {
    id: 5,
    q: "유튜브 재생 속도를 조절할 때",
    a1: { text: "1.25~2배로 효율적으로 시청한다", tags: ["T", "J"] },
    a2: { text: "기분에 따라 속도를 조절한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "유튜브 추천 알고리즘을 믿는 편인가",
    a1: { text: "데이터가 나를 잘 안다", tags: ["E", "N"] },
    a2: { text: "결국 내가 선별해야 한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "광고가 나오면?",
    a1: { text: "규칙적으로 스킵·차단 목록 관리", tags: ["T", "J"] },
    a2: { text: "상황 보며 그냥 둠", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "새 카테고리를 발견했다면?",
    a1: { text: "관련 자료 더 찾아 플레이리스트 저장", tags: ["N", "J"] },
    a2: { text: "보는 김에 연속 재생", tags: ["S", "P"] },
  },
  {
    id: 9,
    q: "유튜브를 시청할 때 장소와 모드를 선택할 때",
    a1: { text: "집중 가능한 환경에서 전체화면으로 본다", tags: ["I", "J"] },
    a2: { text: "이동 중 멀티태스킹으로 본다", tags: ["E", "P"] },
  },
  {
    id: 10,
    q: "정보 영상과 브이로그가 동시에 뜨면?",
    a1: { text: "정보 영상 먼저, 후 보상 시청", tags: ["T", "J"] },
    a2: { text: "감정 끌리는 브이로그부터", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "유튜브 영상에 좋아요와 공유를 할 때",
    a1: { text: "참고 가치 있을 때만 눌러 기록한다", tags: ["I", "T"] },
    a2: { text: "재미있으면 곧장 단톡방에 공유한다", tags: ["E", "F"] },
  },
  {
    id: 12,
    q: "이탈 포인트가 생기면?",
    a1: { text: "챕터·자막·요약으로 건너뛰기", tags: ["S", "T"] },
    a2: { text: "썸네일·연관영상으로 갈아탄다", tags: ["N", "P"] },
  },
]

export default function YoutubeHabitTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "youtube-habit",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/youtube-habit/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/youtube-habit/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart("youtube-habit")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("youtube-habit", currentQuestion + 1, questions.length)
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

    // 각 답변의 모든 태그를 합산
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a1.tags.join(",")
                        ? "border-red-500 bg-red-500"
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
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 shadow-lg"
                    : "border-gray-200 hover:border-red-300 hover:bg-red-50/50 dark:border-gray-700 dark:hover:border-red-600 dark:hover:bg-red-950/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedChoice === currentQ.a2.tags.join(",")
                        ? "border-red-500 bg-red-500"
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

