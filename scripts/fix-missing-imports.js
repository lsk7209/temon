#!/usr/bin/env node

/**
 * 누락된 import 문을 추가하는 스크립트
 */

const fs = require('fs')
const path = require('path')

function findTestFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      findTestFiles(filePath, fileList)
    } else if (file === 'page.tsx' && dir.includes(path.sep + 'test')) {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

const testDir = 'app/tests'
const filesToFix = findTestFiles(testDir)

console.log(`총 ${filesToFix.length}개 파일 확인 중...\n`)

let fixedCount = 0

filesToFix.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false
    
    // convertAnswersToRecord 사용하는데 import가 없는 경우
    if (content.includes('convertAnswersToRecord(') && !content.includes("from '@/lib/utils/test-answers'")) {
      // analytics import 다음에 추가
      if (content.includes("from '@/lib/analytics'")) {
        content = content.replace(
          "from '@/lib/analytics'",
          "from '@/lib/analytics'\nimport { convertAnswersToRecord } from '@/lib/utils/test-answers'"
        )
        modified = true
      } else if (content.includes("from '@/hooks/use-test-result'")) {
        content = content.replace(
          "from '@/hooks/use-test-result'",
          "from '@/hooks/use-test-result'\nimport { convertAnswersToRecord } from '@/lib/utils/test-answers'"
        )
        modified = true
      }
    }
    
    // convertStringArrayToRecord 사용하는데 import가 없는 경우
    if (content.includes('convertStringArrayToRecord(') && !content.includes("from '@/lib/utils/test-answers'")) {
      // analytics import 다음에 추가
      if (content.includes("from '@/lib/analytics'")) {
        content = content.replace(
          "from '@/lib/analytics'",
          "from '@/lib/analytics'\nimport { convertStringArrayToRecord } from '@/lib/utils/test-answers'"
        )
        modified = true
      } else if (content.includes("from '@/hooks/use-test-result'")) {
        content = content.replace(
          "from '@/hooks/use-test-result'",
          "from '@/hooks/use-test-result'\nimport { convertStringArrayToRecord } from '@/lib/utils/test-answers'"
        )
        modified = true
      }
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

