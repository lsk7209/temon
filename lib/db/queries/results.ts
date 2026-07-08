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
    }).run()
    return id
}

export async function getTestResult(id: string) {
    // SQLite/libsql uses .get() for a single result.
    const db = getDb()
    const result = await db.select().from(testResults).where(eq(testResults.id, id)).get()
    return result
}
