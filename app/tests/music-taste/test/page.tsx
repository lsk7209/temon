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
    text: "새로운 음악을 발견할 때",
    choices: [
      { id: "a", text: "친구 추천을 믿는다", tags: ["E"] },
      { id: "b", text: "혼자 찾아 듣는다", tags: ["I"] },
    ],
  },
  {
    id: 2,
    text: "음악 재생은 언제?",
    choices: [
      { id: "a", text: "이동 중 / 출퇴근길", tags: ["S"] },
      { id: "b", text: "잠들기 전 / 감정 정리 시간", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "음악 취향은?",
    choices: [
      { id: "a", text: "장르 중심, 멜로디 위주", tags: ["S"] },
      { id: "b", text: "가사 중심, 의미 중시", tags: ["N"] },
    ],
  },
  {
    id: 4,
    text: "플레이리스트를 정리할 때",
    choices: [
      { id: "a", text: "테마별로 체계적으로 정리", tags: ["J"] },
      { id: "b", text: "듣고 싶은 대로 즉흥 추가", tags: ["P"] },
    ],
  },
  {
    id: 5,
    text: "노래를 듣는 이유는",
    choices: [
      { id: "a", text: "집중력 향상 / 작업용", tags: ["T"] },
      { id: "b", text: "위로 / 감정 해소", tags: ["F"] },
    ],
  },
  {
    id: 6,
    text: "콘서트 갈 때",
    choices: [
      { id: "a", text: "사람들과 어울리는 게 즐겁다", tags: ["E"] },
      { id: "b", text: "공연 자체에 몰입한다", tags: ["I"] },
    ],
  },
  {
    id: 7,
    text: "슬플 때 듣는 노래는",
    choices: [
      { id: "a", text: "분위기를 전환시키는 밝은 곡", tags: ["T"] },
      { id: "b", text: "감정을 더 깊게 공감하는 곡", tags: ["F"] },
    ],
  },
  {
    id: 8,
    text: "새로운 아티스트를 알게 되면",
    choices: [
      { id: "a", text: "전 앨범을 분석해 듣는다", tags: ["J"] },
      { id: "b", text: "한두 곡만 들어본다", tags: ["P"] },
    ],
  },
  {
    id: 9,
    text: "음악 추천 알고리즘이 이상할 때",
    choices: [
      { id: "a", text: "스킵 후 새로 맞춤 추천", tags: ["T"] },
      { id: "b", text: "혹시 내 기분을 안 건가 생각", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "음악 취향을 물으면",
    choices: [
      { id: "a", text: "구체적 장르명으로 설명", tags: ["S"] },
      { id: "b", text: "감정/상황으로 표현", tags: ["N"] },
    ],
  },
  {
    id: 11,
    text: "음악 감상 스타일",
    choices: [
      { id: "a", text: "멀티태스킹 중 배경음악", tags: ["T"] },
      { id: "b", text: "오직 음악에 집중", tags: ["F"] },
    ],
  },
  {
    id: 12,
    text: "리믹스/커버곡에 대한 생각",
    choices: [
      { id: "a", text: "원곡이 최고다", tags: ["J"] },
      { id: "b", text: "새 버전이 더 좋을 때도 있다", tags: ["P"] },
    ],
  },
]

export default function MusicTasteTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'music-taste',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/music-taste/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/music-taste/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('music-taste')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('music-taste', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
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
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-lg"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 dark:border-gray-700 dark:hover:border-purple-600 dark:hover:bg-purple-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-purple-500 bg-purple-500"
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

