"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🧵 글 첫 문장을 쓸 때", a1: { text: "핵심 주장부터 던진다", tags: ['T', 'J'] }, a2: { text: "공감되는 장면부터 연다", tags: ['F', 'P'] } },
  { id: 2, q: "문장 길이 스타일은", a1: { text: "짧고 단정하게", tags: ['I', 'S'] }, a2: { text: "리듬감 있게 변주", tags: ['E', 'N'] } },
  { id: 3, q: "논쟁 이슈를 다룰 때", a1: { text: "근거 중심으로 정리", tags: ['T', 'S'] }, a2: { text: "감정 온도를 먼저 조율", tags: ['F', 'N'] } },
  { id: 4, q: "이모지 사용은", a1: { text: "의미 보조용 최소 사용", tags: ['I', 'J'] }, a2: { text: "톤 표현용 적극 사용", tags: ['E', 'P'] } },
  { id: 5, q: "댓글이 많이 달리면", a1: { text: "질문을 묶어 답한다", tags: ['J', 'T'] }, a2: { text: "반응 좋은 대화부터 잇는다", tags: ['P', 'F'] } },
  { id: 6, q: "글 업로드 시간은", a1: { text: "데이터 좋은 시간 고정", tags: ['S', 'J'] }, a2: { text: "내 에너지 좋은 시간 선택", tags: ['N', 'P'] } },
  { id: 7, q: "같은 주제를 반복할 때", a1: { text: "관점 프레임을 바꾼다", tags: ['T', 'N'] }, a2: { text: "개인 경험을 추가한다", tags: ['F', 'N'] } },
  { id: 8, q: "글쓰기 슬럼프에는", a1: { text: "템플릿으로 재시동", tags: ['I', 'J'] }, a2: { text: "산책 후 즉흥 초안", tags: ['E', 'P'] } },
  { id: 9, q: "팔로워 톤에 맞출 때", a1: { text: "브랜드 기준을 우선", tags: ['T', 'J'] }, a2: { text: "커뮤니티 분위기 우선", tags: ['F', 'P'] } },
  { id: 10, q: "바이럴 글을 분석하면", a1: { text: "구조를 분해해 학습", tags: ['S', 'T'] }, a2: { text: "감정 곡선을 체득", tags: ['N', 'F'] } },
  { id: 11, q: "문장 퇴고 방식은", a1: { text: "군더더기 삭제 중심", tags: ['I', 'T'] }, a2: { text: "온도·뉘앙스 조정 중심", tags: ['E', 'F'] } },
  { id: 12, q: "내 톤의 강점은", a1: { text: "명확하고 신뢰감 있음", tags: ['S', 'J'] }, a2: { text: "친근하고 생동감 있음", tags: ['N', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "threads-tone-style", questions, resultPath: "/tests/threads-tone-style/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("zinc"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
