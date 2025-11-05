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
    text: "낯선 아줌마가 '유기농 사과야~' 하며 건넨다면? 🍎",
    choices: [
      { id: "a", text: "와 맛있겠다! 칼로리도 0 같아!", type: "egen" },
      { id: "b", text: "원산지랑 성분표 확인했어?", type: "teto" },
    ],
  },
  {
    id: 2,
    text: "난장이 집에 들어갔더니 양말 냄새가 진동한다. 🧦",
    choices: [
      { id: "a", text: "얘들아 귀엽네~ 내가 치워줄게!", type: "egen" },
      { id: "b", text: "집합! 양말 담당 정하자. 시스템 필요해.", type: "teto" },
    ],
  },
  {
    id: 3,
    text: "거울이 오늘따라 '넌 별로야'라고 한다. 🪞",
    choices: [
      { id: "a", text: "내 마음은 예쁘니까 괜찮아~", type: "egen" },
      { id: "b", text: "근거 있어? 데이터 정확해?", type: "teto" },
    ],
  },
  {
    id: 4,
    text: "숲속에서 길을 잃었다. 🌲",
    choices: [
      { id: "a", text: "앗싸 캠핑! 노래나 부르자~", type: "egen" },
      { id: "b", text: "나무에 화살표 남기고 길 찾는다.", type: "teto" },
    ],
  },
  {
    id: 5,
    text: "난장이들이 밥그릇 때문에 싸운다. 🍚",
    choices: [
      { id: "a", text: "같이 먹으면 더 맛있어~", type: "egen" },
      { id: "b", text: "안건 정리하고 투표하자.", type: "teto" },
    ],
  },
  {
    id: 6,
    text: "여왕이 독사과를 들고 협박한다. 👑",
    choices: [
      { id: "a", text: "언니 화났구나? 속 얘기 들어줄까?", type: "egen" },
      { id: "b", text: "조건 말해, 협상하자.", type: "teto" },
    ],
  },
  {
    id: 7,
    text: "난장이들이 깜짝 파티를 열었다. 🎉",
    choices: [
      { id: "a", text: "감동이야! 울어도 돼?", type: "egen" },
      { id: "b", text: "예산은 누가 짰어? 재사용 가능해?", type: "teto" },
    ],
  },
  {
    id: 8,
    text: "왕자가 말을 타고 나타나 구해주겠다 한다. 🐴",
    choices: [
      { id: "a", text: "오빠… 내 마음도 가져가…", type: "egen" },
      { id: "b", text: "보험은 들어놨어? 책임 한도 확인해야지.", type: "teto" },
    ],
  },
  {
    id: 9,
    text: "집에서 모두 다른 생활 패턴으로 산다. 🏠",
    choices: [
      { id: "a", text: "달라도 괜찮아~ 사랑해~", type: "egen" },
      { id: "b", text: "생활 규칙표 만든다. 기상·취침 통일.", type: "teto" },
    ],
  },
  {
    id: 10,
    text: "인생의 중요한 선택이 왔다. ⚖️",
    choices: [
      { id: "a", text: "심장이 뛰면 그게 정답이야!", type: "egen" },
      { id: "b", text: "실현 가능한 길부터 고른다.", type: "teto" },
    ],
  },
]

export default function SnowWhiteMBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult } = useTestResult({
    testId: 'snowwhite-mbti',
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/snowwhite-mbti/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error('결과 저장 실패:', error)
      router.push(`/tests/snowwhite-mbti/test/result?type=${resultType}`)
    },
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // 테스트 시작 추적
  useEffect(() => {
    trackTestStart('snowwhite-mbti')
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress('snowwhite-mbti', currentQuestion + 1, questions.length)
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
        const result = calculateResult(newAnswers)
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

  const calculateResult = (answers: Record<number, string>): string => {
    let egenScore = 0
    let tetoScore = 0
    let princessScore = 0 // 공주/왕자 vs 여왕/난장이
    let leaderScore = 0 // 리더십 점수

    Object.entries(answers).forEach(([questionIndex, choiceId]) => {
      const question = questions[Number.parseInt(questionIndex)]
      const choice = question.choices.find((c) => c.id === choiceId)
      if (choice) {
        if (choice.type === "egen") {
          egenScore++
          // 에겐 답변 중 특정 패턴으로 공주/왕자 구분
          if (questionIndex === "0" || questionIndex === "2" || questionIndex === "9") {
            princessScore++
          }
        } else {
          tetoScore++
          // 테토 답변 중 리더십 패턴으로 여왕/난장이 구분
          if (questionIndex === "1" || questionIndex === "4" || questionIndex === "5") {
            leaderScore++
          }
        }
      }
    })

    // 4가지 유형 결정
    if (egenScore > tetoScore) {
      // 에겐 성향
      return princessScore >= 2 ? "princess" : "prince"
    } else {
      // 테토 성향
      return leaderScore >= 2 ? "queen" : "dwarf"
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800">{currentQ.text}</h1>
            </div>

            <div className="space-y-4">
              {currentQ.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.id)}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedChoice === choice.id
                      ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 shadow-lg"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedChoice === choice.id ? "border-pink-500 bg-pink-500" : "border-gray-300"
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
