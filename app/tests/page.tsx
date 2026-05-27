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
  { id: "tests-keyword-guide", label: "검색어별 추천" },
  { id: "tests-guide", label: "고르는 방법" },
  { id: "tests-faq", label: "자주 묻는 질문" },
];

const keywordGuides = [
  {
    query: "재밌는 테스트",
    description:
      "친구와 결과를 비교하기 좋은 짧은 성격 테스트와 취향 테스트를 먼저 모았습니다.",
    links: [
      { href: "/tests", label: "재밌는 테스트 모음" },
      { href: "/tests/kpop-idol", label: "아이돌 포지션 테스트" },
      { href: "/tests/ramen-mbti", label: "라면 테스트" },
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
      "처음이라면 참여하기 쉬운 인기 테스트나 최신 테스트를 먼저 추천합니다. 관심사가 뚜렷하다면 음식, 생활, 관계, 직장, 디지털 같은 주제에서 고르면 됩니다.",
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
  "무료 성격 테스트 모음에서 MBTI, 취향, 생활, 관계 테스트를 주제별로 골라보세요.";
const fullDescription =
  "테몬의 무료 성격 테스트 모음에서 MBTI 테스트, 취향 테스트, 관계 테스트, 생활 테스트를 주제별로 찾아보세요. 짧게 끝나는 재밌는 심리테스트를 한곳에 모았습니다.";

export const metadata: Metadata = {
  title: "성격 테스트 모음 | 무료 MBTI 테스트 - 테몬",
  description: shortDescription,
  keywords:
    "성격 테스트 모음, MBTI 테스트 모음, 무료 MBTI 테스트, 재밌는 테스트, 심리테스트, 성격테스트 사이트, 테몬",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "성격 테스트 모음 | 무료 MBTI 테스트 - 테몬",
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
    title: "성격 테스트 모음 | 무료 MBTI 테스트 - 테몬",
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
          <div className="grid gap-4 md:grid-cols-3">
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
              <h3 className="mb-2 font-semibold text-gray-900">주제별로 고르기</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                음식, 역할, 생활 습관, 관계, 디지털처럼 관심사가 뚜렷하다면
                카테고리 필터로 비슷한 테스트를 이어서 볼 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">처음이면 인기 테스트</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                처음 방문했다면 결과 유형이 쉽고 공유하기 좋은 테스트부터
                시작하세요. 친구와 비교하기에도 좋습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">최신 테스트 확인</h3>
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
