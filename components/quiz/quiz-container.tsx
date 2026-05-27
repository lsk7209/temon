import { memo } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizChoiceButton } from "./quiz-choice-button";
import { QuizProgressBar } from "./quiz-progress-bar";
import type { QuizQuestion } from "@/hooks/use-quiz-logic";

export interface QuizColorClasses {
  selectedBorder: string;
  selectedBg: string;
  hoverBorder: string;
  hoverBg: string;
  focusRing: string;
  radioSelected: string;
  questionNumberBg: string;
}

export interface QuizContainerProps {
  currentQuestion: number;
  currentQ: QuizQuestion;
  selectedChoice: string;
  isProcessing: boolean;
  isSaving: boolean;
  progress: number;
  questionsLength: number;
  colorClasses: QuizColorClasses;
  onChoiceSelect: (tags: string[]) => void;
  onPrevious: () => void;
}

export const QuizContainer = memo(function QuizContainer({
  currentQuestion,
  currentQ,
  selectedChoice,
  isProcessing,
  isSaving,
  progress,
  questionsLength,
  colorClasses,
  onChoiceSelect,
  onPrevious,
}: QuizContainerProps) {
  return (
    <div className="temon-flow min-h-screen bg-[#f6f7f9]">
      <QuizProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={questionsLength}
        progress={progress}
      />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <p className="mb-3 text-sm font-bold text-violet-700">
              질문 {currentQuestion + 1}
            </p>
            <h1 className="break-keep text-2xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-3xl">
              {currentQ.q}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              더 가까운 선택지를 누르면 자동으로 다음 질문으로 이동합니다.
            </p>
          </div>

          <div
            className="grid gap-3"
            role="radiogroup"
            aria-label={`질문 ${currentQuestion + 1}: ${currentQ.q}`}
          >
            <QuizChoiceButton
              text={currentQ.a1.text}
              tags={currentQ.a1.tags}
              selectedChoice={selectedChoice}
              isProcessing={isProcessing}
              isSaving={isSaving}
              colorClasses={colorClasses}
              onSelect={onChoiceSelect}
              choiceIndex={0}
              questionNumber={currentQuestion + 1}
              questionText={currentQ.q}
            />
            <QuizChoiceButton
              text={currentQ.a2.text}
              tags={currentQ.a2.tags}
              selectedChoice={selectedChoice}
              isProcessing={isProcessing}
              isSaving={isSaving}
              colorClasses={colorClasses}
              onSelect={onChoiceSelect}
              choiceIndex={1}
              questionNumber={currentQuestion + 1}
              questionText={currentQ.q}
            />
          </div>
        </section>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentQuestion === 0 || isProcessing || isSaving}
            className="bg-white"
            aria-label="이전 질문으로 이동"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전
          </Button>

          <div className="min-w-0 text-right text-sm text-slate-500">
            {isSaving ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                결과 저장 중
              </span>
            ) : (
              <span>선택 후 잠시 기다려 주세요.</span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});
