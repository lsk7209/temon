/**
 * RSS 및 Atom 피드 정적 생성 스크립트
 * output: 'export' 사용 시 API 라우트가 작동하지 않으므로 빌드 시 정적 파일 생성
 */

const fs = require('fs')
const path = require('path')

// tests-config에서 테스트 목록 가져오기
const testsConfigPath = path.join(__dirname, '../lib/tests-config.ts')
const testsConfigContent = fs.readFileSync(testsConfigPath, 'utf-8')

// ALL_TESTS 배열에서 테스트 추출 (더 정확한 파싱)
const tests = []
const testPattern = /\{\s*id:\s*["']([^"']+)["'][^}]*title:\s*["']([^"']+)["'][^}]*description:\s*["']([^"']+)["'][^}]*href:\s*["']([^"']+)["'][^}]*category:\s*["']([^"']+)["'][^}]*tags:\s*\[([^\]]*)\][^}]*\}/g

let match
while ((match = testPattern.exec(testsConfigContent)) !== null) {
  const tagsMatch = match[6] ? match[6].match(/["']([^"']+)["']/g) : []
  const tags = tagsMatch ? tagsMatch.map(t => t.replace(/["']/g, '')) : []
  
  tests.push({
    id: match[1],
    title: match[2],
    description: match[3],
    href: match[4],
    category: match[5],
    tags: tags
  })
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
const currentDate = new Date().toUTCString()
const currentDateISO = new Date().toISOString()

// 최신 테스트 20개 선택
const recentTests = tests.slice(0, 20)

// RSS 피드 생성
const rssItems = recentTests.map((test) => {
  const testUrl = `${baseUrl}${test.href}`
  const description = `${test.description} - ${test.title} 무료 테스트`
  
  return `    <item>
      <title><![CDATA[${test.title}]]></title>
      <link>${testUrl}</link>
      <guid>${testUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${currentDate}</pubDate>
      <category><![CDATA[${test.category}]]></category>
      ${test.tags.map(tag => `      <category><![CDATA[${tag}]]></category>`).join('\n')}
    </item>`
}).join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>테몬 MBTI - 무료 성격 테스트 모음</title>
    <link>${baseUrl}</link>
    <description>MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.</description>
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>테몬 MBTI</generator>
    <webMaster>admin@temon.kr (테몬)</webMaster>
    <managingEditor>admin@temon.kr (테몬)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} 테몬. All rights reserved.</copyright>
    <image>
      <url>${baseUrl}/favicon-32x32.png</url>
      <title>테몬 MBTI</title>
      <link>${baseUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`

// Atom 피드 생성
const feedItems = recentTests.map((test) => {
  const testUrl = `${baseUrl}${test.href}`
  const description = `${test.description} - ${test.title} 무료 테스트`
  
  return `    <entry>
      <id>${testUrl}</id>
      <title><![CDATA[${test.title}]]></title>
      <link href="${testUrl}" rel="alternate"/>
      <updated>${currentDateISO}</updated>
      <published>${currentDateISO}</published>
      <author>
        <name>테몬</name>
      </author>
      <summary type="html"><![CDATA[${description}]]></summary>
      <content type="html"><![CDATA[<p>${description}</p><p><a href="${testUrl}">테스트 시작하기 →</a></p>]]></content>
      <category term="${test.category}"/>
      ${test.tags.map(tag => `      <category term="${tag}"/>`).join('\n')}
    </entry>`
}).join('\n')

const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko-KR">
  <id>${baseUrl}/feed.xml</id>
  <title>테몬 MBTI - 무료 성격 테스트 모음</title>
  <subtitle>MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.</subtitle>
  <link href="${baseUrl}" rel="alternate"/>
  <link href="${baseUrl}/feed.xml" rel="self"/>
  <updated>${currentDateISO}</updated>
  <author>
    <name>테몬</name>
    <email>admin@temon.kr</email>
  </author>
  <rights>Copyright ${new Date().getFullYear()} 테몬. All rights reserved.</rights>
  <icon>${baseUrl}/favicon-32x32.png</icon>
  <logo>${baseUrl}/favicon-32x32.png</logo>
${feedItems}
</feed>`

// out 디렉토리에 파일 생성
const outDir = path.join(__dirname, '../out')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// RSS 파일 생성
const rssPath = path.join(outDir, 'rss.xml')
fs.writeFileSync(rssPath, rss, 'utf-8')
console.log('✅ RSS 피드 생성 완료: out/rss.xml')

// Atom 피드 생성
const feedPath = path.join(outDir, 'feed.xml')
fs.writeFileSync(feedPath, atomFeed, 'utf-8')
console.log('✅ Atom 피드 생성 완료: out/feed.xml')

console.log(`📊 ${recentTests.length}개의 테스트가 피드에 포함되었습니다.`)

