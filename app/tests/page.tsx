import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ContentToc } from "@/components/content-toc";
import { FAQSection } from "@/components/faq-section";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
} from "@/components/json-ld";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { ALL_TESTS } from "@/lib/tests-config";
import TestsPageClient from "./tests-page-client";

const baseUrl = "https://temon.kr";

const tocItems = [
  { id: "tests-list", label: "전체 테스트" },
  { id: "tests-interpretation-guide", label: "해석 가이드" },
  { id: "tests-keyword-guide", label: "검색어별 추천" },
  { id: "tests-guide", label: "고르는 방법" },
  { id: "tests-faq", label: "자주 묻는 질문" },
];

const interpretationGuides = [
  {
    title: "무료 MBTI 테스트를 고를 때 확인할 기준",
    description:
      "한국어 질문, 결과 해석, 공유 흐름, 진단 고지까지 처음 방문자가 확인할 기준을 정리했습니다.",
    href: "/blog/free-mbti-test-guide-korean",
    links: [
      { href: "/tests/coffee-mbti", label: "커피 MBTI" },
      { href: "/tests/study-mbti", label: "공부 MBTI" },
    ],
  },
  {
    title: "MBTI 테스트 결과를 실용적으로 해석하는 법",
    description:
      "유형명에서 끝내지 않고 장점, 피로 지점, 관계 대화, 다음 행동으로 읽는 방법입니다.",
    href: "/blog/mbti-test-result-interpretation",
    links: [
      { href: "/tests/perfection-balance-1xQC", label: "완벽주의 테스트" },
      { href: "/tests/study-mbti", label: "공부 스타일" },
    ],
  },
  {
    title: "음식 취향 테스트를 한 번에 읽는 방법",
    description:
      "라면, 커피, 디저트 테스트를 안정감, 새로움, 루틴, 관계 대화로 연결하는 허브 글입니다.",
    href: "/blog/food-personality-test-hub",
    links: [
      { href: "/tests/ramen-mbti", label: "라면 MBTI" },
      { href: "/tests/coffee-mbti", label: "커피 MBTI" },
    ],
  },
  {
    title: "연애 테스트 결과를 대화로 활용하는 방법",
    description:
      "연애 테스트 결과를 상대 평가가 아니라 관계 기준과 감정 표현 대화로 바꾸는 방법입니다.",
    href: "/blog/love-reaction-test-conversation",
    links: [
      { href: "/tests/love-reaction", label: "연애 반응" },
      { href: "/tests/breakup-style", label: "이별 대처" },
    ],
  },
  {
    title: "소비성향 테스트로 보는 돈 쓰는 습관",
    description:
      "충동구매, 비교 습관, 만족 기준을 금융 조언이 아닌 일상 선택 습관으로 읽습니다.",
    href: "/blog/spending-style-test-money-habits",
    links: [
      { href: "/tests/spending-style", label: "소비성향" },
      { href: "/tests/shopping-style", label: "쇼핑 스타일" },
    ],
  },
  {
    title: "크로노타입 테스트 결과를 하루 루틴에 적용하는 법",
    description:
      "아침형·저녁형 이름보다 에너지 시간대와 일정 배치를 중심으로 해석합니다.",
    href: "/blog/sleep-chronotype-test-routine",
    links: [
      { href: "/tests/sleep-chronotype", label: "크로노타입" },
      { href: "/tests/morning-energy", label: "아침 에너지" },
    ],
  },
];

