/**
 * 테스트 결과 저장 훅
 * 모든 테스트 페이지에서 재사용 가능
 */

import { useState, useCallback } from 'react'
import { saveTestResult } from '@/lib/api-client'
import { trackTestComplete } from '@/lib/analytics'

// analytics.js에서 제공하는 전역 함수 타입
declare global {
  interface Window {
    temonAnalytics?: {
      trackAttemptStarted?: (quizId: string, attemptId: string) => void
      trackAttemptCompleted?: (attemptId: string) => void
      trackAttemptAbandoned?: (attemptId: string, reason?: string) => void
    }
  }
}

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

      // attempt_id 생성 (결과 ID와 동일하게 사용)
      const attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      try {
        // 테스트 시작 이벤트 전송 (D1 데이터베이스에 저장)
        if (typeof window !== 'undefined' && window.temonAnalytics?.trackAttemptStarted) {
          window.temonAnalytics.trackAttemptStarted(testId, attemptId)
        } else {
          // analytics.js가 로드되지 않은 경우 직접 전송
          fetch('/api/collect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'attempt_started',
              quiz_id: testId,
              attempt_id: attemptId,
            }),
            keepalive: true,
          }).catch(console.error)
        }

        // 결과 저장
        const response = await saveTestResult({
          testId,
          resultType,
          answers,
        })

        // 테스트 완료 이벤트 전송 (D1 데이터베이스에 저장)
        if (typeof window !== 'undefined' && window.temonAnalytics?.trackAttemptCompleted) {
          window.temonAnalytics.trackAttemptCompleted(attemptId)
        } else {
          // analytics.js가 로드되지 않은 경우 직접 전송
          fetch('/api/collect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'attempt_completed',
              attempt_id: attemptId,
            }),
            keepalive: true,
          }).catch(console.error)
        }

        // Google Analytics 추적
        trackTestComplete(testId, resultType)

        // 성공 콜백 (resultType 전달)
        if (onSuccess) {
          onSuccess(response.id, resultType)
        }

        return response.id
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to save test result')
        setError(error)

        // 테스트 이탈 이벤트 전송
        if (typeof window !== 'undefined' && window.temonAnalytics?.trackAttemptAbandoned) {
          window.temonAnalytics.trackAttemptAbandoned(attemptId, 'save_error')
        } else {
          fetch('/api/collect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'attempt_abandoned',
              attempt_id: attemptId,
              reason: 'save_error',
            }),
            keepalive: true,
          }).catch(console.error)
        }

        // 에러 콜백 (resultType 전달)
        if (onError) {
          onError(error, resultType)
        }

        // 에러가 발생해도 테스트는 계속 진행 (저장 실패는 치명적이지 않음)
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

