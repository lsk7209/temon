/**
 * favicon.ico 생성 스크립트
 * PNG를 ICO로 변환
 */

import pngToIco from 'png-to-ico'
import * as fs from 'fs'
import * as path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

async function createFaviconIco(): Promise<void> {
    console.log('🔄 favicon.ico 생성 중...\n')

    const favicon32Path = path.join(PUBLIC_DIR, 'favicon-32x32.png')
    const faviconIcoPath = path.join(PUBLIC_DIR, 'favicon.ico')

    if (!fs.existsSync(favicon32Path)) {
        console.error('❌ favicon-32x32.png 파일을 찾을 수 없습니다.')
        process.exit(1)
    }

    try {
        const buf = await pngToIco(favicon32Path)
        fs.writeFileSync(faviconIcoPath, buf)

        const newSize = fs.statSync(faviconIcoPath).size
        console.log(`✅ favicon.ico 생성 완료!`)
        console.log(`   새 크기: ${(newSize / 1024).toFixed(1)}KB`)
    } catch (error) {
        console.error('❌ 변환 오류:', error)
        process.exit(1)
    }
}

createFaviconIco().catch(console.error)
