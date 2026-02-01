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
  const ogImage = config.image || `${baseUrl}/api/og?title=${encodeURIComponent(config.title)}&desc=${encodeURIComponent(config.shortDescription)}`

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
    },
  }
}

/**
 * Generate structured data schemas for quiz pages
 */
export function generateQuizSchemas(config: QuizSEOConfig): {
  quiz: Record<string, any>
  breadcrumb: Record<string, any>
  faq?: Record<string, any>
} {
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

  const schemas: {
    quiz: Record<string, any>
    breadcrumb: Record<string, any>
    faq?: Record<string, any>
  } = {
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
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent("지금 바로 테스트를 시작해보세요!")}`,
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
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent("지금 바로 테스트를 시작해보세요!")}`],
    },
    robots: {
      index: false, // 테스트 진행 페이지는 인덱싱하지 않음
      follow: true,
      googleBot: {
        index: false,
        follow: true,
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
          url: `${baseUrl}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent("나의 결과는?")}`,
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
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent("나의 결과는?")}`],
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
 * Generate unique title and description for test pages
 * Prevents duplicate title/description issues in Naver Webmaster Tools
 */
export function generateUniqueTestMetadata(config: {
  testName: string
  testCategory: string
  testDescription: string
  keywords: string
  canonical: string
}): Metadata {
  const baseUrl = "https://temon.kr"
  const fullUrl = `${baseUrl}${config.canonical}`

  // 고유한 제목 생성 (40-60자 최적화)
  const uniqueTitle = `${config.testName} - ${config.testCategory}으로 알아보는 성격 유형 | 테몬`

  // Naver 최적화: 80자 이하 설명
  let shortDescription = config.testDescription
  if (shortDescription.length > 80) {
    shortDescription = shortDescription.substring(0, 77) + "..."
  }

  // 전체 설명 (140-160자 최적화, OpenGraph용)
  let fullDescription = `${config.testName} 테스트로 알아보는 나의 성격 유형. ${config.testDescription} 12문항, 약 3분 소요, 결과 공유 이미지 자동 생성.`
  if (fullDescription.length < 140) {
    fullDescription = `${config.testName} 테스트로 알아보는 나의 성격 유형. ${config.testDescription} 12개의 질문에 답변하여 16가지 성격 유형 중 당신의 유형을 알아보세요. 약 3분 소요되며, 결과를 친구들과 공유할 수 있습니다.`
  } else if (fullDescription.length > 160) {
    fullDescription = fullDescription.substring(0, 157) + "..."
  }

  return {
    title: uniqueTitle,
    description: shortDescription,
    keywords: config.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: uniqueTitle,
      description: fullDescription,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.testName)}&desc=${encodeURIComponent(shortDescription)}`,
          width: 1200,
          height: 630,
          alt: config.testName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: uniqueTitle,
      description: fullDescription,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(config.testName)}&desc=${encodeURIComponent(shortDescription)}`],
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

