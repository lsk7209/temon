"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "메일함에 새 메일이 오면 가장 먼저?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "제목이 모호한 메일을 받으면?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "답장 톤을 정할 때 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 4,
    q: "참조(CC) 인원이 많을 때 작성 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 5,
    q: "긴 메일을 받으면 내 처리 방식은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "급한 요청 메일의 답장 우선순위는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "첨부파일 누락 발견 시 대처는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "오해 소지가 있는 문장은 어떻게?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "회신 지연이 예상될 때 행동은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["E"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "감사/사과 표현을 쓰는 기준은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["S"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["N"] },
  },
  {
    id: 11,
    q: "메일 템플릿 사용 여부는?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["T"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["F"] },
  },
  {
    id: 12,
    q: "이상적인 이메일 커뮤니케이션은?",
    a1: { text: "상황을 기준으로 체계적으로 선택한다", tags: ["J"] },
    a2: { text: "감각/직관을 믿고 유연하게 선택한다", tags: ["P"] },
  }
]

export default function EmailReplyStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "email-reply-style",
    questions,
    resultPath: "/tests/email-reply-style/test/result",
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
      colorClasses={getQuizColorScheme("purple-pink-violet")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
