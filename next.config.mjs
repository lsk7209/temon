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
  // output: 'standalone' 제거 - Cloudflare Pages는 정적 파일과 Functions 사용
}

export default nextConfig
