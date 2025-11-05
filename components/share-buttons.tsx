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
    trackShare(testId, 'copy')

    // 링크 + 후킹문구를 함께 복사
    const fullShareText = `${hookText}

${shareUrl}`

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(fullShareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback: textarea 사용
        const textarea = document.createElement('textarea')
        textarea.value = fullShareText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('복사 실패:', err)
      alert('복사에 실패했습니다. 다시 시도해주세요.')
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

