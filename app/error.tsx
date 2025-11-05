'use client'

/**
 * 전역 에러 페이지
 * Next.js Error Boundary
 */

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { trackError } from '@/lib/analytics'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 추적
    if (typeof window !== 'undefined') {
      trackError(error.message, window.location.pathname)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">오류가 발생했습니다</CardTitle>
          <CardDescription className="mt-2">
            예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="p-3 bg-gray-100 rounded-md text-sm font-mono text-gray-700 break-all">
              {error.message}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full" variant="default">
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

