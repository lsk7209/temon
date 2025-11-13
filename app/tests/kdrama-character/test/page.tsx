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
    q: "새로운 직장에서 첫날, 당신의 모습은?",
    a1: { text: "먼저 다가가 인사하고 분위기를 이끈다", tags: ["E"] },
    a2: { text: "조용히 파악하며 필요한 말만 한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "의문의 단서를 발견했다. 당신의 선택은?",
    a1: { text: "확실한 증거부터 모은다", tags: ["S"] },
    a2: { text: "패턴을 추론해 큰 그림을 세운다", tags: ["N"] },
  },
  {
    id: 3,
    q: "친구가 잘못했다. 어떻게 말할까?",
    a1: { text: "사실과 논리로 차분히 설명한다", tags: ["T"] },
    a2: { text: "감정을 먼저 공감하고 부탁한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "대형 프로젝트 기한이 다가온다. 스타일은?",
    a1: { text: "계획표대로 차근차근 마무리", tags: ["J"] },
    a2: { text: "몰입될 때 집중해 끝내는 편", tags: ["P"] },
  },
  {
    id: 5,
    q: "첫 만남에서 호감인 사람에게?",
    a1: { text: "가볍게 대화 주도하며 연락처 교환", tags: ["E"] },
    a2: { text: "상대의 반응을 보며 기회를 기다림", tags: ["I"] },
  },
  {
    id: 6,
    q: "사건 해결팀에 합류했다. 당신의 역할은?",
    a1: { text: "현장 기록·체크리스트 담당", tags: ["S"] },
    a2: { text: "가설 제시·전략 설계 담당", tags: ["N"] },
  },
  {
    id: 7,
    q: "갈등이 격해졌다. 중재할 때는?",
    a1: { text: "원칙·규칙으로 공정하게 정리", tags: ["T"] },
    a2: { text: "상처 받지 않게 말의 온도를 낮춤", tags: ["F"] },
  },
  {
    id: 8,
    q: "로맨스 전개에서 당신은?",
    a1: { text: "타이밍을 잡아 고백 플랜 실행", tags: ["J"] },
    a2: { text: "상황을 즐기며 자연스럽게 흐름", tags: ["P"] },
  },
  {
    id: 9,
    q: "뜻밖의 기회가 왔다. 결정 방식은?",
    a1: { text: "데이터·사실 기반 판단", tags: ["S", "T"] },
    a2: { text: "가능성과 감정의 방향을 본다", tags: ["N", "F"] },
  },
  {
    id: 10,
    q: "팀이 난관에 빠졌다. 당신의 한 마디는?",
    a1: { text: "우선순위 재정렬하고 역할 분담", tags: ["J", "T"] },
    a2: { text: "새로운 길을 열 아이디어 제안", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "증거가 부족한 용의자. 당신은?",
    a1: { text: "더 조사해 확증 후 움직임", tags: ["S", "J"] },
    a2: { text: "정황을 조합해 심리전 시도", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "엔딩에서 당신이 남기는 것은?",
    a1: { text: "완결된 정의와 안정", tags: ["T", "J"] },
    a2: { text: "성장과 새로운 시작", tags: ["F", "P"] },
  },
]

export default function KdramaCharacterTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const router = useRouter()
  const { saveResult, isSaving } = useTestResult({
    testId: "kdrama-character",
    onSuccess: (resultId, resultType) => {
      router.push(`/tests/kdrama-character/test/result?type=${resultType}&id=${resultId}`)
    },
    onError: (error, resultType) => {
      console.error("결과 저장 실패:", error)
      router.push(`/tests/kdrama-character/test/result?type=${resultType}`)
    },
  })

  useEffect(() => {
    trackTestStart("kdrama-character")
  }, [])

  // 진행률 추적
  useEffect(() => {
    if (currentQuestion > 0) {
      trackTestProgress("kdrama-character", currentQuestion + 1, questions.length)
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

    // Sum up tags from all answers (last 4 answers get 1.5x weight for tie-breaking)
    const lastFourStartIndex = Math.max(0, answers.length - 4)
    answers.forEach((answerTags, index) => {
      const weight = index >= lastFourStartIndex ? 1.5 : 1
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

