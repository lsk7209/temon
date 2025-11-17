"use client"

/**
 * Component: KdramaCharacterTest
 * 드라마 캐릭터 테스트 페이지
 * @example <KdramaCharacterTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "새로운 직장에서 첫날",
    a1: { text: "먼저 다가가 인사하고 분위기를 이끈다", tags: ["E"] },
    a2: { text: "조용히 파악하며 필요한 말만 한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "의문의 단서를 발견했을 때",
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
    q: "대형 프로젝트 기한이 다가올 때",
    a1: { text: "계획표대로 차근차근 마무리한다", tags: ["J"] },
    a2: { text: "몰입될 때 집중해서 끝낸다", tags: ["P"] },
  },
  {
    id: 5,
    q: "첫 만남에서 호감인 사람에게?",
    a1: { text: "가볍게 대화 주도하며 연락처 교환", tags: ["E"] },
    a2: { text: "상대의 반응을 보며 기회를 기다림", tags: ["I"] },
  },
  {
    id: 6,
    q: "사건 해결팀에 합류했을 때",
    a1: { text: "현장 기록과 체크리스트를 담당한다", tags: ["S"] },
    a2: { text: "가설 제시와 전략 설계를 담당한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "갈등이 격해졌을 때 중재할 때",
    a1: { text: "원칙과 규칙으로 공정하게 정리한다", tags: ["T"] },
    a2: { text: "상처 받지 않게 말의 온도를 낮춘다", tags: ["F"] },
  },
  {
    id: 8,
    q: "로맨스 전개에서 행동할 때",
    a1: { text: "타이밍을 잡아 고백 플랜을 실행한다", tags: ["J"] },
    a2: { text: "상황을 즐기며 자연스럽게 흐른다", tags: ["P"] },
  },
  {
    id: 9,
    q: "뜻밖의 기회가 왔을 때",
    a1: { text: "데이터와 사실을 기반으로 판단한다", tags: ["S", "T"] },
    a2: { text: "가능성과 감정의 방향을 본다", tags: ["N", "F"] },
  },
  {
    id: 10,
    q: "팀이 난관에 빠졌을 때",
    a1: { text: "우선순위를 재정렬하고 역할을 분담한다", tags: ["J", "T"] },
    a2: { text: "새로운 길을 열 아이디어를 제안한다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "증거가 부족한 용의자를 대할 때",
    a1: { text: "더 조사해 확증 후 움직인다", tags: ["S", "J"] },
    a2: { text: "정황을 조합해 심리전을 시도한다", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "엔딩에서 남기고 싶은 것",
    a1: { text: "완결된 정의와 안정", tags: ["T", "J"] },
    a2: { text: "성장과 새로운 시작", tags: ["F", "P"] },
  },
]

// 커스텀 MBTI 계산 함수 (마지막 4개 답변에 1.5x 가중치 적용)
function calculateMBTIResult(answers: string[][]): string {
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

  // 마지막 4개 답변에 1.5x 가중치 적용
  const lastFourStartIndex = Math.max(0, answers.length - 4)
  answers.forEach((answerTags, index) => {
    const weight = index >= lastFourStartIndex ? 1.5 : 1
    answerTags.forEach((tag) => {
      if (scores.hasOwnProperty(tag)) {
        scores[tag] += weight
      }
    })
  })

  // MBTI 타입 결정
  const eScore = scores.E
  const iScore = scores.I
  const sScore = scores.S
  const nScore = scores.N
  const tScore = scores.T
  const fScore = scores.F
  const jScore = scores.J
  const pScore = scores.P

  // 동점 처리: 마지막 답변의 태그 우선
  const lastAnswer = answers[answers.length - 1] || []
  const firstLetter = eScore > iScore ? "E" : eScore < iScore ? "I" : lastAnswer.includes("E") ? "E" : "I"
  const secondLetter = sScore > nScore ? "S" : sScore < nScore ? "N" : lastAnswer.includes("S") ? "S" : "N"
  const thirdLetter = tScore > fScore ? "T" : tScore < fScore ? "F" : lastAnswer.includes("T") ? "T" : "F"
  const fourthLetter = jScore > pScore ? "J" : jScore < pScore ? "P" : lastAnswer.includes("J") ? "J" : "P"

  return firstLetter + secondLetter + thirdLetter + fourthLetter
}

export default function KdramaCharacterTest() {
  const quizLogic = useQuizLogic({
    testId: "kdrama-character",
    questions,
    resultPath: "/tests/kdrama-character/test/result",
    calculateResult: calculateMBTIResult,
  })

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("blue-green")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
