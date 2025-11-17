"use client"

/**
 * Component: CafeStyleTest
 * 카페 스타일 테스트 페이지
 * @example <CafeStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "카페에 가면 먼저 하는 일은?",
    a1: { text: "자리를 찾는다", tags: ["J"] },
    a2: { text: "메뉴판부터 본다", tags: ["P"] },
  },
  {
    id: 2,
    q: "커피 메뉴 고를 때",
    a1: { text: "늘 마시는 고정 메뉴", tags: ["S"] },
    a2: { text: "새로운 시그니처 시도", tags: ["N"] },
  },
  {
    id: 3,
    q: "카페 분위기는?",
    a1: { text: "조용하고 집중 가능한 곳", tags: ["I"] },
    a2: { text: "북적북적 활기찬 곳", tags: ["E"] },
  },
  {
    id: 4,
    q: "대화 중 상대가 고민 얘기하면?",
    a1: { text: "조언과 해결책을 제시", tags: ["T"] },
    a2: { text: "감정적으로 공감", tags: ["F"] },
  },
  {
    id: 5,
    q: "주문이 밀릴 때",
    a1: { text: "기다리며 폰 확인", tags: ["T"] },
    a2: { text: "직원 응원하며 웃는다", tags: ["F"] },
  },
  {
    id: 6,
    q: "자리에 앉았을 때",
    a1: { text: "노트북·책 꺼내 준비", tags: ["J"] },
    a2: { text: "일단 커피 향 즐김", tags: ["P"] },
  },
  {
    id: 7,
    q: "음악 볼륨이 높을 때",
    a1: { text: "집중 방해라 자리 옮김", tags: ["S"] },
    a2: { text: "분위기라며 그냥 즐김", tags: ["N"] },
  },
  {
    id: 8,
    q: "카페 사진을 찍을 때",
    a1: { text: "음식·메뉴 중심", tags: ["T"] },
    a2: { text: "감성·분위기 중심", tags: ["F"] },
  },
  {
    id: 9,
    q: "동행이 늦는다면?",
    a1: { text: "폰으로 일정 확인", tags: ["J"] },
    a2: { text: "여유롭게 커피 한 모금", tags: ["P"] },
  },
  {
    id: 10,
    q: "음료를 다 마셨을 때",
    a1: { text: "바로 나간다", tags: ["S"] },
    a2: { text: "수다 이어가거나 여운 즐김", tags: ["N"] },
  },
  {
    id: 11,
    q: "혼자 카페에 있을 때",
    a1: { text: "집중 모드 ON", tags: ["I"] },
    a2: { text: "사람 구경하며 힐링", tags: ["E"] },
  },
  {
    id: 12,
    q: "가끔 가는 이유는?",
    a1: { text: "생산성 향상", tags: ["T"] },
    a2: { text: "감정 환기", tags: ["F"] },
  },
]

export default function CafeStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "cafe-style",
    questions,
    resultPath: "/tests/cafe-style/test/result",
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
      colorClasses={getQuizColorScheme("amber-brown")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
