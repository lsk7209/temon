/**
 * Quiz Page SEO Utilities
 * Reusable functions for generating SEO metadata and structured data for quiz pages
 */

import type { Metadata } from "next"
import { createQuizSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/json-ld"

const baseUrl = "https://temon.kr"

export interface QuizSEOConfig {
  quizId: string
  title: string
  shortDescription: string // Naver-optimized (under 80 chars)
  fullDescription: string // Full description for Google/AI
  keywords: string
  canonical: string
  questionCount?: number
  duration?: string
  image?: string
  faqs?: Array<{ question: string; answer: string }>
}

/**
 * Generate metadata for quiz pages
 */
export function generateQuizMetadata(config: QuizSEOConfig): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`
  const ogImage = config.image || `${baseUrl}/og-tests/${config.quizId}.png`

  return {
    title: `${config.title} | 무료 성격 테스트 | 테몬`,
    description: config.shortDescription, // Naver-optimized
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.title} | 무료 성격 테스트`,
      description: config.fullDescription, // Full description for OG
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | 무료 성격 테스트`,
      description: config.fullDescription,
      images: [ogImage],
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
      other: {
        "naverbot": "index,follow",
        "Yeti": "index,follow",
        "Yeti-Mobile": "index,follow",
      },
    },
  }
}

/**
 * Generate structured data schemas for quiz pages
 */
export function generateQuizSchemas(config: QuizSEOConfig) {
  const fullUrl = `${baseUrl}${config.canonical}`

  const quizSchema = createQuizSchema({
    name: config.title,
    description: config.fullDescription,
    url: fullUrl,
    questionCount: config.questionCount,
    duration: config.duration || "PT3M",
    image: config.image || `${baseUrl}/og-tests/${config.quizId}.png`,
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "테스트 모음", url: `${baseUrl}/tests` },
    { name: config.title, url: fullUrl },
  ])

  const schemas = {
    quiz: quizSchema,
    breadcrumb: breadcrumbSchema,
  }

  // Add FAQ schema if FAQs are provided
  if (config.faqs && config.faqs.length > 0) {
    schemas.faq = createFAQSchema(config.faqs)
  }

  return schemas
}

/**
 * Default FAQ items for quiz pages
 */
export function getDefaultQuizFAQs(quizTitle: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${quizTitle}는 어떻게 진행되나요?`,
      answer: `12개의 간단한 질문에 답변하시면 됩니다. 각 질문은 일상적인 선택 상황을 제시하며, 솔직하게 답변하시면 더 정확한 결과를 얻을 수 있습니다. 소요 시간은 약 3분입니다.`,
    },
    {
      question: `${quizTitle} 결과는 몇 가지 유형이 있나요?`,
      answer: `총 16가지 유형이 있습니다. 각 유형은 MBTI의 16가지 성격 유형을 기반으로 하며, 당신의 선택에 따라 나의 성격 특성을 재미있게 알아볼 수 있습니다.`,
    },
    {
      question: "이 테스트는 무료인가요?",
      answer: "네, 모든 테스트는 완전 무료로 이용하실 수 있습니다. 회원가입이나 결제 없이 바로 시작하실 수 있습니다.",
    },
    {
      question: "테스트 결과를 공유할 수 있나요?",
      answer: "네, 테스트 결과는 SNS(카카오톡, 페이스북, 트위터 등)를 통해 공유하실 수 있습니다. 친구들과 함께 재미있는 결과를 비교해보세요!",
    },
  ]
}

/**
 * Generate metadata for test pages (/test/page.tsx)
 * These are client component pages, so we need a server wrapper
 */
export function generateTestPageMetadata(config: {
  quizId: string
  quizTitle: string
  shortDescription: string
  fullDescription: string
  keywords: string
  canonical: string
}): Metadata {
  const baseUrl = "https://temon.kr"
  const fullUrl = `${baseUrl}${config.canonical}`

  return {
    title: `${config.quizTitle} 테스트 진행 | 무료 성격 테스트 | 테몬`,
    description: config.shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.quizTitle} 테스트 진행`,
      description: config.fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/og-tests/${config.quizId}.png`,
          width: 1200,
          height: 630,
          alt: config.quizTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.quizTitle} 테스트 진행`,
      description: config.fullDescription,
      images: [`${baseUrl}/og-tests/${config.quizId}.png`],
    },
    robots: {
      index: false, // 테스트 진행 페이지는 인덱싱하지 않음
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
      other: {
        "naverbot": "noindex,follow",
        "Yeti": "noindex,follow",
      },
    },
  }
}

/**
 * Generate metadata for result pages (/test/result/page.tsx)
 */
export function generateResultPageMetadata(config: {
  quizId: string
  quizTitle: string
  resultType?: string
  shortDescription: string
  fullDescription: string
  keywords: string
  canonical: string
}): Metadata {
  const baseUrl = "https://temon.kr"
  const fullUrl = `${baseUrl}${config.canonical}`
  const title = config.resultType 
    ? `${config.quizTitle} 결과 - ${config.resultType} 유형 | 테몬`
    : `${config.quizTitle} 결과 | 무료 성격 테스트 | 테몬`

  return {
    title,
    description: config.shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title,
      description: config.fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/og-tests/${config.quizId}-result.png`,
          width: 1200,
          height: 630,
          alt: `${config.quizTitle} 결과`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.fullDescription,
      images: [`${baseUrl}/og-tests/${config.quizId}-result.png`],
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
      other: {
        "naverbot": "index,follow",
        "Yeti": "index,follow",
      },
    },
  }
}

