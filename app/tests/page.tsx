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
  "무료 MBTI 성격 테스트 모음. 음식, 습관, 수면, 공부, 관계 등 다양한 주제로 알아보는 나의 성격!";
const fullDescription =
  "테몬의 무료 MBTI 테스트 모음에서 내 성격 유형을 찾아보세요. 커피, 라면, 반려동물, 공부 습관 등 일상 속 주제로 2분 만에 완료되는 재미있는 심리테스트. 친구들과 결과를 공유해보세요.";

export const metadata: Metadata = {
  title: "MBTI 테스트 전체 모음 - 무료 심리테스트 | 테몬",
  description: shortDescription,
  keywords: "MBTI 테스트 모음, 무료 심리테스트, 성격테스트, MBTI 퀴즈, 테몬",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 전체 모음 - 무료 심리테스트 | 테몬",
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
    title: "MBTI 테스트 전체 모음 - 무료 심리테스트 | 테몬",
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
        .orderBy(desc(tests.createdAt))
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
        <div className="rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            테몬 MBTI 테스트 활용법
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            관심 있는 주제의 테스트부터 시작해보세요. 짧고 명확한 테스트일수록
            완료율이 높고 친구들과 공유하기도 좋습니다.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                검색으로 찾기
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                커피, 라면, 반려동물 등 주제별 테스트 페이지에서 내 성격 유형을
                정확히 알아볼 수 있어요.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">빠른 완료</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                대부분 2분 이내에 완료돼요. 이동 중에도 가볍게 테스트하고 결과를
                바로 공유하세요.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">연속 테스트</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                음식, 습관, 공부, 관계 등 테마별로 연결된 테스트를 이어서
                즐겨보세요.
              </p>
            </div>
          </div>
          <FAQSection faqs={listingFaqs} className="max-w-none" />
        </div>
      </section>
    </>
  );
}
