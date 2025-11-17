"use client"

/**
 * Component: YoutubeHabitTest
 * 유튜브 습관 테스트 페이지
 * @example <YoutubeHabitTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "유튜브 홈 화면에 떴을 때",
    a1: { text: "검색으로 정확히 찾는다", tags: ["J", "T", "S"] },
    a2: { text: "눈에 띄는 것부터 눌러본다", tags: ["P", "F", "N"] },
  },
  {
    id: 2,
    q: "유튜브 구독 채널을 관리할 때",
    a1: { text: "폴더와 알림 설정까지 체계적으로 관리한다", tags: ["J", "S"] },
    a2: { text: "대충 보다가 정리하려고 생각만 한다", tags: ["P", "N"] },
  },
  {
    id: 3,
    q: "유튜브 영상을 시청 중에 댓글을 볼 때",
    a1: { text: "정보나 타임스탬프 위주로 확인한다", tags: ["T", "I"] },
    a2: { text: "공감 댓글에 반응하고 대화에 참여한다", tags: ["F", "E"] },
  },
  {
    id: 4,
    q: "유튜브 영상 길이를 선호할 때",
    a1: { text: "10분 내외 핵심 요약을 선호한다", tags: ["S", "T"] },
    a2: { text: "길어도 깊게 보는 편이다", tags: ["N", "F"] },
  },
  {
    id: 5,
    q: "유튜브 재생 속도를 조절할 때",
    a1: { text: "1.25~2배로 효율적으로 시청한다", tags: ["T", "J"] },
    a2: { text: "기분에 따라 속도를 조절한다", tags: ["F", "P"] },
  },
  {
    id: 6,
    q: "유튜브 추천 알고리즘을 믿는 편인가",
    a1: { text: "데이터가 나를 잘 안다", tags: ["E", "N"] },
    a2: { text: "결국 내가 선별해야 한다", tags: ["I", "S"] },
  },
  {
    id: 7,
    q: "광고가 나오면?",
    a1: { text: "규칙적으로 스킵·차단 목록 관리", tags: ["T", "J"] },
    a2: { text: "상황 보며 그냥 둠", tags: ["F", "P"] },
  },
  {
    id: 8,
    q: "새 카테고리를 발견했다면?",
    a1: { text: "관련 자료 더 찾아 플레이리스트 저장", tags: ["N", "J"] },
    a2: { text: "보는 김에 연속 재생", tags: ["S", "P"] },
  },
  {
    id: 9,
    q: "유튜브를 시청할 때 장소와 모드를 선택할 때",
    a1: { text: "집중 가능한 환경에서 전체화면으로 본다", tags: ["I", "J"] },
    a2: { text: "이동 중 멀티태스킹으로 본다", tags: ["E", "P"] },
  },
  {
    id: 10,
    q: "정보 영상과 브이로그가 동시에 뜨면?",
    a1: { text: "정보 영상 먼저, 후 보상 시청", tags: ["T", "J"] },
    a2: { text: "감정 끌리는 브이로그부터", tags: ["F", "P"] },
  },
  {
    id: 11,
    q: "유튜브 영상에 좋아요와 공유를 할 때",
    a1: { text: "참고 가치 있을 때만 눌러 기록한다", tags: ["I", "T"] },
    a2: { text: "재미있으면 곧장 단톡방에 공유한다", tags: ["E", "F"] },
  },
  {
    id: 12,
    q: "이탈 포인트가 생기면?",
    a1: { text: "챕터·자막·요약으로 건너뛰기", tags: ["S", "T"] },
    a2: { text: "썸네일·연관영상으로 갈아탄다", tags: ["N", "P"] },
  },
]

export default function YoutubeHabitTest() {
  const quizLogic = useQuizLogic({
    testId: "youtube-habit",
    questions,
    resultPath: "/tests/youtube-habit/test/result",
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
      colorClasses={getQuizColorScheme("red")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  )
}