const keywordGuides = [
  {
    query: "재밌는 테스트",
    description:
      "친구와 결과를 비교하기 좋은 성격 테스트와 취향 테스트를 먼저 모았습니다.",
    links: [
      { href: "/tests", label: "재밌는 테스트 모음" },
      { href: "/tests/kpop-idol", label: "아이돌 포지션 테스트" },
      { href: "/tests/ramen-mbti", label: "라면 MBTI 테스트" },
    ],
  },
  {
    query: "MBTI 테스트 한국어",
    description:
      "한국어 질문과 결과 해석으로 바로 읽을 수 있는 무료 MBTI 스타일 테스트입니다.",
    links: [
      { href: "/tests/coffee-mbti", label: "커피 MBTI 테스트" },
      { href: "/tests/pet-mbti", label: "반려동물 MBTI 테스트" },
      { href: "/tests/kdrama-mbti", label: "K드라마 MBTI 테스트" },
    ],
  },
  {
    query: "성격 테스트 사이트",
    description:
      "회원가입 없이 시작하고 결과를 바로 공유할 수 있는 무료 성격 테스트 사이트입니다.",
    links: [
      { href: "/tests/spending-style", label: "소비 성향 테스트" },
      { href: "/tests/sleep-chronotype", label: "수면 유형 테스트" },
      { href: "/blog", label: "테스트 글 목록" },
    ],
  },
  {
    query: "성격 성향 테스트",
    description:
      "소비, 수면, 공부, 관계처럼 일상 선택에서 드러나는 성향을 가볍게 확인합니다.",
    links: [
      { href: "/tests/spending-style", label: "소비 성향 테스트" },
      { href: "/tests/sleep-chronotype", label: "수면 성향 테스트" },
      { href: "/tests/study-mbti", label: "공부 성향 테스트" },
    ],
  },
  {
    query: "심리테스트 사이트",
    description:
      "전문 진단이 아닌, 친구와 공유하며 즐기기 좋은 무료 심리테스트와 성격 테스트를 모았습니다.",
    links: [
      { href: "/tests", label: "무료 심리테스트 모음" },
      {
        href: "/blog/why-personality-quizzes-feel-accurate",
        label: "심리테스트가 맞게 느껴지는 이유",
      },
      { href: "/tests/music-taste", label: "음악 취향 심리테스트" },
    ],
  },
  {
    query: "무료 MBTI 검사 사이트",
    description:
      "가입 절차 없이 한국어 질문으로 바로 시작할 수 있는 무료 MBTI 스타일 테스트를 연결했습니다.",
    links: [
      { href: "/tests/coffee-mbti", label: "커피 MBTI 검사" },
      { href: "/tests/pet-mbti", label: "반려동물 MBTI 검사" },
      { href: "/tests/kdrama-mbti", label: "K드라마 MBTI 검사" },
    ],
  },
  {
    query: "MBTI 테스트 무료",
    description:
      "무료로 바로 풀 수 있고 결과 공유가 쉬운 MBTI형 테스트를 찾는 방문자에게 맞췄습니다.",
    links: [
      { href: "/tests/coffee-mbti", label: "무료 커피 MBTI 테스트" },
      { href: "/tests/ramen-mbti", label: "무료 라면 MBTI 테스트" },
      { href: "/tests/pet-mbti", label: "무료 반려동물 MBTI 테스트" },
    ],
  },
  {
    query: "MBTI 테스트 질문 한국어",
    description:
      "한국어 질문을 읽고 2~3분 안에 풀 수 있는 테스트를 고르도록 구성했습니다.",
    links: [
      { href: "/tests/coffee-mbti/test", label: "커피 MBTI 질문 풀기" },
      { href: "/tests/study-mbti/test", label: "공부 MBTI 질문 풀기" },
      { href: "/tests/kdrama-mbti/test", label: "K드라마 MBTI 질문 풀기" },
    ],
  },
  {
    query: "소비성향 테스트",
    description:
      "돈을 쓰는 기준, 할인 반응, 충동구매 패턴을 가볍게 확인하는 테스트입니다.",
    links: [
      { href: "/tests/spending-style", label: "소비 성향 테스트" },
      { href: "/tests/shopping-style", label: "쇼핑 스타일 테스트" },
      { href: "/tests/market-choice", label: "장보기 선택 테스트" },
    ],
  },
  {
    query: "크로노타입 테스트",
    description:
      "아침과 밤의 에너지 리듬, 집중 시간, 수면 습관을 확인하려는 검색어에 맞췄습니다.",
    links: [
      { href: "/tests/sleep-chronotype", label: "수면 크로노타입 테스트" },
      { href: "/tests/morning-energy", label: "아침 에너지 테스트" },
      { href: "/tests/evening-routine", label: "저녁 루틴 테스트" },
    ],
  },
  {
    query: "좀비 생존 테스트",
    description:
      "상황형 질문으로 생존 판단, 대응 성향, 위험 대처 스타일을 재미있게 비교합니다.",
    links: [
      { href: "/tests/zombie-survival", label: "좀비 생존 테스트" },
      { href: "/tests/game-play-style", label: "게임 플레이 스타일 테스트" },
      { href: "/tests/weekend-planning", label: "계획형 테스트" },
    ],
  },
  {
    query: "완벽주의 테스트",
    description:
      "기준을 높이는 시간, 자기검열, 마감 전 압박감을 확인하고 균형점을 찾는 테스트입니다.",
    links: [
      { href: "/tests/perfection-balance-1xQC", label: "완벽주의 균형 테스트" },
      { href: "/tests/study-mbti", label: "공부 스타일 테스트" },
      { href: "/tests/weekend-balance", label: "주말 균형 테스트" },
    ],
  },
  {
    query: "테스트 사이트",
    description:
      "MBTI, 성격, 취향, 생활 습관 테스트를 한 페이지에서 탐색하고 주제별로 이어서 볼 수 있습니다.",
    links: [
      { href: "/tests", label: "전체 테스트 사이트" },
      { href: "/tests/morning-energy", label: "생활 성향 테스트" },
      { href: "/tests/ramen-mbti", label: "음식 취향 테스트" },
    ],
  },
];

