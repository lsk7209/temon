"use client"

/**
 * Component: KDramaMBTITest
 * K-드라마 MBTI 테스트 페이지
 * @example <KDramaMBTITest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "비 오는 날, 누군가 우산을 씌워줬다. 당신은? 🌂",
    a1: { text: "심쿵하며 눈을 마주친다 💕", tags: ["pure"] },
    a2: { text: '"이거 필요 없는데요?" 하고 쿨하게 뿌리친다 😎', tags: ["chaebol"] },
  },
  {
    id: 2,
    q: "갑자기 첫사랑이 나타났다! 💘",
    a1: { text: "눈물 글썽이며 달려간다 😭", tags: ["crying"] },
    a2: { text: '아무렇지 않게 "잘 지냈어?" 한다 ☕', tags: ["gukbap"] },
  },
  {
    id: 3,
    q: "길에서 부딪힌 낯선 사람. 드라마라면? 💫",
    a1: { text: "바로 사랑에 빠진다 💘", tags: ["pure"] },
    a2: { text: "그냥 사과하고 지나간다 🙃", tags: ["gukbap"] },
  },
  {
    id: 4,
    q: "위기 상황! 당신의 선택은? ⚡",
    a1: { text: "내가 직접 구하러 뛴다 💪", tags: ["chaebol"] },
    a2: { text: "그냥 국밥 먹으러 간다 🍲", tags: ["gukbap"] },
  },
  {
    id: 5,
    q: "대사 한마디로 승부 본다. 당신의 스타일은? 💬",
    a1: { text: '"내 마음 아직도 네 거야." 💔', tags: ["pure"] },
    a2: { text: '"이러다 늦겠다, 먼저 간다." 🏃', tags: ["chaebol"] },
  },
  {
    id: 6,
    q: "집안 배경은? 🏠",
    a1: { text: "재벌가 대저택 🏰", tags: ["chaebol"] },
    a2: { text: "옥탑방 원룸 🏚️", tags: ["comic"] },
  },
  {
    id: 7,
    q: "연애 중 싸움이 났다! 💢",
    a1: { text: "울면서 매달린다 😢", tags: ["crying"] },
    a2: { text: '"그럼 헤어지자." 😐', tags: ["chaebol"] },
  },
  {
    id: 8,
    q: "가장 닮은 드라마 장르는? 🎭",
    a1: { text: "눈물 쏙 빼는 정통 멜로 😭", tags: ["crying"] },
    a2: { text: "웃긴 상황극 같은 로코 😂", tags: ["comic"] },
  },
  {
    id: 9,
    q: "누군가 고백했다! 💌",
    a1: { text: '"나도 좋아했어." ❤️', tags: ["pure"] },
    a2: { text: '"고마워, 근데 안 돼." 🚫', tags: ["gukbap"] },
  },
  {
    id: 10,
    q: "엔딩씬, 당신의 선택은? 🎬",
    a1: { text: "슬로모션 키스 💋", tags: ["pure"] },
    a2: { text: "그냥 국밥 먹으며 크레딧 올라감 🍲", tags: ["comic"] },
  },
]

// Custom result calculation for kdrama-mbti
const calculateKdramaMBTIResult = (answers: string[][]): string => {
  const scores: Record<string, number> = {
    chaebol: 0,
    pure: 0,
    comic: 0,
    crying: 0,
    gukbap: 0,
  }

  answers.forEach((answerTags) => {
    answerTags.forEach((tag) => {
      if (scores.hasOwnProperty(tag)) {
        scores[tag]++
      }
    })
  })

  // 가장 높은 점수를 가진 타입 반환
  return Object.entries(scores).reduce((a, b) => (scores[a[0]] > scores[b[0]] ? a : b))[0]
}

export default function KDramaMBTITest() {
  const quizLogic = useQuizLogic({
    testId: "kdrama-mbti",
    questions,
    resultPath: "/kdrama-mbti/test/result",
    calculateResult: calculateKdramaMBTIResult,
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
