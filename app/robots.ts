import { MetadataRoute } from 'next'

/**
 * 동적 robots.txt 생성 (Next.js 13+ App Router)
 * 
 * 검색 엔진별 최적화 설정:
 * - Google: 최대 속도 크롤링 (Crawl-delay: 0)
 * - Naver (Yeti): 안정적 크롤링 (Crawl-delay: 1)
 * - Daum (Daumoa): 안정적 크롤링
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://temon.kr'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
        crawlDelay: 0, // Google은 최대 속도 크롤링
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
      },
      {
        userAgent: 'Yeti',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
        crawlDelay: 1, // 네이버는 안정적 크롤링
      },
      {
        userAgent: 'Yeti-Mobile',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Daumoa',
        allow: '/',
        disallow: ['/api/', '/admin', '/tests/*/test/result'],
        crawlDelay: 1, // 다음은 안정적 크롤링
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

