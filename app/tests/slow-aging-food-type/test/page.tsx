"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🥗 장보기에서 가장 먼저 보는 것은", a1: { text: "원재료·영양 성분", tags: ['S', 'T'] }, a2: { text: "먹고 싶은 메뉴 영감", tags: ['N', 'F'] } },
  { id: 2, q: "식단을 짤 때", a1: { text: "주간 단위로 계획", tags: ['I', 'J'] }, a2: { text: "그날 컨디션에 맞춤", tags: ['E', 'P'] } },
  { id: 3, q: "단백질 섭취는", a1: { text: "끼니마다 분산해서", tags: ['J', 'S'] }, a2: { text: "하루 총량만 맞추면 OK", tags: ['P', 'N'] } },
  { id: 4, q: "간식 선택 기준은", a1: { text: "혈당 급상승 최소화", tags: ['T', 'J'] }, a2: { text: "스트레스 완화 우선", tags: ['F', 'P'] } },
  { id: 5, q: "외식 메뉴를 고를 때", a1: { text: "조리법과 재료를 본다", tags: ['S', 'T'] }, a2: { text: "만족도 높은 메뉴를 고른다", tags: ['N', 'F'] } },
  { id: 6, q: "물 섭취 관리는", a1: { text: "시간대별로 챙긴다", tags: ['I', 'J'] }, a2: { text: "목마를 때 유연하게", tags: ['E', 'P'] } },
  { id: 7, q: "야식 유혹이 오면", a1: { text: "대체 간식으로 전환", tags: ['T', 'S'] }, a2: { text: "조금 먹고 기분을 푼다", tags: ['F', 'N'] } },
  { id: 8, q: "식사 속도는", a1: { text: "천천히 씹는 걸 의식", tags: ['I', 'S'] }, a2: { text: "대화 흐름에 맞춘다", tags: ['E', 'P'] } },
  { id: 9, q: "보충제 선택은", a1: { text: "검사 결과 기반", tags: ['T', 'J'] }, a2: { text: "체감되는 것 위주", tags: ['F', 'P'] } },
  { id: 10, q: "체중 변동이 생기면", a1: { text: "기록으로 원인 추적", tags: ['J', 'T'] }, a2: { text: "생활 리듬부터 조정", tags: ['P', 'F'] } },
  { id: 11, q: "건강 식단 유지 비결은", a1: { text: "준비 가능한 시스템", tags: ['S', 'J'] }, a2: { text: "지치지 않는 맛의 다양성", tags: ['N', 'P'] } },
  { id: 12, q: "나의 식습관 목표는", a1: { text: "오래가는 안정성", tags: ['I', 'J'] }, a2: { text: "즐겁게 지속하는 균형", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "slow-aging-food-type", questions, resultPath: "/tests/slow-aging-food-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("lime"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
