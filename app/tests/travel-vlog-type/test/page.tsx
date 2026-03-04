"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "여행 시작 장면은", a1: { text: "공항/이동부터 기록", tags: ["S", "J"] }, a2: { text: "현지 첫 인상부터 기록", tags: ["N", "P"] } },
  { id: 2, q: "촬영 스타일은", a1: { text: "계획한 샷리스트 중심", tags: ["I", "J"] }, a2: { text: "순간 반응 위주 즉흥 촬영", tags: ["E", "P"] } },
  { id: 3, q: "음식 장면을 찍을 때", a1: { text: "정보(가격/위치)까지 담는다", tags: ["T", "S"] }, a2: { text: "분위기/감정 중심으로 담는다", tags: ["F", "N"] } },
  { id: 4, q: "편집 순서는", a1: { text: "시간순으로 정리", tags: ["S", "J"] }, a2: { text: "스토리 흐름 재구성", tags: ["N", "P"] } },
  { id: 5, q: "배경음악 선택", a1: { text: "안정적인 톤 유지", tags: ["I", "F"] }, a2: { text: "장면마다 텐션 변화", tags: ["E", "T"] } },
  { id: 6, q: "댓글 반응을 보면", a1: { text: "데이터로 다음 기획 반영", tags: ["T", "J"] }, a2: { text: "공감 포인트를 확장", tags: ["F", "P"] } },
  { id: 7, q: "썸네일은", a1: { text: "정보가 한눈에 보이게", tags: ["T", "S"] }, a2: { text: "감성 톤 우선", tags: ["F", "N"] } },
  { id: 8, q: "긴 이동 시간에는", a1: { text: "다음 촬영 계획 점검", tags: ["I", "J"] }, a2: { text: "현장 아이디어를 탐색", tags: ["E", "P"] } },
  { id: 9, q: "브이로그 길이는", a1: { text: "핵심 정보 압축", tags: ["T", "J"] }, a2: { text: "여유 있는 감상 흐름", tags: ["F", "P"] } },
  { id: 10, q: "촬영 실패 컷은", a1: { text: "과감히 삭제", tags: ["T", "S"] }, a2: { text: "스토리 요소로 재활용", tags: ["F", "N"] } },
  { id: 11, q: "여행 기획 단계에서", a1: { text: "콘텐츠 목적을 먼저 설정", tags: ["I", "N"] }, a2: { text: "재미있는 장소부터 선정", tags: ["E", "S"] } },
  { id: 12, q: "업로드 직전", a1: { text: "자막/오타를 꼼꼼히 검수", tags: ["I", "J"] }, a2: { text: "전체 분위기로 최종 판단", tags: ["E", "P"] } },
]

export default function TravelVlogTypeTestPage() {
  const quizLogic = useQuizLogic({ testId: "travel-vlog-type", questions, resultPath: "/tests/travel-vlog-type/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("blue"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious }} />
}
