"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🪪 프로필 한 줄 소개를 쓸 때", a1: { text: "전문 키워드를 먼저 넣는다", tags: ['T', 'J'] }, a2: { text: "느낌을 살리는 문장을 먼저", tags: ['F', 'P'] } },
  { id: 2, q: "닉네임을 정할 때", a1: { text: "검색성과 기억성을 본다", tags: ['S', 'T'] }, a2: { text: "개성과 스토리를 담는다", tags: ['N', 'F'] } },
  { id: 3, q: "프로필 사진 선택 기준은", a1: { text: "신뢰감 있는 인상", tags: ['I', 'J'] }, a2: { text: "눈에 띄는 캐릭터성", tags: ['E', 'P'] } },
  { id: 4, q: "링크 구성은", a1: { text: "핵심 전환 링크만 배치", tags: ['J', 'S'] }, a2: { text: "다양한 탐색 링크를 제공", tags: ['P', 'N'] } },
  { id: 5, q: "소개 문구를 업데이트할 때", a1: { text: "성과 변화가 있을 때만", tags: ['I', 'J'] }, a2: { text: "분위기 바뀌면 자주 수정", tags: ['E', 'P'] } },
  { id: 6, q: "첫인상 색감/톤은", a1: { text: "브랜드 가이드에 맞춘다", tags: ['S', 'J'] }, a2: { text: "현재 트렌드에 맞춘다", tags: ['N', 'P'] } },
  { id: 7, q: "타깃 독자를 상상하면", a1: { text: "페르소나를 구체화한다", tags: ['T', 'J'] }, a2: { text: "공감 포인트를 넓게 잡는다", tags: ['F', 'P'] } },
  { id: 8, q: "하이라이트/고정글은", a1: { text: "정보 구조 중심으로 배열", tags: ['I', 'S'] }, a2: { text: "스토리 흐름 중심으로 배열", tags: ['E', 'N'] } },
  { id: 9, q: "브랜딩 피드백을 받으면", a1: { text: "지표로 검증 후 반영", tags: ['T', 'S'] }, a2: { text: "브랜드 결에 맞으면 반영", tags: ['F', 'N'] } },
  { id: 10, q: "경력 소개 방식은", a1: { text: "연도·성과 중심", tags: ['I', 'T'] }, a2: { text: "전환점·동기 중심", tags: ['E', 'F'] } },
  { id: 11, q: "콘텐츠 주제가 흔들리면", a1: { text: "핵심 카테고리로 복귀", tags: ['J', 'T'] }, a2: { text: "새 결을 시험해 본다", tags: ['P', 'F'] } },
  { id: 12, q: "나만의 브랜드 핵심은", a1: { text: "일관된 신뢰감", tags: ['S', 'J'] }, a2: { text: "매력적인 개성", tags: ['N', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "profile-branding-type", questions, resultPath: "/tests/profile-branding-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("fuchsia"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
