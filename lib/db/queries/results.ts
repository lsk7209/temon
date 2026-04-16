import { eq } from 'drizzle-orm'
import { getDb } from '../client'
import { testResults } from '../schema'

export async function saveTestResult(data: {
    testId: string
    resultType: string
    answers: any
    userIp?: string
    userAgent?: string
}) {
    const id = crypto.randomUUID()
    const db = getDb()
    await db.insert(testResults).values({
        id,
        ...data,
        createdAt: new Date(),
    }).run() // Cloudflare D1 uses .run() for insert -> result
    return id
}

export async function getTestResult(id: string) {
    // D1 / SQLite often use .get() for single result, .all() for validation
    // Drizzle with Cloudflare D1 usually supports .get() on select().limit(1)
    const db = getDb()
    const result = await db.select().from(testResults).where(eq(testResults.id, id)).get()
    return result
}
