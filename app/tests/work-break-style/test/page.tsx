"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "집중 1세션 길이", a1: { text: "25~50분 고정", tags: ['J', 'S'] }, a2: { text: "상황 따라 유동", tags: ['P', 'N'] } },
  { id: 2, q: "휴식 시작 신호", a1: { text: "타이머가 울리면 즉시", tags: ['T', 'J'] }, a2: { text: "몰입이 끝나는 지점", tags: ['F', 'P'] } },
  { id: 3, q: "쉬는 시간 활동", a1: { text: "스트레칭/물 마시기", tags: ['S', 'I'] }, a2: { text: "SNS/짧은 콘텐츠", tags: ['N', 'E'] } },
  { id: 4, q: "휴식 후 복귀", a1: { text: "다음 할 일 1줄 작성", tags: ['J', 'T'] }, a2: { text: "기분 전환 후 자연 복귀", tags: ['P', 'F'] } },
  { id: 5, q: "오후 피로 타임", a1: { text: "짧은 파워브레이크", tags: ['F', 'N'] }, a2: { text: "카페인/자극으로 버팀", tags: ['T', 'S'] } },
  { id: 6, q: "회의 사이 공백", a1: { text: "정리 메모를 남긴다", tags: ['I', 'J'] }, a2: { text: "바로 다음 업무로 이동", tags: ['E', 'P'] } },
  { id: 7, q: "알림 처리", a1: { text: "휴식 시간에만 확인", tags: ['J', 'I'] }, a2: { text: "수시로 확인", tags: ['P', 'E'] } },
  { id: 8, q: "긴 프로젝트 중", a1: { text: "휴식 루틴 고정", tags: ['S', 'J'] }, a2: { text: "진행도 따라 조정", tags: ['N', 'P'] } },
  { id: 9, q: "휴식 실패 시", a1: { text: "다음 세션 길이 조절", tags: ['F', 'T'] }, a2: { text: "의지로 계속 진행", tags: ['T', 'J'] } },
  { id: 10, q: "동료와 휴식", a1: { text: "가끔 같이 리프레시", tags: ['E', 'F'] }, a2: { text: "혼자 조용히 리셋", tags: ['I', 'T'] } },
  { id: 11, q: "주간 회고", a1: { text: "휴식 품질도 기록", tags: ['N', 'F'] }, a2: { text: "성과만 기록", tags: ['S', 'T'] } },
  { id: 12, q: "목표", a1: { text: "지치지 않게 오래 가기", tags: ['I', 'F'] }, a2: { text: "짧게 강하게 끝내기", tags: ['E', 'T'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "work-break-style",
    questions,
    resultPath: "/tests/work-break-style/test/result",
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
