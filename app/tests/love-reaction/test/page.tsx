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
    q: "썸이 시작됐을 때 연락은?",
    a1: { text: "먼저 톡하고 리드한다", tags: ["E", "J"] },
    a2: { text: "상대 기류를 보며 기다린다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "첫 데이트 장소를 고를 때?",
    a1: { text: "후기·동선·가격을 비교해 예약", tags: ["S", "T", "J"] },
    a2: { text: "분위기·감으로 즉석 결정", tags: ["N", "F", "P"] },
  },
  {
    id: 3,
    q: "대화의 톤은?",
    a1: { text: "직설적이고 핵심 위주", tags: ["T", "I"] },
    a2: { text: "공감하며 감정 위주", tags: ["F", "E"] },
  },
  {
    id: 4,
    q: "답장 속도가 늦어지면?",
    a1: { text: "이유를 묻고 기준을 합의", tags: ["J", "T"] },
    a2: { text: "상대 상황을 배려하며 기다림", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "기념일은?",
    a1: { text: "캘린더로 챙기며 미리 준비", tags: ["J", "S"] },
    a2: { text: "그날의 기분에 맞춰 유연하게", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "갈등이 생기면?",
    a1: { text: "사실·원인·해결책 순서로 정리", tags: ["T", "S"] },
    a2: { text: "마음 먼저 다독이고 대화", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "데이트 중 즉흥 제안이 나오면?",
    a1: { text: "일정 체크 후 가능하면 수용", tags: ["J", "S"] },
    a2: { text: "재미있으면 바로 진행", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "상대의 고민 상담에는?",
    a1: { text: "해결 팁·리소스를 제시", tags: ["T", "E"] },
    a2: { text: "감정 공감과 경청 위주", tags: ["F", "I"] },
  },
  {
    id: 9,
    q: "연애 중 개인 시간은?",
    a1: { text: "각자 시간을 명확히 구분", tags: ["I", "J"] },
    a2: { text: "상황에 따라 유동적으로", tags: ["E", "P"] },
  },
  {
    id: 10,
    q: "서프라이즈 이벤트에 대한 생각은?",
    a1: { text: "정보 파악 후 맞춤 설계", tags: ["S", "J"] },
    a2: { text: "영감이 오면 바로 실행", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "데이트 비용 정산은?",
    a1: { text: "원칙 정하고 공평하게", tags: ["T", "J"] },
    a2: { text: "분위기 따라 탄력적으로", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "미래 계획 이야기에서 당신은?",
    a1: { text: "현실성·타임라인을 검토", tags: ["S", "T"] },
    a2: { text: "가능성과 비전을 함께 그림", tags: ["N", "F"] },
  },
]

export default function LoveReactionTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "love-reaction",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/love-reaction/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/love-reaction/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("love-reaction")
  }, [])

  const handleAnswer = (choice: string[]) => {
    const newAnswers = [...answers, choice]
    setAnswers(newAnswers)
    setSelectedChoice("")

    if (currentQuestion < questions.length - 1) {
      trackTestProgress("love-reaction", currentQuestion + 1, questions.length)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const resultType = calculateMBTIResult(newAnswers)
      const answersRecord = convertAnswersToRecord(newAnswers)
      saveResult(answersRecord, resultType)
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

