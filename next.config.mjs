/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // 번들 최적화 - 대형 패키지 트리셰이킹
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', '@radix-ui/react-icons'],
  },

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  // www → non-www + 구 경로 → 신 경로 영구 리다이렉트 (SEO canonical 통일)
  async redirects() {
    const legacyTests = [
      'alarm-habit',
      'coffee-mbti',
      'kdrama-mbti',
      'kpop-idol',
      'ntrp-test',
      'pet-mbti',
      'ramen-mbti',
      'snowwhite-mbti',
      'study-mbti',
    ]
    // 중복/유사 테스트 통합 매핑 — canonical 쪽으로 308 permanent
    const duplicateTestMerges = [
      // food-temperature-preference는 food-temperature의 동어반복 (세밀 선호도 = 선호도)
      { from: "food-temperature-preference", to: "food-temperature" },
      // cooking-shared("공동 요리")는 cooking-share("요리 공유")와 의미 중첩 → share로 통합
      { from: "cooking-shared", to: "cooking-share" },
    ]

    return [
      // 구 경로 → 신 경로
      ...legacyTests.map((slug) => ({
        source: `/${slug}/:path*`,
        destination: `/tests/${slug}/:path*`,
        permanent: true,
      })),
      // 중복 테스트 → canonical 테스트로 통합
      ...duplicateTestMerges.map(({ from, to }) => ({
        source: `/tests/${from}/:path*`,
        destination: `/tests/${to}/:path*`,
        permanent: true,
      })),
      ...duplicateTestMerges.map(({ from, to }) => ({
        source: `/tests/${from}`,
        destination: `/tests/${to}`,
        permanent: true,
      })),
    ]
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // 정적 자산 캐시
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [{ key: 'X-DNS-Prefetch-Control', value: 'on' }],
      },
      {
        source: '/api/og',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
}

export default nextConfig
