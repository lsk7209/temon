import type { Metadata } from "next"
import { JsonLd, createBreadcrumbSchema, createItemListSchema } from "@/components/json-ld"
import { getHomePageTests, ALL_TESTS } from "@/lib/tests-config"
import HomeClient from "./home-client"

const baseUrl = "https://temon.kr"
const canonical = "/"

// Naver-optimized description (under 80 chars)
const shortDescription = "무료 MBTI 성격 테스트 모음. 커피, 라면, 반려동물 등 다양한 주제로 알아보는 나의 성격!"
// Full description for Google/AI (140-160자 최적화)
let fullDescription = "테몬에서 무료로 제공하는 재미있는 MBTI 성격 테스트 모음! 커피, 라면, 반려동물, 공부 습관 등 일상 속 선택으로 알아보는 나의 진짜 성격. 16가지 성격 유형 중 당신은 어떤 유형일까요? 지금 바로 무료로 시작해보세요."

// 140-160자 범위로 조정
if (fullDescription.length < 140) {
  fullDescription = "테몬에서 무료로 제공하는 재미있는 MBTI 성격 테스트 모음! 커피, 라면, 반려동물, 공부 습관 등 일상 속 선택으로 알아보는 나의 진짜 성격. 16가지 성격 유형 중 당신은 어떤 유형일까요? 지금 바로 무료로 시작해보세요. 2분이면 끝!"
} else if (fullDescription.length > 160) {
  fullDescription = fullDescription.substring(0, 157) + "..."
}

export const metadata: Metadata = {
  title: "MBTI 테스트 모음 - 무료 성격 테스트로 알아보는 나의 유형 | 테몬", // 40-60자 최적화
  description: fullDescription, // 140-160자 최적화 (Google/AI용)
  keywords: "MBTI, 성격테스트, MBTI 테스트, 커피MBTI, 라면MBTI, 반려동물MBTI, 공부MBTI, 알람습관, NTRP테스트, 무료 테스트, 심리테스트",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical,
  },
  openGraph: {
    title: "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬",
    description: fullDescription,
    type: "website",
    url: baseUrl,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "테몬 MBTI - 무료 성격 테스트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBTI 테스트 - 무료 성격 테스트 모음 | 테몬",
    description: fullDescription,
    images: [`${baseUrl}/og-image.png`],
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

export default function HomePage() {
  const displayTests = getHomePageTests()
  
  // Generate structured data
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
  ])

  // ItemList schema for popular tests
  const itemListItems = displayTests.map(test => ({
    name: test.title,
    description: test.description,
    url: `${baseUrl}${test.href}`,
    image: `${baseUrl}/og-tests/${test.id}.png`,
  }))

  const itemListSchema = createItemListSchema(itemListItems)

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="home-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="home-itemlist-schema" data={itemListSchema} />
      
      <HomeClient />
    </>
  )
}
