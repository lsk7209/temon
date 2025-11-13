# 마이그레이션 가이드: 파일 기반 → 데이터베이스 기반

## 현재 상태 분석

- **총 테스트 수**: 36개
- **파일 구조**: 각 테스트마다 3개 파일 (인트로, 테스트, 결과)
- **데이터 위치**: 코드에 하드코딩

## 마이그레이션 단계

### Step 1: 데이터베이스 설정

```bash
# Cloudflare D1 데이터베이스 생성
wrangler d1 create temon-db

# 마이그레이션 실행
wrangler d1 execute temon-db --file=lib/db/migrations/001_initial_schema.sql
```

### Step 2: 데이터 마이그레이션 스크립트

`scripts/migrate-tests-to-db.js` 파일 생성하여 기존 테스트를 DB로 이관

### Step 3: 점진적 전환

1. 새 테스트는 DB 기반으로 개발
2. 기존 테스트는 유지하되 공통 컴포넌트 사용
3. 점진적으로 DB로 마이그레이션

## 마이그레이션 스크립트 예시

```javascript
// scripts/migrate-tests-to-db.js
const fs = require('fs')
const path = require('path')

async function migrateTest(slug) {
  // 1. 기존 파일에서 데이터 추출
  const testPage = fs.readFileSync(`app/tests/${slug}/page.tsx`, 'utf8')
  const testPageData = fs.readFileSync(`app/tests/${slug}/test/page.tsx`, 'utf8')
  const resultPageData = fs.readFileSync(`app/tests/${slug}/test/result/page.tsx`, 'utf8')
  
  // 2. 메타데이터 파싱
  const metadata = parseMetadata(testPage)
  const questions = parseQuestions(testPageData)
  const resultTypes = parseResultTypes(resultPageData)
  
  // 3. DB에 저장
  await saveToDatabase(slug, metadata, questions, resultTypes)
}
```

## 체크리스트

- [ ] Cloudflare D1 데이터베이스 생성
- [ ] 스키마 마이그레이션 실행
- [ ] 마이그레이션 스크립트 작성
- [ ] 테스트 데이터 이관
- [ ] 동적 라우팅 구현
- [ ] 공통 컴포넌트 추출
- [ ] 관리자 페이지 개발
- [ ] 기존 파일 구조 제거

