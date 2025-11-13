#!/usr/bin/env node

/**
 * 모든 테스트 파일의 saveResult 호출을 수정하는 스크립트
 * string[][]를 Record<number, string>로 변환하도록 수정
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

console.log(`총 ${filesToFix.length}개 파일 발견\n`)

let fixedCount = 0
let skippedCount = 0

filesToFix.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false
    
    // 이미 수정된 파일은 건너뛰기
    if (content.includes('convertAnswersToRecord')) {
      skippedCount++
      return
    }
    
    // saveResult 호출이 있는지 확인
    if (content.includes('await saveResult(result, newAnswers)')) {
      // import 문 추가
      if (content.includes("from '@/lib/analytics'")) {
        content = content.replace(
          "from '@/lib/analytics'",
          "from '@/lib/analytics'\nimport { convertAnswersToRecord } from '@/lib/utils/test-answers'"
        )
        modified = true
      }
      
      // saveResult 호출 수정
      const beforePattern = /(\s+)(const result = calculateMBTI\(newAnswers\)\s*\n\s*\/\/ 결과 저장 시도 \(성공\/실패 모두 onSuccess\/onError에서 처리\)\s*\n\s*)await saveResult\(result, newAnswers\)/
      
      if (beforePattern.test(content)) {
        content = content.replace(
          beforePattern,
          '$1const result = calculateMBTI(newAnswers)\n$1// string[][]를 Record<number, string>로 변환\n$1const answersRecord = convertAnswersToRecord(newAnswers)\n$1// 결과 저장 시도 (성공/실패 모두 onSuccess/onError에서 처리)\n$1await saveResult(result, answersRecord)'
        )
        modified = true
      } else {
        // 간단한 패턴으로 시도
        if (content.includes('const result = calculateMBTI(newAnswers)')) {
          content = content.replace(
            /(\s+)(const result = calculateMBTI\(newAnswers\))/,
            '$1$2\n$1// string[][]를 Record<number, string>로 변환\n$1const answersRecord = convertAnswersToRecord(newAnswers)'
          )
          content = content.replace(
            'await saveResult(result, newAnswers)',
            'await saveResult(result, answersRecord)'
          )
          modified = true
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`✅ 수정: ${filePath}`)
      fixedCount++
    } else {
      skippedCount++
    }
  } catch (error) {
    console.error(`❌ 오류: ${filePath}`, error.message)
  }
})

console.log(`\n완료! 수정: ${fixedCount}개, 건너뜀: ${skippedCount}개`)
