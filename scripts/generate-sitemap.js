/**
 * Sitemap.xml 정적 생성 스크립트
 * output: 'export' 사용 시 동적 라우트가 작동하지 않으므로 빌드 시 정적 파일 생성
 */

const fs = require('fs')
const path = require('path')
const { readdir, stat } = require('fs/promises')
const { existsSync } = require('fs')

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'

/**
 * app/tests 디렉토리를 스캔하여 실제 존재하는 테스트 ID 찾기
 */
async function scanTestDirectories(baseDir = path.join(__dirname, '../app/tests')) {
  const testIds = []

  try {
    if (!existsSync(baseDir)) {
      return testIds
    }

    const entries = await readdir(baseDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const testDir = path.join(baseDir, entry.name)
        
        // page.tsx 파일이 있는지 확인 (인트로 페이지)
        const introPage = path.join(testDir, 'page.tsx')
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
 * tests-config에서 테스트 목록 가져오기
 */
function getTestsFromConfig() {
  const testsConfigPath = path.join(__dirname, '../lib/tests-config.ts')
  
  if (!existsSync(testsConfigPath)) {
    return []
  }

  const testsConfigContent = fs.readFileSync(testsConfigPath, 'utf-8')
  const tests = []
  const testPattern = /\{\s*id:\s*["']([^"']+)["'][^}]*href:\s*["']([^"']+)["'][^}]*\}/g

  let match
  while ((match = testPattern.exec(testsConfigContent)) !== null) {
    const testId = match[1]
    const href = match[2]
    // href에서 testId 추출: /tests/{testId}
    const hrefMatch = href.match(/\/tests\/([^/]+)/)
    if (hrefMatch) {
      tests.push(hrefMatch[1])
    }
  }

  return tests
}

/**
 * 정적 라우트 정의
 */
function getStaticRoutes() {
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tests`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
}

/**
 * 테스트 라우트 생성
 */
async function generateTestRoutes(testIds) {
  const routes = []

  for (const testId of testIds) {
    const testBasePath = path.join(__dirname, '../app/tests', testId)
    
    // 인트로 페이지가 존재하는지 확인
    const introPageExists = existsSync(path.join(testBasePath, 'page.tsx'))
    if (introPageExists) {
      routes.push({
        url: `${baseUrl}/tests/${testId}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // 루트 레벨 테스트 페이지도 추가
  const rootTestDirs = ['coffee-mbti', 'ramen-mbti', 'pet-mbti', 'kdrama-mbti', 'kpop-idol', 'study-mbti', 'snowwhite-mbti', 'alarm-habit', 'ntrp-test']
  
  for (const testId of rootTestDirs) {
    const testBasePath = path.join(__dirname, '../app', testId)
    const introPageExists = existsSync(path.join(testBasePath, 'page.tsx'))
    if (introPageExists) {
      routes.push({
        url: `${baseUrl}/${testId}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  return routes
}

/**
 * Sitemap XML 생성
 */
function generateSitemapXML(entries) {
  const urlEntries = entries.map(entry => {
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🗺️  Sitemap 생성 시작...')

  // 방법 1: tests-config.ts에서 테스트 ID 추출
  const configTestIds = getTestsFromConfig()

  // 방법 2: 파일 시스템에서 실제 존재하는 테스트 디렉토리 스캔
  const scannedTestIds = await scanTestDirectories()

  // 두 목록을 합치고 중복 제거
  const allTestIds = Array.from(new Set([...scannedTestIds, ...configTestIds]))

  console.log(`📊 발견된 테스트: ${allTestIds.length}개`)

  // 정적 라우트
  const staticRoutes = getStaticRoutes()

  // 테스트 라우트 생성
  const testRoutes = await generateTestRoutes(allTestIds)

  // 모든 라우트 합치기
  const allRoutes = [...staticRoutes, ...testRoutes]

  // Sitemap XML 생성
  const sitemapXML = generateSitemapXML(allRoutes)

  // out 디렉토리에 파일 생성
  const outDir = path.join(__dirname, '../out')
  if (!existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const sitemapPath = path.join(outDir, 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemapXML, 'utf-8')
  
  console.log(`✅ Sitemap 생성 완료: out/sitemap.xml`)
  console.log(`📊 총 ${allRoutes.length}개의 URL이 포함되었습니다.`)
  console.log(`   - 정적 라우트: ${staticRoutes.length}개`)
  console.log(`   - 테스트 라우트: ${testRoutes.length}개`)
}

main().catch(error => {
  console.error('❌ Sitemap 생성 중 오류 발생:', error)
  process.exit(1)
})

