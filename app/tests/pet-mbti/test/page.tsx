"use client"

/**
 * Component: PetMBTITest
 * 펫 MBTI 테스트 페이지
 * @example <PetMBTITest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "주말 아침, 이상적 모닝 루틴은?",
    a1: { text: "공원 산책하며 활기차게 시작", tags: ["E"] },
    a2: { text: "침대에서 뒹굴며 여유롭게", tags: ["I"] },
  },
  {
    id: 2,
    q: "집 안 풍경을 고른다면?",
    a1: { text: "미니멀하고 정돈된 공간", tags: ["S"] },
    a2: { text: "구석구석 데코와 식물이 가득", tags: ["N"] },
  },
  {
    id: 3,
    q: "펫을 고를 때 가장 중요한 건?",
    a1: { text: "건강 상태와 사육 난이도", tags: ["T"] },
    a2: { text: "교감 가능성과 귀여움", tags: ["F"] },
  },
  {
    id: 4,
    q: "여행 계획 세울 때?",
    a1: { text: "날짜와 코스를 철저히 계획", tags: ["J"] },
    a2: { text: "현지에서 즉흥적으로 결정", tags: ["P"] },
  },
  {
    id: 5,
    q: "스트레스 해소법은?",
    a1: { text: "운동이나 액티비티로 발산", tags: ["E"] },
    a2: { text: "혼자 음악 듣거나 독서", tags: ["I"] },
  },
  {
    id: 6,
    q: "인테리어 소품을 살 때?",
    a1: { text: "기능성과 내구성을 먼저 체크", tags: ["T"] },
    a2: { text: "색감과 감성을 우선 고려", tags: ["F"] },
  },
  {
    id: 7,
    q: "친구가 갑자기 놀러온다!",
    a1: { text: "간식과 놀이를 미리 준비", tags: ["J"] },
    a2: { text: "와! 일단 반갑게 맞이", tags: ["P"] },
  },
  {
    id: 8,
    q: "휴일 오후, 선택은?",
    a1: { text: "야외 스포츠나 활동", tags: ["E", "S"] },
    a2: { text: "집콕하며 영화 몰아보기", tags: ["I", "N"] },
  },
  {
    id: 9,
    q: "펫 사진을 올린다면?",
    a1: { text: "관리법이나 정보 팁 포함", tags: ["T"] },
    a2: { text: "재미있는 스토리나 밈 캡션", tags: ["F"] },
  },
  {
    id: 10,
    q: "일과 중 알림이 왔다!",
    a1: { text: "바로 확인하고 답장", tags: ["P", "E"] },
    a2: { text: "업무 끝나고 몰아서 확인", tags: ["J", "I"] },
  },
  {
    id: 11,
    q: "새 취미에 도전할 때?",
    a1: { text: "레슨 받거나 교본부터 구매", tags: ["S", "J"] },
    a2: { text: "유튜브 보며 감부터 잡기", tags: ["N", "P"] },
  },
  {
    id: 12,
    q: "예상치 못한 돌발 상황이 생기면?",
    a1: { text: "침착하게 문제 해결 방법 모색", tags: ["T", "J"] },
    a2: { text: "웃으며 유연하게 대응", tags: ["F", "P"] },
  },
]

export default function PetMBTITest() {
  const quizLogic = useQuizLogic({
    testId: "pet-mbti",
    questions,
    resultPath: "/tests/pet-mbti/test/result",
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
