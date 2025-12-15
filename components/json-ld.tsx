/**
 * Reusable JSON-LD Structured Data Component
 * For SEO, AEO, and GEO optimization
 * 
 * This component injects structured data (JSON-LD) into the page
 * to help search engines and AI bots understand the content better.
 */

import Script from "next/script"

interface JsonLdProps {
  /**
   * The structured data object (will be stringified to JSON)
   */
  data: Record<string, any> | Array<Record<string, any>>
  
  /**
   * Unique ID for the script tag (required for multiple schemas on same page)
   */
  id: string
}

/**
 * JsonLd Component
 * 
 * @example
 * ```tsx
 * <JsonLd
 *   id="quiz-schema"
 *   data={{
 *     "@context": "https://schema.org",
 *     "@type": "Quiz",
 *     name: "커피 MBTI 테스트",
 *     description: "커피 취향으로 알아보는 성격 유형"
 *   }}
 * />
 * ```
 */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  )
}

/**
 * Helper function to create Quiz schema
 */
export function createQuizSchema(config: {
  name: string
  description: string
  url: string
  questionCount?: number
  duration?: string
  image?: string
}): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: config.name,
    description: config.description,
    inLanguage: "ko",
    url: config.url,
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/placeholder-logo.png`,
        width: 512,
        height: 512,
      },
    },
    ...(config.questionCount && { numberOfQuestions: config.questionCount }),
    ...(config.duration && { timeRequired: config.duration }),
    ...(config.image && {
      image: {
        "@type": "ImageObject",
        url: config.image,
        width: 1200,
        height: 630,
      },
    }),
  }
}

/**
 * Helper function to create WebApplication schema (for utility tools)
 */
export function createWebApplicationSchema(config: {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string
  offers?: {
    price?: string
    priceCurrency?: string
  }
}): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.name,
    description: config.description,
    url: config.url,
    applicationCategory: config.applicationCategory || "UtilityApplication",
    operatingSystem: config.operatingSystem || "Web",
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
    },
    ...(config.offers && {
      offers: {
        "@type": "Offer",
        price: config.offers.price || "0",
        priceCurrency: config.offers.priceCurrency || "KRW",
      },
    }),
  }
}

/**
 * Helper function to create Article schema (for blog posts)
 */
export function createArticleSchema(config: {
  headline: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
}): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.headline,
    description: config.description,
    url: config.url,
    inLanguage: "ko",
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/placeholder-logo.png`,
        width: 512,
        height: 512,
      },
    },
    ...(config.image && {
      image: {
        "@type": "ImageObject",
        url: config.image,
        width: 1200,
        height: 630,
      },
    }),
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
    ...(config.author && {
      author: {
        "@type": "Person",
        name: config.author.name,
        ...(config.author.url && { url: config.author.url }),
      },
    }),
  }
}

/**
 * Helper function to create Dataset schema (for public data)
 */
export function createDatasetSchema(config: {
  name: string
  description: string
  url: string
  keywords?: string
  license?: string
  distribution?: Array<{
    contentType: string
    url: string
  }>
}): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: config.name,
    description: config.description,
    url: config.url,
    inLanguage: "ko",
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
    },
    ...(config.keywords && { keywords: config.keywords }),
    ...(config.license && { license: config.license }),
    ...(config.distribution && {
      distribution: config.distribution.map((dist) => ({
        "@type": "DataDownload",
        contentType: dist.contentType,
        contentUrl: dist.url,
      })),
    }),
  }
}

/**
 * Helper function to create FAQPage schema
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>): Record<string, any> {
  return {
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
  }
}

/**
 * Helper function to create BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}

/**
 * Helper function to create ItemList schema (for test listings)
 */
export function createItemListSchema(items: Array<{
  name: string
  description: string
  url: string
  image?: string
}>): Record<string, any> {
  const baseUrl = "https://temon.kr"
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MBTI 테스트 모음",
    description: "다양한 주제의 무료 성격 테스트 및 MBTI 테스트",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Quiz",
        name: item.name,
        description: item.description,
        url: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
        ...(item.image && {
          image: {
            "@type": "ImageObject",
            url: item.image.startsWith("http") ? item.image : `${baseUrl}${item.image}`,
          },
        }),
      },
    })),
  }
}

