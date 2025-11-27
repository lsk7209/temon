/** @type {import('next').NextConfig} */
const nextConfig = {
  // 프로덕션에서는 린트/타입 체크 활성화 권장
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Vercel은 이미지 최적화를 자동으로 지원
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.temon.kr',
      },
    ],
  },
  // Vercel은 서버 사이드 렌더링 지원 (output: 'export' 제거)
  // API 라우트는 Next.js API Routes 사용 가능
  
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
}

export default nextConfig
