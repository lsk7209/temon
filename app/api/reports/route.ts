/**
 * Reports API 프록시
 * Next.js → Cloudflare Functions
 */

export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cloudflare Functions 엔드포인트로 프록시
    const functionsUrl = process.env.CLOUDFLARE_FUNCTIONS_URL || 'http://localhost:8787'
    const url = new URL('/api/reports', functionsUrl)
    
    // 쿼리 파라미터 전달
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value)
    })

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: token,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch reports' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Reports API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

