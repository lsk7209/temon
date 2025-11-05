import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

/**
 * app 디렉토리를 스캔하여 라우트를 자동으로 찾는 유틸리티
 */

export interface RouteInfo {
  path: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/**
 * app 디렉토리 구조를 기반으로 라우트 경로 생성
 * 예: app/tests/coffee-mbti/page.tsx -> /tests/coffee-mbti
 */
export async function scanAppDirectory(
  baseDir: string = join(process.cwd(), 'app'),
  excludePaths: string[] = ['api', 'admin', '(admin)', '_next', 'test']
): Promise<string[]> {
  const routes: string[] = []
  
  async function scanDirectory(dir: string, baseRoute: string = ''): Promise<void> {
    try {
      const entries = await readdir(dir, { withFileTypes: true })
      
      for (const entry of entries) {
        // 제외할 경로 스킵
        if (excludePaths.some(exclude => entry.name.includes(exclude))) {
          continue
        }

        const fullPath = join(dir, entry.name)
        const routePath = baseRoute ? `${baseRoute}/${entry.name}` : entry.name

        if (entry.isDirectory()) {
          // 디렉토리인 경우 재귀적으로 스캔
          await scanDirectory(fullPath, routePath)
        } else if (entry.isFile() && entry.name === 'page.tsx') {
          // page.tsx 파일을 찾으면 라우트로 추가
          // baseRoute가 있으면 그대로 사용, 없으면 루트
          const route = baseRoute || '/'
          if (route !== '/' && !routes.includes(route)) {
            routes.push(route)
          }
        }
      }
    } catch (error) {
      // 디렉토리를 읽을 수 없는 경우 (예: 권한 문제) 무시
      console.warn(`Failed to scan directory ${dir}:`, error)
    }
  }

  await scanDirectory(baseDir)
  return routes
}

/**
 * app/tests 디렉토리를 스캔하여 실제 존재하는 테스트 ID 찾기
 */
export async function scanTestDirectories(
  baseDir: string = join(process.cwd(), 'app', 'tests')
): Promise<string[]> {
  const testIds: string[] = []

  try {
    if (!existsSync(baseDir)) {
      return testIds
    }

    const entries = await readdir(baseDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const testDir = join(baseDir, entry.name)
        
        // page.tsx 파일이 있는지 확인 (인트로 페이지)
        const introPage = join(testDir, 'page.tsx')
        if (existsSync(introPage)) {
          testIds.push(entry.name)
        }
      }
    }
  } catch (error) {
    console.warn('Failed to scan test directories:', error)
  }

  return testIds
}

/**
 * 테스트 페이지 구조를 기반으로 라우트 생성
 * /tests/{testId}, /tests/{testId}/test, /tests/{testId}/test/result
 */
export async function generateTestRoutes(
  testIds: string[],
  baseUrl: string
): Promise<RouteInfo[]> {
  const routes: RouteInfo[] = []

  for (const testId of testIds) {
    const testBasePath = join(process.cwd(), 'app', 'tests', testId)
    
    // 인트로 페이지가 존재하는지 확인
    const introPageExists = existsSync(join(testBasePath, 'page.tsx'))
    if (introPageExists) {
      routes.push({
        path: `${baseUrl}/tests/${testId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // 테스트 페이지가 존재하는지 확인
    const testPageExists = existsSync(join(testBasePath, 'test', 'page.tsx'))
    if (testPageExists) {
      routes.push({
        path: `${baseUrl}/tests/${testId}/test`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // 결과 페이지가 존재하는지 확인
    const resultPageExists = existsSync(join(testBasePath, 'test', 'result', 'page.tsx'))
    if (resultPageExists) {
      routes.push({
        path: `${baseUrl}/tests/${testId}/test/result`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return routes
}

/**
 * 정적 라우트 정의
 */
export function getStaticRoutes(baseUrl: string): RouteInfo[] {
  return [
    {
      path: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      path: `${baseUrl}/tests`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      path: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}

