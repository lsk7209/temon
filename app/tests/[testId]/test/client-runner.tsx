"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { getQuizColorScheme } from "@/lib/utils/quiz-color-schemes";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";
import { trackResultSave, trackTestComplete, trackTestProgress, trackTestStart } from "@/lib/analytics";

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
  const attemptIdRef = useRef<string | null>(null);
  const processingRef = useRef(false);
  const savingRef = useRef(false);
  const submittedRef = useRef(false);
  const completedRef = useRef(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (questions.length && !attemptIdRef.current) {
      attemptIdRef.current = `attempt_${crypto.randomUUID()}`;
      trackTestStart(routeTestId);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [questions.length, routeTestId]);

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
    if (savingRef.current || submittedRef.current) return;
    if (!completedRef.current) {
      completedRef.current = true;
      trackTestComplete(routeTestId, undefined, attemptIdRef.current ?? undefined);
    }
    savingRef.current = true;
    setIsSaving(true);
    setErrorMessage(null);
    let savedResultId: string | undefined;

    try {
      const answersPayload = Object.fromEntries(
        questions.map((question, index) => [question.id, finalAnswers[index]]),
      );

      const response = await fetch(`/api/tests/${apiTestId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: answersPayload, attemptId: attemptIdRef.current ?? undefined }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit quiz: ${response.status}`);
      }

      const data = (await response.json()) as { resultId?: string };

      if (!data.resultId) {
        throw new Error("Missing result id from submit response");
      }

      trackResultSave(routeTestId, "success", { attemptId: attemptIdRef.current ?? undefined });
      submittedRef.current = true;
      savedResultId = data.resultId;
    } catch (error) {
      console.error("Failed to submit dynamic quiz:", error);
      const errorCode = error instanceof Error && error.name === "TimeoutError" ? "timeout" : "network";
      trackResultSave(routeTestId, "error", { attemptId: attemptIdRef.current ?? undefined, errorCode });
      setErrorMessage("답변은 이 화면에 남아 있지만 결과 계산과 서버 저장을 확인하지 못했습니다. 이전 질문에서 답변을 확인할 수 있습니다. 마지막 답을 다시 선택하면 같은 시도로 재전송됩니다.");
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
    if (savedResultId) router.push(`/results/${routeTestId}/${savedResultId}`);
  };

  const handleChoiceSelect = (tags: string[]) => {
    if (processingRef.current || savingRef.current || submittedRef.current || isProcessing || isSaving) return;

    const choiceIndex = tags === currentQ.a1.tags ? 0 : 1;
    processingRef.current = true;
    setIsProcessing(true);
    setSelectedChoice(tags.join(","));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const nextAnswers = [...answers.slice(0, currentQuestion), choiceIndex];
      setAnswers(nextAnswers);
      setErrorMessage(null);
      if (attemptIdRef.current) trackTestProgress(routeTestId, nextAnswers.length, quizQuestions.length, attemptIdRef.current);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedChoice("");
        setIsProcessing(false);
        processingRef.current = false;
        return;
      }

      setIsProcessing(false);
      processingRef.current = false;
      void submitQuiz(nextAnswers);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion === 0 || processingRef.current || savingRef.current || isProcessing || isSaving) return;

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
      errorMessage={errorMessage || undefined}
    />
  );
}
