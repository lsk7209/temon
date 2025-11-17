"use client"

/**
 * Component: MusicTasteTest
 * 음악 취향 테스트 페이지
 * @example <MusicTasteTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "새로운 음악을 발견할 때",
    a1: { text: "친구 추천을 믿는다", tags: ["E"] },
    a2: { text: "혼자 찾아 듣는다", tags: ["I"] },
  },
  {
    id: 2,
    q: "음악 재생은 언제?",
    a1: { text: "이동 중 / 출퇴근길", tags: ["S"] },
    a2: { text: "잠들기 전 / 감정 정리 시간", tags: ["N"] },
  },
  {
    id: 3,
    q: "음악 취향은?",
    a1: { text: "장르 중심, 멜로디 위주", tags: ["S"] },
    a2: { text: "가사 중심, 의미 중시", tags: ["N"] },
  },
  {
    id: 4,
    q: "플레이리스트를 정리할 때",
    a1: { text: "테마별로 체계적으로 정리", tags: ["J"] },
    a2: { text: "듣고 싶은 대로 즉흥 추가", tags: ["P"] },
  },
  {
    id: 5,
    q: "노래를 듣는 이유는",
    a1: { text: "집중력 향상 / 작업용", tags: ["T"] },
    a2: { text: "위로 / 감정 해소", tags: ["F"] },
  },
  {
    id: 6,
    q: "콘서트 갈 때",
    a1: { text: "사람들과 어울리는 게 즐겁다", tags: ["E"] },
    a2: { text: "공연 자체에 몰입한다", tags: ["I"] },
  },
  {
    id: 7,
    q: "슬플 때 듣는 노래는",
    a1: { text: "분위기를 전환시키는 밝은 곡", tags: ["T"] },
    a2: { text: "감정을 더 깊게 공감하는 곡", tags: ["F"] },
  },
  {
    id: 8,
    q: "새로운 아티스트를 알게 되면",
    a1: { text: "전 앨범을 분석해 듣는다", tags: ["J"] },
    a2: { text: "한두 곡만 들어본다", tags: ["P"] },
  },
  {
    id: 9,
    q: "음악 추천 알고리즘이 이상할 때",
    a1: { text: "스킵 후 새로 맞춤 추천", tags: ["T"] },
    a2: { text: "혹시 내 기분을 안 건가 생각", tags: ["F"] },
  },
  {
    id: 10,
    q: "음악 취향을 물으면",
    a1: { text: "구체적 장르명으로 설명", tags: ["S"] },
    a2: { text: "감정/상황으로 표현", tags: ["N"] },
  },
  {
    id: 11,
    q: "음악 감상 스타일",
    a1: { text: "멀티태스킹 중 배경음악", tags: ["T"] },
    a2: { text: "오직 음악에 집중", tags: ["F"] },
  },
  {
    id: 12,
    q: "리믹스/커버곡에 대한 생각",
    a1: { text: "원곡이 최고다", tags: ["J"] },
    a2: { text: "새 버전이 더 좋을 때도 있다", tags: ["P"] },
  },
]

export default function MusicTasteTest() {
  const quizLogic = useQuizLogic({
    testId: "music-taste",
    questions,
    resultPath: "/tests/music-taste/test/result",
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

