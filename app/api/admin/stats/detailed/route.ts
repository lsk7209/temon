import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { sql, desc } from 'drizzle-orm'
import { pageVisits } from '@/lib/db/schema'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        // Device Stats
        const db = getDb()
        const devices = await db.select({
            device: pageVisits.deviceType,
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .groupBy(pageVisits.deviceType)
            .orderBy(sql`count(*) DESC`)

        // Browser Stats
        const browsers = await db.select({
            browser: pageVisits.browser,
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .groupBy(pageVisits.browser)
            .orderBy(sql`count(*) DESC`)

        // OS Stats
        const os = await db.select({
            os: pageVisits.os,
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .groupBy(pageVisits.os)
            .orderBy(sql`count(*) DESC`)

        // Keyword Stats (from Search)
        const keywords = await db.select({
            keyword: pageVisits.searchKeyword,
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .where(sql`${pageVisits.searchKeyword} IS NOT NULL`)
            .groupBy(pageVisits.searchKeyword)
            .orderBy(sql`count(*) DESC`)
            .limit(10)

        // Calculate percentages
        const totalVisits = devices.reduce((acc, curr) => acc + curr.count, 0) || 1

        const formatStats = (data: any[], keyName: string) => {
            return data.map(item => ({
                [keyName]: item[keyName] || 'Unknown',
                count: item.count,
                percentage: Math.round((item.count / totalVisits) * 100)
            }))
        }

        return NextResponse.json({
            devices: formatStats(devices, 'device'),
            browsers: browsers.map(item => ({
                browser: item.browser || 'Unknown',
                version: '', // Version tracking not implemented yet
                count: item.count,
                percentage: Math.round((item.count / totalVisits) * 100)
            })),
            os: formatStats(os, 'os'),
            keywords: keywords.map(item => ({
                keyword: item.keyword,
                count: item.count,
                percentage: Math.round((item.count / totalVisits) * 100)
            }))
        })

    } catch (error) {
        console.error('Detailed stats error:', error)
        return NextResponse.json({ error: 'Failed to fetch detailed stats' }, { status: 500 })
    }
}
