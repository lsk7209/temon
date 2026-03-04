import { NextResponse } from 'next/server'
import { submitUrlsToIndexNow } from '@/lib/indexnow'
import { verifyAdminToken } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

type PingBody = {
  urls?: string[]
}

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminToken()
    if (!isAuthorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const body = (await request.json()) as PingBody
    const urls = Array.isArray(body?.urls) ? body.urls : []

    if (!urls.length) {
      return NextResponse.json({ success: false, message: 'urls array is required' }, { status: 400 })
    }

    const result = await submitUrlsToIndexNow(urls)
    return NextResponse.json(result, { status: result.success ? 200 : 502 })
  } catch (error) {
    console.error('IndexNow ping API error:', error)
    return NextResponse.json({ success: false, message: 'Invalid request payload' }, { status: 400 })
  }
}
