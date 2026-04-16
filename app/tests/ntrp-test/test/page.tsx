"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"
import { useTestResult } from "@/hooks/use-test-result"

const questions = [
  {
    id: 1,
    question: "테니스 경험이 얼마나 되나요?",
    options: [
      { text: "처음 시작", level: 1.0 },
      { text: "6개월 미만", level: 1.5 },
      { text: "6개월 - 1년", level: 2.0 },
      { text: "1-2년", level: 2.5 },
      { text: "2-3년", level: 3.0 },
      { text: "3년 이상", level: 3.5 },
    ],
  },
  {
    id: 2,
    question: "포핸드 스트로크 실력은?",
    options: [
      { text: "공을 라켓에 맞추기 어려움", level: 1.0 },
      { text: "천천히 오는 공은 칠 수 있음", level: 2.0 },
      { text: "중간 속도 공도 안정적으로 처리", level: 3.0 },
      { text: "빠른 공도 파워있게 리턴", level: 4.0 },
      { text: "각도와 스핀을 자유자재로 구사", level: 5.0 },
    ],
  },
  {
    id: 3,
    question: "백핸드 스트로크는?",
    options: [
      { text: "거의 사용하지 않음", level: 1.0 },
      { text: "기본적인 백핸드 가능", level: 2.0 },
      { text: "안정적인 백핸드 구사", level: 3.0 },
      { text: "공격적인 백핸드 가능", level: 4.0 },
      { text: "포핸드만큼 강력한 백핸드", level: 5.0 },
    ],
  },
  {
    id: 4,
    question: "서브 실력은?",
    options: [
      { text: "서브 넣기가 어려움", level: 1.0 },
      { text: "언더핸드나 느린 서브", level: 1.5 },
      { text: "기본적인 오버핸드 서브", level: 2.5 },
      { text: "일정한 속도와 방향의 서브", level: 3.5 },
      { text: "스핀과 파워를 조절한 서브", level: 4.5 },
    ],
  },
  {
    id: 5,
    question: "네트 플레이는?",
    options: [
      { text: "네트에 거의 나가지 않음", level: 1.5 },
      { text: "가끔 네트에 나가지만 어색함", level: 2.5 },
      { text: "기본적인 발리 가능", level: 3.5 },
      { text: "공격적인 네트 플레이", level: 4.5 },
      { text: "완벽한 네트 게임", level: 5.0 },
    ],
  },
  {
    id: 6,
    question: "랠리 지속 능력은?",
    options: [
      { text: "3-4번 주고받기 어려움", level: 1.5 },
      { text: "5-10번 정도 가능", level: 2.5 },
      { text: "15-20번 안정적으로 가능", level: 3.5 },
      { text: "30번 이상 지속 가능", level: 4.5 },
      { text: "원하는 만큼 지속 가능", level: 5.0 },
    ],
  },
  {
    id: 7,
    question: "경기 전략과 전술은?",
    options: [
      { text: "그냥 공만 넘기려고 함", level: 1.5 },
      { text: "기본적인 전략 이해", level: 2.5 },
      { text: "상황에 맞는 샷 선택", level: 3.5 },
      { text: "복잡한 전술 구사", level: 4.5 },
      { text: "고도의 전략적 플레이", level: 5.0 },
    ],
  },
  {
    id: 8,
    question: "압박 상황에서의 플레이는?",
    options: [
      { text: "실수가 많아짐", level: 2.0 },
      { text: "평소보다 조금 떨어짐", level: 3.0 },
      { text: "거의 평소와 같음", level: 4.0 },
      { text: "오히려 더 집중됨", level: 5.0 },
    ],
  },
  {
    id: 9,
    question: "스핀 구사 능력은?",
    options: [
      { text: "스핀을 모름", level: 1.5 },
      { text: "가끔 탑스핀 시도", level: 2.5 },
      { text: "기본적인 탑스핀과 슬라이스", level: 3.5 },
      { text: "다양한 스핀을 상황에 맞게", level: 4.5 },
      { text: "모든 스핀을 완벽하게", level: 5.0 },
    ],
  },
  {
    id: 10,
    question: "코트 커버리지는?",
    options: [
      { text: "한 곳에 서서 기다림", level: 1.5 },
      { text: "천천히 움직임", level: 2.5 },
      { text: "적절한 포지셔닝", level: 3.5 },
      { text: "빠른 움직임과 회복", level: 4.5 },
      { text: "완벽한 코트 커버", level: 5.0 },
    ],
  },
  {
    id: 11,
    question: "리턴 실력은?",
    options: [
      { text: "서브 리턴이 어려움", level: 1.5 },
      { text: "느린 서브만 리턴 가능", level: 2.5 },
      { text: "대부분의 서브 리턴", level: 3.5 },
      { text: "공격적인 리턴", level: 4.5 },
      { text: "완벽한 리턴 게임", level: 5.0 },
    ],
  },
  {
    id: 12,
    question: "체력과 지구력은?",
    options: [
      { text: "30분도 힘듦", level: 1.5 },
      { text: "1시간 정도 가능", level: 2.5 },
      { text: "2시간 정도 가능", level: 3.5 },
      { text: "3시간 이상 가능", level: 4.5 },
      { text: "하루 종일 가능", level: 5.0 },
    ],
  },
  {
    id: 13,
    question: "경기 경험은?",
    options: [
      { text: "경기 경험 없음", level: 1.5 },
      { text: "친선 경기 몇 번", level: 2.5 },
      { text: "클럽 내 경기 참여", level: 3.5 },
      { text: "지역 토너먼트 참가", level: 4.5 },
      { text: "전국 대회 참가", level: 5.0 },
    ],
  },
  {
    id: 14,
    question: "상대방 약점 파악 능력은?",
    options: [
      { text: "그런 건 생각 안 함", level: 2.0 },
      { text: "가끔 눈치챔", level: 3.0 },
      { text: "어느 정도 파악함", level: 4.0 },
      { text: "빠르게 파악하고 활용", level: 5.0 },
    ],
  },
  {
    id: 15,
    question: "전반적인 자신의 실력 평가는?",
    options: [
      { text: "완전 초보", level: 1.0 },
      { text: "초보", level: 2.0 },
      { text: "초급", level: 3.0 },
      { text: "중급", level: 4.0 },
      { text: "상급", level: 5.0 },
    ],
  },
]

