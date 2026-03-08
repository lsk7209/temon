import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { sql, desc } from 'drizzle-orm'
import { pageVisits } from '@/lib/db/schema'
import { verifyAdminToken } from '@/lib/admin-auth'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const isAdmin = await verifyAdminToken()
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        // Device Stats
        const db = getDb()
        const searchEngineCase = sql<string>`
          CASE
            WHEN lower(coalesce(${pageVisits.referrer}, '')) LIKE '%google.%' THEN 'Google'
            WHEN lower(coalesce(${pageVisits.referrer}, '')) LIKE '%naver.%' THEN 'Naver'
            WHEN lower(coalesce(${pageVisits.referrer}, '')) LIKE '%daum.%' THEN 'Daum'
            WHEN lower(coalesce(${pageVisits.referrer}, '')) LIKE '%bing.%' THEN 'Bing'
            WHEN lower(coalesce(${pageVisits.referrer}, '')) LIKE '%yahoo.%' THEN 'Yahoo'
            WHEN ${pageVisits.referrer} IS NULL OR trim(${pageVisits.referrer}) = '' THEN 'Direct'
            ELSE 'Other'
          END
        `

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

        const searchEngines = await db.select({
            engine: searchEngineCase.as('engine'),
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .groupBy(searchEngineCase)
            .orderBy(sql`count(*) DESC`)

        const searchLandingPages = await db.select({
            path: pageVisits.path,
            count: sql<number>`count(*)`,
        })
            .from(pageVisits)
            .where(sql`
              lower(coalesce(${pageVisits.referrer}, '')) LIKE '%google.%'
              OR lower(coalesce(${pageVisits.referrer}, '')) LIKE '%naver.%'
              OR lower(coalesce(${pageVisits.referrer}, '')) LIKE '%daum.%'
              OR lower(coalesce(${pageVisits.referrer}, '')) LIKE '%bing.%'
              OR lower(coalesce(${pageVisits.referrer}, '')) LIKE '%yahoo.%'
            `)
            .groupBy(pageVisits.path)
            .orderBy(desc(sql`count(*)`))
            .limit(15)

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
            searchEngines: formatStats(searchEngines, 'engine'),
            searchLandingPages: searchLandingPages.map(item => ({
                path: item.path || '/',
                count: item.count,
                percentage: Math.round((item.count / totalVisits) * 100)
            })),
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
