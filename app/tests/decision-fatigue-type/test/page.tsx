"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "하루 첫 결정은", a1: { text: "전날 미리 정해둔다", tags: ['J', 'S'] }, a2: { text: "아침 컨디션 보고 정한다", tags: ['P', 'N'] } },
  { id: 2, q: "메뉴 고를 때", a1: { text: "옵션을 2개로 줄인다", tags: ['T', 'J'] }, a2: { text: "여러 옵션을 끝까지 본다", tags: ['F', 'P'] } },
  { id: 3, q: "업무 우선순위", a1: { text: "중요도/긴급도로 자른다", tags: ['S', 'T'] }, a2: { text: "에너지 높은 일부터", tags: ['N', 'F'] } },
  { id: 4, q: "비슷한 선택이 반복되면", a1: { text: "템플릿 규칙을 만든다", tags: ['J', 'S'] }, a2: { text: "그때마다 새롭게 고른다", tags: ['P', 'N'] } },
  { id: 5, q: "결정 후 후회가 오면", a1: { text: "근거를 다시 확인", tags: ['T', 'I'] }, a2: { text: "감정적으로 재평가", tags: ['F', 'E'] } },
  { id: 6, q: "쇼핑할 때", a1: { text: "예산 한도를 먼저 잠근다", tags: ['J', 'T'] }, a2: { text: "마음에 들면 유연하게", tags: ['P', 'F'] } },
  { id: 7, q: "메시지 답장 순서", a1: { text: "규칙대로 묶어서 처리", tags: ['I', 'J'] }, a2: { text: "급한 것부터 즉시", tags: ['E', 'P'] } },
  { id: 8, q: "일정 충돌이 나면", a1: { text: "핵심 목표 기준 재배치", tags: ['T', 'S'] }, a2: { text: "사람 관계 중심 재조정", tags: ['F', 'N'] } },
  { id: 9, q: "결정 속도", a1: { text: "충분히 비교 후 확정", tags: ['I', 'T'] }, a2: { text: "빠르게 결정 후 보정", tags: ['E', 'P'] } },
  { id: 10, q: "선택 피로 해소법", a1: { text: "선택 자체를 줄인다", tags: ['S', 'J'] }, a2: { text: "휴식 후 다시 선택", tags: ['N', 'F'] } },
  { id: 11, q: "장기 계획 결정", a1: { text: "데이터/기록 기반", tags: ['T', 'S'] }, a2: { text: "직관/감각 기반", tags: ['F', 'N'] } },
  { id: 12, q: "하루 마감", a1: { text: "내일 결정할 것 미리 예약", tags: ['J', 'I'] }, a2: { text: "내일 아침에 다시 본다", tags: ['P', 'E'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "decision-fatigue-type",
    questions,
    resultPath: "/tests/decision-fatigue-type/test/result",
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
      colorClasses={getQuizColorScheme("purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
