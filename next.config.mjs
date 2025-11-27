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
}

export default nextConfig
