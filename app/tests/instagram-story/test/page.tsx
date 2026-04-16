"use client"

/**
 * Component: InstagramStoryTest
 * 인스타 스토리 테스트 페이지
 * @example <InstagramStoryTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "인스타 스토리를 올릴 때 필터를 선택할 때",
    a1: { text: "필터 없이 바로 올린다", tags: ["S"] },
    a2: { text: "필터 여러 개를 시도해서 선택한다", tags: ["N"] },
  },
  {
    id: 2,
    q: "인스타 스토리를 올릴 때 빈도를 생각할 때",
    a1: { text: "하루 여러 개를 올린다", tags: ["E"] },
    a2: { text: "가끔씩만 올린다", tags: ["I"] },
  },
  {
    id: 3,
    q: "인스타 스토리에 올릴 내용을 선택할 때",
    a1: { text: "일상 공유나 소소한 순간들을 올린다", tags: ["S"] },
    a2: { text: "특별한 순간이나 의미 있는 것만 올린다", tags: ["N"] },
  },
  {
    id: 4,
    q: "인스타 스토리 하이라이트를 관리할 때",
    a1: { text: "여러 개를 관리하고 카테고리를 정리한다", tags: ["J"] },
    a2: { text: "만들지 않거나 가끔만 만든다", tags: ["P"] },
  },
  {
    id: 5,
    q: "인스타 스토리에 댓글이 올 때",
    a1: { text: "댓글을 많이 받고 답장을 활발히 한다", tags: ["E"] },
    a2: { text: "조용히만 보고 답장은 간단히 한다", tags: ["I"] },
  },
  {
    id: 6,
    q: "인스타 스토리를 보관할 때",
    a1: { text: "하이라이트에 보관해서 추억을 기록한다", tags: ["F"] },
    a2: { text: "그냥 지나가고 보관하지 않는다", tags: ["T"] },
  },
  {
    id: 7,
    q: "인스타 스토리에 스티커를 사용할 때",
    a1: { text: "스티커를 많이 사용해서 재미있게 만든다", tags: ["E"] },
    a2: { text: "최소한만 사용해서 깔끔하게 만든다", tags: ["I"] },
  },
  {
    id: 8,
    q: "인스타 스토리에 음악을 추가할 때",
    a1: { text: "트렌디한 음악을 추가해서 분위기를 중시한다", tags: ["F"] },
    a2: { text: "음악 없이 내용 중심으로 만든다", tags: ["T"] },
  },
  {
    id: 9,
    q: "인스타 스토리를 올리기 전에 계획을 세울 때",
    a1: { text: "미리 계획하고 컨셉을 정한다", tags: ["J"] },
    a2: { text: "즉흥적으로 올린다", tags: ["P"] },
  },
  {
    id: 10,
    q: "인스타 스토리에 위치 태그를 사용할 때",
    a1: { text: "위치 태그를 자주 사용한다", tags: ["E"] },
    a2: { text: "위치 태그를 거의 사용하지 않는다", tags: ["I"] },
  },
  {
    id: 11,
    q: "인스타 스토리 질문 기능을 사용할 때",
    a1: { text: "질문 박스를 자주 사용해서 소통을 활발히 한다", tags: ["E"] },
    a2: { text: "질문 박스를 거의 사용하지 않는다", tags: ["I"] },
  },
  {
    id: 12,
    q: "인스타 스토리를 올리고 나서 후회할 때",
    a1: { text: "올리고 바로 삭제하고 신중하게 처리한다", tags: ["T"] },
    a2: { text: "올린 것을 그대로 둔다", tags: ["F"] },
  },
]

export default function InstagramStoryTest() {
  const quizLogic = useQuizLogic({
    testId: "instagram-story",
    questions,
    resultPath: "/tests/instagram-story/test/result",
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
      colorClasses={getQuizColorScheme("pink-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
