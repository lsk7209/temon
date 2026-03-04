import { NextResponse } from 'next/server'
import { submitUrlsToIndexNow } from '@/lib/indexnow'
import { verifyAdminToken } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

const MAX_URLS_PER_REQUEST = 500

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
    const rawUrls = Array.isArray(body?.urls) ? body.urls : []

    if (!rawUrls.length) {
      return NextResponse.json({ success: false, message: 'urls array is required' }, { status: 400 })
    }

    const sanitizedUrls = Array.from(new Set(rawUrls.map((url) => url.trim()).filter(Boolean)))

    if (sanitizedUrls.length > MAX_URLS_PER_REQUEST) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many URLs. Max allowed is ${MAX_URLS_PER_REQUEST}`,
        },
        { status: 400 },
      )
    }

    const result = await submitUrlsToIndexNow(sanitizedUrls)

    const status = result.success
      ? 200
      : result.message.includes('No URLs provided') ||
          result.message.includes('No valid URLs for host found') ||
          result.message.includes('INDEXNOW_KEY is not configured')
        ? 400
        : 502

    return NextResponse.json(
      {
        ...result,
        submittedCount: sanitizedUrls.length,
      },
      { status },
    )
  } catch (error) {
    console.error('IndexNow ping API error:', error)
    return NextResponse.json({ success: false, message: 'Invalid request payload' }, { status: 400 })
  }
}
