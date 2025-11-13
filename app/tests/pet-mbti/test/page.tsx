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
    text: "주말 아침, 이상적 모닝 루틴은?",
    choices: [
      { id: "a", text: "공원 산책하며 활기차게 시작", tags: ["E"] },
      { id: "b", text: "침대에서 뒹굴며 여유롭게", tags: ["I"] },
    ],
  },
  {
    id: 2,
    text: "집 안 풍경을 고른다면?",
    choices: [
      { id: "a", text: "미니멀하고 정돈된 공간", tags: ["S"] },
      { id: "b", text: "구석구석 데코와 식물이 가득", tags: ["N"] },
    ],
  },
  {
    id: 3,
    text: "펫을 고를 때 가장 중요한 건?",
    choices: [
      { id: "a", text: "건강 상태와 사육 난이도", tags: ["T"] },
      { id: "b", text: "교감 가능성과 귀여움", tags: ["F"] },
    ],
  },
  {
    id: 4,
    text: "여행 계획 세울 때?",
    choices: [
      { id: "a", text: "날짜와 코스를 철저히 계획", tags: ["J"] },
      { id: "b", text: "현지에서 즉흥적으로 결정", tags: ["P"] },
    ],
  },
  {
    id: 5,
    text: "스트레스 해소법은?",
    choices: [
      { id: "a", text: "운동이나 액티비티로 발산", tags: ["E"] },
      { id: "b", text: "혼자 음악 듣거나 독서", tags: ["I"] },
    ],
  },
  {
    id: 6,
    text: "인테리어 소품을 살 때?",
    choices: [
      { id: "a", text: "기능성과 내구성을 먼저 체크", tags: ["T"] },
      { id: "b", text: "색감과 감성을 우선 고려", tags: ["F"] },
    ],
  },
  {
    id: 7,
    text: "친구가 갑자기 놀러온다!",
    choices: [
      { id: "a", text: "간식과 놀이를 미리 준비", tags: ["J"] },
      { id: "b", text: "와! 일단 반갑게 맞이", tags: ["P"] },
    ],
  },
  {
    id: 8,
    text: "휴일 오후, 선택은?",
    choices: [
      { id: "a", text: "야외 스포츠나 활동", tags: ["E", "S"] },
      { id: "b", text: "집콕하며 영화 몰아보기", tags: ["I", "N"] },
    ],
  },
  {
    id: 9,
    text: "펫 사진을 올린다면?",
    choices: [
      { id: "a", text: "관리법이나 정보 팁 포함", tags: ["T"] },
      { id: "b", text: "재미있는 스토리나 밈 캡션", tags: ["F"] },
    ],
  },
  {
    id: 10,
    text: "일과 중 알림이 왔다!",
    choices: [
      { id: "a", text: "바로 확인하고 답장", tags: ["P", "E"] },
      { id: "b", text: "업무 끝나고 몰아서 확인", tags: ["J", "I"] },
    ],
  },
  {
    id: 11,
    text: "새 취미에 도전할 때?",
    choices: [
      { id: "a", text: "레슨 받거나 교본부터 구매", tags: ["S", "J"] },
      { id: "b", text: "유튜브 보며 감부터 잡기", tags: ["N", "P"] },
    ],
  },
  {
    id: 12,
    text: "예상치 못한 돌발 상황이 생기면?",
    choices: [
      { id: "a", text: "침착하게 문제 해결 방법 모색", tags: ["T", "J"] },
      { id: "b", text: "웃으며 유연하게 대응", tags: ["F", "P"] },
    ],
  },
]

export default function PetMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'pet-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/pet-mbti/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/pet-mbti/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('pet-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('pet-mbti', currentQuestion + 1, questions.length)
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 text-pink-200 dark:text-pink-800 text-xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🐾
        </div>
        <div
          className="absolute bottom-32 right-20 text-purple-200 dark:text-purple-800 text-lg animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🐾
        </div>
        <div
          className="absolute top-1/2 left-20 text-blue-200 dark:text-blue-800 text-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🐾
        </div>
      </div>

      {/* Progress Bar */}
      <div className="container max-w-2xl mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">
            {currentQuestion + 1} / {questions.length}
          </span>
          <Progress value={progress} className="flex-1" />
          <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Question Content */}
      <main className="container max-w-2xl mx-auto px-4 py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
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
                      ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 shadow-lg"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 dark:border-gray-700 dark:hover:border-pink-600 dark:hover:bg-pink-950/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id
                          ? "border-pink-500 bg-pink-500"
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
