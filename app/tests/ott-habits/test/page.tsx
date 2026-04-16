"use client"

/**
 * Component: OTTHabitsTest
 * OTT 습관 테스트 페이지
 * @example <OTTHabitsTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "OTT 신작 공개 당일",
    a1: { text: "친구들과 바로 얘기하며 본다", tags: ["E"] },
    a2: { text: "혼자 조용히 감상한다", tags: ["I"] },
  },
  {
    id: 2,
    q: "시청 리스트를 만들 때?",
    a1: { text: "장르·평점·러닝타임을 정리", tags: ["S", "J"] },
    a2: { text: "느낌 오는 것 위주로 북마크", tags: ["N", "P"] },
  },
  {
    id: 3,
    q: "OTT에서 드라마 재생 속도를 정할 때",
    a1: { text: "기본 속도로 디테일을 놓치기 싫어한다", tags: ["S", "T"] },
    a2: { text: "상황에 따라 가속하고 리듬이 중요하다", tags: ["N", "F"] },
  },
  {
    id: 4,
    q: "추천 알고리즘이 낯선 작품을 권하면?",
    a1: { text: "정보 검색으로 검증 후 시청", tags: ["T", "J"] },
    a2: { text: "먼저 틀어보고 느낌으로 판단", tags: ["F", "P"] },
  },
  {
    id: 5,
    q: "드라마를 정주행할 때",
    a1: { text: "매일 같은 시간에 일정량씩 본다", tags: ["J", "I"] },
    a2: { text: "주말 몰아보기로 한 번에 본다", tags: ["P", "E"] },
  },
  {
    id: 6,
    q: "시청 중 메시지가 오면?",
    a1: { text: "일시정지하고 답장 후 재생", tags: ["J", "T"] },
    a2: { text: "나중에 답장, 흐름을 중시", tags: ["P", "F"] },
  },
  {
    id: 7,
    q: "OTT에서 드라마 장르를 선택할 때",
    a1: { text: "검증된 시리즈나 제작진 위주로 선택한다", tags: ["S", "T"] },
    a2: { text: "새로운 세계관이나 아이디어로 선택한다", tags: ["N", "F"] },
  },
  {
    id: 8,
    q: "드라마를 보다가 스포일러를 마주했을 때",
    a1: { text: "철저히 차단하고 규칙을 세운다", tags: ["J", "I"] },
    a2: { text: "가벼운 스포는 괜찮다고 생각한다", tags: ["P", "E"] },
  },
  {
    id: 9,
    q: "드라마를 시청한 후 기록을 남길 때",
    a1: { text: "평점, 노트, 좋았던 씬을 저장한다", tags: ["S", "J"] },
    a2: { text: "인상적인 감정만 기억한다", tags: ["N", "P"] },
  },
  {
    id: 10,
    q: "친구가 추천을 부탁하면?",
    a1: { text: "취향 파악 후 맞춤 큐레이션", tags: ["T", "E"] },
    a2: { text: "내가 좋아한 작품을 공유", tags: ["F", "I"] },
  },
  {
    id: 11,
    q: "완결 전 공개작을 볼 때",
    a1: { text: "완결 후 안정적으로 본다", tags: ["J", "S"] },
    a2: { text: "주차별로 설렘도 즐긴다", tags: ["P", "N"] },
  },
  {
    id: 12,
    q: "퇴근 후 피곤한 날에 OTT를 선택할 때",
    a1: { text: "익숙한 작품을 재탕해서 회복한다", tags: ["S", "I"] },
    a2: { text: "짧은 하이라이트나 클립을 탐색한다", tags: ["N", "E"] },
  },
]

export default function OTTHabitsTest() {
  const quizLogic = useQuizLogic({
    testId: "ott-habits",
    questions,
    resultPath: "/tests/ott-habits/test/result",
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
      colorClasses={getQuizColorScheme("blue-purple")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
