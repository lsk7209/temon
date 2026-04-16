"use client"

/**
 * Component: CookingMusicTest
 * 요리 음악 테스트 페이지
 * @example <CookingMusicTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "요리할 때 음악을 켤 때",
    a1: { text: "항상 음악을 켜고 요리한다", tags: ["E", "P"] },
    a2: { text: "조용히 집중해서 요리한다", tags: ["I", "J"] },
  },
  {
    id: 2,
    q: "요리할 때 음악 선택",
    a1: { text: "즉흥적으로 기분에 맞는 음악을 선택한다", tags: ["P", "F"] },
    a2: { text: "미리 플레이리스트를 만들어 둔다", tags: ["J", "T"] },
  },
  {
    id: 3,
    q: "요리할 때 음악 장르",
    a1: { text: "다양한 장르를 시도한다", tags: ["N", "P"] },
    a2: { text: "익숙한 장르를 듣는다", tags: ["S", "J"] },
  },
  {
    id: 4,
    q: "요리할 때 음악 볼륨",
    a1: { text: "크게 들어서 분위기를 낸다", tags: ["E", "F"] },
    a2: { text: "작게 들어서 배경음으로만 듣는다", tags: ["I", "T"] },
  },
  {
    id: 5,
    q: "요리할 때 음악 공유",
    a1: { text: "다른 사람과 함께 음악을 듣는다", tags: ["E", "F"] },
    a2: { text: "혼자만 음악을 듣는다", tags: ["I", "T"] },
  },
  {
    id: 6,
    q: "요리할 때 음악 변경",
    a1: { text: "자주 음악을 바꾼다", tags: ["P", "N"] },
    a2: { text: "같은 음악을 계속 듣는다", tags: ["J", "S"] },
  },
  {
    id: 7,
    q: "요리할 때 음악 집중",
    a1: { text: "음악을 들으며 요리하는 게 집중된다", tags: ["E", "P"] },
    a2: { text: "음악이 집중을 방해한다", tags: ["I", "J"] },
  },
  {
    id: 8,
    q: "요리할 때 음악 준비",
    a1: { text: "미리 음악을 준비한다", tags: ["J", "S"] },
    a2: { text: "그때그때 음악을 선택한다", tags: ["P", "N"] },
  },
  {
    id: 9,
    q: "요리할 때 음악 효과",
    a1: { text: "음악이 요리 분위기를 좋게 만든다", tags: ["E", "F"] },
    a2: { text: "음악 없이도 요리할 수 있다", tags: ["I", "T"] },
  },
  {
    id: 10,
    q: "요리할 때 음악 기록",
    a1: { text: "요리할 때 듣는 음악을 기록한다", tags: ["J", "S"] },
    a2: { text: "음악을 기록하지 않는다", tags: ["P", "N"] },
  },
  {
    id: 11,
    q: "요리할 때 음악 스타일",
    a1: { text: "요리에 맞는 음악을 선택한다", tags: ["J", "T"] },
    a2: { text: "기분에 맞는 음악을 선택한다", tags: ["P", "F"] },
  },
  {
    id: 12,
    q: "요리할 때 음악 목적",
    a1: { text: "요리를 즐겁게 만들기 위해", tags: ["E", "F"] },
    a2: { text: "집중하거나 시간을 보내기 위해", tags: ["I", "T"] },
  },
]

export default function CookingMusicTest() {
  const quizLogic = useQuizLogic({
    testId: "cooking-music",
    questions,
    resultPath: "/tests/cooking-music/test/result",
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
      colorClasses={getQuizColorScheme("pink-rose")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
