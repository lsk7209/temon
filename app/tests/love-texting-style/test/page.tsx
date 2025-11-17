"use client"

/**
 * Component: LoveTextingStyleTest
 * 연애 텍스팅 스타일 테스트 페이지
 * @example <LoveTextingStyleTest />
 */

import { useQuizLogic } from "@/hooks/use-quiz-logic"
import { QuizContainer } from "@/components/quiz/quiz-container"
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

const questions: QuizQuestion[] = [
  {
    id: 1,
    q: "호감 있는 사람에게 첫 연락 주기?",
    a1: { text: "먼저 건넨다", tags: ["E"] },
    a2: { text: "상대 반응을 보고 움직인다", tags: ["I"] },
  },
  {
    id: 2,
    q: "호감 있는 사람이 '오늘 뭐했어?'라고 물어봤을 때 답장을 쓸 때",
    a1: { text: "핵심만 짧게 '밥 먹고 집에 있었어'라고 답장한다", tags: ["S"] },
    a2: { text: "감정과 맥락까지 자세히 '오늘은 좀 피곤해서 집에서 쉬었는데...'라고 답장한다", tags: ["N"] },
  },
  {
    id: 3,
    q: "데이트 일정을 정하려고 할 때",
    a1: { text: "날짜·시간·장소를 먼저 제안한다", tags: ["J"] },
    a2: { text: "서로 아이디어를 주고받으며 정한다", tags: ["P"] },
  },
  {
    id: 4,
    q: "호감 있는 사람의 메시지 톤이 애매해서 오해가 생길 것 같을 때",
    a1: { text: "사실관계를 확인해본다", tags: ["T"] },
    a2: { text: "기분이 상하지 않았는지 묻는다", tags: ["F"] },
  },
  {
    id: 5,
    q: "하루 종일 연락을 주고받을 때",
    a1: { text: "정해진 타이밍에 꾸준히 연락한다", tags: ["J"] },
    a2: { text: "상황·기분에 따라 유동적으로 연락한다", tags: ["P"] },
  },
  {
    id: 6,
    q: "대화할 소재를 고를 때",
    a1: { text: "오늘 있었던 구체적 일상을 이야기한다", tags: ["S"] },
    a2: { text: "앞날·상상·취향에 대해 이야기한다", tags: ["N"] },
  },
  {
    id: 7,
    q: "대화 중에 다툼 조짐이 보일 때",
    a1: { text: "논점을 정리해 합의점을 찾는다", tags: ["T"] },
    a2: { text: "감정 진정부터 하고 이야기한다", tags: ["F"] },
  },
  {
    id: 8,
    q: "메시지를 읽었는데 답장이 늦어질 것 같을 때",
    a1: { text: "미리 알림·약속 메시지를 남긴다", tags: ["J"] },
    a2: { text: "나중에 한 번에 길게 회신한다", tags: ["P"] },
  },
  {
    id: 9,
    q: "썸 단계에서 분위기를 만들고 싶을 때",
    a1: { text: "전화·만남 제안으로 텐션을 올린다", tags: ["E"] },
    a2: { text: "글·사진으로 잔잔한 관심을 표현한다", tags: ["I"] },
  },
  {
    id: 10,
    q: "선물이나 이벤트에 대해 소통할 때",
    a1: { text: "실용적 힌트로 니즈를 파악한다", tags: ["T"] },
    a2: { text: "의미·감정을 담아 서프라이즈한다", tags: ["F"] },
  },
  {
    id: 11,
    q: "연락할 채널을 선택할 때",
    a1: { text: "메신저 고정, 기록 관리 중시한다", tags: ["S"] },
    a2: { text: "상황에 맞춰 통화·영상으로 전환한다", tags: ["N"] },
  },
  {
    id: 12,
    q: "데이트 직후에 메시지를 보낼 때",
    a1: { text: "오늘의 하이라이트·다음 액션을 정리한다", tags: ["T"] },
    a2: { text: "함께한 감정·여운을 나눈다", tags: ["F"] },
  },
]

export default function LoveTextingStyleTest() {
  const quizLogic = useQuizLogic({
    testId: "love-texting-style",
    questions,
    resultPath: "/tests/love-texting-style/test/result",
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
