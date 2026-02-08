import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { testQueue } from '@/lib/db/schema'
import { desc, sql, eq, asc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const db = getDb()
        // 대기열 상태 조회
        const stats = await db.select({
            status: testQueue.status,
            count: sql<number>`count(*)`
        })
            .from(testQueue)
            .groupBy(testQueue.status)
            .all()

        // 최근 추가된 항목 20개
        const recentItems = await db.select()
            .from(testQueue)
            .orderBy(desc(testQueue.createdAt))
            .limit(20)
            .all()

        return NextResponse.json({ success: true, stats, recentItems })
    } catch (error) {
        console.error('Queue Fetch Error:', error)
        return NextResponse.json({ success: false, error: 'Failed to fetch queue' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            )
        }

        const db = getDb()
        const result = await db.delete(testQueue)
            .where(eq(testQueue.id, id))
            .execute()

        if (result.rowsAffected === 0) {
            return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: `Item with ID ${id} deleted` })
    } catch (error) {
        console.error('Queue Delete Error:', error)
        return NextResponse.json({ success: false, error: 'Failed to delete item' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { topics } = await req.json()

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return NextResponse.json({ success: false, error: 'No topics provided' }, { status: 400 })
        }

        const db = getDb()

        // 중복 키워드 필터링
        const cleanedTopics = topics
            .map((topic: string) => topic.trim().toLowerCase())
            .filter((topic: string) => topic.length > 0)

        // 이미 존재하는 키워드 조회 (pending, processing, completed 상태 모두)
        const existingItems = await db.select({ keyword: testQueue.keyword })
            .from(testQueue)
            .all()

        const existingKeywords = new Set(
            existingItems.map(item => item.keyword.toLowerCase())
        )

        // 중복 제거: 이미 큐에 있는 키워드 제외
        const uniqueTopics = cleanedTopics.filter(
            (topic: string) => !existingKeywords.has(topic)
        )

        // 입력 내 중복 제거
        const dedupedTopics = [...new Set(uniqueTopics)]

        const newItems = dedupedTopics.map((topic: string) => ({
            id: nanoid(),
            keyword: topic,
            status: 'pending',
        }))

        let insertedCount = 0
        if (newItems.length > 0) {
            await db.insert(testQueue).values(newItems)
            insertedCount = newItems.length
        }

        const skippedCount = cleanedTopics.length - insertedCount

        return NextResponse.json({
            success: true,
            inserted: insertedCount,
            skipped: skippedCount,
            message: skippedCount > 0
                ? `${insertedCount} topics added, ${skippedCount} duplicates skipped`
                : `${insertedCount} topics added to queue`
        })
    } catch (error) {
        console.error('Queue Insert Error:', error)
        return NextResponse.json({ success: false, error: 'Failed to add topics' }, { status: 500 })
    }
}

