"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "🧭 커리어 피벗 유형 테스트에서 시작할 때 나는", a1: { text: "배경과 맥락을 먼저 정리한다", tags: ["I", "N"] }, a2: { text: "바로 실행하며 반응을 본다", tags: ["E", "S"] } },
  { id: 2, q: "계획을 세울 때", a1: { text: "체크리스트를 만든다", tags: ["J", "T"] }, a2: { text: "큰 방향만 잡고 시작한다", tags: ["P", "F"] } },
  { id: 3, q: "문제가 생기면", a1: { text: "원인을 분석해 수정한다", tags: ["T", "S"] }, a2: { text: "새로운 접근으로 전환한다", tags: ["F", "N"] } },
  { id: 4, q: "피드백을 받으면", a1: { text: "데이터 기준으로 판단한다", tags: ["T", "J"] }, a2: { text: "사용자 감정/경험을 우선 본다", tags: ["F", "P"] } },
  { id: 5, q: "협업 상황에서", a1: { text: "역할과 일정부터 확정", tags: ["J", "S"] }, a2: { text: "아이디어를 먼저 확장", tags: ["P", "N"] } },
  { id: 6, q: "반복 작업이 생기면", a1: { text: "표준화해서 자동화한다", tags: ["J", "T"] }, a2: { text: "상황별로 유연하게 바꾼다", tags: ["P", "F"] } },
  { id: 7, q: "성과를 측정할 때", a1: { text: "숫자 지표를 중심으로", tags: ["T", "S"] }, a2: { text: "만족도와 반응을 중심으로", tags: ["F", "N"] } },
  { id: 8, q: "시간이 부족할 때", a1: { text: "핵심만 남겨 정확히 마감", tags: ["I", "J"] }, a2: { text: "속도 우선으로 빠르게 완성", tags: ["E", "P"] } },
  { id: 9, q: "새 아이디어를 고를 때", a1: { text: "검증된 방식 우선", tags: ["S", "J"] }, a2: { text: "새롭고 실험적인 방식", tags: ["N", "P"] } },
  { id: 10, q: "작업 톤은", a1: { text: "차분하고 정교하게", tags: ["I", "T"] }, a2: { text: "활기차고 빠르게", tags: ["E", "F"] } },
  { id: 11, q: "최종 검수는", a1: { text: "기준표로 꼼꼼히 확인", tags: ["J", "T"] }, a2: { text: "전체 흐름 감각으로 점검", tags: ["P", "F"] } },
  { id: 12, q: "다음 사이클 준비는", a1: { text: "회고 문서로 체계화", tags: ["I", "J"] }, a2: { text: "바로 다음 실험으로 이동", tags: ["E", "P"] } },
]

export default function TestPage() {
  const quizLogic = useQuizLogic({
    testId: "career-pivot-type",
    questions,
    resultPath: "/tests/career-pivot-type/test/result",
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
