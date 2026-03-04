"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "아이디어가 뜨면", a1: { text: "즉시 음성으로 캡처", tags: ['E', 'P'] }, a2: { text: "머릿속 정리 후 기록", tags: ['I', 'J'] } },
  { id: 2, q: "음성메모 길이", a1: { text: "핵심 30초 압축", tags: ['S', 'T'] }, a2: { text: "맥락 포함 2~3분", tags: ['N', 'F'] } },
  { id: 3, q: "파일 제목", a1: { text: "규칙형 태그 사용", tags: ['J', 'S'] }, a2: { text: "감각적 제목 사용", tags: ['P', 'N'] } },
  { id: 4, q: "재청취 주기", a1: { text: "매일 짧게 정리", tags: ['I', 'J'] }, a2: { text: "필요할 때만 검색", tags: ['E', 'P'] } },
  { id: 5, q: "텍스트 전환", a1: { text: "중요 메모는 바로 전환", tags: ['T', 'J'] }, a2: { text: "음성 상태로 보관", tags: ['F', 'P'] } },
  { id: 6, q: "아이디어 분류", a1: { text: "프로젝트별 폴더", tags: ['S', 'J'] }, a2: { text: "하나의 인박스", tags: ['N', 'P'] } },
  { id: 7, q: "길에서 기록할 때", a1: { text: "핵심 키워드 우선", tags: ['T', 'S'] }, a2: { text: "상황 설명까지", tags: ['F', 'N'] } },
  { id: 8, q: "공유 여부", a1: { text: "팀 협업용으로 공유", tags: ['E', 'T'] }, a2: { text: "개인 아카이브 중심", tags: ['I', 'F'] } },
  { id: 9, q: "중복 아이디어", a1: { text: "유사 아이디어 병합", tags: ['J', 'T'] }, a2: { text: "각각 독립 보존", tags: ['P', 'F'] } },
  { id: 10, q: "장기 보관", a1: { text: "월간 아카이브 정리", tags: ['I', 'S'] }, a2: { text: "최신 위주 순환", tags: ['E', 'N'] } },
  { id: 11, q: "실행 연결", a1: { text: "메모→할일 즉시 연결", tags: ['J', 'T'] }, a2: { text: "영감 저장 후 나중 실행", tags: ['P', 'F'] } },
  { id: 12, q: "도구 선택", a1: { text: "한 앱 집중 사용", tags: ['S', 'J'] }, a2: { text: "상황별 앱 분산", tags: ['N', 'P'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "voice-note-style",
    questions,
    resultPath: "/tests/voice-note-style/test/result",
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
      colorClasses={getQuizColorScheme("blue")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
