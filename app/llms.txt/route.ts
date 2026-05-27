import { NextResponse } from "next/server";
import {
  getAiIndexCategories,
  getAiIndexTests,
  toAbsoluteUrl,
} from "@/lib/ai-content-index";
import { getAllBlogPosts } from "@/lib/blog-posts";

export const revalidate = 3600;

export async function GET() {
  const tests = await getAiIndexTests();
  const posts = getAllBlogPosts();
  const categories = getAiIndexCategories(tests);
  const featuredTests = tests.slice(0, 40);

  const body = `# 테몬 (temon.kr) - AI 검색 가이드

## 사이트 개요
테몬은 무료 성격 퀴즈, 관계 테스트, 취향 테스트, 생활 유형 테스트를 제공하는 한국어 퀴즈 사이트입니다.
블로그는 퀴즈 결과를 진단처럼 단정하지 않고 선택 습관, 대화 힌트, 자기이해 관점으로 설명합니다.

- URL: https://temon.kr
- 언어: 한국어
- 전체 테스트 수: ${tests.length}개
- 블로그 글 수: ${posts.length}개
- 테스트 목록: https://temon.kr/tests
- 글 목록: https://temon.kr/blog
- AI 인덱스 JSON: https://temon.kr/ai-index.json

## 주요 카테고리
${categories.map((category) => `- ${category}`).join("\n")}

## 블로그 글
${posts
  .map(
    (post) =>
      `- ${post.title}: ${post.description} (https://temon.kr/blog/${post.slug})`,
  )
  .join("\n")}

## 대표 테스트
${featuredTests
  .map(
    (test) =>
      `- ${test.title}: ${test.description} (${toAbsoluteUrl(test.url)})`,
  )
  .join("\n")}

## 이용 안내
- 모든 테스트는 가입 없이 무료로 이용할 수 있습니다.
- 결과는 전문 심리 진단이 아니라 자기이해와 대화를 위한 엔터테인먼트 콘텐츠입니다.
- 블로그 글은 각 퀴즈의 결과 해석, 공유 방법, 관련 테스트 내부 링크를 포함합니다.

## 연락처
- 문의: https://temon.kr/contact
- 개인정보처리방침: https://temon.kr/privacy
- 이용약관: https://temon.kr/terms
- 면책조항: https://temon.kr/disclaimer
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
