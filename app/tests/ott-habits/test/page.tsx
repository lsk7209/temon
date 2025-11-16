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
    q: "OTT 신작 공개 당일",
    a1: { text: "친구들과 바로 얘기하며 본다", tags: ["E"] },
    a2: { text: "혼자 조용히 감상한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "시청 리스트를 만들 때?",
    a1: { text: "장르·평점·러닝타임을 정리", tags: ["S", "J"] },
    a2: { text: "느낌 오는 것 위주로 북마크", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "OTT에서 드라마 재생 속도를 정할 때",
    a1: { text: "기본 속도로 디테일을 놓치기 싫어한다", tags: ["S", "T"] },
    a2: { text: "상황에 따라 가속하고 리듬이 중요하다", tags: ["N", "F"] },
  },
  {
    id: 4,
    q: "추천 알고리즘이 낯선 작품을 권하면?",
    a1: { text: "정보 검색으로 검증 후 시청", tags: ["T", "J"] },
    a2: { text: "먼저 틀어보고 느낌으로 판단", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "드라마를 정주행할 때",
    a1: { text: "매일 같은 시간에 일정량씩 본다", tags: ["J", "I"] },
    a2: { text: "주말 몰아보기로 한 번에 본다", tags: ["P", "E"] },
  },
  {
    id: 6,
    q: "시청 중 메시지가 오면?",
    a1: { text: "일시정지하고 답장 후 재생", tags: ["J", "T"] },
    a2: { text: "나중에 답장, 흐름을 중시", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "OTT에서 드라마 장르를 선택할 때",
    a1: { text: "검증된 시리즈나 제작진 위주로 선택한다", tags: ["S", "T"] },
    a2: { text: "새로운 세계관이나 아이디어로 선택한다", tags: ["N", "F"] },
  },
  {
    id: 8,
    q: "드라마를 보다가 스포일러를 마주했을 때",
    a1: { text: "철저히 차단하고 규칙을 세운다", tags: ["J", "I"] },
    a2: { text: "가벼운 스포는 괜찮다고 생각한다", tags: ["P", "E"] },
  },
  {
    id: 9,
    q: "드라마를 시청한 후 기록을 남길 때",
    a1: { text: "평점, 노트, 좋았던 씬을 저장한다", tags: ["S", "J"] },
    a2: { text: "인상적인 감정만 기억한다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "친구가 추천을 부탁하면?",
    a1: { text: "취향 파악 후 맞춤 큐레이션", tags: ["T", "E"] },
    a2: { text: "내가 좋아한 작품을 공유", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "완결 전 공개작을 볼 때",
    a1: { text: "완결 후 안정적으로 본다", tags: ["J", "S"] },
    a2: { text: "주차별로 설렘도 즐긴다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "퇴근 후 피곤한 날에 OTT를 선택할 때",
    a1: { text: "익숙한 작품을 재탕해서 회복한다", tags: ["S", "I"] },
    a2: { text: "짧은 하이라이트나 클립을 탐색한다", tags: ["N", "E"] },
  },
]

export default function OTTHabitsTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "ott-habits",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/ott-habits/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/ott-habits/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("ott-habits")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("ott-habits", currentQuestion + 1, questions.length)
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

