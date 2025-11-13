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
    q: "첫 회에서 주인공이 갑자기 문제에 휘말렸다. 당신의 선택은?",
    a1: { text: "사람들을 모아 같이 해결한다", tags: ["E"] },
    a2: { text: "조용히 상황을 파악하고 움직인다", tags: ["I"] },
  },
  {
    id: 2,
    q: "단서가 모호할 때 당신의 접근은?",
    a1: { text: "보이는 사실부터 차근차근 확인", tags: ["S"] },
    a2: { text: "가능한 시나리오를 가설로 세움", tags: ["N"] },
  },
  {
    id: 3,
    q: "팀 내 갈등이 생겼다. 어떻게 중재할까?",
    a1: { text: "원칙과 기준으로 정리", tags: ["T"] },
    a2: { text: "감정과 관계를 먼저 다독임", tags: ["F"] },
  },
  {
    id: 4,
    q: "반전이 이어지는 전개에서 당신은?",
    a1: { text: "계획을 재정비하고 체크리스트를 만든다", tags: ["J"] },
    a2: { text: "상황에 맞춰 유연하게 대응", tags: ["P"] },
  },
  {
    id: 5,
    q: "첫 만남에서의 대사 톤은?",
    a1: { text: "직설적이고 핵심만 전달", tags: ["T"] },
    a2: { text: "상대가 편한 분위기를 만든다", tags: ["F"] },
  },
  {
    id: 6,
    q: "힌트를 찾으러 장소를 고른다면?",
    a1: { text: "실제 사건 현장, 기록 보관소", tags: ["S"] },
    a2: { text: "상징적인 장소, 의미 있는 연결고리", tags: ["N"] },
  },
  {
    id: 7,
    q: "위기 상황에서의 행동력은?",
    a1: { text: "주변과 공조해 바로 실행", tags: ["E"] },
    a2: { text: "한 템포 두고 혼자 판단", tags: ["I"] },
  },
  {
    id: 8,
    q: "로맨스 서브플롯이 붙었다. 당신은?",
    a1: { text: "현실적 조건과 타이밍을 본다", tags: ["T"] },
    a2: { text: "감정의 흐름과 신뢰를 본다", tags: ["F"] },
  },
  {
    id: 9,
    q: "범인을 좇는 방식은?",
    a1: { text: "증거를 축적해 좁혀간다", tags: ["J", "S"] },
    a2: { text: "패턴을 추론해 역으로 유인", tags: ["P", "N"] },
  },
  {
    id: 10,
    q: "결말을 향한 전략은?",
    a1: { text: "플랜 A/B/C를 설계", tags: ["J"] },
    a2: { text: "한 방의 변수로 판을 뒤집음", tags: ["P"] },
  },
  {
    id: 11,
    q: "동료가 실수했다. 당신의 피드백은?",
    a1: { text: "사실 중심으로 개선 포인트 제시", tags: ["T"] },
    a2: { text: "상황 공감 후 대안 제안", tags: ["F"] },
  },
  {
    id: 12,
    q: "시즌이 끝났다. 다음을 위해 남기는 건?",
    a1: { text: "교훈과 원칙을 정리한 노트", tags: ["J", "I"] },
    a2: { text: "새로운 떡밥과 가능성 리스트", tags: ["P", "E"] },
  },
]

export default function KdramaMatchTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "kdrama-match",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/kdrama-match/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/kdrama-match/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("kdrama-match")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("kdrama-match", currentQuestion + 1, questions.length)
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

    // Sum up tags from all answers (last answer gets 1.5x weight for tie-breaking)
    answers.forEach((answerTags, index) => {
      const weight = index === answers.length - 1 ? 1.5 : 1
      answerTags.forEach((tag) => {
        if (scores.hasOwnProperty(tag)) {
          scores[tag] += weight
        }
      })
    })

    // Determine MBTI type
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

