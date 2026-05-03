/**
 * 테스트 결과 저장 훅
 * 모든 테스트 페이지에서 재사용 가능
 */

import { useState, useCallback } from 'react'
import { saveTestResult } from '@/lib/api-client'
import { trackTestComplete } from '@/lib/analytics'

interface UseTestResultOptions {
  testId: string
  onSuccess?: (resultId: string, resultType: string) => void
  onError?: (error: Error, resultType: string) => void
}

export function useTestResult({ testId, onSuccess, onError }: UseTestResultOptions) {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const saveResult = useCallback(
    async (resultType: string, answers: Record<number, string>) => {
      setIsSaving(true)
      setError(null)

      try {
        const response = await saveTestResult({
          testId,
          resultType,
          answers,
        })

        trackTestComplete(testId, resultType)

        if (onSuccess) {
          onSuccess(response.id, resultType)
        }

        return response.id
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to save test result')
        setError(error)

        if (onError) {
          onError(error, resultType)
        }

        // 저장 실패는 치명적이지 않음 — 테스트는 계속 진행
        console.error('Failed to save test result:', error)

        return null
      } finally {
        setIsSaving(false)
      }
    },
    [testId, onSuccess, onError]
  )

  return {
    saveResult,
    isSaving,
    error,
  }
}
