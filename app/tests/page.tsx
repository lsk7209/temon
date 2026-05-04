import type { Metadata } from "next";
import { FAQSection } from "@/components/faq-section";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
  createItemListSchema,
} from "@/components/json-ld";
import TestsPageClient from "./tests-page-client";
import { ALL_TESTS } from "@/lib/tests-config";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getListingFAQs } from "@/lib/quiz-seo-utils";

const baseUrl = "https://temon.kr";

const shortDescription =
  "무료 MBTI 테스트 모음. 성격 테스트와 재밌는 심리테스트를 주제별로 바로 시작하세요.";
const fullDescription =
  "테몬의 무료 MBTI 테스트 모음에서 성격 유형과 취향을 찾아보세요. 음식, 연애, 생활 습관, 직장, 디지털 등 일상 주제로 짧게 끝나는 재밌는 심리테스트를 모았습니다.";

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬",
  description: shortDescription,
  keywords: "MBTI 테스트 모음, 무료 심리테스트, 성격테스트, MBTI 퀴즈, 테몬",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬",
    description: fullDescription,
    type: "website",
    url: `${baseUrl}/tests`,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/api/og?title=테몬%20MBTI%20테스트%20모음&desc=무료%20심리테스트`,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI 테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI 테스트 모음 | 무료 성격 테스트 - 테몬",
    description: fullDescription,
    images: [
      `${baseUrl}/api/og?title=테몬%20MBTI%20테스트%20모음&desc=무료%20심리테스트`,
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
      const dbTestsData = await db
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

      dynamicTests = dbTestsData;
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

  const itemListItems = allTestsForSchema.slice(0, 20).map((test) => ({
    name: test.title,
    description: test.description,
    url: `${baseUrl}${test.href}`,
    image: `${baseUrl}/api/og?title=${encodeURIComponent(test.title)}&desc=${encodeURIComponent(test.description)}`,
  }));

  const itemListSchema = createItemListSchema(itemListItems);
  const listingFaqs = getListingFAQs();
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
          category: test.category || "other",
        }))}
      />

      <section className="container max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            무료 성격 테스트 모음, 이렇게 고르면 좋아요
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            검색으로 들어왔다면 먼저 지금 궁금한 주제를 고르세요. 테몬은
            MBTI 테스트 모음, 성격 테스트 모음, 재밌는 테스트를 한 페이지에서
            탐색할 수 있도록 구성했습니다.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                주제별로 고르기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                음식, 연애, 생활 습관, 직장, 디지털처럼 관심사가 뚜렷하면
                카테고리 필터로 비슷한 테스트를 이어서 볼 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">처음이면 인기 테스트</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                처음 방문했다면 참여자가 많고 결과 유형이 쉬운 인기 테스트부터
                시작하세요. 결과를 친구와 비교하기 좋습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">최신 퀴즈로 대화 만들기</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                새로 추가된 재밌는 테스트는 최근 관심사와 잘 맞습니다. 짧게
                끝내고 결과 공유까지 자연스럽게 이어집니다.
              </p>
            </div>
          </div>
          <FAQSection faqs={listingFaqs} className="max-w-none" />
        </div>
      </section>
    </>
  );
}
