import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'

// export const dynamic = 'force-dynamic' // output: 'export'와 호환되지 않음
// export const revalidate = 3600 // 1시간마다 재생성

/**
 * RFC 822 형식의 날짜 문자열 생성 (RSS 2.0 표준)
 */
function formatRFC822Date(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const day = days[date.getUTCDay()]
  const dayNum = date.getUTCDate().toString().padStart(2, '0')
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')
  
  return `${day}, ${dayNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`
}

export async function GET() {
  // 등록한 사이트 주소와 일치하도록 명시적으로 설정 (www 없음)
  const baseUrl = 'https://temon.kr'
  const currentDate = new Date()
  const formattedDate = formatRFC822Date(currentDate)

  // 최신 테스트 선택 (최대 20개)
  const recentTests = ALL_TESTS.slice(0, 20)

  const rssItems = recentTests.map((test) => {
    const testUrl = `${baseUrl}${test.href}`
    // 설명 중복 제거 및 개선
    const description = test.description.includes('무료 테스트') 
      ? `${test.description}` 
      : `${test.description} - ${test.title}`
    
    // 카테고리와 태그 중복 제거
    const uniqueTags = test.tags.filter(tag => tag !== test.category)
    
    return `    <item>
      <title><![CDATA[${test.title}]]></title>
      <link>${testUrl}</link>
      <guid isPermaLink="true">${testUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${formattedDate}</pubDate>
      <category><![CDATA[${test.category}]]></category>
      ${uniqueTags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>테몬 MBTI - 무료 성격 테스트 모음</title>
    <link>${baseUrl}</link>
    <description>MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.</description>
    <language>ko-KR</language>
    <lastBuildDate>${formattedDate}</lastBuildDate>
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

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

