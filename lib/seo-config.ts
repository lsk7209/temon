/**
 * SEO 설정 중앙 관리
 * Google, Naver, Daum 검색 엔진 최적화를 위한 통합 설정
 */

export const SEO_CONFIG = {
  // 기본 도메인 (www 없음으로 통일)
  baseUrl: 'https://temon.kr',
  
  // 사이트 정보
  siteName: '테몬',
  siteDescription: '무료 성격 테스트 및 MBTI 테스트 플랫폼',
  
  // 검색 엔진별 설정
  searchEngines: {
    google: {
      siteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
      analyticsId: 'G-L167CCPS8E',
    },
    naver: {
      siteVerification: process.env.NAVER_SITE_VERIFICATION || '',
      // 네이버 검색 최적화 설정
      mobileOptimized: true,
      contentLanguage: 'ko-KR',
    },
    daum: {
      // 다음 검색 최적화 설정
      webmasterTool: 'c31e7b96662307b31cb400ef4928000f10b5e2655ff33772379f888ea18c1179:OkBMPAodCv39zGs73L6HFQ==',
    },
  },
  
  // 크롤링 최적화
  crawling: {
    // Google 크롤링 지연 (0 = 최대 속도)
    googleCrawlDelay: 0,
    // 네이버 크롤링 지연 (1초 권장)
    naverCrawlDelay: 1,
    // 일반 크롤링 지연
    defaultCrawlDelay: 1,
  },
  
  // 사이트맵 설정
  sitemap: {
    // 재생성 주기 (초)
    revalidate: 3600,
    // 최대 URL 수 (사이트맵당 50,000개 제한)
    maxUrls: 50000,
    // 우선순위 설정
    priorities: {
      home: 1.0,
      testsList: 0.9,
      testIntro: 0.8,
      testPage: 0.7,
      other: 0.5,
    },
    // 변경 빈도
    changeFrequency: {
      home: 'daily',
      testsList: 'daily',
      testIntro: 'weekly',
      testPage: 'weekly',
      other: 'monthly',
    },
  },
  
  // RSS/Feed 설정
  feeds: {
    // 최대 아이템 수
    maxItems: 20,
    // 재생성 주기 (초)
    revalidate: 3600,
  },
  
  // 구조화 데이터 설정
  structuredData: {
    // Organization 정보
    organization: {
      name: '테몬',
      email: 'admin@temon.kr',
      areaServed: 'KR',
      language: 'ko',
    },
  },
} as const

/**
 * 환경 변수 기반 설정 가져오기
 */
export function getSEOConfig() {
  return {
    ...SEO_CONFIG,
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || SEO_CONFIG.baseUrl,
  }
}

