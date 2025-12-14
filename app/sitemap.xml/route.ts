import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'
import { generateTestRoutes, getStaticRoutes, scanTestDirectories } from '@/lib/sitemap-utils'

/**
 * Sitemap.xml 동적 생성 (Route Handler)
 * 
 * Next.js의 app/sitemap.ts가 제대로 작동하지 않을 경우를 대비한 명시적 라우트 핸들러
 * 
 * Vercel ISR: 1시간마다 재생성 (성능 최적화)
 */
export const revalidate = 3600 // 1시간마다 재생성

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
  
  try {
    // 정적 라우트 (홈, 테스트 목록, 관리자 페이지 등)
    const staticRoutes = getStaticRoutes(baseUrl)

    // 방법 1: tests-config.ts에서 테스트 ID 추출
    const configTestIds = ALL_TESTS.map(test => {
      const match = test.href.match(/\/tests\/([^/]+)/)
      return match ? match[1] : null
    }).filter((id): id is string => id !== null)

    // 방법 2: 파일 시스템에서 실제 존재하는 테스트 디렉토리 스캔
    const scannedTestIds = await scanTestDirectories()

    // 두 목록을 합치고 중복 제거 (파일 시스템 스캔이 우선)
    const allTestIds = Array.from(new Set([...scannedTestIds, ...configTestIds]))

    // 테스트 라우트 자동 생성 (파일 시스템 기반으로 실제 존재하는 페이지만 추가)
    const testRoutes = await generateTestRoutes(allTestIds, baseUrl)
    
    // 모든 라우트 수집
    const allRoutes = [
      // 홈페이지 - 최우선
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      // 테스트 모음 페이지 - 높은 우선순위
      {
        url: `${baseUrl}/tests`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      // 정적 라우트
      ...staticRoutes
        .filter(route => route.path !== baseUrl && route.path !== `${baseUrl}/tests`)
        .map(route => ({
          url: route.path,
          lastModified: route.lastModified || new Date(),
          changeFrequency: route.changeFrequency || 'weekly' as const,
          priority: route.priority || 0.5,
        })),
      // 테스트 라우트 - 인트로 페이지만 포함 (결과 페이지는 제외)
      ...testRoutes
        .filter(route => !route.path.includes('/test/result'))
        .map(route => ({
          url: route.path,
          lastModified: route.lastModified || new Date(),
          changeFrequency: route.changeFrequency || 'weekly' as const,
          priority: route.priority || 0.8,
        })),
    ]

    // XML 생성
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified.toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    
    // 에러 발생 시 최소한의 사이트맵 반환
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/tests</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  }
}

