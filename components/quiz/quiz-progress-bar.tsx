import { memo } from "react";

export interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export const QuizProgressBar = memo(function QuizProgressBar({
  currentQuestion,
  totalQuestions,
  progress,
}: QuizProgressBarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-950">
            {currentQuestion + 1} / {totalQuestions}
          </span>
          <span className="font-semibold text-violet-700">
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
});
