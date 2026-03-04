"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "출발 전 준비", a1: { text: "체크리스트 사전 완성", tags: ['J', 'S'] }, a2: { text: "당일에 빠르게 챙김", tags: ['P', 'N'] } },
  { id: 2, q: "짐 구성", a1: { text: "필수/보조로 계층화", tags: ['T', 'J'] }, a2: { text: "현지 조달 전제 최소화", tags: ['F', 'P'] } },
  { id: 3, q: "서류 관리", a1: { text: "여권/예약증 디지털+실물", tags: ['S', 'J'] }, a2: { text: "필요한 것만 최소", tags: ['N', 'P'] } },
  { id: 4, q: "날씨 변수", a1: { text: "예비 플랜 포함", tags: ['J', 'T'] }, a2: { text: "현지에서 유연 대응", tags: ['P', 'F'] } },
  { id: 5, q: "짐 누락 발견", a1: { text: "체크포인트 즉시 점검", tags: ['S', 'T'] }, a2: { text: "현장 대체안 탐색", tags: ['N', 'F'] } },
  { id: 6, q: "공항 이동", a1: { text: "버퍼 시간 넉넉히", tags: ['I', 'J'] }, a2: { text: "정시 도착 목표", tags: ['E', 'P'] } },
  { id: 7, q: "의류 선택", a1: { text: "코디 조합 미리 세팅", tags: ['S', 'J'] }, a2: { text: "상황별 즉흥 선택", tags: ['N', 'P'] } },
  { id: 8, q: "전자기기", a1: { text: "충전/어댑터 우선 점검", tags: ['T', 'S'] }, a2: { text: "필요시 구매 전제", tags: ['F', 'N'] } },
  { id: 9, q: "동행자와 역할", a1: { text: "체크리스트 분담", tags: ['E', 'T'] }, a2: { text: "각자 자유 준비", tags: ['I', 'F'] } },
  { id: 10, q: "귀국 후 정리", a1: { text: "리스트 업데이트", tags: ['J', 'I'] }, a2: { text: "기억나는 것만 반영", tags: ['P', 'E'] } },
  { id: 11, q: "준비 도구", a1: { text: "한 앱/문서 고정", tags: ['S', 'J'] }, a2: { text: "여러 도구 혼합", tags: ['N', 'P'] } },
  { id: 12, q: "목표", a1: { text: "실수 없는 안정 여행", tags: ['I', 'T'] }, a2: { text: "유연한 경험 여행", tags: ['E', 'F'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "travel-checklist-type",
    questions,
    resultPath: "/tests/travel-checklist-type/test/result",
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
