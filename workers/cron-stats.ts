/**
 * Cloudflare Workers Cron Trigger
 * 일일 통계 집계 작업
 */

import type { D1Database, Env } from '../lib/db/client'

/**
 * Cron 이벤트 핸들러
 */
export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(aggregateDailyStats(env.DB))
  },
}

/**
 * 일일 통계 집계
 */
async function aggregateDailyStats(db: D1Database): Promise<void> {
  const { initDatabase } = await import('../lib/db/client')
  const database = initDatabase(db)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]

  // 모든 테스트 ID 목록 (실제로는 tests-config에서 가져와야 함)
  const testIds = [
    'coffee-mbti',
    'ramen-mbti',
    'pet-mbti',
    'study-mbti',
    'alarm-habit',
    'ntrp-test',
    'kdrama-mbti',
    'snowwhite-mbti',
    'kpop-idol',
  ]

  for (const testId of testIds) {
    try {
      // 어제 시작된 테스트 수
      const startedResult = await db
        .prepare('SELECT COUNT(*) as count FROM test_starts WHERE test_id = ? AND DATE(started_at, "unixepoch") = ?')
        .bind(testId, dateStr)
        .first<{ count: number }>()

      const startedCount = startedResult?.count || 0

      // 어제 완료된 테스트 수 및 결과 분포
      const completedResult = await db
        .prepare(
          'SELECT result_type, COUNT(*) as count FROM test_results WHERE test_id = ? AND DATE(created_at, "unixepoch") = ? GROUP BY result_type'
        )
        .bind(testId, dateStr)
        .all<{ result_type: string; count: number }>()

      const completedCount = completedResult.results?.reduce((sum, r) => sum + r.count, 0) || 0
      const resultCounts: Record<string, number> = {}

      completedResult.results?.forEach((r) => {
        resultCounts[r.result_type] = r.count
      })

      // 통계 저장/업데이트
      await database.upsertTestStats({
        testId,
        date: dateStr,
        startedCount,
        completedCount,
        resultCounts,
      })

      console.log(`✅ 통계 집계 완료: ${testId} (${dateStr})`)
    } catch (error) {
      console.error(`❌ 통계 집계 실패: ${testId}`, error)
    }
  }
}