const listingFaqs = [
  {
    question: "테몬의 MBTI 테스트 모음은 무료인가요?",
    answer:
      "네. 테몬의 MBTI 테스트 모음과 성격 테스트 모음은 가입이나 결제 없이 무료로 이용할 수 있습니다.",
  },
  {
    question: "어떤 테스트부터 시작하면 좋나요?",
    answer:
      "처음이라면 참여하기 쉬운 인기 테스트나 최신 테스트를 먼저 추천합니다. 관심사가 뚜렷하다면 음식, 생활, 관계, 직장, 연애 같은 주제에서 고르면 됩니다.",
  },
  {
    question: "테스트 결과는 전문 진단인가요?",
    answer:
      "아닙니다. 결과는 가볍게 즐기는 성향 분석 콘텐츠입니다. 자기 이해와 친구와의 대화 소재로 활용하는 것이 좋습니다.",
  },
  {
    question: "결과를 친구에게 공유할 수 있나요?",
    answer:
      "네. 결과 페이지에서 공유 버튼을 눌러 링크를 복사하거나 모바일 공유 기능으로 친구에게 보낼 수 있습니다.",
  },
];

const shortDescription =
  "무료 MBTI 테스트와 성격 테스트를 회원가입 없이 바로 시작하세요. 한국어 질문, 2~3분 결과, 친구 공유가 쉬운 심리테스트 모음입니다.";
const fullDescription =
  "테몬의 무료 성격 테스트 모음에서 MBTI 검사, 한국어 MBTI 질문, 심리테스트, 취향 테스트, 관계 테스트, 생활 테스트를 주제별로 찾아보세요. 회원가입 없이 짧게 끝나는 재밌는 테스트를 한곳에 모았습니다.";

const trustHighlights = [
  {
    title: "회원가입 없이 무료",
    description: "설치나 로그인 없이 바로 시작할 수 있는 무료 테스트입니다.",
  },
  {
    title: "한국어 질문",
    description: "모바일에서 읽기 쉬운 짧은 한국어 문항으로 구성했습니다.",
  },
  {
    title: "2~3분 결과",
    description: "짧게 풀고 결과를 바로 확인해 친구와 공유할 수 있습니다.",
  },
  {
    title: "진단이 아닌 재미",
    description: "전문 심리 진단이 아니라 자기이해와 대화를 위한 콘텐츠입니다.",
  },
];

