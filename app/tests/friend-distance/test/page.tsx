"use client";

import { useQuizLogic } from "@/hooks/use-quiz-logic";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";
import { FRIEND_DISTANCE_QUESTIONS } from "@/lib/data/friend-distance-questions";

const questions: QuizQuestion[] = FRIEND_DISTANCE_QUESTIONS.map((q) => ({
  id: q.id,
  q: q.text,
  a1: { text: q.options[0].label, tags: [q.options[0].tag] },
  a2: { text: q.options[1].label, tags: [q.options[1].tag] },
}));

export default function FriendDistanceTest() {
  const quizLogic = useQuizLogic({
    testId: "friend-distance",
    questions,
    resultPath: "/tests/friend-distance/test/result",
  });

  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion}
      currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice}
      isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving}
      progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("violet-fuchsia")}
      onChoiceSelect={quizLogic.handleChoiceSelect}
      onPrevious={quizLogic.handlePrevious}
    />
  );
}
