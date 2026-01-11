"use client"

/**
 * 공유 버튼 컴포넌트
 * 친구들에게 공유하기 버튼만 제공
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { createShareLink } from '@/lib/api-client'
import { trackShare } from '@/lib/analytics'

interface ShareButtonsProps {
  testId: string
  testPath: string
  resultType: string
  resultId?: string
  title: string
  description: string
}

export function ShareButtons({
  testId,
  testPath,
  resultType,
  resultId,
  title,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = createShareLink(testPath, resultType, resultId)
  // 후킹 문구: 제목과 설명을 조합
  const hookText = `${title} ${description}`

  const handleShare = async () => {
    // Analytics 추적
    trackShare(testId, 'share_click')

    // 링크 + 후킹문구를 함께 복사 (클립보드용)
    const fullShareText = `${hookText}\n\n${shareUrl}`

    try {
      // 1. 모바일 Native Share 시도
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: title,
          text: hookText,
          url: shareUrl,
        })
        trackShare(testId, 'share_native_success')
        return
      }

      // 2. Clipboard API 시도
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullShareText)
        setCopied(true)
        trackShare(testId, 'share_copy_success')
        setTimeout(() => setCopied(false), 2000)
      } else {
        // 3. Fallback: textarea 사용
        const textarea = document.createElement('textarea')
        textarea.value = fullShareText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        trackShare(testId, 'share_copy_fallback')
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('공유/복사 실패:', err)
      // 사용자가 공유 창을 닫은 경우는 에러로 처리하지 않음 (AbortError)
      if ((err as Error).name !== 'AbortError') {
        alert('공유하기 기능을 사용할 수 없습니다. 링크를 수동으로 복사해주세요.')
      }
    }
  }

  return (
    <Button
      onClick={handleShare}
      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {copied ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          복사됨!
        </>
      ) : (
        <>
          <Share2 className="h-5 w-5 mr-2" />
          친구들에게 공유하기
        </>
      )}
    </Button>
  )
}

