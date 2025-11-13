/**
 * Cloudflare Workers Cron Trigger
 * 일일 통계 집계 작업
 */

import type { D1Database } from '../lib/db/client'
import type { ScheduledEvent, ExecutionContext } from '@cloudflare/workers-types'

type Env = {
  DB: D1Database
}

/**
 * Cron 이벤트 핸들러
 * 
 * 배포 방법:
 * wrangler deploy --config wrangler-cron.toml
 * 
 * 또는 직접 배포:
 * wrangler deploy workers/cron-stats.ts --name cron-stats
 */
export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`[Cron] Scheduled event triggered at ${new Date(event.scheduledTime).toISOString()}`)
    ctx.waitUntil(aggregateDailyStats(env.DB))
  },
}

/**
 * 일일 통계 집계
 */
async function aggregateDailyStats(db: D1Database): Promise<void> {
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
      // SQLite에서 타임스탬프를 날짜로 변환: datetime(timestamp/1000, 'unixepoch')
      const startedResult = await db
        .prepare('SELECT COUNT(*) as count FROM test_starts WHERE test_id = ? AND date(datetime(started_at/1000, \'unixepoch\')) = ?')
        .bind(testId, dateStr)
        .first<{ count: number }>()

      const startedCount = startedResult?.count || 0

      // 어제 완료된 테스트 수 및 결과 분포
      // SQLite에서 타임스탬프를 날짜로 변환
      const completedResult = await db
        .prepare(
          'SELECT result_type, COUNT(*) as count FROM test_results WHERE test_id = ? AND date(datetime(created_at/1000, \'unixepoch\')) = ? GROUP BY result_type'
        )
        .bind(testId, dateStr)
        .all<{ result_type: string; count: number }>()

      const completedCount = completedResult.results?.reduce((sum, r) => sum + r.count, 0) || 0
      const resultCounts: Record<string, number> = {}

      completedResult.results?.forEach((r) => {
        resultCounts[r.result_type] = r.count
      })

      // 통계 저장/업데이트 (INSERT OR REPLACE 사용)
      const resultCountsJson = JSON.stringify(resultCounts)
      const now = Math.floor(Date.now() / 1000)

      await db
        .prepare(
          `INSERT INTO test_stats (test_id, date, started_count, completed_count, result_counts, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(test_id, date) DO UPDATE SET
             started_count = excluded.started_count,
             completed_count = excluded.completed_count,
             result_counts = excluded.result_counts,
             updated_at = excluded.updated_at`
        )
        .bind(testId, dateStr, startedCount, completedCount, resultCountsJson, now, now)
        .run()

      console.log(`✅ 통계 집계 완료: ${testId} (${dateStr})`)
    } catch (error) {
      console.error(`❌ 통계 집계 실패: ${testId}`, error)
    }
  }
}

