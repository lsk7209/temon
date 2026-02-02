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

        return NextResponse.json({ stats, recentItems })
    } catch (error) {
        console.error('Queue Fetch Error:', error)
        return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            )
        }

        const db = getDb()
        const result = await db.delete(testQueue)
            .where(eq(testQueue.id, id))
            .execute()

        if (result.rowsAffected === 0) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: `Item with ID ${id} deleted` })
    } catch (error) {
        console.error('Queue Delete Error:', error)
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { topics } = await req.json()

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return NextResponse.json({ error: 'No topics provided' }, { status: 400 })
        }

        const newItems = topics.map(topic => ({
            id: nanoid(),
            keyword: topic.trim(),
            status: 'pending',
        })).filter(item => item.keyword.length > 0)

        const db = getDb()

        if (newItems.length > 0) {
            await db.insert(testQueue).values(newItems)
        }

        return NextResponse.json({
            success: true,
            count: newItems.length,
            message: `${newItems.length} topics added to queue`
        })
    } catch (error) {
        console.error('Queue Insert Error:', error)
        return NextResponse.json({ error: 'Failed to add topics' }, { status: 500 })
    }
}
