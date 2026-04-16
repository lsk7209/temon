"use client"

/**
 * Component: EveningRoutineTest
 * 저녁 루틴 테스트 페이지
 * @example <EveningRoutineTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "퇴근 직후 나는?",
    a1: { text: "바로 약속 잡아 사람 만난다", tags: ["E"] },
    a2: { text: "집으로 직행, 혼자만의 시간", tags: ["I"] },
  },
  {
    id: 2,
    q: "저녁 식사 선택은?",
    a1: { text: "늘 가던 메뉴/가게", tags: ["S"] },
    a2: { text: "새로운 맛집·신상 메뉴 탐색", tags: ["N"] },
  },
  {
    id: 3,
    q: "퇴근길 메시지 도착!",
    a1: { text: "바로 답장/전화로 해결", tags: ["E"] },
    a2: { text: "집 가서 정리해 답장", tags: ["I"] },
  },
  {
    id: 4,
    q: "운동 계획 세울 때",
    a1: { text: "루틴·기록·측정이 우선", tags: ["T"] },
    a2: { text: "기분·컨디션에 맞춰", tags: ["F"] },
  },
  {
    id: 5,
    q: "집 정리 타이밍은",
    a1: { text: "들어오자마자 정리·샤워", tags: ["J"] },
    a2: { text: "좀 쉬다 슬슬 시작", tags: ["P"] },
  },
  {
    id: 6,
    q: "하루 회고 방식",
    a1: { text: "체크리스트/투두 점검", tags: ["S"] },
    a2: { text: "앞으로의 가능성/아이디어", tags: ["N"] },
  },
  {
    id: 7,
    q: "약속이 취소됐다",
    a1: { text: "혼밥·혼영으로 대체", tags: ["I"] },
    a2: { text: "급히 다른 친구 소환", tags: ["E"] },
  },
  {
    id: 8,
    q: "자기계발 선택",
    a1: { text: "효율 좋은 커리큘럼", tags: ["T"] },
    a2: { text: "재미/영감 주는 것", tags: ["F"] },
  },
  {
    id: 9,
    q: "야식 고민",
    a1: { text: "먹을지 말지 즉시 결정", tags: ["J"] },
    a2: { text: "앱 뒤적이며 한참 고민", tags: ["P"] },
  },
  {
    id: 10,
    q: "스트레스 해소",
    a1: { text: "실제 해결책 찾기", tags: ["S", "T"] },
    a2: { text: "감정 정리·힐링 우선", tags: ["N", "F"] },
  },
  {
    id: 11,
    q: "주 3회 루틴",
    a1: { text: "같은 요일/시간 고정", tags: ["J"] },
    a2: { text: "주마다 유연 조정", tags: ["P"] },
  },
  {
    id: 12,
    q: "밤 11시 이후",
    a1: { text: "내일을 위해 종료", tags: ["J"] },
    a2: { text: "몰입되면 새벽까지", tags: ["P"] },
  },
]

export default function EveningRoutineTest() {
  const quizLogic = useQuizLogic({
    testId: "evening-routine",
    questions,
    resultPath: "/tests/evening-routine/test/result",
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
      colorClasses={getQuizColorScheme("violet-purple-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
