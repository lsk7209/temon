import { MetadataRoute } from 'next'

/**
 * Robots.txt 생성 (Vercel 최적화)
 * 
 * Vercel ISR: 1시간마다 재생성 (성능 최적화)
 */
export const revalidate = 3600 // 1시간마다 재생성

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.temon.kr'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/tests/*/test/result', // 결과 페이지는 개인화된 내용이므로 인덱싱 제외
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/tests/*/test/result',
        ],
      },
      {
        userAgent: 'Yeti', // 네이버 검색봇
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/tests/*/test/result',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

