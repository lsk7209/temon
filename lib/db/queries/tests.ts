/**
 * 테스트 관련 데이터베이스 쿼리 함수
 */

import { eq, and, desc } from 'drizzle-orm'
import { tests, questions, resultTypes } from '../schema'
import type { Database } from '../client'

export async function getTestBySlug(db: Database, slug: string) {
  const test = await db
    .select()
    .from(tests)
    .where(eq(tests.slug, slug))
    .limit(1)
    .get()

  if (!test) return null

  // 질문과 결과 타입도 함께 조회
  const testQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.testId, test.id))
    .orderBy(questions.questionOrder)

  const testResultTypes = await db
    .select()
    .from(resultTypes)
    .where(eq(resultTypes.testId, test.id))

  return {
    ...test,
    questions: testQuestions,
    resultTypes: testResultTypes,
  }
}

export async function getAllTests(db: Database, options?: {
  status?: 'draft' | 'published' | 'archived'
  category?: string
  limit?: number
}) {
  let query = db.select().from(tests)

  if (options?.status) {
    query = query.where(eq(tests.status, options.status)) as any
  }

  if (options?.category) {
    query = query.where(eq(tests.category, options.category)) as any
  }

  query = query.orderBy(desc(tests.createdAt)) as any

  if (options?.limit) {
    query = query.limit(options.limit) as any
  }

  return await query
}

export async function createTest(db: Database, data: {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  category?: string
  questionCount?: number
  avgMinutes?: number
  metadata?: any
}) {
  return await db.insert(tests).values({
    ...data,
    status: 'draft',
    questionCount: data.questionCount || 12,
    avgMinutes: data.avgMinutes || 3,
    resultTypeCount: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning()
}

