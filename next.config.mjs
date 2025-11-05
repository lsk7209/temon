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
  output: 'standalone',
}

export default nextConfig
