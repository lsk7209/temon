"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";

interface Question {
  id: string;
  questionOrder: number;
  questionText: string;
  choice1Text: string;
  choice2Text: string;
  choice1Tags?: string;
  choice2Tags?: string;
}

interface Props {
  apiTestId: string;
  routeTestId: string;
  questions: Question[];
}

export default function ClientRunner({
  apiTestId,
  routeTestId,
  questions,
}: Props) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const quizQuestions: QuizQuestion[] = useMemo(
    () =>
      questions.map((q) => {
        let tags1: string[] = [];
        let tags2: string[] = [];
        try {
          tags1 = JSON.parse(q.choice1Tags || "[]");
        } catch {}
        try {
          tags2 = JSON.parse(q.choice2Tags || "[]");
        } catch {}

        return {
          id: q.id,
          q: q.questionText,
          a1: { text: q.choice1Text, tags: tags1 },
          a2: { text: q.choice2Text, tags: tags2 },
        };
      }),
    [questions],
  );

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];

  const submitQuiz = async (finalAnswers: number[]) => {
    setIsSaving(true);

    try {
      const answersPayload = Object.fromEntries(
        questions.map((question, index) => [question.id, finalAnswers[index]]),
      );

      const response = await fetch(`/api/tests/${apiTestId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersPayload }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit quiz: ${response.status}`);
      }

      const data = (await response.json()) as { resultId?: string };

      if (!data.resultId) {
        throw new Error("Missing result id from submit response");
      }

      router.push(`/tests/${routeTestId}/test/result/${data.resultId}`);
    } catch (error) {
      console.error("Failed to submit dynamic quiz:", error);
      setIsSaving(false);
    }
  };

  const handleChoiceSelect = (tags: string[]) => {
    if (isProcessing || isSaving) return;

    const choiceIndex = tags === currentQ.a1.tags ? 0 : 1;
    setIsProcessing(true);
    setSelectedChoice(tags.join(","));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const nextAnswers = [...answers, choiceIndex];
      setAnswers(nextAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedChoice("");
        setIsProcessing(false);
        return;
      }

      setIsProcessing(false);
      void submitQuiz(nextAnswers);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion === 0 || isProcessing || isSaving) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
    setSelectedChoice("");
  };

  if (!currentQ) {
    return null;
  }

  return (
    <QuizContainer
      currentQuestion={currentQuestion}
      currentQ={currentQ}
      selectedChoice={selectedChoice}
      isProcessing={isProcessing}
      isSaving={isSaving}
      progress={progress}
      questionsLength={quizQuestions.length}
      colorClasses={getQuizColorScheme("indigo-purple")}
      onChoiceSelect={handleChoiceSelect}
      onPrevious={handlePrevious}
    />
  );
}
