"use client"

/**
 * Component: LoveReactionTest
 * 연애 반응 테스트 페이지
 * @example <LoveReactionTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "썸이 시작됐을 때 연락할 때",
    a1: { text: "먼저 톡하고 리드한다", tags: ["E", "J"] },
    a2: { text: "상대 기류를 보며 기다린다", tags: ["I", "P"] },
  },
  {
    id: 2,
    q: "첫 데이트 장소를 고를 때",
    a1: { text: "후기, 동선, 가격을 비교해 예약한다", tags: ["S", "T", "J"] },
    a2: { text: "분위기와 감으로 즉석 결정한다", tags: ["N", "F", "P"] },
  },
  {
    id: 3,
    q: "연애 중 대화 톤을 정할 때",
    a1: { text: "직설적이고 핵심 위주로 대화한다", tags: ["T", "I"] },
    a2: { text: "공감하며 감정 위주로 대화한다", tags: ["F", "E"] },
  },
  {
    id: 4,
    q: "답장 속도가 늦어졌을 때",
    a1: { text: "이유를 묻고 기준을 합의한다", tags: ["J", "T"] },
    a2: { text: "상대 상황을 배려하며 기다린다", tags: ["P", "F"] },
  },
  {
    id: 5,
    q: "기념일을 준비할 때",
    a1: { text: "캘린더로 챙기며 미리 준비한다", tags: ["J", "S"] },
    a2: { text: "그날의 기분에 맞춰 유연하게 준비한다", tags: ["P", "N"] },
  },
  {
    id: 6,
    q: "연애 중 갈등이 생겼을 때",
    a1: { text: "사실, 원인, 해결책 순서로 정리한다", tags: ["T", "S"] },
    a2: { text: "마음 먼저 다독이고 대화한다", tags: ["F", "N"] },
  },
  {
    id: 7,
    q: "데이트 중 즉흥 제안이 나왔을 때",
    a1: { text: "일정을 체크한 후 가능하면 수용한다", tags: ["J", "S"] },
    a2: { text: "재미있으면 바로 진행한다", tags: ["P", "N"] },
  },
  {
    id: 8,
    q: "상대의 고민 상담을 받을 때",
    a1: { text: "해결 팁과 리소스를 제시한다", tags: ["T", "E"] },
    a2: { text: "감정 공감과 경청을 위주로 한다", tags: ["F", "I"] },
  },
  {
    id: 9,
    q: "연애 중 개인 시간을 정할 때",
    a1: { text: "각자 시간을 명확히 구분한다", tags: ["I", "J"] },
    a2: { text: "상황에 따라 유동적으로 정한다", tags: ["E", "P"] },
  },
  {
    id: 10,
    q: "서프라이즈 이벤트를 준비할 때",
    a1: { text: "정보를 파악한 후 맞춤 설계한다", tags: ["S", "J"] },
    a2: { text: "영감이 오면 바로 실행한다", tags: ["N", "P"] },
  },
  {
    id: 11,
    q: "데이트 비용을 정산할 때",
    a1: { text: "원칙을 정하고 공평하게 정산한다", tags: ["T", "J"] },
    a2: { text: "분위기에 따라 탄력적으로 정산한다", tags: ["F", "P"] },
  },
  {
    id: 12,
    q: "미래 계획을 이야기할 때",
    a1: { text: "현실성과 타임라인을 검토한다", tags: ["S", "T"] },
    a2: { text: "가능성과 비전을 함께 그린다", tags: ["N", "F"] },
  },
]

export default function LoveReactionTest() {
  const quizLogic = useQuizLogic({
    testId: "love-reaction",
    questions,
    resultPath: "/tests/love-reaction/test/result",
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
      colorClasses={getQuizColorScheme("rose-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
