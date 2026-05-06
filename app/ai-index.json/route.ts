import { NextResponse } from "next/server";
import {
  getAiIndexCategories,
  getAiIndexTests,
  toAbsoluteUrl,
} from "@/lib/ai-content-index";

export const revalidate = 3600;

export async function GET() {
  const tests = await getAiIndexTests();
  const now = new Date().toISOString();

  return NextResponse.json(
    {
      site: {
        name: "테몬 MBTI",
        url: "https://temon.kr",
        description:
          "무료 MBTI 테스트 모음. 성격 테스트와 재밌는 심리테스트를 주제별로 제공하는 한국어 테스트 플랫폼",
        language: "ko",
        lastUpdated: now.slice(0, 10),
      },
      pages: [
        {
          url: "/",
          title: "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬",
          type: "home",
        },
        {
          url: "/tests",
          title: "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬",
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
      tests: tests.map((test) => ({
        ...test,
        absoluteUrl: toAbsoluteUrl(test.url),
      })),
      totalTests: tests.length,
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
