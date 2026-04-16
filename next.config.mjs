/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

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
    return [
      // 구 경로 → 신 경로
      ...legacyTests.map((slug) => ({
        source: `/${slug}/:path*`,
        destination: `/tests/${slug}/:path*`,
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
    ]
  },
}

export default nextConfig
