/**
 * 퀴즈 컨테이너 컴포넌트
 * 모든 퀴즈 테스트 페이지에서 사용하는 공통 레이아웃
 */

import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuizProgressBar } from "./quiz-progress-bar"
import { QuizChoiceButton } from "./quiz-choice-button"
import { cn } from "@/lib/utils"
import type { QuizQuestion } from "@/hooks/use-quiz-logic"

export interface QuizColorClasses {
  selectedBorder: string
  selectedBg: string
  hoverBorder: string
  hoverBg: string
  focusRing: string
  radioSelected: string
  questionNumberBg: string
}

export interface QuizContainerProps {
  currentQuestion: number
  currentQ: QuizQuestion
  selectedChoice: string
  isProcessing: boolean
  isSaving: boolean
  progress: number
  questionsLength: number
  colorClasses: QuizColorClasses
  onChoiceSelect: (tags: string[]) => void
  onPrevious: () => void
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
    <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <QuizProgressBar
        currentQuestion={currentQuestion}
        totalQuestions={questionsLength}
        progress={progress}
      />

      <main className="container max-w-[720px] mx-auto px-4 py-8">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className={cn("w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg", colorClasses.questionNumberBg)}>
                <span className="text-white font-bold text-2xl">{currentQuestion + 1}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200">
                {currentQ.q}
              </h1>
            </div>

            <div className="space-y-4" role="radiogroup" aria-label={`질문 ${currentQuestion + 1}: ${currentQ.q}`}>
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

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentQuestion === 0 || isProcessing || isSaving}
                className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50"
                aria-label="이전 질문으로 이동"
              >
                <span>이전</span>
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">
                {isSaving ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin">⏳</span>
                    <span>결과 저장 중...</span>
                  </span>
                ) : (
                  <span>답변을 선택하면 자동으로 다음으로 이동합니다</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
})

