"use client";
import { useQuizLogic } from "@/hooks/use-quiz-logic";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";
import { GOAL_PERSISTENCE_QUESTIONS } from "@/lib/data/goal-persistence-questions";

const questions: QuizQuestion[] = GOAL_PERSISTENCE_QUESTIONS.map((qx) => ({
  id: qx.id, q: qx.text,
  a1: { text: qx.options[0].label, tags: [qx.options[0].tag] },
  a2: { text: qx.options[1].label, tags: [qx.options[1].tag] },
}));

export default function Test() {
  const quizLogic = useQuizLogic({
    testId: "goal-persistence", questions, resultPath: "/tests/goal-persistence/test/result",
  });
  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion} currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice} isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving} progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("green-emerald")}
      onChoiceSelect={quizLogic.handleChoiceSelect} onPrevious={quizLogic.handlePrevious}
    />
  );
}
