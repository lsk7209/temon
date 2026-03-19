import type { Metadata } from "next"
import { FAQSection } from "@/components/faq-section"
import { JsonLd, createBreadcrumbSchema, createFAQSchema, createItemListSchema } from "@/components/json-ld"
import TestsPageClient from "./tests-page-client"
import { ALL_TESTS } from "@/lib/tests-config"
import { getDb, isDbAvailable } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { getListingFAQs } from "@/lib/quiz-seo-utils"

const baseUrl = "https://temon.kr"

const shortDescription =
  "무료 MBTI 성격 테스트 모음. 음식, 습관, 연애, 공부 등 다양한 주제의 심리 테스트를 즐겨보세요."
const fullDescription =
  "테몬에서 제공하는 무료 성격 테스트 모음! 커피, 라면, 반려동물, 공부 습관, 연애 스타일 등 일상 속 주제로 나의 MBTI 유형을 알아보세요. 대부분 3분 이내 완료, 결과 공유까지 가능합니다."

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 - 무료 성격 테스트 전체 목록 | 테몬",
  description: shortDescription,
  keywords: "MBTI 테스트 모음, 성격 테스트, 무료 심리 테스트, MBTI 유형, 성격 유형 테스트, 테몬",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체 목록 | 테몬",
    description: fullDescription,
    type: "website",
    url: `${baseUrl}/tests`,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/api/og?title=${encodeURIComponent("MBTI 테스트 모음")}&desc=${encodeURIComponent("무료 성격 테스트 전체 목록")}`,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI 테스트 모음 - 무료 성격 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체 목록 | 테몬",
    description: fullDescription,
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("MBTI 테스트 모음")}&desc=${encodeURIComponent("무료 성격 테스트 전체 목록")}`],
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
}

export default async function TestsPage() {
  let dynamicTests: {
    id: string
    title: string
    description: string | null
    slug: string
    category: string | null
  }[] = []

  if (isDbAvailable()) {
    try {
      const db = getDb()
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
        .all()

      dynamicTests = dbTestsData
    } catch (error) {
      console.error("Failed to fetch dynamic tests:", error)
    }
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
  ])

  const allTestsForSchema = [
    ...dynamicTests.map((test) => ({
      title: test.title,
      description: test.description || "",
      href: `/tests/${test.slug}`,
      id: test.id,
    })),
    ...ALL_TESTS,
  ]

  const itemListItems = allTestsForSchema.slice(0, 20).map((test) => ({
    name: test.title,
    description: test.description,
    url: `${baseUrl}${test.href}`,
    image: `${baseUrl}/og-tests/${test.id}.png`,
  }))

  const itemListSchema = createItemListSchema(itemListItems)
  const listingFaqs = getListingFAQs()
  const faqSchema = createFAQSchema(listingFaqs)

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">테스트 이용 가이드</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            관심 있는 주제의 테스트부터 시작해보세요. 짧고 재미있는 테스트로 나의 성격 유형을 알아보고, 결과를 친구들과 공유해보세요.
          </p>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">간편한 시작</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                회원가입 없이 바로 시작! 12개 질문에 답하면 나의 성격 유형을 확인할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">빠른 완료</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                대부분의 테스트는 3분 이내에 완료됩니다. 모바일에서도 편하게 즐길 수 있어요.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">결과 공유</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                테스트 결과를 SNS로 공유하고 친구들과 비교해보세요. 다양한 주제의 테스트를 연달아 즐겨보세요.
              </p>
            </div>
          </div>
          <FAQSection faqs={listingFaqs} className="max-w-none" />
        </div>
      </section>
    </>
  )
}
