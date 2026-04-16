#!/usr/bin/env node

/**
 * 기존 테스트 목록을 추출하여 JSON 파일로 저장
 */

const fs = require('fs');
const path = require('path');

const testDir = 'app/tests';
const tests = [];

// 테스트 디렉토리 목록 가져오기
const dirs = fs.readdirSync(testDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'page.tsx' && !d.name.includes('.') && d.name !== 'tests-page-client.tsx');

dirs.forEach(dir => {
  const pagePath = path.join(testDir, dir.name, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    try {
      const content = fs.readFileSync(pagePath, 'utf8');
      
      // 메타데이터에서 title 추출
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      const descriptionMatch = content.match(/description:\s*["']([^"']+)["']/);
      const canonicalMatch = content.match(/canonical:\s*["']([^"']+)["']/);
      
      const slug = dir.name;
      const title = titleMatch ? titleMatch[1].split('|')[0].trim() : dir.name;
      const description = descriptionMatch ? descriptionMatch[1].substring(0, 100) : '';
      const url = canonicalMatch ? canonicalMatch[1] : `/tests/${slug}`;
      
      tests.push({
        slug,
        title,
        description,
        url,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error reading ${pagePath}:`, error.message);
    }
  }
});

// 알파벳 순으로 정렬
tests.sort((a, b) => a.slug.localeCompare(b.slug));

// JSON 파일로 저장
const outputPath = 'tests-registry.json';
fs.writeFileSync(outputPath, JSON.stringify(tests, null, 2), 'utf8');

console.log(`✅ 총 ${tests.length}개의 테스트를 찾았습니다.`);
console.log(`📝 ${outputPath} 파일에 저장되었습니다.\n`);

// 중복 확인
const titles = tests.map(t => t.title.toLowerCase());
const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);
if (duplicates.length > 0) {
  console.log('⚠️  중복된 제목 발견:');
  duplicates.forEach(title => {
    const dupTests = tests.filter(t => t.title.toLowerCase() === title);
    console.log(`   - "${title}": ${dupTests.map(t => t.slug).join(', ')}`);
  });
} else {
  console.log('✅ 중복된 제목이 없습니다.');
}

console.log('\n📋 테스트 목록:');
tests.forEach((test, index) => {
  console.log(`${index + 1}. [${test.slug}] ${test.title}`);
});

