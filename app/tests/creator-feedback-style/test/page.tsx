"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "📝 업로드 직후 댓글이 몰리면", a1: { text: "유형별로 분류해 읽는다", tags: ['I', 'J'] }, a2: { text: "느낌 오는 반응부터 본다", tags: ['E', 'P'] } },
  { id: 2, q: "날카로운 비판 댓글을 보면", a1: { text: "사실/의견을 분리한다", tags: ['T', 'S'] }, a2: { text: "시청자 의도를 먼저 추측한다", tags: ['F', 'N'] } },
  { id: 3, q: "조회수는 높은데 저장률이 낮으면", a1: { text: "구간 이탈 데이터를 확인한다", tags: ['T', 'J'] }, a2: { text: "후킹 톤부터 바꿔본다", tags: ['F', 'P'] } },
  { id: 4, q: "피드백 반영 주기는", a1: { text: "주간 단위로 묶어 업데이트", tags: ['J', 'S'] }, a2: { text: "아이디어 생길 때 즉시 반영", tags: ['P', 'N'] } },
  { id: 5, q: "팀원이 다른 방향을 제시하면", a1: { text: "브랜드 기준표로 판단", tags: ['T', 'J'] }, a2: { text: "새 포맷 실험 기회로 본다", tags: ['F', 'P'] } },
  { id: 6, q: "악플 대응 기준은", a1: { text: "명확한 운영 원칙을 둔다", tags: ['I', 'J'] }, a2: { text: "분위기에 맞춰 유연 대응", tags: ['E', 'P'] } },
  { id: 7, q: "좋은 피드백을 받았을 때", a1: { text: "재현 가능한 요소를 기록", tags: ['S', 'T'] }, a2: { text: "감각적인 포인트를 확장", tags: ['N', 'F'] } },
  { id: 8, q: "썸네일 지적이 반복되면", a1: { text: "A/B 테스트로 검증", tags: ['T', 'S'] }, a2: { text: "새 비주얼 톤을 과감히 시도", tags: ['F', 'N'] } },
  { id: 9, q: "피드백 회의에서 나는", a1: { text: "핵심 개선안 3개를 제시", tags: ['I', 'T'] }, a2: { text: "전체 공감대를 먼저 만든다", tags: ['E', 'F'] } },
  { id: 10, q: "성과가 안 나올 때", a1: { text: "원인 가설을 다시 세운다", tags: ['J', 'T'] }, a2: { text: "콘텐츠 에너지부터 리셋", tags: ['P', 'F'] } },
  { id: 11, q: "반복 요청이 들어오면", a1: { text: "시리즈화 가능성 검토", tags: ['S', 'J'] }, a2: { text: "신선한 변주 포인트 탐색", tags: ['N', 'P'] } },
  { id: 12, q: "다음 업로드 준비는", a1: { text: "피드백 반영 체크리스트로 시작", tags: ['I', 'J'] }, a2: { text: "새 메시지 한 줄로 시작", tags: ['E', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "creator-feedback-style", questions, resultPath: "/tests/creator-feedback-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("purple"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
