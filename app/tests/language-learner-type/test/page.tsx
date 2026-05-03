"use client";
import { useQuizLogic } from "@/hooks/use-quiz-logic";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";
import { LANGUAGE_LEARNER_TYPE_QUESTIONS } from "@/lib/data/language-learner-type-questions";

const questions: QuizQuestion[] = LANGUAGE_LEARNER_TYPE_QUESTIONS.map((qx) => ({
  id: qx.id, q: qx.text,
  a1: { text: qx.options[0].label, tags: [qx.options[0].tag] },
  a2: { text: qx.options[1].label, tags: [qx.options[1].tag] },
}));

export default function Test() {
  const quizLogic = useQuizLogic({
    testId: "language-learner-type", questions, resultPath: "/tests/language-learner-type/test/result",
  });
  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion} currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice} isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving} progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("purple-pink")}
      onChoiceSelect={quizLogic.handleChoiceSelect} onPrevious={quizLogic.handlePrevious}
    />
  );
}
