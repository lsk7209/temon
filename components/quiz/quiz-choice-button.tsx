import { memo } from "react";
import type React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizChoiceButtonProps {
  text: string;
  tags: string[];
  selectedChoice: string;
  isProcessing: boolean;
  isSaving: boolean;
  colorClasses: {
    selectedBorder: string;
    selectedBg: string;
    hoverBorder: string;
    hoverBg: string;
    focusRing: string;
    radioSelected: string;
  };
  onSelect: (tags: string[]) => void;
  choiceIndex: number;
  questionNumber: number;
  questionText: string;
}

export const QuizChoiceButton = memo(function QuizChoiceButton({
  text,
  tags,
  selectedChoice,
  isProcessing,
  isSaving,
  colorClasses,
  onSelect,
  choiceIndex,
  questionNumber,
  questionText,
}: QuizChoiceButtonProps) {
  const isSelected = selectedChoice === tags.join(",");
  const isDisabled = isProcessing || isSaving;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isDisabled) onSelect(tags);
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(tags)}
      disabled={isDisabled}
      aria-label={`질문 ${questionNumber}, 선택지 ${choiceIndex + 1}: ${questionText} - ${text}`}
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
      className={cn(
        "group min-h-[96px] w-full rounded-lg border p-4 text-left transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isSelected
          ? cn(colorClasses.selectedBorder, colorClasses.selectedBg, "shadow-sm")
          : cn(
              "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/50",
              colorClasses.hoverBorder,
              colorClasses.hoverBg,
            ),
        colorClasses.focusRing,
      )}
    >
      <span className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
            isSelected
              ? cn(colorClasses.radioSelected, "text-white")
              : "border-slate-300 bg-slate-50 text-slate-500",
          )}
          aria-hidden="true"
        >
          {isSelected ? <Check className="h-4 w-4" /> : choiceIndex + 1}
        </span>
        <span className="min-w-0 break-keep text-base font-semibold leading-7 text-slate-800 sm:text-lg">
          {text}
        </span>
      </span>
    </button>
  );
});
