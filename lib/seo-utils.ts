/**
 * SEO, AEO, GEO 최적화 유틸리티 함수
 */

import type { Metadata } from "next"

export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
}

export interface FAQItem {
  question: string
  answer: string
}

/**
 * 기본 메타데이터 생성
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.temon.kr"
  const canonical = config.canonical || "/"
  const fullUrl = `${baseUrl}${canonical}`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: config.type || "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: config.ogImage
        ? [
            {
              url: config.ogImage,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.png`,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : [`${baseUrl}/og-image.png`],
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
    other: {
      "naver-site-verification": process.env.NAVER_SITE_VERIFICATION || "",
    },
  }
}

/**
 * 테스트 페이지 메타데이터 생성
 */
export function generateTestMetadata(testId: string, testTitle: string, testDescription: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.temon.kr"
  const canonical = `/tests/${testId}`
  const fullUrl = `${baseUrl}${canonical}`

  return {
    title: `${testTitle} | 무료 성격 테스트 | 테몬`,
    description: testDescription,
    keywords: `${testTitle}, 성격 테스트, MBTI, 무료 테스트, 심리 테스트`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${testTitle} | 무료 성격 테스트`,
      description: testDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/og-tests/${testId}.png`,
          width: 1200,
          height: 630,
          alt: testTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${testTitle} | 무료 성격 테스트`,
      description: testDescription,
      images: [`${baseUrl}/og-tests/${testId}.png`],
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
}

/**
 * FAQ 스키마 생성 (AEO 최적화)
 */
export function generateFAQSchema(faqs: FAQItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  })
}

/**
 * Quiz 스키마 생성 (SEO 최적화)
 */
export function generateQuizSchema(config: {
  name: string
  description: string
  url: string
  questionCount?: number
  duration?: string
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: config.name,
    description: config.description,
    inLanguage: "ko",
    url: config.url,
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: "https://www.temon.kr",
    },
    ...(config.questionCount && { numberOfQuestions: config.questionCount }),
    ...(config.duration && { timeRequired: config.duration }),
  })
}

/**
 * Breadcrumb 스키마 생성 (SEO 최적화)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })
}

/**
 * WebSite 스키마 생성 (검색 엔진 최적화)
 */
export function generateWebSiteSchema(searchAction?: { target: string; queryInput: string }): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "테몬",
    url: "https://www.temon.kr",
    description: "무료 성격 테스트 및 MBTI 테스트 모음",
    inLanguage: "ko",
    ...(searchAction && {
      potentialAction: {
        "@type": "SearchAction",
        target: searchAction.target,
        "query-input": searchAction.queryInput,
      },
    }),
  })
}

/**
 * Organization 스키마 생성 (브랜드 신뢰도 향상 및 검색 엔진 최적화)
 */
export function generateOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "테몬",
    url: "https://www.temon.kr",
    logo: "https://www.temon.kr/placeholder-logo.png",
    description: "무료 성격 테스트 및 MBTI 테스트 플랫폼",
    inLanguage: "ko",
    areaServed: "KR",
    sameAs: [
      // 향후 소셜 미디어 링크 추가 가능
    ],
    // 검색 엔진 최적화를 위한 추가 정보
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.temon.kr/tests?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  })
}

/**
 * 테스트 페이지용 통합 스키마 생성 (SEO + AEO + GEO)
 */
export function generateTestPageSchemas(config: {
  testId: string
  testTitle: string
  testDescription: string
  questionCount: number
  duration: string
  faqs: FAQItem[]
}): {
  quiz: string
  faq: string
  breadcrumb: string
} {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.temon.kr"
  const testUrl = `${baseUrl}/tests/${config.testId}`

  return {
    quiz: generateQuizSchema({
      name: config.testTitle,
      description: config.testDescription,
      url: testUrl,
      questionCount: config.questionCount,
      duration: config.duration,
    }),
    faq: generateFAQSchema(config.faqs),
    breadcrumb: generateBreadcrumbSchema([
      { name: "홈", url: baseUrl },
      { name: "테스트 모음", url: `${baseUrl}/tests` },
      { name: config.testTitle, url: testUrl },
    ]),
  }
}
