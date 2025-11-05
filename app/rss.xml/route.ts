import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1시간마다 재생성

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
  const currentDate = new Date().toUTCString()

  // 최신 테스트 10개 선택 (또는 전체)
  const recentTests = ALL_TESTS.slice(0, 20)

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
      ${test.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
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

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

