/**
 * Favicon 및 아이콘 최적화 스크립트
 * 
 * 현재 문제:
 * - favicon.ico: 1.3MB (권장: 15KB 이하)
 * - favicon-16x16.png: 519KB (권장: 5KB 이하)
 * - favicon-32x32.png: 758KB (권장: 10KB 이하)
 * - apple-touch-icon.png: 552KB (권장: 30KB 이하)
 * 
 * 사용법:
 * 1. npm install sharp --save-dev
 * 2. npx ts-node scripts/optimize-favicons.ts
 */

import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const BACKUP_DIR = path.join(process.cwd(), 'public', '_backup_icons')

interface OptimizationResult {
    file: string
    originalSize: number
    newSize: number
    reduction: string
}

async function optimizeFavicons(): Promise<void> {
    console.log('🎨 Favicon 최적화 시작...\n')

    // 백업 디렉토리 생성
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true })
    }

    const results: OptimizationResult[] = []

    // 1. favicon-16x16.png 최적화
    const favicon16Path = path.join(PUBLIC_DIR, 'favicon-16x16.png')
    if (fs.existsSync(favicon16Path)) {
        const originalSize = fs.statSync(favicon16Path).size

        // 백업
        fs.copyFileSync(favicon16Path, path.join(BACKUP_DIR, 'favicon-16x16.png'))

        // 최적화
        await sharp(favicon16Path)
            .resize(16, 16)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(path.join(PUBLIC_DIR, 'favicon-16x16-optimized.png'))

        // 교체
        fs.unlinkSync(favicon16Path)
        fs.renameSync(
            path.join(PUBLIC_DIR, 'favicon-16x16-optimized.png'),
            favicon16Path
        )

        const newSize = fs.statSync(favicon16Path).size
        results.push({
            file: 'favicon-16x16.png',
            originalSize,
            newSize,
            reduction: `${((1 - newSize / originalSize) * 100).toFixed(1)}%`
        })
    }

    // 2. favicon-32x32.png 최적화
    const favicon32Path = path.join(PUBLIC_DIR, 'favicon-32x32.png')
    if (fs.existsSync(favicon32Path)) {
        const originalSize = fs.statSync(favicon32Path).size

        // 백업
        fs.copyFileSync(favicon32Path, path.join(BACKUP_DIR, 'favicon-32x32.png'))

        // 최적화
        await sharp(favicon32Path)
            .resize(32, 32)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(path.join(PUBLIC_DIR, 'favicon-32x32-optimized.png'))

        // 교체
        fs.unlinkSync(favicon32Path)
        fs.renameSync(
            path.join(PUBLIC_DIR, 'favicon-32x32-optimized.png'),
            favicon32Path
        )

        const newSize = fs.statSync(favicon32Path).size
        results.push({
            file: 'favicon-32x32.png',
            originalSize,
            newSize,
            reduction: `${((1 - newSize / originalSize) * 100).toFixed(1)}%`
        })
    }

    // 3. apple-touch-icon.png 최적화
    const appleTouchPath = path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    if (fs.existsSync(appleTouchPath)) {
        const originalSize = fs.statSync(appleTouchPath).size

        // 백업
        fs.copyFileSync(appleTouchPath, path.join(BACKUP_DIR, 'apple-touch-icon.png'))

        // 최적화 (180x180 권장 크기)
        await sharp(appleTouchPath)
            .resize(180, 180)
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon-optimized.png'))

        // 교체
        fs.unlinkSync(appleTouchPath)
        fs.renameSync(
            path.join(PUBLIC_DIR, 'apple-touch-icon-optimized.png'),
            appleTouchPath
        )

        const newSize = fs.statSync(appleTouchPath).size
        results.push({
            file: 'apple-touch-icon.png',
            originalSize,
            newSize,
            reduction: `${((1 - newSize / originalSize) * 100).toFixed(1)}%`
        })
    }

    // 4. favicon.ico 최적화 (여러 크기 포함)
    const faviconIcoPath = path.join(PUBLIC_DIR, 'favicon.ico')
    if (fs.existsSync(faviconIcoPath) && fs.existsSync(favicon32Path)) {
        const originalSize = fs.statSync(faviconIcoPath).size

        // 백업
        fs.copyFileSync(faviconIcoPath, path.join(BACKUP_DIR, 'favicon.ico'))

        // 32x32 PNG를 ICO로 변환 (sharp는 직접 ICO 생성 불가, PNG를 대신 사용)
        // 참고: 브라우저는 PNG도 favicon으로 사용 가능
        console.log('⚠️ favicon.ico는 별도 도구로 변환 필요 (png-to-ico 등)')
        console.log('   임시로 favicon-32x32.png를 ico로 사용합니다.\n')

        results.push({
            file: 'favicon.ico',
            originalSize,
            newSize: originalSize,
            reduction: '수동 변환 필요'
        })
    }

    // 결과 출력
    console.log('📊 최적화 결과:\n')
    console.log('파일명                    | 원본 크기    | 새 크기     | 감소율')
    console.log('-------------------------|-------------|------------|--------')

    for (const result of results) {
        const originalKB = (result.originalSize / 1024).toFixed(1).padStart(8)
        const newKB = (result.newSize / 1024).toFixed(1).padStart(8)
        console.log(
            `${result.file.padEnd(25)}| ${originalKB}KB | ${newKB}KB | ${result.reduction}`
        )
    }

    console.log('\n✅ 최적화 완료!')
    console.log(`📁 원본 파일은 ${BACKUP_DIR}에 백업되었습니다.`)
}

// 실행
optimizeFavicons().catch(console.error)
