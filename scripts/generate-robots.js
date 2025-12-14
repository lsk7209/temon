/**
 * robots.txt 정적 생성 스크립트
 * output: 'export' 사용 시 동적 라우트가 작동하지 않을 수 있으므로 빌드 시 정적 파일 생성
 */

const fs = require('fs')
const path = require('path')

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'

/**
 * robots.txt 생성
 */
function generateRobotsTxt() {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

Sitemap: ${baseUrl}/sitemap.xml

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

