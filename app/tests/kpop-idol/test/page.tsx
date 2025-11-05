"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

const questions = [
  {
    id: 1,
    question: "팀 회의 중 분위기가 싸해졌다!",
    emoji: "😰",
    options: [
      { text: "리더답게 중재하며 정리한다", emoji: "🫡", type: "leader" },
      { text: '"에라 모르겠다" 하며 농담 던져 분위기 바꾼다', emoji: "🤡", type: "maknae" },
    ],
  },
  {
    id: 2,
    question: "안무 연습 중 실수했다!",
    emoji: "💃",
    options: [
      { text: "완벽할 때까지 끝까지 연습한다", emoji: "💪", type: "dancer" },
      { text: "대충 웃고 넘어간다", emoji: "😅", type: "maknae" },
    ],
  },
  {
    id: 3,
    question: "무대 올라가기 전, 당신은?",
    emoji: "🎭",
    options: [
      { text: "거울 보며 헤어/메이크업 체크", emoji: "✨", type: "visual" },
      { text: '"파이팅~!" 하며 에너지 뿜는다', emoji: "🔥", type: "leader" },
    ],
  },
  {
    id: 4,
    question: '팬이 "최애예요"라고 말한다!',
    emoji: "💕",
    options: [
      { text: "쑥스럽게 고개 숙이며 미소", emoji: "😊", type: "visual" },
      { text: '크게 하트 날리며 "사랑해요!"', emoji: "❤️", type: "maknae" },
    ],
  },
  {
    id: 5,
    question: "새 앨범 콘셉트 정할 때?",
    emoji: "🎨",
    options: [
      { text: '"이번엔 진지하게 가자"', emoji: "🎭", type: "leader" },
      { text: '"병맛 컨셉 어때?"', emoji: "😂", type: "maknae" },
    ],
  },
  {
    id: 6,
    question: "스케줄 끝나고 숙소에 들어왔다!",
    emoji: "🏠",
    options: [
      { text: "제일 먼저 방에 들어가 공부/연습", emoji: "📚", type: "vocal" },
      { text: "간식 챙기고 게임 킨다", emoji: "🎮", type: "maknae" },
    ],
  },
  {
    id: 7,
    question: "팬사인회에서 가장 많이 듣는 말은?",
    emoji: "✍️",
    options: [
      { text: '"리더 같아요~ 든든해요!"', emoji: "🫡", type: "leader" },
      { text: '"막내 같아요~ 귀여워요!"', emoji: "🐣", type: "maknae" },
    ],
  },
  {
    id: 8,
    question: "무대에서 당신은?",
    emoji: "🎤",
    options: [
      { text: "카리스마 있게 중심을 잡는다", emoji: "🕺", type: "dancer" },
      { text: "감정 담아 노래에 집중한다", emoji: "🎶", type: "vocal" },
    ],
  },
]

export default function KpopIdolTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({
    leader: 0,
    vocal: 0,
    dancer: 0,
    visual: 0,
    maknae: 0,
  })
  const [answerHistory, setAnswerHistory] = useState<Record<number, string>>({})
  const { saveResult } = useTestResult({
    testId: 'kpop-idol',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/kpop-idol/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/kpop-idol/test/result?type=${resultType}`)
    },
  })

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('kpop-idol')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('kpop-idol', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleAnswer = async (type: string) => {
    const newAnswers = { ...answers, [type]: answers[type] + 1 }
    const newAnswerHistory = { ...answerHistory, [currentQuestion]: type }
    const currentQuestionIndex = currentQuestion
    setAnswers(newAnswers)
    setAnswerHistory(newAnswerHistory)

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
      } else {
        // Calculate result
        const resultType = Object.entries(newAnswers).reduce((a, b) => (newAnswers[a[0]] > newAnswers[b[0]] ? a : b))[0]
        await saveResult(resultType, newAnswerHistory)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              질문 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 md:p-12 shadow-xl border-2 border-purple-200 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{question.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{question.question}</h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-full p-6 h-auto text-left justify-start bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-800 border-2 border-gray-200 hover:border-purple-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                variant="outline"
              >
                <span className="text-3xl mr-4">{option.emoji}</span>
                <span className="text-lg font-medium flex-1">{option.text}</span>
              </Button>
            ))}
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">솔직하게 답변해주세요! 정답은 없습니다 😊</p>
        </div>
      </div>
    </div>
  )
}
