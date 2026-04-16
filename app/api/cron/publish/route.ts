import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { tests } from '@/lib/db/schema'
import { submitUrlsToIndexNow } from '@/lib/indexnow'
import { eq, asc, and } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = getDb()
        const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://temon.kr').replace(/\/$/, '')

        // 1. 가장 오래된 'draft' 상태의 테스트 1개 조회
        const draftTest = await db.select()
            .from(tests)
            .where(eq(tests.status, 'draft'))
            .orderBy(asc(tests.createdAt))
            .limit(1)
            .get()

        if (!draftTest) {
            return NextResponse.json({ message: 'No draft tests available' })
        }

        // 2. Optimistic Locking: 상태가 여전히 'draft'일 때만 'published'로 변경
        const result = await db.update(tests)
            .set({
                status: 'published',
                publishedAt: new Date(),
                updatedAt: new Date()
            })
            .where(
                and(
                    eq(tests.id, draftTest.id),
                    eq(tests.status, 'draft') // Race condition 방지
                )
            )

        // 다른 프로세스가 먼저 발행했으면 종료
        if (result.rowsAffected === 0) {
            return NextResponse.json({ message: 'Test already published by another job' })
        }

        const publishedUrls = [
            `${baseUrl}/tests`,
            `${baseUrl}/tests/${draftTest.slug}`,
        ]

        const indexNow = await submitUrlsToIndexNow(publishedUrls)

        return NextResponse.json({
            success: true,
            publishedTest: {
                id: draftTest.id,
                slug: draftTest.slug,
                title: draftTest.title
            },
            indexNow,
        })

    } catch (error: unknown) {
        console.error('Publish Error:', error)
        return NextResponse.json({ success: false, error: 'Failed to publish test' }, { status: 500 })
    }
}
