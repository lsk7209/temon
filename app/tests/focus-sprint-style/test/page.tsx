"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "집중 세션 길이", a1: { text: "짧은 스프린트 반복", tags: ['P', 'N'] }, a2: { text: "긴 몰입 세션 선호", tags: ['J', 'S'] } },
  { id: 2, q: "시작 신호", a1: { text: "타이머/체크리스트", tags: ['J', 'T'] }, a2: { text: "기분/에너지 타이밍", tags: ['P', 'F'] } },
  { id: 3, q: "방해 요소", a1: { text: "환경을 먼저 정리", tags: ['S', 'J'] }, a2: { text: "작업 중 유연 대응", tags: ['N', 'P'] } },
  { id: 4, q: "세션 목표", a1: { text: "정량 목표 명확화", tags: ['T', 'J'] }, a2: { text: "탐색 목표 유연화", tags: ['F', 'P'] } },
  { id: 5, q: "휴식 길이", a1: { text: "고정된 짧은 휴식", tags: ['I', 'J'] }, a2: { text: "상태 따라 조절", tags: ['E', 'P'] } },
  { id: 6, q: "멀티태스킹", a1: { text: "단일 작업 고정", tags: ['T', 'S'] }, a2: { text: "연관 작업 병행", tags: ['F', 'N'] } },
  { id: 7, q: "중단 후 복귀", a1: { text: "재시작 체크포인트", tags: ['J', 'T'] }, a2: { text: "감으로 흐름 복구", tags: ['P', 'F'] } },
  { id: 8, q: "성과 측정", a1: { text: "완료량/시간 기록", tags: ['S', 'T'] }, a2: { text: "체감 몰입도 기록", tags: ['N', 'F'] } },
  { id: 9, q: "도구 사용", a1: { text: "한 도구 집중", tags: ['I', 'J'] }, a2: { text: "도구 실험 병행", tags: ['E', 'P'] } },
  { id: 10, q: "마감 압박", a1: { text: "세션 수를 재배분", tags: ['J', 'S'] }, a2: { text: "속도 모드로 전환", tags: ['P', 'N'] } },
  { id: 11, q: "루틴 유지", a1: { text: "주간 패턴 고정", tags: ['I', 'J'] }, a2: { text: "상황별 패턴 변경", tags: ['E', 'P'] } },
  { id: 12, q: "핵심 목표", a1: { text: "지속 가능한 집중력", tags: ['I', 'F'] }, a2: { text: "단기 최대치 성과", tags: ['E', 'T'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "focus-sprint-style",
    questions,
    resultPath: "/tests/focus-sprint-style/test/result",
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
      colorClasses={getQuizColorScheme("blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
