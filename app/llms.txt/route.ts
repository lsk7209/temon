import { NextResponse } from "next/server";
import {
  getAiIndexCategories,
  getAiIndexTests,
  toAbsoluteUrl,
} from "@/lib/ai-content-index";

export const revalidate = 3600;

export async function GET() {
  const tests = await getAiIndexTests();
  const categories = getAiIndexCategories(tests);
  const featuredTests = tests.slice(0, 40);

  const body = `# 테몬 (temon.kr) - AI 검색 가이드

## 사이트 개요
테몬은 무료 MBTI 테스트 모음과 성격 테스트를 제공하는 한국어 테스트 플랫폼입니다.
음식, 연애, 생활 습관, 직장, 디지털, 재테크, 엔터테인먼트 등 일상 주제의 재밌는 심리테스트를 제공합니다.

- URL: https://temon.kr
- 언어: 한국어
- 전체 테스트 수: ${tests.length}개
- 주요 페이지: https://temon.kr/tests
- 글 목록: https://temon.kr/blog
- 업데이트: 신규 테스트 발행 시 자동 반영

## 주요 카테고리
${categories.map((category) => `- ${category}`).join("\n")}

## 대표 테스트
${featuredTests
  .map(
    (test) =>
      `- ${test.title}: ${test.description} (${toAbsoluteUrl(test.url)})`,
  )
  .join("\n")}

## 이용 안내
- 모든 테스트는 가입 없이 무료로 이용할 수 있습니다.
- 결과는 오락과 자기 이해를 위한 성향 분석 콘텐츠이며 전문 심리 진단이 아닙니다.
- 각 테스트는 보통 12문항, 약 2~3분 소요를 기준으로 구성됩니다.
- 결과 페이지는 친구와 공유하기 쉽게 구성되어 있습니다.

## 연락처
- 사이트: https://temon.kr
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
