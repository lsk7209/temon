/**
 * SEO 유틸리티 함수
 */

import type { Metadata } from "next"

export interface SEOConfig {
  title: string
  description: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  noindex?: boolean
}

/**
 * SEO 메타데이터를 생성합니다.
 * 키워드가 Title과 Description 앞쪽에 배치되도록 합니다.
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const { title, description, keywords, canonicalUrl, ogImage, noindex } = config
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.temon.kr"
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords || undefined,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: fullCanonicalUrl || baseUrl,
      siteName: "테몬 MBTI",
      locale: "ko_KR",
      type: "website",
      images: ogImage
        ? [
            {
              url: ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  }

  return metadata
}

/**
 * 테스트 페이지용 SEO 메타데이터 생성
 */
export function generateTestMetadata(testId: string, testTitle: string, testDescription: string): Metadata {
  const keywords = `${testTitle}, ${testTitle} 테스트, 성격 테스트, MBTI 테스트, 심리 테스트, 무료 테스트`
  
  return generateMetadata({
    title: `${testTitle} - 무료 성격 테스트 | 테몬 MBTI`,
    description: `${testDescription} ${testTitle} 테스트를 무료로 시작해보세요.`,
    keywords,
    canonicalUrl: `/tests/${testId}`,
  })
}

/**
 * 테스트 결과 페이지용 SEO 메타데이터 생성
 */
export function generateResultMetadata(
  testId: string,
  testTitle: string,
  resultType: string,
  resultDescription: string
): Metadata {
  const keywords = `${testTitle} 결과, ${resultType}, ${testTitle} 테스트 결과, 성격 분석`
  
  return generateMetadata({
    title: `${testTitle} 결과: ${resultType} | 테몬 MBTI`,
    description: `${resultDescription} ${testTitle} 테스트 결과를 확인해보세요.`,
    keywords,
    canonicalUrl: `/tests/${testId}/test/result`,
    noindex: true, // 결과 페이지는 개인화된 내용이므로 인덱싱 제외
  })
}

