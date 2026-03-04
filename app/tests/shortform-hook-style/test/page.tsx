"use client"

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  { id: 1, q: "첫 장면을 고를 때 나는", a1: { text: "강한 임팩트 컷을 먼저 배치", tags: ["E", "S"] }, a2: { text: "궁금증을 남기는 장면으로 시작", tags: ["I", "N"] } },
  { id: 2, q: "자막 스타일은", a1: { text: "핵심 키워드 위주로 짧게", tags: ["T", "J"] }, a2: { text: "감정선을 살려 자연스럽게", tags: ["F", "P"] } },
  { id: 3, q: "썸네일을 고를 때", a1: { text: "클릭률이 높은 표정을 우선", tags: ["E", "T"] }, a2: { text: "브랜드 톤이 맞는 이미지를 우선", tags: ["I", "F"] } },
  { id: 4, q: "조회수가 낮으면", a1: { text: "첫 3초부터 즉시 수정", tags: ["J", "S"] }, a2: { text: "콘셉트 방향 자체를 재설계", tags: ["P", "N"] } },
  { id: 5, q: "트렌드 사운드를 쓸 때", a1: { text: "지금 뜨는 곡을 빠르게 적용", tags: ["E", "P"] }, a2: { text: "콘텐츠와 어울리는 곡만 선택", tags: ["I", "J"] } },
  { id: 6, q: "영상 길이를 정할 때", a1: { text: "전달 효율 중심으로 최대한 짧게", tags: ["T", "S"] }, a2: { text: "스토리 흐름이 자연스러운 길이", tags: ["F", "N"] } },
  { id: 7, q: "기획 단계에서 나는", a1: { text: "후킹 문장부터 먼저 쓴다", tags: ["J", "T"] }, a2: { text: "아이디어를 자유롭게 확장한다", tags: ["P", "F"] } },
  { id: 8, q: "반복 시리즈를 만들 때", a1: { text: "포맷을 표준화해 빠르게 찍는다", tags: ["S", "J"] }, a2: { text: "매번 다른 연출을 시도한다", tags: ["N", "P"] } },
  { id: 9, q: "댓글 반응을 보면", a1: { text: "데이터 중심으로 다음 편을 정한다", tags: ["T", "J"] }, a2: { text: "커뮤니티 분위기를 보고 정한다", tags: ["F", "P"] } },
  { id: 10, q: "촬영 당일 변수 발생 시", a1: { text: "플랜 B로 바로 전환", tags: ["E", "S"] }, a2: { text: "새로운 스토리로 재구성", tags: ["I", "N"] } },
  { id: 11, q: "후킹 카피를 만들 때", a1: { text: "숫자·결과 중심 문장을 선호", tags: ["T", "S"] }, a2: { text: "공감·스토리 중심 문장을 선호", tags: ["F", "N"] } },
  { id: 12, q: "최종 업로드 직전", a1: { text: "체크리스트로 완성도를 점검", tags: ["I", "J"] }, a2: { text: "감으로 마지막 텐션을 조정", tags: ["E", "P"] } },
]

export default function ShortformHookStyleTestPage() {
  const quizLogic = useQuizLogic({
    testId: "shortform-hook-style",
    questions,
    resultPath: "/tests/shortform-hook-style/test/result",
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
