"use client"

/**
 * Component: StudyMBTITest
 * 공부 MBTI 테스트 페이지
 * @example <StudyMBTITest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "강의 시작 5분 전, 내 자리?",
    a1: { text: "맨 앞줄 예약", tags: ["E"] },
    a2: { text: "중간 이후 조용존", tags: ["I"] },
  },
  {
    id: 2,
    q: "새 교재를 받으면?",
    a1: { text: "목차·일정 먼저 짠다", tags: ["J"] },
    a2: { text: "아무 페이지나 펼쳐 본다", tags: ["P"] },
  },
  {
    id: 3,
    q: "이해 안 가는 부분 발생!",
    a1: { text: "바로 질문·검색", tags: ["E", "S"] },
    a2: { text: "일단 넘어가고 나중에", tags: ["I", "N"] },
  },
  {
    id: 4,
    q: "정리 노트 스타일",
    a1: { text: "글머리·도형·컬러 완벽", tags: ["S"] },
    a2: { text: "연상 암기·그림·밈 활용", tags: ["N"] },
  },
  {
    id: 5,
    q: "시험 2주 전",
    a1: { text: "데일리 스터디 플랜 작성", tags: ["J"] },
    a2: { text: "마감 압박받아야 달린다", tags: ["P"] },
  },
  {
    id: 6,
    q: "공부 장소 선택",
    a1: { text: "도서관·카페 고정석", tags: ["S"] },
    a2: { text: "날마다 새 공간 탐험", tags: ["N"] },
  },
  {
    id: 7,
    q: "그룹 스터디 중 토론 흐르면?",
    a1: { text: "논점 정리·타임키퍼", tags: ["T"] },
    a2: { text: "공감·분위기 메이커", tags: ["F"] },
  },
  {
    id: 8,
    q: "공부 중 알림이 울리면?",
    a1: { text: "즉시 '방해 금지'", tags: ["J", "T"] },
    a2: { text: "잠깐 SNS 둘러보고 복귀", tags: ["P", "F"] },
  },
  {
    id: 9,
    q: "긴 파트를 외워야 할 때",
    a1: { text: "로직·목차 구조화", tags: ["T"] },
    a2: { text: "스토리·이미지로 연상", tags: ["F"] },
  },
  {
    id: 10,
    q: "모의고사 낮은 점수",
    a1: { text: "틀린 원인 분석표 작성", tags: ["T"] },
    a2: { text: "슬픈 노래 틀고 동기부여", tags: ["F"] },
  },
  {
    id: 11,
    q: "공부하다 친구에게 카톡이 왔다",
    a1: { text: '"끝나고 톡할게!"', tags: ["J", "E"] },
    a2: { text: "바로 답장+수다", tags: ["P", "E"] },
  },
  {
    id: 12,
    q: "시험 전날 밤 12시",
    a1: { text: "이미 취침+컨디션 관리", tags: ["S", "J"] },
    a2: { text: "카페인 풀충전 올빼미", tags: ["N", "P"] },
  },
]

export default function StudyMBTITest() {
  const quizLogic = useQuizLogic({
    testId: "study-mbti",
    questions,
    resultPath: "/tests/study-mbti/test/result",
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
      colorClasses={getQuizColorScheme("indigo-purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
