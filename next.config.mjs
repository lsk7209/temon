/** @type {import('next').NextConfig} */
const nextConfig = {
  // 프로덕션에서는 린트/타입 체크 활성화 권장
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Vercel 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.temon.kr',
      },
    ],
    // Vercel 이미지 최적화 사용
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Vercel 최적화 설정
  // - 서버 사이드 렌더링 지원
  // - API 라우트는 Next.js API Routes 사용
  // - Edge Runtime 지원
  
  // 빌드 최적화
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      }
    }
    return config
  },
  
  // Vercel 빌드 최적화
  experimental: {
    // 서버 컴포넌트 최적화
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // 압축 설정
  compress: true,
  
  // 프로덕션 소스맵 비활성화 (보안 및 성능)
  productionBrowserSourceMaps: false,
  
  // SEO 및 검색 엔진 최적화
  // 리다이렉트 설정 (www -> non-www 통일)
  // 주의: Vercel 도메인 설정과 충돌하지 않도록 조건부로만 적용
  async redirects() {
    const redirects = [
      // 레거시 경로 리다이렉트 (서버 사이드로 처리하여 리다이렉션 경고 제거)
      {
        source: '/test/:slug',
        destination: '/tests/:slug',
        permanent: true,
      },
    ]

    // 개별 테스트 경로 리다이렉트
    const testRedirects = [
      { from: '/ramen-mbti', to: '/tests/ramen-mbti' },
      { from: '/coffee-mbti', to: '/tests/coffee-mbti' },
      { from: '/study-mbti', to: '/tests/study-mbti' },
      { from: '/alarm-habit', to: '/tests/alarm-habit' },
      { from: '/ntrp-test', to: '/tests/ntrp-test' },
      { from: '/pet-mbti', to: '/tests/pet-mbti' },
      { from: '/kdrama-mbti', to: '/tests/kdrama-mbti' },
      { from: '/kpop-idol', to: '/tests/kpop-idol' },
      { from: '/snowwhite-mbti', to: '/tests/snowwhite-mbti' },
    ]

    testRedirects.forEach(({ from, to }) => {
      redirects.push({
        source: from,
        destination: to,
        permanent: true,
      })
    })

    return redirects
  },
  
  // 헤더 최적화 (검색 엔진 크롤링 효율 향상)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ]
  },
}

export default nextConfig
