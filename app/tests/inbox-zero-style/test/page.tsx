"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "메일/메시지 확인", a1: { text: "정해진 시간에 일괄 확인", tags: ['I', 'J'] }, a2: { text: "수시 확인", tags: ['E', 'P'] } },
  { id: 2, q: "읽은 메시지", a1: { text: "즉시 처리/보관", tags: ['T', 'J'] }, a2: { text: "일단 읽고 나중 처리", tags: ['F', 'P'] } },
  { id: 3, q: "분류 기준", a1: { text: "프로젝트/우선순위 태그", tags: ['S', 'T'] }, a2: { text: "사람/맥락 기준", tags: ['N', 'F'] } },
  { id: 4, q: "긴 답장이 필요하면", a1: { text: "임시 초안 저장", tags: ['J', 'I'] }, a2: { text: "머릿속에 두고 나중 작성", tags: ['P', 'E'] } },
  { id: 5, q: "미응답 관리", a1: { text: "후속 알림 설정", tags: ['J', 'S'] }, a2: { text: "기억에 의존", tags: ['P', 'N'] } },
  { id: 6, q: "중요 대화", a1: { text: "요약 노트 생성", tags: ['T', 'S'] }, a2: { text: "원문 스레드 유지", tags: ['F', 'N'] } },
  { id: 7, q: "알림 끄기", a1: { text: "집중 시간 전면 차단", tags: ['I', 'J'] }, a2: { text: "중요 채널만 유지", tags: ['E', 'P'] } },
  { id: 8, q: "하루 마감", a1: { text: "인박스 0 상태 맞춤", tags: ['J', 'T'] }, a2: { text: "핵심만 처리", tags: ['P', 'F'] } },
  { id: 9, q: "스팸/잡음", a1: { text: "기준 만들어 즉시 정리", tags: ['S', 'J'] }, a2: { text: "가끔 몰아서 정리", tags: ['N', 'P'] } },
  { id: 10, q: "협업 툴 메시지", a1: { text: "채널 규칙 합의", tags: ['T', 'J'] }, a2: { text: "개인별 유연 대응", tags: ['F', 'P'] } },
  { id: 11, q: "응답 톤", a1: { text: "짧고 명확", tags: ['I', 'T'] }, a2: { text: "맥락 자세히", tags: ['E', 'F'] } },
  { id: 12, q: "운영 목표", a1: { text: "정돈된 커뮤니케이션", tags: ['J', 'S'] }, a2: { text: "관계 유지 우선", tags: ['P', 'N'] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "inbox-zero-style",
    questions,
    resultPath: "/tests/inbox-zero-style/test/result",
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
      colorClasses={getQuizColorScheme("green")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
