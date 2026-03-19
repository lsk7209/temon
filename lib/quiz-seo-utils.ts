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

export function getIntroHighlights(quizTitle: string): string[] {
  return [
    `${quizTitle}는 회원가입이나 결제 없이 바로 시작할 수 있습니다.`,
    "이상적인 나보다 평소 습관대로 답하면 더 정확한 결과를 얻을 수 있어요.",
    "나중에 다시 해보면 상황이나 기분에 따라 결과가 달라질 수 있습니다.",
  ]
}

export function getIntroUseCases(quizTitle: string): string[] {
  return [
    `${quizTitle}는 짧은 시간 안에 재미있는 결과를 얻고 싶은 분에게 딱 맞습니다.`,
    "결과 페이지를 친구나 연인과 공유하며 서로 비교해보는 재미가 있어요.",
    "여러 테스트를 반복하면 주제별로 나의 성향 패턴이 어떻게 달라지는지 확인할 수 있습니다.",
  ]
}

export function getIntroLandingParagraphs(quizTitle: string): string[] {
  const lowerTitle = quizTitle.toLowerCase()

  if (lowerTitle.includes("k-drama") || lowerTitle.includes("드라마")) {
    return [
      "좋아하는 캐릭터가 아닌 실제 사회적 행동 패턴에서 나와 닮은 드라마 역할을 찾아보세요.",
      "갈등, 연애, 단체 장면에서 나의 반응을 비교하면 단순한 라벨이 아닌 진짜 성향에 가까운 결과를 얻을 수 있어요.",
    ]
  }

  if (lowerTitle.includes("idol") || lowerTitle.includes("아이돌") || lowerTitle.includes("k-pop")) {
    return [
      "리더, 비주얼, 퍼포머, 분위기 메이커 등 그룹에서 나의 자연스러운 역할을 빠르게 알아보세요.",
      "연예인 팬덤이 아니라, 실생활에서 나의 에너지가 스포트라이트, 조율, 감정, 분위기 중 어디로 먼저 향하는지 확인해보세요.",
    ]
  }

  if (lowerTitle.includes("pet") || lowerTitle.includes("반려")) {
    return [
      "나의 감정 스타일, 루틴 선호도, 교감 방식을 반려동물 매칭으로 가볍게 비교해보세요.",
      "실제 집에서의 생활 루틴, 민감도, 원하는 교감 수준과 함께 읽으면 결과가 더 의미 있어요.",
    ]
  }

  if (lowerTitle.includes("ramen") || lowerTitle.includes("라면")) {
    return [
      "익숙한 음식 선택 패턴에서 더 넓은 성격 해석을 연결하는 재미있는 테스트입니다.",
      "메뉴 자체가 아니라 커스터마이징, 단순화, 반복, 실험하는 방식에서 진짜 성향이 드러나요.",
    ]
  }

  if (lowerTitle.includes("study") || lowerTitle.includes("공부")) {
    return [
      "집중력, 반복 학습, 노트 정리, 시험 준비 등 실제 적용할 수 있는 공부 스타일을 알아보세요.",
      "바라는 공부 스타일이 아닌 실제 학습 루틴과 비교하면 결과가 더 유용합니다.",
    ]
  }

  if (lowerTitle.includes("alarm") || lowerTitle.includes("기상")) {
    return [
      "기상 의지력이 아닌 아침 행동 패턴과 루틴 설계를 연결해서 알아보는 테스트입니다.",
      "알람 스타일, 일어난 후 첫 행동, 저녁 마무리 습관을 하나의 루프로 비교하면 더 실용적인 결과를 얻을 수 있어요.",
    ]
  }

  return [
    `${quizTitle}는 짧은 시간에 완료하고 쉽게 공유할 수 있는 성격 테스트입니다.`,
    "순간적으로 좋아 보이는 답이 아닌, 실제 반복되는 행동과 연결하면 결과가 더 정확해요.",
  ]
}

export function getListingFAQs(): Array<{ question: string; answer: string }> {
  return [
    {
      question: "테몬에서 인기 있는 테스트 주제는 무엇인가요?",
      answer: "음식, 습관, 수면, 공부, 연애 등 일상 속 주제의 짧은 테스트가 가장 인기가 많습니다. 검색 유입과 SNS 공유 모두에서 높은 참여율을 보입니다.",
    },
    {
      question: "테스트는 무료인가요?",
      answer: "네, 모든 테스트는 완전 무료입니다. 회원가입이나 결제 없이 바로 시작하실 수 있으며, 대부분 3분 이내에 완료됩니다.",
    },
    {
      question: "어떤 테스트부터 시작하면 좋을까요?",
      answer: "관심 있는 주제의 테스트부터 시작해보세요. 평소 관심사와 관련된 테스트일수록 결과에 대한 만족도가 높고, 공유 횟수도 많습니다.",
    },
    {
      question: "테스트 결과는 정확한가요?",
      answer: "테스트 결과는 MBTI의 16가지 성격 유형을 기반으로 재미있게 구성되어 있습니다. 전문적인 심리 진단은 아니지만, 나의 성향을 가볍게 파악하는 데 도움이 됩니다.",
    },
  ]
}

export function getDefaultResultFAQs(quizTitle: string, resultName: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${quizTitle}에서 ${resultName} 유형은 어떤 의미인가요?`,
      answer: `${resultName}은(는) 테스트에서 감지된 주요 선호 패턴을 설명합니다. 고정된 성격 라벨이 아닌, 나의 성향을 이해하는 참고 자료로 활용해보세요.`,
    },
    {
      question: "다시 테스트하면 결과가 달라질 수 있나요?",
      answer: "네, 기분이나 상황, 판단 기준에 따라 결과가 달라질 수 있습니다. 이는 상황에 따른 선호도 변화를 보여주는 유용한 신호입니다.",
    },
    {
      question: "이 결과를 어떻게 활용하면 좋을까요?",
      answer: "성격 특성, 주의점, 추천 사항을 참고하세요. 실제 행동과 비교하고, 나를 잘 아는 사람과 결과를 공유해보면 더 재미있습니다.",
    },
  ]
}

export function generateMbtiResultMetadata(config: {
  quizTitle: string
  resultName: string
  resultCode: string
  summary: string
  canonical: string
}): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`
  const title = `${config.quizTitle} 결과: ${config.resultName} (${config.resultCode}) | 테몬`

  return {
    title,
    description: config.summary,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title,
      description: config.summary,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.resultName)}&desc=${encodeURIComponent(config.resultCode)}`,
          width: 1200,
          height: 630,
          alt: config.resultName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.summary,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(config.resultName)}&desc=${encodeURIComponent(config.resultCode)}`],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }
}

export function generateGenericResultMetadata(config: {
  quizTitle: string
  title: string
  description: string
  canonical: string
}): Metadata {
  const fullUrl = `${baseUrl}${config.canonical}`

  return {
    title: `${config.quizTitle} 결과 | ${config.title} | 테몬`,
    description: config.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: `${config.quizTitle} 결과 | ${config.title} | 테몬`,
      description: config.description,
      type: "website",
      url: fullUrl,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent(config.title)}`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.quizTitle} 결과 | ${config.title} | 테몬`,
      description: config.description,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(config.quizTitle)}&desc=${encodeURIComponent(config.title)}`],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  }
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
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
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

