import { MetadataRoute } from 'next'
import { ALL_TESTS } from '@/lib/tests-config'
import { generateTestRoutes, getStaticRoutes, scanTestDirectories } from '@/lib/sitemap-utils'

/**
 * 자동 사이트맵 생성
 * 
 * 새로운 테스트를 추가하면 자동으로 사이트맵에 포함됩니다:
 * 
 * 방법 1: lib/tests-config.ts에 추가
 * - ALL_TESTS 배열에 새로운 테스트 추가
 * - 자동으로 사이트맵에 포함됨
 * 
 * 방법 2: 파일 시스템 기반 자동 감지
 * - app/tests/{testId}/page.tsx 파일 생성
 * - 자동으로 스캔되어 사이트맵에 포함됨
 * 
 * 두 방법 모두 자동으로 작동하며, 파일 시스템 스캔이 우선됩니다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
  
  // 정적 라우트 (홈, 테스트 목록, 관리자 페이지 등)
  const staticRoutes = getStaticRoutes(baseUrl).map(route => ({
    url: route.path,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency || 'weekly' as const,
    priority: route.priority || 0.5,
  }))

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
  
  // MetadataRoute.Sitemap 형식으로 변환
  const sitemapEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...testRoutes.map(route => ({
      url: route.path,
      lastModified: route.lastModified || new Date(),
      changeFrequency: route.changeFrequency || 'weekly' as const,
      priority: route.priority || 0.5,
    })),
  ]

  return sitemapEntries
}

