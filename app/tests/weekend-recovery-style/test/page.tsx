"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🛌 토요일 아침 시작은", a1: { text: "충분한 수면으로 회복", tags: ['I', 'S'] }, a2: { text: "가벼운 외출로 리셋", tags: ['E', 'N'] } },
  { id: 2, q: "주말 계획을 세울 때", a1: { text: "휴식과 할 일을 배치", tags: ['J', 'T'] }, a2: { text: "기분 따라 유동적으로", tags: ['P', 'F'] } },
  { id: 3, q: "피곤이 누적됐을 때", a1: { text: "몸 상태 체크 후 조절", tags: ['S', 'J'] }, a2: { text: "하고 싶은 일로 기분 전환", tags: ['N', 'P'] } },
  { id: 4, q: "운동을 넣는 방식은", a1: { text: "짧아도 루틴 유지", tags: ['I', 'J'] }, a2: { text: "컨디션 좋은 날 몰아서", tags: ['E', 'P'] } },
  { id: 5, q: "사회적 약속이 많아지면", a1: { text: "회복 시간을 먼저 확보", tags: ['T', 'J'] }, a2: { text: "사람 에너지로 충전", tags: ['F', 'P'] } },
  { id: 6, q: "집안일 처리 방식은", a1: { text: "시간 블록으로 끝낸다", tags: ['S', 'T'] }, a2: { text: "틈날 때 나눠서 한다", tags: ['N', 'F'] } },
  { id: 7, q: "주말 콘텐츠 소비는", a1: { text: "머리 비우는 가벼운 것", tags: ['I', 'F'] }, a2: { text: "영감 주는 새로운 것", tags: ['E', 'N'] } },
  { id: 8, q: "일요일 저녁이 되면", a1: { text: "다음 주 준비를 시작", tags: ['J', 'S'] }, a2: { text: "마지막 휴식을 더 누린다", tags: ['P', 'N'] } },
  { id: 9, q: "회복 체감이 낮을 때", a1: { text: "수면·식사부터 재점검", tags: ['T', 'S'] }, a2: { text: "일정 밀도를 줄여본다", tags: ['F', 'N'] } },
  { id: 10, q: "디지털 디톡스는", a1: { text: "정해둔 시간에 시행", tags: ['I', 'J'] }, a2: { text: "필요할 때 즉시 오프", tags: ['E', 'P'] } },
  { id: 11, q: "월요일 불안을 줄이는 법은", a1: { text: "체크리스트 준비", tags: ['T', 'J'] }, a2: { text: "긍정 루틴으로 마음 세팅", tags: ['F', 'P'] } },
  { id: 12, q: "이상적인 주말은", a1: { text: "안정적으로 회복되는 주말", tags: ['S', 'J'] }, a2: { text: "활력과 재미가 살아나는 주말", tags: ['N', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "weekend-recovery-style", questions, resultPath: "/tests/weekend-recovery-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("teal"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
