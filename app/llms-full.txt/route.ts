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
  const testsByCategory = categories.map((category) => ({
    category,
    tests: tests.filter((test) => test.category === category),
  }));

  const body = `# 테몬 (temon.kr) - AI 전체 콘텐츠 인덱스

## 사이트 개요
테몬은 무료 MBTI 테스트 모음, 성격 테스트 모음, 재밌는 심리테스트를 제공하는 한국어 테스트 플랫폼입니다.
검색자와 AI 답변 엔진이 테스트 주제, 카테고리, URL을 쉽게 이해하도록 이 파일을 유지합니다.

- 사이트: https://temon.kr
- 전체 테스트 수: ${tests.length}개
- 테스트 목록: https://temon.kr/tests
- 사이트맵: https://temon.kr/sitemap.xml
- AI 인덱스 JSON: https://temon.kr/ai-index.json
- 개인정보처리방침: https://temon.kr/privacy
- 이용약관: https://temon.kr/terms
- 면책조항: https://temon.kr/disclaimer
- 생성 시각: ${new Date().toISOString()}

## 콘텐츠 원칙
- 모든 테스트는 무료로 이용할 수 있습니다.
- 결과는 전문 심리 진단이 아니라 오락과 자기 이해를 위한 성향 분석 콘텐츠입니다.
- 테스트는 짧은 문항, 명확한 결과 유형, 공유 가능한 결과 페이지를 기준으로 구성됩니다.

## 카테고리별 테스트
${testsByCategory
  .map(
    (group) => `### ${group.category}
${group.tests
  .map(
    (test) =>
      `- ${test.title}: ${test.description} | ${toAbsoluteUrl(test.url)}`,
  )
  .join("\n")}`,
  )
  .join("\n\n")}

## FAQ
Q. 테몬 테스트는 무료인가요?
A. 네. 가입이나 결제 없이 무료로 이용할 수 있습니다.

Q. 테스트 결과는 공식 MBTI 진단인가요?
A. 아닙니다. 테몬의 결과는 MBTI식 성향 분류를 가볍게 응용한 오락 콘텐츠입니다.

Q. 어떤 테스트부터 하면 좋나요?
A. 처음이라면 인기 테스트나 최신 테스트를 추천합니다. 관심사가 뚜렷하면 음식, 연애, 생활, 직장, 디지털 등 카테고리에서 고르세요.

Q. 결과를 공유할 수 있나요?
A. 네. 결과 페이지는 친구와 비교하고 공유하기 좋게 구성되어 있습니다.
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
