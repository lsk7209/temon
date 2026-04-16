/**
 * 사이트맵에 포함된 모든 URL을 txt 파일로 생성하는 스크립트
 */

const fs = require('fs')
const path = require('path')
const { existsSync } = require('fs')
const { readdir } = require('fs/promises')

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'

// ALL_TESTS 임포트 (동적 임포트 대신 직접 읽기)
function getTestsFromConfig() {
  try {
    const configPath = path.join(__dirname, '../lib/tests-config.ts')
    const configContent = fs.readFileSync(configPath, 'utf-8')
    
    // ALL_TESTS 배열에서 href 추출
    const hrefMatches = configContent.match(/href:\s*['"`]([^'"`]+)['"`]/g)
    if (!hrefMatches) return []
    
    return hrefMatches.map(match => {
      const href = match.match(/['"`]([^'"`]+)['"`]/)[1]
      const testIdMatch = href.match(/\/tests\/([^/]+)/)
      return testIdMatch ? testIdMatch[1] : null
    }).filter(id => id !== null)
  } catch (error) {
    console.warn('Failed to read tests-config.ts:', error)
    return []
  }
}

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
 * 테스트 페이지 구조를 기반으로 라우트 생성
 */
async function generateTestRoutes(testIds) {
  const routes = []

  for (const testId of testIds) {
    const testBasePath = path.join(__dirname, '../app/tests', testId)
    
    // 인트로 페이지가 존재하는지 확인
    const introPageExists = existsSync(path.join(testBasePath, 'page.tsx'))
    if (introPageExists) {
      routes.push(`${baseUrl}/tests/${testId}`)
    }

    // 테스트 페이지가 존재하는지 확인
    const testPageExists = existsSync(path.join(testBasePath, 'test', 'page.tsx'))
    if (testPageExists) {
      routes.push(`${baseUrl}/tests/${testId}/test`)
    }
  }

  return routes
}

/**
 * 정적 라우트 정의
 */
function getStaticRoutes() {
  return [
    baseUrl,
    `${baseUrl}/tests`,
  ]
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('📝 사이트맵 URL 목록 생성 시작...')

  // 정적 라우트
  const staticRoutes = getStaticRoutes()

  // 방법 1: tests-config.ts에서 테스트 ID 추출
  const configTestIds = getTestsFromConfig()

  // 방법 2: 파일 시스템에서 실제 존재하는 테스트 디렉토리 스캔
  const scannedTestIds = await scanTestDirectories()

  // 두 목록을 합치고 중복 제거
  const allTestIds = Array.from(new Set([...scannedTestIds, ...configTestIds]))

  console.log(`📊 발견된 테스트: ${allTestIds.length}개`)

  // 테스트 라우트 생성 (인트로 페이지만 포함, 결과 페이지는 제외)
  const testRoutes = await generateTestRoutes(allTestIds)

  // 모든 라우트 합치기
  const allRoutes = [
    ...staticRoutes,
    ...testRoutes,
  ]

  // URL 목록을 txt 파일로 저장
  const urlsText = allRoutes.join('\n')
  const outputPath = path.join(__dirname, '../sitemap-urls.txt')
  
  fs.writeFileSync(outputPath, urlsText, 'utf-8')
  
  console.log(`✅ 사이트맵 URL 목록 생성 완료: sitemap-urls.txt`)
  console.log(`📊 총 ${allRoutes.length}개의 URL이 포함되었습니다.`)
  console.log(`   - 정적 라우트: ${staticRoutes.length}개`)
  console.log(`   - 테스트 라우트: ${testRoutes.length}개`)
}

main().catch(error => {
  console.error('❌ URL 목록 생성 중 오류 발생:', error)
  process.exit(1)
})

