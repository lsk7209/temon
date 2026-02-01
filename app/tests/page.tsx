import type { Metadata } from "next"
import TestsPageClient from "./tests-page-client"
import { JsonLd, createBreadcrumbSchema, createItemListSchema } from "@/components/json-ld"
import { ALL_TESTS } from "@/lib/tests-config"
import { db } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

const baseUrl = "https://temon.kr"

// Naver-optimized description (under 80 chars)
const shortDescription = "무료 MBTI 성격 테스트 모음. 커피, 라면, 반려동물 등 다양한 주제!"
// Full description for Google/AI
const fullDescription = "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요! 커피, 라면, 반려동물, 공부 습관 등 다양한 MBTI 테스트를 무료로 시작해보세요. 16가지 성격 유형을 재미있게 알아보는 테스트 모음입니다."

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기 | 테몬",
  description: shortDescription, // Naver-optimized
  keywords: "MBTI 테스트, 성격 테스트, MBTI 모음, 무료 테스트, 심리테스트, 테몬",
  metadataBase: new URL("https://temon.kr"),
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기",
    description: fullDescription, // Full description for OG
    type: "website",
    url: `${baseUrl}/tests`,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/og-tests.png`,
        width: 1200,
        height: 630,
        alt: "MBTI 테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기",
    description: fullDescription,
    images: [`${baseUrl}/og-tests.png`],
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
  // Fetch published tests from DB
  let dynamicTests: {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    category: string | null;
  }[] = []

  try {
    const dbTestsData = await db.select({
      id: tests.id,
      title: tests.title,
      description: tests.description,
      slug: tests.slug,
      category: tests.category
    })
      .from(tests)
      .where(eq(tests.status, 'published'))
      .orderBy(desc(tests.createdAt))
      .all()

    dynamicTests = dbTestsData
  } catch (error) {
    console.error("Failed to fetch dynamic tests:", error)
  }

  // Generate structured data schemas
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
  ])

  // ItemList 스키마 생성 (테스트 목록 최적화)
  // Combine static and dynamic for schema
  const allTestsForSchema = [
    ...dynamicTests.map(t => ({
      title: t.title,
      description: t.description || "",
      href: `/tests/${t.slug}`,
      id: t.id
    })),
    ...ALL_TESTS
  ]

  const itemListItems = allTestsForSchema.slice(0, 20).map(test => ({
    name: test.title,
    description: test.description,
    url: `${baseUrl}${test.href}`,
    image: `${baseUrl}/og-tests/${test.id}.png`,
  }))

  const itemListSchema = createItemListSchema(itemListItems)

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="tests-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="tests-itemlist-schema" data={itemListSchema} />
      <TestsPageClient dynamicTests={dynamicTests.map(t => ({
        ...t,
        description: t.description || "",
        category: t.category || "기타"
      }))} />
    </>
  )
}
