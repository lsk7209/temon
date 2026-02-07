import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { tests } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const db = getDb()
        const items = await db.select({
            id: tests.id,
            slug: tests.slug,
            title: tests.title,
            status: tests.status,
            createdAt: tests.createdAt,
            questionCount: tests.questionCount,
        })
            .from(tests)
            .orderBy(desc(tests.createdAt))
            .limit(50)
            .all()

        return NextResponse.json({ items })
    } catch (error) {
        console.error('Tests Fetch Error:', error)
        return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 })
        }

        const db = getDb()
        await db.delete(tests)
            .where(eq(tests.id, id))
            .execute()

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Tests Delete Error:', error)
        return NextResponse.json({ error: 'Failed to delete test' }, { status: 500 })
    }
}
