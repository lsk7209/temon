/** @type {import('next').NextConfig} */
const nextConfig = {
  // 프로덕션에서는 린트/타입 체크 활성화 권장
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  images: {
    unoptimized: true, // Cloudflare Pages 호환성
  },
  // Cloudflare Pages 호환성
  // output: 'export' 제거 - Cloudflare Pages는 Next.js를 공식 지원
  // API 라우트는 Cloudflare Pages Functions로 처리
  
  // 빌드 최적화: webpack 캐시 제외 (Cloudflare Pages 25MB 제한)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 빌드에서 캐시 최소화
      config.optimization = {
        ...config.optimization,
        minimize: true,
      }
    }
    return config
  },
  
  // 빌드 출력 최적화
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
        'node_modules/webpack',
      ],
    },
  },
}

export default nextConfig
