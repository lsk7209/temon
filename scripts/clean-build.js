/**
 * Cloudflare Pages 배포 전 빌드 출력 정리
 * .next/cache 디렉토리 제거 (25MB 제한 대응)
 */

const fs = require('fs')
const path = require('path')

const cacheDir = path.join(process.cwd(), '.next', 'cache')

if (fs.existsSync(cacheDir)) {
  console.log('🧹 Cleaning .next/cache directory...')
  fs.rmSync(cacheDir, { recursive: true, force: true })
  console.log('✅ Cache directory removed')
} else {
  console.log('ℹ️  Cache directory not found, skipping...')
}

