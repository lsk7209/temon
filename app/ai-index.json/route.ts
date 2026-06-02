import { NextResponse } from "next/server";
import {
  getAiIndexCategories,
  getAiIndexTests,
  toAbsoluteUrl,
} from "@/lib/ai-content-index";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

export const revalidate = 3600;

export async function GET() {
  const tests = await getAiIndexTests();
  const posts = getAllBlogPosts();
  const now = new Date().toISOString();
  const siteUrl = getSiteUrl();

  return NextResponse.json(
    {
      site: {
        name: "테몬",
        url: siteUrl,
        description:
          "무료 성격 퀴즈, 관계 테스트, 취향 테스트와 결과 해석 블로그를 제공하는 한국어 퀴즈 사이트입니다.",
        language: "ko",
        lastUpdated: now.slice(0, 10),
      },
      pages: [
        {
          url: "/",
          title: "무료 MBTI 테스트 모음 | 재밌는 성격테스트 - 테몬",
          type: "home",
        },
        {
          url: "/tests",
          title: "재밌는 테스트 모음 | 무료 MBTI 성격테스트 - 테몬",
          type: "listing",
        },
        {
          url: "/blog",
          title: "퀴즈 블로그 | 성격·관계·취향 테스트 해석 - 테몬",
          type: "listing",
        },
        { url: "/about", title: "테몬 소개", type: "about" },
        { url: "/contact", title: "문의하기", type: "contact" },
        { url: "/privacy", title: "개인정보처리방침", type: "legal" },
        { url: "/terms", title: "이용약관", type: "legal" },
        { url: "/disclaimer", title: "면책조항", type: "legal" },
        { url: "/llms.txt", title: "AI 검색 안내", type: "ai-index" },
        { url: "/llms-full.txt", title: "AI 전체 콘텐츠 인덱스", type: "ai-index" },
      ],
      blogPosts: posts.map((post) => ({
        url: `/blog/${post.slug}`,
        absoluteUrl: `${siteUrl}/blog/${post.slug}`,
        title: post.title,
        description: post.description,
        category: post.category,
        keywords: post.keywords,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        relatedTests: post.relatedTests,
      })),
      tests: tests.map((test) => ({
        ...test,
        absoluteUrl: toAbsoluteUrl(test.url),
      })),
      totalTests: tests.length,
      totalBlogPosts: posts.length,
      categories: getAiIndexCategories(tests),
      generatedAt: now,
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
