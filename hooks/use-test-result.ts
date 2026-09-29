/** Quiz attempt and result persistence state shared by question flows. */
import { useCallback, useRef, useState } from 'react'
import { saveTestResult } from '@/lib/api-client'
import { trackResultSave, trackTestComplete, trackTestProgress, trackTestStart } from '@/lib/analytics'

interface UseTestResultOptions {
  testId: string
  /**
   * false for code-defined (static) quizzes: they have no parent row in the
   * `tests` table, so a server save can only fail. The result is shown from
   * the calculated type instead, without a request or a "save failed" notice.
   */
  persist?: boolean
  onSuccess?: (resultId: string, resultType: string) => void
  onError?: (error: Error, resultType: string) => void
  /** Called instead of saving when persist is false. */
  onComplete?: (resultType: string) => void
}

export function useTestResult({ testId, persist = true, onSuccess, onError, onComplete }: UseTestResultOptions) {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const attemptIdRef = useRef<string | null>(null)
  const completedRef = useRef(false)
  const inFlightRef = useRef(false)
  const savedResultRef = useRef<string | null>(null)

  const startAttempt = useCallback(() => {
    if (attemptIdRef.current) return attemptIdRef.current
    const attemptId = `attempt_${crypto.randomUUID()}`
    attemptIdRef.current = attemptId
    completedRef.current = false
    trackTestStart(testId)
    return attemptId
  }, [testId])

  const trackProgress = useCallback((answered: number, total: number) => {
    if (attemptIdRef.current) {
      trackTestProgress(testId, answered, total, attemptIdRef.current)
    }
  }, [testId])

  const saveResult = useCallback(async (resultType: string, answers: Record<number, string>) => {
    if (inFlightRef.current || !attemptIdRef.current || !resultType || !Object.keys(answers).length) return null
    if (savedResultRef.current) return savedResultRef.current
    // Calculation is complete before the save request; a failed save cannot undo it.
    if (!completedRef.current) {
      completedRef.current = true
      trackTestComplete(testId, resultType)
    }
    if (!persist) {
      onComplete?.(resultType)
      return null
    }
    inFlightRef.current = true
    setIsSaving(true)
    setError(null)
    let savedId: string
    try {
      const response = await saveTestResult({ testId, resultType, answers, attemptId: attemptIdRef.current })
      if (!response.success || !response.id) throw new Error('Invalid save response')
      savedId = response.id
    } catch (cause) {
      const saveError = cause instanceof Error ? cause : new Error('Failed to save test result')
      setError(saveError)
      trackResultSave(testId, 'error')
      onError?.(saveError, resultType)
      return null
    } finally {
      inFlightRef.current = false
      setIsSaving(false)
    }
    savedResultRef.current = savedId
    trackResultSave(testId, 'success')
    onSuccess?.(savedId, resultType)
    return savedId
  }, [testId, persist, onSuccess, onError, onComplete])

  return { saveResult, startAttempt, trackProgress, isSaving, error }
}
