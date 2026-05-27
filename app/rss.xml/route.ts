import { NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { getDb, isDbAvailable } from '@/lib/db/client'
import { tests } from '@/lib/db/schema'
import { getVisibleTests } from '@/lib/visible-tests'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://temon.kr'
const RSS_LIMIT = 30
const STATIC_FALLBACK_DATE = new Date('2025-01-01T00:00:00.000Z')

type RssItem = {
  id: string
  title: string
  url: string
  description: string
  category: string
  tags: string[]
  publishedAt: Date
}

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

function toValidDate(value: unknown, fallback: Date): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value === 'number') {
    const timestamp = value < 1_000_000_000_000 ? value * 1000 : value
    const date = new Date(timestamp)
    if (!Number.isNaN(date.getTime())) return date
  }
  if (typeof value === 'string') {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date
  }
  return fallback
}

async function getPublishedDbRssItems(now: Date): Promise<RssItem[]> {
  if (!isDbAvailable()) return []

  try {
    const db = getDb()
    const rows = await db
      .select({
        id: tests.id,
        slug: tests.slug,
        title: tests.title,
        description: tests.description,
        category: tests.category,
        publishedAt: tests.publishedAt,
        createdAt: tests.createdAt,
      })
      .from(tests)
      .where(eq(tests.status, 'published'))
      .orderBy(desc(tests.publishedAt), desc(tests.createdAt))
      .limit(RSS_LIMIT)
      .all()

    return rows.map((test) => ({
      id: test.id,
      title: test.title,
      url: `${BASE_URL}/tests/${test.slug}`,
      description: test.description || `${test.title} 테스트를 시작해보세요.`,
      category: test.category || 'quiz',
      tags: [],
      publishedAt: toValidDate(test.publishedAt || test.createdAt, now),
    }))
  } catch (error) {
    console.error('Failed to build DB RSS items:', error)
    return []
  }
}

function getStaticRssItems(now: Date): RssItem[] {
  return getVisibleTests(now).map((test) => {
    const publishedAt = test.publishAt
      ? toValidDate(test.publishAt, STATIC_FALLBACK_DATE)
      : STATIC_FALLBACK_DATE

    return {
      id: test.id,
      title: test.title,
      url: `${BASE_URL}${test.href}`,
      description: test.description || `${test.title} 테스트를 시작해보세요.`,
      category: test.category,
      tags: test.tags.filter((tag) => tag !== test.category),
      publishedAt,
    }
  })
}

function mergeRssItems(items: RssItem[]): RssItem[] {
  const byUrl = new Map<string, RssItem>()
  for (const item of items) {
    if (!byUrl.has(item.url)) byUrl.set(item.url, item)
  }
  return Array.from(byUrl.values())
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, RSS_LIMIT)
}

function buildRssItem(item: RssItem): string {
  const description = item.description.includes('무료 테스트')
    ? item.description
    : `${item.description} - ${item.title}`

  return `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${formatRFC822Date(item.publishedAt)}</pubDate>
      <category><![CDATA[${item.category}]]></category>
      ${item.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
    </item>`
}

export async function GET() {
  const currentDate = new Date()
  const formattedDate = formatRFC822Date(currentDate)
  const dbItems = await getPublishedDbRssItems(currentDate)
  const staticItems = getStaticRssItems(currentDate)
  const rssItems = mergeRssItems([...dbItems, ...staticItems])
    .map(buildRssItem)
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>테몬 MBTI - 무료 성격 테스트 모음</title>
    <link>${BASE_URL}</link>
    <description>MBTI 테스트로 알아보는 나만의 성격 유형! 커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 재미있는 MBTI 테스트를 무료로 시작해보세요.</description>
    <language>ko-KR</language>
    <lastBuildDate>${formattedDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>테몬 MBTI</generator>
    <webMaster>admin@temon.kr (테몬)</webMaster>
    <managingEditor>admin@temon.kr (테몬)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} 테몬. All rights reserved.</copyright>
    <image>
      <url>${BASE_URL}/favicon-32x32.png</url>
      <title>테몬 MBTI</title>
      <link>${BASE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

