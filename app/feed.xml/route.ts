import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1시간마다 재생성

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'
  const currentDate = new Date().toISOString()

  // 최신 테스트 선택
  const recentTests = ALL_TESTS.slice(0, 20)

  const feedItems = recentTests.map((test) => {
    const testUrl = `${baseUrl}${test.href}`
    const description = `${test.description} - ${test.title} 무료 테스트`
    
    return `    <entry>
      <id>${testUrl}</id>
      <title><![CDATA[${test.title}]]></title>
      <link href="${testUrl}" rel="alternate"/>
      <updated>${currentDate}</updated>
      <published>${currentDate}</published>
      <author>
        <name>테몬</name>
      </author>
      <summary type="html"><![CDATA[${description}]]></summary>
      <content type="html"><![CDATA[<p>${description}</p><p><a href="${testUrl}">테스트 시작하기 →</a></p>]]></content>
      <category term="${test.category}"/>
      ${test.tags.map(tag => `<category term="${tag}"/>`).join('\n      ')}
    </entry>`
  }).join('\n')

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko-KR">
  <id>${baseUrl}/feed.xml</id>
  <title>테몬 MBTI - 무료 성격 테스트 모음</title>
  <subtitle>MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.</subtitle>
  <link href="${baseUrl}" rel="alternate"/>
  <link href="${baseUrl}/feed.xml" rel="self"/>
  <updated>${currentDate}</updated>
  <author>
    <name>테몬</name>
    <email>admin@temon.kr</email>
  </author>
  <rights>Copyright ${new Date().getFullYear()} 테몬. All rights reserved.</rights>
  <icon>${baseUrl}/favicon-32x32.png</icon>
  <logo>${baseUrl}/favicon-32x32.png</logo>
${feedItems}
</feed>`

  return new NextResponse(atomFeed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

