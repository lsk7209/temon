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
    question: "비 오는 날, 누군가 우산을 씌워줬다. 당신은?",
    emoji: "🌂",
    options: [
      { text: "심쿵하며 눈을 마주친다", emoji: "💕", type: "pure" },
      { text: '"이거 필요 없는데요?" 하고 쿨하게 뿌리친다', emoji: "😎", type: "chaebol" },
    ],
  },
  {
    id: 2,
    question: "갑자기 첫사랑이 나타났다!",
    emoji: "💘",
    options: [
      { text: "눈물 글썽이며 달려간다", emoji: "😭", type: "crying" },
      { text: '아무렇지 않게 "잘 지냈어?" 한다', emoji: "☕", type: "gukbap" },
    ],
  },
  {
    id: 3,
    question: "길에서 부딪힌 낯선 사람. 드라마라면?",
    emoji: "💫",
    options: [
      { text: "바로 사랑에 빠진다", emoji: "💘", type: "pure" },
      { text: "그냥 사과하고 지나간다", emoji: "🙃", type: "gukbap" },
    ],
  },
  {
    id: 4,
    question: "위기 상황! 당신의 선택은?",
    emoji: "⚡",
    options: [
      { text: "내가 직접 구하러 뛴다", emoji: "💪", type: "chaebol" },
      { text: "그냥 국밥 먹으러 간다", emoji: "🍲", type: "gukbap" },
    ],
  },
  {
    id: 5,
    question: "대사 한마디로 승부 본다. 당신의 스타일은?",
    emoji: "💬",
    options: [
      { text: '"내 마음 아직도 네 거야."', emoji: "💔", type: "pure" },
      { text: '"이러다 늦겠다, 먼저 간다."', emoji: "🏃", type: "chaebol" },
    ],
  },
  {
    id: 6,
    question: "집안 배경은?",
    emoji: "🏠",
    options: [
      { text: "재벌가 대저택", emoji: "🏰", type: "chaebol" },
      { text: "옥탑방 원룸", emoji: "🏚️", type: "comic" },
    ],
  },
  {
    id: 7,
    question: "연애 중 싸움이 났다!",
    emoji: "💢",
    options: [
      { text: "울면서 매달린다", emoji: "😢", type: "crying" },
      { text: '"그럼 헤어지자."', emoji: "😐", type: "chaebol" },
    ],
  },
  {
    id: 8,
    question: "가장 닮은 드라마 장르는?",
    emoji: "🎭",
    options: [
      { text: "눈물 쏙 빼는 정통 멜로", emoji: "😭", type: "crying" },
      { text: "웃긴 상황극 같은 로코", emoji: "😂", type: "comic" },
    ],
  },
  {
    id: 9,
    question: "누군가 고백했다!",
    emoji: "💌",
    options: [
      { text: '"나도 좋아했어."', emoji: "❤️", type: "pure" },
      { text: '"고마워, 근데 안 돼."', emoji: "🚫", type: "gukbap" },
    ],
  },
  {
    id: 10,
    question: "엔딩씬, 당신의 선택은?",
    emoji: "🎬",
    options: [
      { text: "슬로모션 키스", emoji: "💋", type: "pure" },
      { text: "그냥 국밥 먹으며 크레딧 올라감", emoji: "🍲", type: "comic" },
    ],
  },
]

export default function KDramaMBTITest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({
    chaebol: 0,
    pure: 0,
    comic: 0,
    crying: 0,
    gukbap: 0,
  })
  const [answerHistory, setAnswerHistory] = useState<Record<number, string>>({})
  const { saveResult } = useTestResult({
    testId: 'kdrama-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/kdrama-mbti/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/kdrama-mbti/test/result?type=${resultType}`)
    },
  })

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('kdrama-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('kdrama-mbti', currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleAnswer = async (type: string) => {
    const newAnswers = { ...answers, [type]: answers[type] + 1 }
    const newAnswerHistory = { ...answerHistory, [currentQuestion]: type }
    setAnswers(newAnswers)
    setAnswerHistory(newAnswerHistory)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const resultType = Object.entries(newAnswers).reduce((a, b) => (newAnswers[a[0]] > newAnswers[b[0]] ? a : b))[0]
      await saveResult(resultType, newAnswerHistory)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
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

        <Card className="p-8 md:p-12 shadow-xl border-2 border-pink-200 bg-white/90 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{question.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{question.question}</h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.type)}
                className="w-full p-6 h-auto text-left justify-start bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 text-gray-800 border-2 border-gray-200 hover:border-pink-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
