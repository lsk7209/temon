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
    q: "붕어빵 가게에서 가장 먼저 떠오르는 선택",
    a1: { text: "늘 먹던 맛이 최고", tags: ["S"] },
    a2: { text: "신메뉴부터 도전", tags: ["N"] },
  },
  {
    id: 2,
    q: "붕어빵을 살 때 몇 개 살지 정할 때",
    a1: { text: "가다가도 수량을 미리 정한다", tags: ["J"] },
    a2: { text: "가서 보고 즉흥적으로 결정한다", tags: ["P"] },
  },
  {
    id: 3,
    q: "붕어빵 가게 앞에서 분위기를 느낄 때",
    a1: { text: "사장님과 한두 마디 나눈다", tags: ["E"] },
    a2: { text: "조용히 주문하고 기다린다", tags: ["I"] },
  },
  {
    id: 4,
    q: "가격과 구성은 어떻게 보나?",
    a1: { text: "가성비와 구성 먼저 체크", tags: ["T"] },
    a2: { text: "지금 내 기분이 더 중요", tags: ["F"] },
  },
  {
    id: 5,
    q: "붕어빵을 고를 때 굽기와 식감을 생각할 때",
    a1: { text: "바삭도가 일정해야 만족한다", tags: ["S"] },
    a2: { text: "한 입마다 다른 느낌도 재미있다", tags: ["N"] },
  },
  {
    id: 6,
    q: "막 구운 붕어빵을 받았다면?",
    a1: { text: "살짝 식혀가며 먹는다", tags: ["J"] },
    a2: { text: "뜨거워도 한 입부터", tags: ["P"] },
  },
  {
    id: 7,
    q: "붕어빵을 같이 있는 사람과 먹을 때",
    a1: { text: "나눠 먹자고 먼저 제안한다", tags: ["E"] },
    a2: { text: "내 페이스로 조용히 먹는다", tags: ["I"] },
  },
  {
    id: 8,
    q: "붕어빵을 계산할 때",
    a1: { text: "금액을 정확히 나누자고 제안한다", tags: ["T"] },
    a2: { text: "오늘은 내가 쏜다고 말한다", tags: ["F"] },
  },
  {
    id: 9,
    q: "붕어빵 속재료를 선호할 때",
    a1: { text: "전통 팥이 진리", tags: ["S"] },
    a2: { text: "치즈나 고구마 같은 변형도 환영한다", tags: ["N"] },
  },
  {
    id: 10,
    q: "붕어빵을 사게 되는 계기?",
    a1: { text: "동선에 맞춰 일부러 들름", tags: ["J"] },
    a2: { text: "지나가다 향 맡고 즉흥 구매", tags: ["P"] },
  },
  {
    id: 11,
    q: "어느 줄에 설지 고를 때?",
    a1: { text: "속도·재고를 보고 합리 선택", tags: ["T"] },
    a2: { text: "친근한 표정·분위기 있는 곳", tags: ["F"] },
  },
  {
    id: 12,
    q: "붕어빵을 다 먹고 난 뒤",
    a1: { text: "다음엔 어느 가게 갈지 기록한다", tags: ["E", "J"] },
    a2: { text: "오늘의 작은 행복으로 남겨둔다", tags: ["I", "P"] },
  },
]

export default function BungeoppangTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "bungeoppang",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/bungeoppang/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/bungeoppang/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("bungeoppang")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("bungeoppang", currentQuestion + 1, questions.length)
    }
  }, [currentQuestion])

  const handleAnswer = (choice: string[]) => {
    const newAnswers = [...answers, choice]
    setAnswers(newAnswers)
    setSelectedChoice("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const resultType = calculateMBTIResult(newAnswers)
      const answersRecord = convertAnswersToRecord(newAnswers)
      saveResult(resultType, answersRecord)
    }
  }

  const calculateMBTIResult = (answers: string[][]): string => {
    const scores: Record<string, number> = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }

    // Sum up tags from all answers
    answers.forEach((answerTags) => {
      answerTags.forEach((tag) => {
        if (scores.hasOwnProperty(tag)) {
          scores[tag]++
        }
      })
    })

    // Determine MBTI type (tie-breaking: prefer recent answers)
    const eScore = scores.E
    const iScore = scores.I
    const sScore = scores.S
    const nScore = scores.N
    const tScore = scores.T
    const fScore = scores.F
    const jScore = scores.J
    const pScore = scores.P

    // For ties, prefer the last answer's tag
    let firstLetter = eScore > iScore ? "E" : eScore < iScore ? "I" : answers[answers.length - 1]?.includes("E") ? "E" : "I"
    let secondLetter = sScore > nScore ? "S" : sScore < nScore ? "N" : answers[answers.length - 1]?.includes("S") ? "S" : "N"
    let thirdLetter = tScore > fScore ? "T" : tScore < fScore ? "F" : answers[answers.length - 1]?.includes("T") ? "T" : "F"
    let fourthLetter = jScore > pScore ? "J" : jScore < pScore ? "P" : answers[answers.length - 1]?.includes("J") ? "J" : "P"

    return firstLetter + secondLetter + thirdLetter + fourthLetter
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
        <div className="max-w-[720px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">{currentQ.q}</h2>
              </div>

              <div className="space-y-4">
                <Button
                  variant={selectedChoice === "a1" ? "default" : "outline"}
                  size="lg"
                  className="w-full h-auto py-6 px-6 text-left justify-start text-lg"
                  onClick={() => {
                    setSelectedChoice("a1")
                    setTimeout(() => handleAnswer(currentQ.a1.tags), 300)
                  }}
                  disabled={isSaving}
                >
                  <span className="mr-3">A</span>
                  {currentQ.a1.text}
                </Button>

                <Button
                  variant={selectedChoice === "a2" ? "default" : "outline"}
                  size="lg"
                  className="w-full h-auto py-6 px-6 text-left justify-start text-lg"
                  onClick={() => {
                    setSelectedChoice("a2")
                    setTimeout(() => handleAnswer(currentQ.a2.tags), 300)
                  }}
                  disabled={isSaving}
                >
                  <span className="mr-3">B</span>
                  {currentQ.a2.text}
                </Button>
              </div>

              {isSaving && (
                <div className="text-center text-muted-foreground">
                  <p>결과를 분석하고 있어요...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

