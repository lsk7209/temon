/**
 * robots.txt 정적 생성 스크립트
 * output: 'export' 사용 시 동적 라우트가 작동하지 않을 수 있으므로 빌드 시 정적 파일 생성
 */

const fs = require('fs')
const path = require('path')

const baseUrl = 'https://temon.kr'

/**
 * robots.txt 생성
 */
function generateRobotsTxt() {
  return `# Google 및 네이버 검색봇 최적화 설정
# https://www.robotstxt.org/robotstxt.html

# 모든 검색봇 기본 설정
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result
Crawl-delay: 1

# Google 검색봇 최적화
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result
Crawl-delay: 0

# Google 이미지 검색봇
User-agent: Googlebot-Image
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

# Google 모바일 검색봇
User-agent: Googlebot-Mobile
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

# 네이버 검색봇 (Yeti)
User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result
Crawl-delay: 1

# 네이버 모바일 검색봇
User-agent: Yeti-Mobile
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result
Crawl-delay: 1

# 다음(Daum) 검색봇
User-agent: Daumoa
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

# 사이트맵 위치
Sitemap: ${baseUrl}/sitemap.xml

# Daum WebMaster Tool 인증
#DaumWebMasterTool:c31e7b96662307b31cb400ef4928000f10b5e2655ff33772379f888ea18c1179:OkBMPAodCv39zGs73L6HFQ==
`
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🤖 robots.txt 생성 시작...')

  const robotsTxt = generateRobotsTxt()

  // out 디렉토리에 파일 생성
  const outDir = path.join(__dirname, '../out')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const robotsPath = path.join(outDir, 'robots.txt')
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8')
  
  console.log(`✅ robots.txt 생성 완료: out/robots.txt`)
  console.log(`📍 Sitemap URL: ${baseUrl}/sitemap.xml`)
}

main()

