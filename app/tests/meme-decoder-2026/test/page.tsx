"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "😂 새로운 밈을 처음 보면", a1: { text: "원본 출처부터 찾는다", tags: ['I', 'S'] }, a2: { text: "반응 포인트부터 체감한다", tags: ['E', 'N'] } },
  { id: 2, q: "밈이 왜 웃긴지 설명할 때", a1: { text: "상황 구조를 단계별로 풀어낸다", tags: ['T', 'J'] }, a2: { text: "정서와 분위기로 전달한다", tags: ['F', 'P'] } },
  { id: 3, q: "친구가 모르는 밈을 물으면", a1: { text: "배경지식 링크를 공유", tags: ['S', 'T'] }, a2: { text: "비슷한 사례로 감각 전달", tags: ['N', 'F'] } },
  { id: 4, q: "짧게 유행하고 사라진 밈은", a1: { text: "수명 패턴을 기록", tags: ['J', 'S'] }, a2: { text: "다음 변형 가능성을 본다", tags: ['P', 'N'] } },
  { id: 5, q: "밈이 논란이 될 때", a1: { text: "맥락 오해 지점을 짚는다", tags: ['T', 'J'] }, a2: { text: "수용자 감정선을 먼저 본다", tags: ['F', 'P'] } },
  { id: 6, q: "플랫폼마다 반응이 다르면", a1: { text: "채널 특성을 비교 분석", tags: ['S', 'T'] }, a2: { text: "톤을 다르게 재가공", tags: ['N', 'F'] } },
  { id: 7, q: "회사에서 밈을 활용해야 하면", a1: { text: "브랜드 적합성부터 검토", tags: ['I', 'J'] }, a2: { text: "확산 가능성부터 실험", tags: ['E', 'P'] } },
  { id: 8, q: "밈 캡처를 저장할 때", a1: { text: "주제 태그로 아카이빙", tags: ['J', 'S'] }, a2: { text: "감각 오는 것만 큐레이션", tags: ['P', 'N'] } },
  { id: 9, q: "유행어를 문장에 넣을 때", a1: { text: "과용 방지 기준을 둔다", tags: ['I', 'T'] }, a2: { text: "현장 반응 보며 조절", tags: ['E', 'F'] } },
  { id: 10, q: "해외 밈을 접하면", a1: { text: "문화 코드 차이를 번역", tags: ['T', 'N'] }, a2: { text: "공통 감정 포인트를 찾는다", tags: ['F', 'N'] } },
  { id: 11, q: "너무 난해한 밈은", a1: { text: "핵심 포맷만 추출", tags: ['S', 'J'] }, a2: { text: "의미 열린 상태로 즐긴다", tags: ['N', 'P'] } },
  { id: 12, q: "다음 밈을 예상할 때", a1: { text: "반복되는 구조를 본다", tags: ['I', 'T'] }, a2: { text: "요즘 정서를 먼저 읽는다", tags: ['E', 'F'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({ testId: "meme-decoder-2026", questions, resultPath: "/tests/meme-decoder-2026/test/result" })
  return <QuizContainer {...{ currentQuestion: quizLogic.currentQuestion, currentQ: quizLogic.currentQ, selectedChoice: quizLogic.selectedChoice, isProcessing: quizLogic.isProcessing, isSaving: quizLogic.isSaving, progress: quizLogic.progress, questionsLength: quizLogic.questionsLength, colorClasses: getQuizColorScheme("emerald"), onChoiceSelect: quizLogic.handleChoiceSelect, onPrevious: quizLogic.handlePrevious } } />
}
