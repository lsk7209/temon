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
    text: "강의 시작 5분 전, 내 자리?",
    choices: [
      { id: "a", text: "맨 앞줄 예약", tags: ["E"] },
      { id: "b", text: "중간 이후 조용존", tags: ["I"] },
    ],
  },
  {
    id: 2,
    text: "새 교재를 받으면?",
    choices: [
      { id: "a", text: "목차·일정 먼저 짠다", tags: ["J"] },
      { id: "b", text: "아무 페이지나 펼쳐 본다", tags: ["P"] },
    ],
  },
  {
    id: 3,
    text: "이해 안 가는 부분 발생!",
    choices: [
      { id: "a", text: "바로 질문·검색", tags: ["E", "S"] },
      { id: "b", text: "일단 넘어가고 나중에", tags: ["I", "N"] },
    ],
  },
  {
    id: 4,
    text: "정리 노트 스타일",
    choices: [
      { id: "a", text: "글머리·도형·컬러 완벽", tags: ["S"] },
      { id: "b", text: "연상 암기·그림·밈 활용", tags: ["N"] },
    ],
  },
  {
    id: 5,
    text: "시험 2주 전",
    choices: [
      { id: "a", text: "데일리 스터디 플랜 작성", tags: ["J"] },
      { id: "b", text: "마감 압박받아야 달린다", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "공부 장소 선택",
    choices: [
      { id: "a", text: "도서관·카페 고정석", tags: ["S"] },
      { id: "b", text: "날마다 새 공간 탐험", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "그룹 스터디 중 토론 흐르면?",
    choices: [
      { id: "a", text: "논점 정리·타임키퍼", tags: ["T"] },
      { id: "b", text: "공감·분위기 메이커", tags: ["F"] },
    ],
  },
  {
    id: 8,
    text: "공부 중 알림이 울리면?",
    choices: [
      { id: "a", text: "즉시 '방해 금지'", tags: ["J", "T"] },
      { id: "b", text: "잠깐 SNS 둘러보고 복귀", tags: ["P", "F"] },
    ],
  },
  {
    id: 9,
    text: "긴 파트를 외워야 할 때",
    choices: [
      { id: "a", text: "로직·목차 구조화", tags: ["T"] },
      { id: "b", text: "스토리·이미지로 연상", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "모의고사 낮은 점수",
    choices: [
      { id: "a", text: "틀린 원인 분석표 작성", tags: ["T"] },
      { id: "b", text: "슬픈 노래 틀고 동기부여", tags: ["F"] },
    ],
  },
  {
    id: 11,
    text: "공부하다 친구에게 카톡이 왔다",
    choices: [
      { id: "a", text: '"끝나고 톡할게!"', tags: ["J", "E"] },
      { id: "b", text: "바로 답장+수다", tags: ["P", "E"] },
    ],
  },
  {
    id: 12,
    text: "시험 전날 밤 12시",
    choices: [
      { id: "a", text: "이미 취침+컨디션 관리", tags: ["S", "J"] },
      { id: "b", text: "카페인 풀충전 올빼미", tags: ["N", "P"] },
    ],
  },
]

export default function StudyMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'study-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/study-mbti/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/study-mbti/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('study-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('study-mbti', currentQuestion + 1, questions.length)
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

        // string[][]를 Record<number, string>로 변환

        const answersRecord = convertAnswersToRecord(newAnswers)
        await saveResult(result, answersRecord)
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
