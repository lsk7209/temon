"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🎧 집중 시작 5분 전 나는", a1: { text: "할 일 범위를 수치로 확정", tags: ['I', 'J'] }, a2: { text: "분위기 세팅부터 빠르게", tags: ['E', 'P'] } },
  { id: 2, q: "알림이 계속 방해하면", a1: { text: "앱별 차단 규칙을 건다", tags: ['T', 'J'] }, a2: { text: "중요 연락만 남기고 유동 대응", tags: ['F', 'P'] } },
  { id: 3, q: "할 일이 막힐 때", a1: { text: "작업을 더 작은 단위로 쪼갠다", tags: ['S', 'T'] }, a2: { text: "다른 작업으로 흐름을 살린다", tags: ['N', 'P'] } },
  { id: 4, q: "집중 음악을 고를 때", a1: { text: "반복 가능한 플레이리스트 고정", tags: ['S', 'J'] }, a2: { text: "그날 기분에 맞춰 선택", tags: ['N', 'F'] } },
  { id: 5, q: "회의 후 다시 몰입할 때", a1: { text: "리캡 노트로 재진입", tags: ['I', 'J'] }, a2: { text: "바로 손이 가는 태스크부터", tags: ['E', 'P'] } },
  { id: 6, q: "집중 시간 배치는", a1: { text: "고난도 업무를 오전에", tags: ['J', 'T'] }, a2: { text: "에너지 오를 때 몰아서", tags: ['P', 'F'] } },
  { id: 7, q: "책상 정리는", a1: { text: "작업 도구만 남겨 둔다", tags: ['I', 'S'] }, a2: { text: "영감 주는 요소를 함께 둔다", tags: ['E', 'N'] } },
  { id: 8, q: "멀티태스킹 요청이 오면", a1: { text: "우선순위 재조정 후 응답", tags: ['T', 'J'] }, a2: { text: "지금 가능한 것부터 처리", tags: ['F', 'P'] } },
  { id: 9, q: "집중 기록을 남기는 방식", a1: { text: "시간·성과를 로그로 기록", tags: ['S', 'J'] }, a2: { text: "체감 몰입도를 메모", tags: ['N', 'F'] } },
  { id: 10, q: "슬럼프 날에는", a1: { text: "루틴 강도를 낮춰 유지", tags: ['I', 'J'] }, a2: { text: "환경을 바꿔 리프레시", tags: ['E', 'P'] } },
  { id: 11, q: "마감 직전 전략은", a1: { text: "핵심 산출물 완성 우선", tags: ['T', 'S'] }, a2: { text: "임팩트 큰 부분 집중", tags: ['F', 'N'] } },
  { id: 12, q: "하루 마무리 때", a1: { text: "내일 첫 집중 블록을 예약", tags: ['I', 'J'] }, a2: { text: "오늘 잘된 흐름만 체크", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "focus-mode-style", questions, resultPath: "/tests/focus-mode-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("blue"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
