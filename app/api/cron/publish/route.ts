import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { tests } from '@/lib/db/schema'
import { eq, asc, isNull } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // 1. 가장 오래된 'draft' 상태의 테스트 1개 조회
        const db = getDb()
        const draftTest = await db.select()
            .from(tests)
            .where(eq(tests.status, 'draft'))
            .orderBy(asc(tests.createdAt))
            .limit(1)
            .get()

        if (!draftTest) {
            return NextResponse.json({ message: 'No draft tests available' })
        }

        // 2. 상태를 'published'로 변경하고 발행 시간 기록
        await db.update(tests)
            .set({
                status: 'published',
                publishedAt: new Date(),
                updatedAt: new Date()
            })
            .where(eq(tests.id, draftTest.id))

        return NextResponse.json({
            success: true,
            publishedTest: {
                id: draftTest.id,
                title: draftTest.title
            }
        })

    } catch (error: any) {
        console.error('Publish Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
