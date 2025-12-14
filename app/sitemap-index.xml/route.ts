import { NextResponse } from 'next/server'

/**
 * 사이트맵 인덱스 생성 (대용량 사이트 최적화)
 * 
 * 사이트맵이 50,000개를 초과할 경우 여러 사이트맵으로 분할
 * 현재는 단일 사이트맵 사용하지만, 향후 확장성을 위해 인덱스 구조 준비
 */
export const revalidate = 3600 // 1시간마다 재생성

export async function GET() {
  const baseUrl = 'https://temon.kr'
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

