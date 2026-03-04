"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "새 습관을 시작할 때", a1: { text: "매일 2분짜리 최소 행동부터", tags: ['S', 'J'] }, a2: { text: "완벽한 루틴을 한 번에 만든다", tags: ['N', 'P'] } },
  { id: 2, q: "3일 연속 실패했을 때", a1: { text: "기준을 낮춰 다시 붙인다", tags: ['F', 'P'] }, a2: { text: "처음 계획대로 다시 밀어붙인다", tags: ['T', 'J'] } },
  { id: 3, q: "습관 기록 방식은", a1: { text: "체크박스로 눈에 보이게", tags: ['S', 'J'] }, a2: { text: "느낌/메모로 유연하게", tags: ['N', 'F'] } },
  { id: 4, q: "바쁜 날 루틴은", a1: { text: "핵심 1개만 반드시 실행", tags: ['I', 'J'] }, a2: { text: "상황 봐서 건너뛴다", tags: ['E', 'P'] } },
  { id: 5, q: "동기 부여가 떨어지면", a1: { text: "보상 구조를 리셋한다", tags: ['F', 'N'] }, a2: { text: "강한 의지로 버틴다", tags: ['T', 'S'] } },
  { id: 6, q: "습관 시간 고정은", a1: { text: "같은 시간대에 붙인다", tags: ['J', 'S'] }, a2: { text: "하루 중 가능한 시간에", tags: ['P', 'N'] } },
  { id: 7, q: "중간 점검 주기는", a1: { text: "주간 회고로 조정", tags: ['I', 'T'] }, a2: { text: "감이 올 때만 점검", tags: ['E', 'F'] } },
  { id: 8, q: "연속 기록이 끊기면", a1: { text: "다음 행동을 즉시 예약", tags: ['J', 'T'] }, a2: { text: "분위기 회복 후 재개", tags: ['P', 'F'] } },
  { id: 9, q: "주변에 공유하는 편?", a1: { text: "책임감 위해 공유한다", tags: ['E', 'F'] }, a2: { text: "혼자 조용히 유지한다", tags: ['I', 'T'] } },
  { id: 10, q: "습관 우선순위", a1: { text: "건강/수면 같은 기반 습관", tags: ['S', 'F'] }, a2: { text: "성과 직결 습관부터", tags: ['N', 'T'] } },
  { id: 11, q: "도구 선택", a1: { text: "단순한 도구 1개 고정", tags: ['J', 'S'] }, a2: { text: "여러 앱을 실험", tags: ['P', 'N'] } },
  { id: 12, q: "장기 유지 전략", a1: { text: "작게 오래 가는 전략", tags: ['I', 'J'] }, a2: { text: "짧게 강하게 몰입", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "micro-habit-streak-type",
    questions,
    resultPath: "/tests/micro-habit-streak-type/test/result",
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
      colorClasses={getQuizColorScheme("orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
