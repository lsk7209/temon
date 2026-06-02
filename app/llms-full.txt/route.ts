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
  const testsByCategory = categories.map((category) => ({
    category,
    tests: tests.filter((test) => test.category === category),
  }));

  const body = `# 테몬 (temon.kr) - AI 전체 콘텐츠 인덱스

## 사이트 개요
테몬은 무료 MBTI형 테스트, 성격 퀴즈, 관계 테스트, 취향 테스트, 생활 유형 테스트를 제공하는 한국어 퀴즈 사이트입니다.
검색 사용자와 AI 응답 엔진이 테스트 주제, 카테고리, URL, 블로그 해석 글을 쉽게 이해하도록 이 파일을 제공합니다.

- 사이트: [https://temon.kr](https://temon.kr)
- 전체 테스트 수: ${tests.length}개
- 블로그 글 수: ${posts.length}개
- 테스트 목록: [https://temon.kr/tests](https://temon.kr/tests)
- 글 목록: [https://temon.kr/blog](https://temon.kr/blog)
- 사이트맵: [https://temon.kr/sitemap.xml](https://temon.kr/sitemap.xml)
- AI 인덱스 JSON: [https://temon.kr/ai-index.json](https://temon.kr/ai-index.json)
- 생성 시각: ${new Date().toISOString()}

## 콘텐츠 원칙
- 모든 테스트는 무료로 이용할 수 있습니다.
- 결과는 전문 심리 진단이 아니라 자기이해와 대화를 위한 엔터테인먼트 콘텐츠입니다.
- 블로그 글은 결과를 단정하지 않고 선택 습관, 관계 대화, 실용적 적용 방식으로 해석합니다.
- 수동 광고 슬롯을 본문 흐름에 끼워 넣지 않고, 자동광고 환경에서도 글 레이아웃이 자연스럽게 이어지도록 구성합니다.

## 블로그 글 전체 목록
${posts
  .map(
    (post) => `### ${post.title}
- URL: [https://temon.kr/blog/${post.slug}](https://temon.kr/blog/${post.slug})
- 카테고리: ${post.category}
- 설명: ${post.description}
- 핵심 요약: ${post.summary}
- 키워드: ${post.keywords.join(", ")}
- 관련 테스트: ${post.relatedTests.map((test) => `${test.title} ${test.href}`).join(", ")}
`,
  )
  .join("\n")}

## 카테고리별 테스트
${testsByCategory
  .map(
    (group) => `### ${group.category}
${group.tests
  .map(
    (test) =>
      `- ${test.title}: ${test.description} | [${toAbsoluteUrl(test.url)}](${toAbsoluteUrl(test.url)})`,
  )
  .join("\n")}`,
  )
  .join("\n\n")}

## FAQ
Q. 테몬 테스트는 무료인가요?
A. 네. 가입이나 결제 없이 무료로 이용할 수 있습니다.

Q. 테스트 결과는 공식 심리 진단인가요?
A. 아닙니다. 테몬 결과는 MBTI형 분류를 가볍게 적용한 오락 콘텐츠이며 전문 진단을 대체하지 않습니다.

Q. 블로그 글은 어떤 역할을 하나요?
A. 블로그 글은 퀴즈 결과를 더 잘 읽는 기준을 제공하고, 관련 테스트로 이어지는 내부 링크를 제공합니다.

Q. 어떤 테스트부터 하면 좋나요?
A. 처음이라면 인기 테스트나 최신 테스트를 추천합니다. 관심사가 뚜렷하다면 성격, 관계, 취향, 일상, 직장·공부, 디지털 카테고리에서 고르면 됩니다.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
