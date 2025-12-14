import type { Metadata } from "next"
import TestsPageClient from "./tests-page-client"
import Script from "next/script"
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo-utils"
import { ALL_TESTS } from "@/lib/tests-config"

const baseUrl = "https://temon.kr"

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기 | 테몬",
  description: "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요! 커피, 라면, 반려동물, 공부 습관 등 다양한 MBTI 테스트를 무료로 시작해보세요.",
  keywords: "MBTI 테스트, 성격 테스트, MBTI 모음, 무료 테스트, 심리테스트, 테몬",
  alternates: {
    canonical: "/tests",
  },
  openGraph: {
    title: "MBTI 테스트 모음 - 무료 성격 테스트 전체보기",
    description: "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요! 다양한 MBTI 테스트를 무료로 시작해보세요.",
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
    description: "MBTI 테스트 모음으로 모든 무료 성격 테스트를 한 번에 확인하세요!",
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

const breadcrumbSchema = generateBreadcrumbSchema([
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

const itemListSchema = generateItemListSchema(itemListItems)

export default function TestsPage() {
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListSchema }}
      />
      <TestsPageClient />
    </>
  )
}
