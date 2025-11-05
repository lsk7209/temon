/**
 * API 클라이언트 유틸리티
 * 테스트 결과 저장/조회를 위한 헬퍼 함수
 */

/**
 * 테스트 결과 저장 요청 데이터
 */
export interface SaveTestResultRequest {
  testId: string
  resultType: string
  answers: Record<number, string>
}

/**
 * 테스트 결과 저장 응답
 */
export interface SaveTestResultResponse {
  id: string
  success: boolean
}

/**
 * 테스트 결과 조회 응답
 */
export interface TestResultResponse {
  id: string
  testId: string
  resultType: string
  answers: Record<number, string>
  userAgent?: string
  ipAddress?: string
  createdAt: number
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  error: string
}

/**
 * 테스트 결과 저장
 */
export async function saveTestResult(
  data: SaveTestResultRequest
): Promise<SaveTestResultResponse> {
  try {
    const response = await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ApiErrorResponse = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to save test result')
  }
}

/**
 * 테스트 결과 조회
 */
export async function getTestResult(id: string): Promise<TestResultResponse> {
  try {
    const response = await fetch(`/api/results?id=${encodeURIComponent(id)}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Result not found')
      }
      const error: ApiErrorResponse = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch test result')
  }
}

/**
 * 테스트 통계 조회
 */
export interface TestStatsResponse {
  stats: {
    id?: number
    testId: string
    date: string
    startedCount: number
    completedCount: number
    resultCounts: Record<string, number>
    createdAt: number
    updatedAt: number
  } | null
  message?: string
}

export async function getTestStats(
  testId: string,
  date?: string
): Promise<TestStatsResponse> {
  try {
    const params = new URLSearchParams({ testId })
    if (date) {
      params.append('date', date)
    }

    const response = await fetch(`/api/stats?${params.toString()}`)

    if (!response.ok) {
      const error: ApiErrorResponse = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch test stats')
  }
}

/**
 * 공유 링크 생성 (결과 ID 포함)
 */
export function createShareLink(testPath: string, resultType: string, resultId?: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
  
  const url = new URL(`${testPath}/result`, baseUrl)
  url.searchParams.set('type', resultType)
  if (resultId) {
    url.searchParams.set('id', resultId)
  }
  
  return url.toString()
}

/**
 * 소셜 미디어 공유 URL 생성
 */
export interface ShareOptions {
  text: string
  url: string
  title?: string
}

export function getShareUrl(platform: 'twitter' | 'facebook' | 'kakao' | 'copy', options: ShareOptions): string | null {
  const { text, url, title } = options
  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = title ? encodeURIComponent(title) : encodedText

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`
    case 'kakao':
      // Kakao JS SDK 필요
      return null
    case 'copy':
      return url
    default:
      return null
  }
}