export default function NTRPTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'ntrp-test',
    onSuccess: (resultId, resultType) => {
      const finalLevel = parseFloat(resultType)
      router.push(`/tests/ntrp-test/test/result?level=${finalLevel}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      const finalLevel = parseFloat(resultType)
      router.push(`/tests/ntrp-test/test/result?level=${finalLevel}`)
    },
  })

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('ntrp-test')
  }, [])

  const handleAnswer = async (level: number) => {
    const newScores = [...scores, level]
    const currentQuestionIndex = currentQuestion
    setScores(newScores)

    trackTestProgress("ntrp-test", currentQuestionIndex + 1, questions.length)

    // Auto-advance after a short delay to show selection
    setTimeout(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestion(currentQuestionIndex + 1)
      } else {
        // 결과 계산
        const averageScore = newScores.reduce((sum, score) => sum + score, 0) / newScores.length
        const finalLevel = Math.round(averageScore * 2) / 2 // 0.5 단위로 반올림
        // answers를 Record<number, string> 형식으로 변환
        const answersRecord: Record<number, string> = {}
        newScores.forEach((score, index) => {
          answersRecord[index] = score.toString()
        })
        await saveResult(finalLevel.toString(), answersRecord)
      }
    }, 500) // 0.5초 딜레이로 선택 확인 후 자동 이동
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-green-600">
                질문 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% 완료</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{questions[currentQuestion].question}</h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full p-6 text-left justify-start hover:bg-green-50 hover:border-green-300 bg-transparent"
                  onClick={() => handleAnswer(option.level)}
                >
                  <span className="text-base">{option.text}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
