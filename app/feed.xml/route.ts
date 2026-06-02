import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { getIndexableTests } from "@/lib/visible-tests";
import { getSiteUrl, toSiteUrl } from "@/lib/site-url";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { isNoindexTest } from "@/lib/noindex-tests";

export const revalidate = 3600;

type FeedItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  updatedAt: Date;
  publishedAt: Date;
  contentType: "test" | "blog";
};

const FEED_LIMIT = 30;
const STATIC_FALLBACK_DATE = new Date("2025-01-01T00:00:00.000Z");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toValidDate(value: unknown, fallback: Date): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "number") {
    const timestamp = value < 1_000_000_000_000 ? value * 1000 : value;
    const date = new Date(timestamp);
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return fallback;
}

async function getPublishedDbFeedItems(now: Date): Promise<FeedItem[]> {
  if (!isDbAvailable()) return [];

  try {
    const db = getDb();
    const rows = await db
      .select({
        id: tests.id,
        slug: tests.slug,
        title: tests.title,
        description: tests.description,
        category: tests.category,
        publishedAt: tests.publishedAt,
        updatedAt: tests.updatedAt,
        createdAt: tests.createdAt,
      })
      .from(tests)
      .where(eq(tests.status, "published"))
      .orderBy(desc(tests.publishedAt), desc(tests.createdAt))
      .limit(FEED_LIMIT * 3)
      .all();

    return rows
      .filter((test) => test.slug && !isNoindexTest(test.slug))
      .slice(0, FEED_LIMIT)
      .map((test) => {
      const publishedAt = toValidDate(test.publishedAt || test.createdAt, now);
      return {
        id: test.id,
        title: test.title,
        url: toSiteUrl(`/tests/${test.slug}`),
        description: test.description || `${test.title} 테스트를 시작해보세요.`,
        category: test.category || "quiz",
        publishedAt,
        updatedAt: toValidDate(test.updatedAt || test.publishedAt || test.createdAt, publishedAt),
        contentType: "test",
      };
      });
  } catch (error) {
    console.error("Failed to build DB feed items:", error);
    return [];
  }
}

function getStaticFeedItems(now: Date): FeedItem[] {
  return getIndexableTests(now).map((test) => {
    const publishedAt = test.publishAt
      ? toValidDate(test.publishAt, STATIC_FALLBACK_DATE)
      : STATIC_FALLBACK_DATE;
    return {
      id: test.id,
      title: test.title,
      url: toSiteUrl(test.href),
      description: test.description || `${test.title} 테스트를 시작해보세요.`,
      category: test.category,
      publishedAt,
      updatedAt: publishedAt,
      contentType: "test",
    };
  });
}

function getBlogFeedItems(): FeedItem[] {
  return getAllBlogPosts().map((post) => {
    const publishedAt = toValidDate(post.publishedAt, STATIC_FALLBACK_DATE);
    return {
      id: `blog-${post.slug}`,
      title: post.title,
      url: toSiteUrl(`/blog/${post.slug}`),
      description: post.description,
      category: post.category,
      publishedAt,
      updatedAt: toValidDate(post.updatedAt, publishedAt),
      contentType: "blog",
    };
  });
}

function mergeFeedItems(items: FeedItem[]): FeedItem[] {
  const byUrl = new Map<string, FeedItem>();
  for (const item of items) {
    if (!byUrl.has(item.url)) byUrl.set(item.url, item);
  }
  return Array.from(byUrl.values())
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, FEED_LIMIT);
}

function buildEntry(item: FeedItem): string {
  const title = escapeXml(item.title);
  const description = escapeXml(item.description);
  const url = escapeXml(item.url);
  const category = escapeXml(item.category);
  const ctaLabel = item.contentType === "blog" ? "글 읽기" : "테스트 시작하기";

  return `    <entry>
      <id>${url}</id>
      <title>${title}</title>
      <link href="${url}" rel="alternate"/>
      <updated>${item.updatedAt.toISOString()}</updated>
      <published>${item.publishedAt.toISOString()}</published>
      <author>
        <name>테몬</name>
      </author>
      <summary type="html">${description}</summary>
      <content type="html">&lt;p&gt;${description}&lt;/p&gt;&lt;p&gt;&lt;a href="${url}"&gt;${ctaLabel}&lt;/a&gt;&lt;/p&gt;</content>
      <category term="${category}"/>
    </entry>`;
}

export async function GET() {
  const now = new Date();
  const baseUrl = getSiteUrl();
  const dbItems = await getPublishedDbFeedItems(now);
  const staticItems = getStaticFeedItems(now);
  const blogItems = getBlogFeedItems();
  const feedItems = mergeFeedItems([...dbItems, ...staticItems, ...blogItems]);

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko-KR">
  <id>${baseUrl}/feed.xml</id>
  <title>테몬 MBTI 테스트 모음</title>
  <subtitle>무료 성격 테스트와 취향 테스트를 최신 공개 순서로 제공합니다.</subtitle>
  <link href="${baseUrl}" rel="alternate"/>
  <link href="${baseUrl}/feed.xml" rel="self"/>
  <updated>${now.toISOString()}</updated>
  <author>
    <name>테몬</name>
    <email>admin@temon.kr</email>
  </author>
  <rights>Copyright ${now.getFullYear()} 테몬. All rights reserved.</rights>
  <icon>${baseUrl}/favicon-32x32.png</icon>
  <logo>${baseUrl}/favicon-32x32.png</logo>
${feedItems.map(buildEntry).join("\n")}
</feed>`;

  return new NextResponse(atomFeed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
