import type { Metadata } from "next"
import TestsPageClient from "./tests-page-client"
import { JsonLd, createBreadcrumbSchema, createItemListSchema } from "@/components/json-ld"
import { ALL_TESTS } from "@/lib/tests-config"

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

export default function TestsPage() {
  // Generate structured data schemas
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
  ])

  // ItemList 스키마 생성 (테스트 목록 최적화)
  const itemListItems = ALL_TESTS.slice(0, 20).map(test => ({
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
      <TestsPageClient />
    </>
  )
}
