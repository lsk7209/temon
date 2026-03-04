"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "사진 선별 기준", a1: { text: "스토리 흐름 중심", tags: ['N', 'F'] }, a2: { text: "한 컷 임팩트 중심", tags: ['S', 'T'] } },
  { id: 2, q: "후보 컷 정리", a1: { text: "폴더/별점으로 단계화", tags: ['J', 'S'] }, a2: { text: "감으로 빠르게 고름", tags: ['P', 'N'] } },
  { id: 3, q: "보정 스타일", a1: { text: "톤 일관성 우선", tags: ['I', 'J'] }, a2: { text: "컷마다 개성 우선", tags: ['E', 'P'] } },
  { id: 4, q: "업로드 순서", a1: { text: "기승전결 구조", tags: ['N', 'T'] }, a2: { text: "인기 컷 먼저", tags: ['S', 'F'] } },
  { id: 5, q: "캡션 작성", a1: { text: "맥락/에피소드 포함", tags: ['F', 'N'] }, a2: { text: "짧고 리듬감 있게", tags: ['T', 'S'] } },
  { id: 6, q: "중복 컷 처리", a1: { text: "유사 컷 과감히 삭제", tags: ['T', 'J'] }, a2: { text: "여러 버전 보존", tags: ['F', 'P'] } },
  { id: 7, q: "공유 주기", a1: { text: "모아두고 한 번에", tags: ['I', 'J'] }, a2: { text: "자주 짧게 공유", tags: ['E', 'P'] } },
  { id: 8, q: "피드 반응", a1: { text: "다음 큐레이션에 반영", tags: ['T', 'S'] }, a2: { text: "현재 기록 의미를 우선", tags: ['F', 'N'] } },
  { id: 9, q: "아카이브", a1: { text: "월별/테마별 보관", tags: ['S', 'J'] }, a2: { text: "최근 중심 순환", tags: ['N', 'P'] } },
  { id: 10, q: "사람 사진", a1: { text: "표정/감정선 우선", tags: ['F', 'N'] }, a2: { text: "구도/퀄리티 우선", tags: ['T', 'S'] } },
  { id: 11, q: "브랜드 톤", a1: { text: "일관된 무드 유지", tags: ['I', 'J'] }, a2: { text: "새로운 무드 실험", tags: ['E', 'P'] } },
  { id: 12, q: "목표", a1: { text: "추억+전달력 균형", tags: ['T', 'J'] }, a2: { text: "즉흥 감성 기록", tags: ['F', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "photo-dump-style",
    questions,
    resultPath: "/tests/photo-dump-style/test/result",
  })

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
