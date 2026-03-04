"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🌅 눈 뜨자마자 하는 첫 행동은", a1: { text: "물 한 잔과 스트레칭", tags: ['S', 'J'] }, a2: { text: "휴대폰으로 기분 체크", tags: ['N', 'P'] } },
  { id: 2, q: "아침 컨디션이 무거우면", a1: { text: "고정 루틴으로 몸을 깨운다", tags: ['I', 'J'] }, a2: { text: "그날 맞춤으로 가볍게 시작", tags: ['E', 'P'] } },
  { id: 3, q: "아침 햇빛 활용은", a1: { text: "정해진 시간에 꼭 쬔다", tags: ['S', 'J'] }, a2: { text: "가능할 때 유연하게 챙긴다", tags: ['N', 'P'] } },
  { id: 4, q: "커피 타이밍은", a1: { text: "식사/수분 후에 마신다", tags: ['T', 'J'] }, a2: { text: "졸리면 바로 마신다", tags: ['F', 'P'] } },
  { id: 5, q: "출근·등교 전 준비는", a1: { text: "전날 밤에 대부분 끝낸다", tags: ['I', 'J'] }, a2: { text: "아침 현장감으로 해결", tags: ['E', 'P'] } },
  { id: 6, q: "아침 식사는", a1: { text: "에너지 지속형 메뉴 선택", tags: ['S', 'T'] }, a2: { text: "기분 당기는 메뉴 선택", tags: ['N', 'F'] } },
  { id: 7, q: "지각 위험이 생기면", a1: { text: "우선순위대로 빠르게 압축", tags: ['T', 'J'] }, a2: { text: "분위기 덜 망치는 선택", tags: ['F', 'P'] } },
  { id: 8, q: "아침 음악/콘텐츠는", a1: { text: "집중 높이는 고정 큐", tags: ['I', 'S'] }, a2: { text: "기분 끌어올리는 랜덤 큐", tags: ['E', 'N'] } },
  { id: 9, q: "오전 10시쯤 처지면", a1: { text: "짧은 리셋 루틴 실행", tags: ['J', 'S'] }, a2: { text: "자리 이동으로 분위기 전환", tags: ['P', 'N'] } },
  { id: 10, q: "아침 계획 실패 시", a1: { text: "원인을 기록해 수정", tags: ['T', 'J'] }, a2: { text: "내일 새로 리셋", tags: ['F', 'P'] } },
  { id: 11, q: "주말 아침 패턴은", a1: { text: "평일과 비슷하게 유지", tags: ['I', 'J'] }, a2: { text: "완전히 다르게 쉰다", tags: ['E', 'P'] } },
  { id: 12, q: "좋은 아침을 만들 핵심은", a1: { text: "지속 가능한 습관", tags: ['S', 'T'] }, a2: { text: "기분 좋은 시작감", tags: ['N', 'F'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "morning-energy-reset", questions, resultPath: "/tests/morning-energy-reset/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("orange"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
