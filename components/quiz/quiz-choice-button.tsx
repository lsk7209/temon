/**
 * 퀴즈 선택지 버튼 컴포넌트
 * 재사용 가능한 접근성과 성능 최적화된 선택지 버튼
 */

import { memo } from "react"
import { cn } from "@/lib/utils"

export interface QuizChoiceButtonProps {
  text: string
  tags: string[]
  selectedChoice: string
  isProcessing: boolean
  isSaving: boolean
  colorClasses: {
    selectedBorder: string
    selectedBg: string
    hoverBorder: string
    hoverBg: string
    focusRing: string
    radioSelected: string
  }
  onSelect: (tags: string[]) => void
  choiceIndex: number
  questionNumber: number
  questionText: string
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
  const isSelected = selectedChoice === tags.join(",")
  const isDisabled = isProcessing || isSaving

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (!isDisabled) {
        onSelect(tags)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(tags)}
      disabled={isDisabled}
      aria-label={`선택지 ${choiceIndex + 1}: ${text}`}
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        !isDisabled && "hover:scale-[1.02]",
        isSelected
          ? cn(colorClasses.selectedBorder, colorClasses.selectedBg, "shadow-lg")
          : cn("border-gray-200 dark:border-gray-700", colorClasses.hoverBorder, colorClasses.hoverBg),
        colorClasses.focusRing
      )}
    >
      <div className="flex items-center space-x-4">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
            isSelected ? colorClasses.radioSelected : "border-gray-300 dark:border-gray-600"
          )}
          aria-hidden="true"
        >
          {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
        </div>
        <span className="text-lg font-medium flex-1 text-gray-800 dark:text-gray-200">{text}</span>
      </div>
    </button>
  )
})

