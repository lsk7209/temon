"use client"

/**
 * 공유 버튼 컴포넌트
 * 친구들에게 공유하기 버튼만 제공
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check, MessageCircle } from 'lucide-react'
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

  const handleKakao = () => {
    trackShare(testId, 'share_kakao')
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`
    window.open(kakaoUrl, '_blank', 'noopener,noreferrer')
  }

  const handleTwitter = () => {
    trackShare(testId, 'share_twitter')
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(hookText)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col gap-3 w-full">
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
      <div className="flex gap-3">
        <Button
          onClick={handleKakao}
          variant="outline"
          className="flex-1 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] border-[#FEE500] font-semibold"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          카카오톡
        </Button>
        <Button
          onClick={handleTwitter}
          variant="outline"
          className="flex-1 bg-black hover:bg-gray-800 text-white border-black font-semibold"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X (트위터)
        </Button>
      </div>
    </div>
  )
}

