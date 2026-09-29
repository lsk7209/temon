/**
 * 퀴즈 로직 커스텀 훅
 * 모든 퀴즈 테스트 페이지에서 재사용 가능한 공통 로직
 */

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { useTestResult } from "@/hooks/use-test-result"
import { convertAnswersToRecord } from "@/lib/utils/test-answers"
import { calculateMBTI } from "@/lib/utils/mbti-calculator"

export interface QuizQuestion {
  id: number | string
  q: string
  a1: { text: string; tags: string[] }
  a2: { text: string; tags: string[] }
}

export interface UseQuizLogicOptions {
  testId: string
  questions: QuizQuestion[]
  resultPath: string
  calculateResult?: (answers: string[][]) => string
}

export function useQuizLogic({
  testId,
  questions,
  resultPath,
  calculateResult = calculateMBTI,
}: UseQuizLogicOptions) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[][]>([])
  const [selectedChoice, setSelectedChoice] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const processingRef = useRef(false)

  const router = useRouter()
  const { saveResult, startAttempt, trackProgress, isSaving } = useTestResult({
    testId,
    // Static quiz: no DB parent row, so show the calculated type directly.
    persist: false,
    onComplete: (resultType) => {
      router.push(`${resultPath}?type=${encodeURIComponent(resultType)}`)
    },
  })

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion, questions.length]
  )

  // 테스트 시작 추적
  useEffect(() => {
    if (questions.length > 0) startAttempt()
  }, [questions.length, startAttempt])

  // cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      processingRef.current = false
    }
  }, [])

  const handleChoiceSelect = useCallback(
    async (tags: string[]) => {
      if (processingRef.current || isProcessing || isSaving) return

      processingRef.current = true
      setIsProcessing(true)
      setSelectedChoice(tags.join(","))
      const currentQuestionIndex = currentQuestion

      // Clear previous timeout if exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(async () => {
        const newAnswers = [...answers.slice(0, currentQuestionIndex), tags]
        setAnswers(newAnswers)
        trackProgress(newAnswers.length, questions.length)

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestion(currentQuestionIndex + 1)
          setSelectedChoice("")
          setIsProcessing(false)
          processingRef.current = false
        } else {
          const result = calculateResult(newAnswers)
          const answersRecord = convertAnswersToRecord(newAnswers)
          await saveResult(result, answersRecord)
        }
      }, 500)
    },
    [currentQuestion, answers, questions.length, saveResult, trackProgress, isProcessing, isSaving, calculateResult]
  )

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0 && !processingRef.current && !isSaving) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedChoice("")
    }
  }, [currentQuestion, answers, isSaving])

  const currentQ = useMemo(() => questions[currentQuestion], [currentQuestion, questions])

  return {
    currentQuestion,
    currentQ,
    answers,
    selectedChoice,
    isProcessing,
    isSaving,
    progress,
    handleChoiceSelect,
    handlePrevious,
    questionsLength: questions.length,
  }
}

