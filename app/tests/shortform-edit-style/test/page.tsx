"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "✂️ 편집 시작 전에 먼저 하는 일은", a1: { text: "스크립트 비트맵 작성", tags: ['I', 'J'] }, a2: { text: "원본을 훑으며 포인트 체크", tags: ['E', 'P'] } },
  { id: 2, q: "첫 3초 구성은", a1: { text: "핵심 메시지 바로 제시", tags: ['T', 'J'] }, a2: { text: "궁금증을 남기는 장면 배치", tags: ['F', 'P'] } },
  { id: 3, q: "점프컷 기준은", a1: { text: "의미 단위로 정교하게", tags: ['S', 'T'] }, a2: { text: "템포감 우선으로 과감하게", tags: ['N', 'F'] } },
  { id: 4, q: "자막 스타일은", a1: { text: "통일된 템플릿 사용", tags: ['S', 'J'] }, a2: { text: "영상마다 분위기 변주", tags: ['N', 'P'] } },
  { id: 5, q: "배경음악 선택은", a1: { text: "대사 전달 우선", tags: ['I', 'T'] }, a2: { text: "감정 몰입 우선", tags: ['E', 'F'] } },
  { id: 6, q: "중간 이탈이 보이면", a1: { text: "이탈 구간 원인 분석", tags: ['T', 'J'] }, a2: { text: "전개 톤을 즉시 바꿔본다", tags: ['F', 'P'] } },
  { id: 7, q: "B-roll 삽입은", a1: { text: "정보 보강용으로 최소화", tags: ['S', 'J'] }, a2: { text: "분위기 전환용으로 적극 활용", tags: ['N', 'P'] } },
  { id: 8, q: "자막 길이는", a1: { text: "읽기 속도 계산해 제한", tags: ['T', 'S'] }, a2: { text: "현장감 살리며 유연 조절", tags: ['F', 'N'] } },
  { id: 9, q: "썸네일 프레임 추출은", a1: { text: "메시지 명확 컷 우선", tags: ['I', 'J'] }, a2: { text: "시선 끄는 표정 컷 우선", tags: ['E', 'P'] } },
  { id: 10, q: "편집 마감 직전", a1: { text: "체크리스트로 QA", tags: ['J', 'T'] }, a2: { text: "한 번에 느낌으로 최종", tags: ['P', 'F'] } },
  { id: 11, q: "영상 길이 판단은", a1: { text: "핵심 전달 완료 시점", tags: ['S', 'T'] }, a2: { text: "감정 리듬이 살아있는 시점", tags: ['N', 'F'] } },
  { id: 12, q: "다음 영상 개선은", a1: { text: "지표 기반 수정", tags: ['I', 'J'] }, a2: { text: "댓글 반응 기반 수정", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "shortform-edit-style", questions, resultPath: "/tests/shortform-edit-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("rose"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
