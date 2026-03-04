"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "주간 계획", a1: { text: "주초에 블록 먼저 배치", tags: ['J', 'S'] }, a2: { text: "당일 아침에 재구성", tags: ['P', 'N'] } },
  { id: 2, q: "딥워크 블록", a1: { text: "고정 시간대 유지", tags: ['I', 'J'] }, a2: { text: "컨디션 따라 이동", tags: ['E', 'P'] } },
  { id: 3, q: "버퍼 시간", a1: { text: "이동/예상치 못한 일 포함", tags: ['S', 'T'] }, a2: { text: "필요하면 그때 확보", tags: ['N', 'F'] } },
  { id: 4, q: "회의 과다 시", a1: { text: "집중 블록을 보호", tags: ['T', 'J'] }, a2: { text: "유연하게 회의 수용", tags: ['F', 'P'] } },
  { id: 5, q: "개인 일정", a1: { text: "업무와 분리 관리", tags: ['J', 'S'] }, a2: { text: "하나의 캘린더로 통합", tags: ['P', 'N'] } },
  { id: 6, q: "미완료 업무", a1: { text: "다음 블록으로 재배치", tags: ['I', 'T'] }, a2: { text: "목록에서 우선순위 재조정", tags: ['E', 'F'] } },
  { id: 7, q: "알림 설정", a1: { text: "블록 시작/종료 알림", tags: ['S', 'J'] }, a2: { text: "핵심 일정만 알림", tags: ['N', 'P'] } },
  { id: 8, q: "예상 시간 오차", a1: { text: "실측 데이터로 보정", tags: ['T', 'S'] }, a2: { text: "감각으로 보정", tags: ['F', 'N'] } },
  { id: 9, q: "블록 길이", a1: { text: "작은 단위(30~60분)", tags: ['P', 'N'] }, a2: { text: "큰 단위(2~3시간)", tags: ['J', 'S'] } },
  { id: 10, q: "우선순위 충돌", a1: { text: "목표 기준 재배치", tags: ['T', 'J'] }, a2: { text: "관계/상황 우선", tags: ['F', 'P'] } },
  { id: 11, q: "회고", a1: { text: "캘린더 사용률 점검", tags: ['N', 'T'] }, a2: { text: "완료된 결과만 점검", tags: ['S', 'F'] } },
  { id: 12, q: "운영 철학", a1: { text: "예측 가능성 최대화", tags: ['I', 'J'] }, a2: { text: "유연성 최대화", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "calendar-blocking-type",
    questions,
    resultPath: "/tests/calendar-blocking-type/test/result",
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
      colorClasses={getQuizColorScheme("green")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
