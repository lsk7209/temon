"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "퇴근 직후", a1: { text: "리셋 루틴 먼저", tags: ['J', 'I'] }, a2: { text: "바로 쉬는 모드", tags: ['P', 'E'] } },
  { id: 2, q: "저녁 식사 후", a1: { text: "짧은 정리 타임", tags: ['T', 'J'] }, a2: { text: "콘텐츠/휴식 먼저", tags: ['F', 'P'] } },
  { id: 3, q: "수면 준비", a1: { text: "취침 역산 루틴", tags: ['S', 'J'] }, a2: { text: "졸릴 때까지 유연", tags: ['N', 'P'] } },
  { id: 4, q: "피로한 날", a1: { text: "최소 루틴만 유지", tags: ['I', 'F'] }, a2: { text: "그날은 완전 휴식", tags: ['E', 'P'] } },
  { id: 5, q: "디지털 사용", a1: { text: "시간 제한 설정", tags: ['J', 'T'] }, a2: { text: "상황 따라 사용", tags: ['P', 'F'] } },
  { id: 6, q: "다음날 준비", a1: { text: "옷/할 일 미리 세팅", tags: ['S', 'J'] }, a2: { text: "아침에 결정", tags: ['N', 'P'] } },
  { id: 7, q: "운동/스트레칭", a1: { text: "짧아도 매일", tags: ['I', 'J'] }, a2: { text: "주 2~3회 몰아서", tags: ['E', 'P'] } },
  { id: 8, q: "감정 정리", a1: { text: "일기/메모 작성", tags: ['I', 'F'] }, a2: { text: "대화/콘텐츠로 해소", tags: ['E', 'N'] } },
  { id: 9, q: "야식 유혹", a1: { text: "대체 루틴 실행", tags: ['T', 'J'] }, a2: { text: "기분 따라 허용", tags: ['F', 'P'] } },
  { id: 10, q: "주중 리셋 목표", a1: { text: "지속 가능한 회복", tags: ['S', 'T'] }, a2: { text: "오늘의 만족감", tags: ['N', 'F'] } },
  { id: 11, q: "방 정리", a1: { text: "수면 전 간단 정리", tags: ['J', 'S'] }, a2: { text: "아침에 정리", tags: ['P', 'N'] } },
  { id: 12, q: "핵심 가치", a1: { text: "내일 컨디션 최적화", tags: ['I', 'J'] }, a2: { text: "오늘 스트레스 해소", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "weeknight-reset-type",
    questions,
    resultPath: "/tests/weeknight-reset-type/test/result",
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
