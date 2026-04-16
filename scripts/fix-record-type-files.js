#!/usr/bin/env node

/**
 * Record<number, string> 형식 파일들에서 불필요한 변환 제거
 */

const fs = require('fs')
const path = require('path')

const filesToFix = [
  'app/tests/dessert-style/test/page.tsx',
  'app/tests/evening-routine/test/page.tsx',
  'app/tests/food-delivery/test/page.tsx',
  'app/tests/jachui/test/page.tsx',
  'app/tests/lunch-style/test/page.tsx',
  'app/tests/movie-theater-style/test/page.tsx',
  'app/tests/music-taste/test/page.tsx',
  'app/tests/pet-mbti/test/page.tsx',
  'app/tests/shopping-style/test/page.tsx',
  'app/tests/study-mbti/test/page.tsx',
  'app/tests/travel-style/test/page.tsx',
]

console.log(`총 ${filesToFix.length}개 파일 수정 중...\n`)

let fixedCount = 0

filesToFix.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false
    
    // Record<number, string> 형식인데 convertAnswersToRecord를 사용하는 경우 제거
    if (content.includes('useState<Record<number, string>>') && content.includes('convertAnswersToRecord(newAnswers)')) {
      content = content.replace(
        /(\s+)(\/\/ string\[\]\[\]를 Record<number, string>로 변환\s*\n\s*)(const answersRecord = convertAnswersToRecord\(newAnswers\)\s*\n\s*\/\/ 결과 저장 시도)/,
        '$1// 이미 Record<number, string> 형식이므로 변환 불필요\n$1// 결과 저장 시도'
      )
      content = content.replace(
        /await saveResult\(result, answersRecord\)/,
        'await saveResult(result, newAnswers)'
      )
      modified = true
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ 수정: ${filePath}`)
      fixedCount++
    }
  } catch (error) {
    console.error(`❌ 오류: ${filePath}`, error.message)
  }
})

console.log(`\n완료! 수정: ${fixedCount}개`)

