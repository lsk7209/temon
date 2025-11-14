/**
 * 퀴즈 진행률 표시 컴포넌트
 * 재사용 가능한 진행률 바
 */

import { memo } from "react"
import { Progress } from "@/components/ui/progress"

export interface QuizProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  progress: number
}

export const QuizProgressBar = memo(function QuizProgressBar({
  currentQuestion,
  totalQuestions,
  progress,
}: QuizProgressBarProps) {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentQuestion + 1} / {totalQuestions}
        </span>
        <Progress value={progress} className="flex-1" />
        <div className="text-sm text-muted-foreground">{Math.round(progress)}%</div>
      </div>
    </div>
  )
})

