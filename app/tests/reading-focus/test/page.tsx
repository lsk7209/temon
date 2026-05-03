"use client";
import { useQuizLogic } from "@/hooks/use-quiz-logic";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";
import { READING_FOCUS_QUESTIONS } from "@/lib/data/reading-focus-questions";

const questions: QuizQuestion[] = READING_FOCUS_QUESTIONS.map((qx) => ({
  id: qx.id, q: qx.text,
  a1: { text: qx.options[0].label, tags: [qx.options[0].tag] },
  a2: { text: qx.options[1].label, tags: [qx.options[1].tag] },
}));

export default function Test() {
  const quizLogic = useQuizLogic({
    testId: "reading-focus", questions, resultPath: "/tests/reading-focus/test/result",
  });
  return (
    <QuizContainer
      currentQuestion={quizLogic.currentQuestion} currentQ={quizLogic.currentQ}
      selectedChoice={quizLogic.selectedChoice} isProcessing={quizLogic.isProcessing}
      isSaving={quizLogic.isSaving} progress={quizLogic.progress}
      questionsLength={quizLogic.questionsLength}
      colorClasses={getQuizColorScheme("amber-orange")}
      onChoiceSelect={quizLogic.handleChoiceSelect} onPrevious={quizLogic.handlePrevious}
    />
  );
}
