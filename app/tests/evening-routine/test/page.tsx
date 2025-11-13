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
    text: "퇴근 직후 나는?",
    choices: [
      { id: "a", text: "바로 약속 잡아 사람 만난다", tags: ["E"] },
      { id: "b", text: "집으로 직행, 혼자만의 시간", tags: ["I"] },
    ],
  },
  {
    id: 2,
    text: "저녁 식사 선택은?",
    choices: [
      { id: "a", text: "늘 가던 메뉴/가게", tags: ["S"] },
      { id: "b", text: "새로운 맛집·신상 메뉴 탐색", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "퇴근길 메시지 도착!",
    choices: [
      { id: "a", text: "바로 답장/전화로 해결", tags: ["E"] },
      { id: "b", text: "집 가서 정리해 답장", tags: ["I"] },
    ],
  },
  {
    id: 4,
    text: "운동 계획 세울 때",
    choices: [
      { id: "a", text: "루틴·기록·측정이 우선", tags: ["T"] },
      { id: "b", text: "기분·컨디션에 맞춰", tags: ["F"] },
    ],
  },
  {
    id: 5,
    text: "집 정리 타이밍은",
    choices: [
      { id: "a", text: "들어오자마자 정리·샤워", tags: ["J"] },
      { id: "b", text: "좀 쉬다 슬슬 시작", tags: ["P"] },
    ],
  },
  {
    id: 6,
    text: "하루 회고 방식",
    choices: [
      { id: "a", text: "체크리스트/투두 점검", tags: ["S"] },
      { id: "b", text: "앞으로의 가능성/아이디어", tags: ["N"] },
    ],
  },
  {
    id: 7,
    text: "약속이 취소됐다",
    choices: [
      { id: "a", text: "혼밥·혼영으로 대체", tags: ["I"] },
      { id: "b", text: "급히 다른 친구 소환", tags: ["E"] },
    ],
  },
  {
    id: 8,
    text: "자기계발 선택",
    choices: [
      { id: "a", text: "효율 좋은 커리큘럼", tags: ["T"] },
      { id: "b", text: "재미/영감 주는 것", tags: ["F"] },
    ],
  },
  {
    id: 9,
    text: "야식 고민",
    choices: [
      { id: "a", text: "먹을지 말지 즉시 결정", tags: ["J"] },
      { id: "b", text: "앱 뒤적이며 한참 고민", tags: ["P"] },
    ],
  },
  {
    id: 10,
    text: "스트레스 해소",
    choices: [
      { id: "a", text: "실제 해결책 찾기", tags: ["S", "T"] },
      { id: "b", text: "감정 정리·힐링 우선", tags: ["N", "F"] },
    ],
  },
  {
    id: 11,
    text: "주 3회 루틴",
    choices: [
      { id: "a", text: "같은 요일/시간 고정", tags: ["J"] },
      { id: "b", text: "주마다 유연 조정", tags: ["P"] },
    ],
  },
  {
    id: 12,
    text: "밤 11시 이후",
    choices: [
      { id: "a", text: "내일을 위해 종료", tags: ["J"] },
      { id: "b", text: "몰입되면 새벽까지", tags: ["P"] },
    ],
  },
]

export default function EveningRoutineTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: 'evening-routine',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/evening-routine/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/evening-routine/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('evening-routine')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('evening-routine', currentQuestion + 1, questions.length)
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

        // 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)

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
        // 질문 10번은 두 태그를 동시에 +1 처리
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950">
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

