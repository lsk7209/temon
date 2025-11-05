/**
 * 데이터베이스 타입 정의
 */

/**
 * 테스트 결과 데이터
 */
export interface TestResult {
  id: string
  testId: string
  resultType: string
  answers: Record<number, string>
  userAgent?: string
  ipAddress?: string
  createdAt: number
}

/**
 * 테스트 통계 데이터
 */
export interface TestStats {
  id?: number
  testId: string
  date: string // YYYY-MM-DD
  startedCount: number
  completedCount: number
  resultCounts: Record<string, number>
  createdAt: number
  updatedAt: number
}

/**
 * 페이지 방문 로그
 */
export interface PageVisit {
  id?: number
  pathname: string
  userAgent?: string
  referrer?: string
  ipAddress?: string
  visitedAt: number
}

/**
 * 테스트 시작 로그
 */
export interface TestStart {
  id?: number
  testId: string
  sessionId?: string
  startedAt: number
}

/**
 * 통계 집계 결과
 */
export interface AggregatedStats {
  testId: string
  totalStarted: number
  totalCompleted: number
  completionRate: number
  resultDistribution: Record<string, number>
  dateRange: {
    from: string
    to: string
  }
}