export const metadata: Metadata = {
  title: "성격 성향 테스트 모음 | 무료 심리·MBTI 테스트 바로가기 - 테몬",
  description: shortDescription,
  keywords:
    "재밌는 테스트 모음, 성격 테스트 모음, MBTI 테스트 모음, 무료 MBTI 검사 사이트, MBTI 테스트 질문 한국어, MBTI 테스트 무료, 성격 성향 테스트, 심리테스트 사이트, 테스트 사이트, 테몬",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "성격 성향 테스트 모음 | 무료 심리·MBTI 테스트 바로가기 - 테몬",
    description: fullDescription,
    type: "website",
    url: `${baseUrl}/tests`,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent("테몬 MBTI 테스트 모음")}&desc=${encodeURIComponent("무료 심리테스트")}`,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI 테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 MBTI 테스트 모음 | 성격·심리테스트 사이트 - 테몬",
    description: fullDescription,
    images: [
      `${baseUrl}/api/og?title=${encodeURIComponent("테몬 MBTI 테스트 모음")}&desc=${encodeURIComponent("무료 심리테스트")}`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function TestsPage() {
  let dynamicTests: {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    category: string | null;
  }[] = [];

  if (isDbAvailable()) {
    try {
      const db = getDb();
      dynamicTests = await db
        .select({
          id: tests.id,
          title: tests.title,
          description: tests.description,
          slug: tests.slug,
          category: tests.category,
        })
        .from(tests)
        .where(eq(tests.status, "published"))
        .orderBy(desc(tests.publishedAt), desc(tests.createdAt))
        .all();
    } catch (error) {
      console.error("Failed to fetch dynamic tests:", error);
    }
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
  ]);

  const allTestsForSchema = [
    ...dynamicTests.map((test) => ({
      title: test.title,
      description: test.description || "",
      href: `/tests/${test.slug}`,
      id: test.id,
    })),
    ...ALL_TESTS,
  ];

  const itemListSchema = createItemListSchema(
    allTestsForSchema.slice(0, 20).map((test) => ({
      name: test.title,
      description: test.description,
      url: `${baseUrl}${test.href}`,
      image: `${baseUrl}/api/og?title=${encodeURIComponent(test.title)}&desc=${encodeURIComponent(test.description)}`,
    })),
  );
  const faqSchema = createFAQSchema(listingFaqs);

  return (
    <>
      <JsonLd id="tests-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="tests-itemlist-schema" data={itemListSchema} />
      <JsonLd id="tests-faq-schema" data={faqSchema} />

      <section className="bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 px-4 pb-10 pt-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-2 text-lg font-semibold text-white">
            무료 테스트 사이트
          </p>
          <h1 className="text-5xl font-black leading-tight text-gray-950 md:text-7xl">
            성격 테스트 모음
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-8 text-gray-700 md:text-2xl">
            무료 MBTI 테스트, 성격 테스트, 취향 테스트를 한곳에서 골라보세요.
            관심 주제별로 빠르게 찾고 결과를 친구와 공유할 수 있습니다.
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {trustHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <h2 className="text-base font-black text-gray-950">
                  {highlight.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestsPageClient
        dynamicTests={dynamicTests.map((test) => ({
          ...test,
          description: test.description || "",
          category: test.category || "기타",
        }))}
      />

      <div className="container mx-auto max-w-4xl px-4 pb-8">
        <ContentToc items={tocItems} />
      </div>

      <section
        id="tests-interpretation-guide"
        className="article-content container mx-auto max-w-5xl px-4 pb-12"
      >
        <div className="rounded-lg border border-cyan-100 bg-white/85 p-6 shadow-lg backdrop-blur-sm md:p-8">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-black text-gray-950">
              테스트 결과를 더 잘 읽는 해석 가이드
            </h2>
            <p className="mt-3 leading-7 text-gray-700">
              테스트를 풀기 전에는 고르는 기준을, 결과를 본 뒤에는 해석 방법을
              함께 읽어보세요. 각 글은 관련 테스트로 바로 이어지도록
              연결했습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {interpretationGuides.map((guide) => (
              <article
                key={guide.href}
                className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-black leading-snug text-gray-950">
                  <Link href={guide.href} className="hover:text-cyan-700">
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {guide.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={guide.href}
                    className="rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700 ring-1 ring-cyan-100 transition hover:bg-cyan-100"
                  >
                    글 읽기
                  </Link>
                  {guide.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-100 transition hover:bg-gray-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tests-keyword-guide"
        className="article-content container mx-auto max-w-5xl px-4 pb-12"
      >
        <div className="rounded-lg border border-violet-100 bg-white/85 p-6 shadow-lg backdrop-blur-sm md:p-8">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-black text-gray-950">
              검색어별로 바로 고르는 재밌는 테스트
            </h2>
            <p className="mt-3 text-gray-700">
              GSC에서 노출이 확인된 검색어를 기준으로 처음 방문한 사람이 바로
              클릭하기 좋은 테스트 묶음을 정리했습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {keywordGuides.map((guide) => (
              <article
                key={guide.query}
                className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-950">
                  {guide.query}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {guide.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700 ring-1 ring-violet-100 transition hover:bg-violet-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="tests-guide"
        className="article-content container mx-auto max-w-4xl px-4 pb-16"
      >
        <div className="rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            무료 성격 테스트 모음, 어떻게 고르면 좋을까요?
          </h2>
          <p className="mb-6 leading-relaxed text-gray-700">
            검색으로 들어왔다면 먼저 지금 궁금한 주제를 고르세요. 테몬은 성격
            테스트 모음, MBTI 테스트 모음, 재밌는 테스트를 한 페이지에서 탐색할
            수 있도록 구성했습니다. 주제, 참여 시간, 결과 공유 가능 여부를 보고
            선택하면 실패 없이 시작할 수 있습니다.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                주제별로 고르기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                음식, 역할, 생활 습관, 관계, 연애처럼 관심사가 뚜렷하다면
                카테고리 필터로 비슷한 테스트를 이어서 볼 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                처음이면 인기 테스트
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                처음 방문했다면 결과 유형이 쉽고 공유하기 좋은 테스트부터
                시작하세요. 친구와 비교하기에도 좋습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">
                최신 테스트 확인
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                새로 추가된 테스트는 최근 관심사와 맞춰져 있습니다. 짧게 풀고
                결과 공유까지 자연스럽게 이어집니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tests-faq"
        className="article-content container mx-auto max-w-4xl px-4 pb-20"
      >
        <FAQSection faqs={listingFaqs} title="테스트 모음 자주 묻는 질문" />
      </section>
    </>
  );
}
