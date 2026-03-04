"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "AI에게 첫 질문을 보낼 때 나는", a1: { text: "목적·배경을 자세히 설명한다", tags: ["I", "N"] }, a2: { text: "핵심만 짧고 빠르게 보낸다", tags: ["E", "S"] } },
  { id: 2, q: "원하는 답이 아닐 때", a1: { text: "조건을 추가해 단계적으로 수정한다", tags: ["J", "T"] }, a2: { text: "다른 방식으로 다시 물어본다", tags: ["P", "F"] } },
  { id: 3, q: "긴 문서를 요약할 때", a1: { text: "목차/포맷까지 지정한다", tags: ["J", "S"] }, a2: { text: "요점만 뽑아달라고 요청한다", tags: ["P", "N"] } },
  { id: 4, q: "콘텐츠 아이디어를 뽑을 때", a1: { text: "새롭고 실험적인 관점을 원한다", tags: ["N", "P"] }, a2: { text: "검증된 포맷을 우선 적용한다", tags: ["S", "J"] } },
  { id: 5, q: "AI 답변을 실제로 쓸 때", a1: { text: "내 톤에 맞게 꼼꼼히 재작성한다", tags: ["I", "F"] }, a2: { text: "빠르게 편집하고 바로 적용한다", tags: ["E", "T"] } },
  { id: 6, q: "협업 문서를 만들 때", a1: { text: "구조와 역할을 먼저 정한다", tags: ["J", "T"] }, a2: { text: "초안을 먼저 만들고 다듬는다", tags: ["P", "F"] } },
  { id: 7, q: "프롬프트를 저장하는 방식은", a1: { text: "템플릿을 체계적으로 관리한다", tags: ["I", "J"] }, a2: { text: "필요할 때마다 새로 작성한다", tags: ["E", "P"] } },
  { id: 8, q: "시간이 촉박한 상황에서는", a1: { text: "정확도 높은 결과를 우선한다", tags: ["T", "J"] }, a2: { text: "속도와 실행을 우선한다", tags: ["F", "P"] } },
  { id: 9, q: "AI에게 코드/문서 개선을 요청할 때", a1: { text: "근거와 기준을 명확히 요구한다", tags: ["T", "S"] }, a2: { text: "톤과 사용자 경험을 강조한다", tags: ["F", "N"] } },
  { id: 10, q: "새 기능을 기획할 때", a1: { text: "사용자 시나리오를 길게 쓴다", tags: ["N", "F"] }, a2: { text: "요구사항 목록을 먼저 만든다", tags: ["S", "T"] } },
  { id: 11, q: "같은 작업을 반복할 때", a1: { text: "재사용 가능한 자동화를 만든다", tags: ["J", "N"] }, a2: { text: "상황에 맞게 매번 바꿔 쓴다", tags: ["P", "S"] } },
  { id: 12, q: "최종 결과를 제출하기 전", a1: { text: "체크리스트로 마지막 검수를 한다", tags: ["I", "J"] }, a2: { text: "한 번 더 직관으로 읽고 낸다", tags: ["E", "P"] } },
]

export default function AiPromptStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "ai-prompt-style",
    questions,
    resultPath: "/tests/ai-prompt-style/test/result",
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
      colorClasses={getQuizColorScheme("purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
