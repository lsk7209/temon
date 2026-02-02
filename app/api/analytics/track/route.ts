import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/client'
import { pageVisits, testStarts } from '@/lib/db/schema'

export const runtime = 'edge'

function parseUserAgent(ua: string) {
    const browser = /chrome|crios/i.test(ua) ? 'Chrome' :
        /firefox|fxios/i.test(ua) ? 'Firefox' :
            /safari/i.test(ua) && !/chrome|crios/i.test(ua) ? 'Safari' :
                /edg/i.test(ua) ? 'Edge' : 'Other';

    const os = /windows/i.test(ua) ? 'Windows' :
        /macintosh|mac os x/i.test(ua) ? 'macOS' :
            /linux/i.test(ua) ? 'Linux' :
                /android/i.test(ua) ? 'Android' :
                    /ios|iphone|ipad|ipod/i.test(ua) ? 'iOS' : 'Other';

    const device = /mobile/i.test(ua) ? 'Mobile' :
        /tablet|ipad/i.test(ua) ? 'Tablet' : 'Desktop';

    return { browser, os, device };
}

export async function POST(request: NextRequest) {
    try {
        const { type, payload } = await request.json() as { type: string, payload: any }
        const userAgent = request.headers.get('user-agent') || ''
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        const { browser, os, device } = parseUserAgent(userAgent)

        const db = getDb()

        if (type === 'page_view') {
            const { path, referrer, searchKeyword } = payload
            await db.insert(pageVisits).values({
                id: crypto.randomUUID(),
                path: path || '/',
                referrer: referrer || null,
                searchKeyword: searchKeyword || null,
                ipAddress: ip,
                userAgent: userAgent,
                deviceType: device,
                browser: browser,
                os: os,
                createdAt: new Date(),
            })
        } else if (type === 'test_start') {
            const { testId } = payload
            await db.insert(testStarts).values({
                id: crypto.randomUUID(),
                testId: testId,
                createdAt: new Date(),
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Tracking error:', error)
        return NextResponse.json({ error: 'Tracking failed' }, { status: 500 })
    }
}
