# 테몬 퀴즈 플랫폼 아키텍처 개선 제안서

## 🔴 현재 구조의 문제점

### 1. 확장성 문제
- **파일 기반 구조**: 각 테스트마다 3개 파일 (page.tsx, test/page.tsx, result/page.tsx)
- **100개 = 300개 파일**, **1000개 = 3000개 파일** → 관리 불가능
- 빌드 시간이 기하급수적으로 증가
- 코드 중복이 심각함 (각 테스트마다 거의 동일한 로직)

### 2. 데이터 관리 문제
- 질문/결과 데이터가 코드에 하드코딩
- 수정 시 코드 배포 필요
- 버전 관리가 어려움
- A/B 테스트, 다국어 지원 불가능

### 3. 성능 문제
- 정적 사이트 생성(SSG)으로 모든 페이지 빌드
- 1000개 테스트 = 1000개 페이지 빌드 시간
- 빌드 실패 시 전체 배포 실패

## ✅ 개선된 아키텍처 제안

### 목표
- **동적 라우팅**: 데이터베이스 기반 동적 페이지 생성
- **공통 컴포넌트**: 재사용 가능한 테스트 엔진
- **관리자 페이지**: 웹 UI로 테스트 CRUD
- **Cloudflare 최적화**: D1 DB + Pages Functions

---

## 📊 데이터베이스 스키마 (Cloudflare D1)

```sql
-- 테스트 메타데이터
CREATE TABLE tests (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT, -- 'food', 'lifestyle', 'entertainment', etc.
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'archived'
  question_count INTEGER DEFAULT 12,
  avg_minutes INTEGER DEFAULT 3,
  result_type_count INTEGER DEFAULT 16,
  metadata JSON, -- SEO, OG tags, etc.
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- 질문 데이터
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  choice_1_text TEXT NOT NULL,
  choice_1_tags TEXT NOT NULL, -- JSON array: ["E", "S"]
  choice_2_text TEXT NOT NULL,
  choice_2_tags TEXT NOT NULL,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- 결과 타입 데이터
CREATE TABLE result_types (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  type_code TEXT NOT NULL, -- 'ENFP', 'INFP', etc.
  label TEXT NOT NULL,
  summary TEXT,
  traits TEXT, -- JSON array
  picks TEXT, -- JSON array (optional)
  tips TEXT, -- JSON array
  match_types TEXT, -- JSON array
  emoji TEXT,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
  UNIQUE(test_id, type_code)
);

-- 테스트 결과 저장
CREATE TABLE test_results (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL,
  result_type TEXT NOT NULL,
  answers TEXT NOT NULL, -- JSON array
  user_ip TEXT,
  user_agent TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (test_id) REFERENCES tests(id)
);

-- 통계 집계 (크론으로 주기적 업데이트)
CREATE TABLE test_stats (
  test_id TEXT PRIMARY KEY,
  total_completions INTEGER DEFAULT 0,
  type_distribution TEXT, -- JSON: {"ENFP": 100, "INFP": 80, ...}
  avg_completion_time REAL,
  last_updated INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (test_id) REFERENCES tests(id)
);
```

---

## 🏗️ 새로운 파일 구조

```
app/
├── tests/
│   ├── [slug]/
│   │   ├── page.tsx              # 동적 인트로 페이지
│   │   ├── test/
│   │   │   └── page.tsx          # 동적 테스트 페이지
│   │   └── result/
│   │       └── page.tsx          # 동적 결과 페이지
│   └── page.tsx                  # 테스트 목록 (DB에서 조회)
│
├── components/
│   └── tests/
│       ├── TestEngine.tsx        # 공통 테스트 엔진
│       ├── TestIntro.tsx         # 공통 인트로 컴포넌트
│       ├── TestResult.tsx        # 공통 결과 컴포넌트
│       └── QuestionCard.tsx      # 질문 카드 컴포넌트
│
├── api/
│   ├── tests/
│   │   ├── [slug]/
│   │   │   └── route.ts          # 테스트 데이터 조회
│   │   └── route.ts              # 테스트 목록 조회
│   └── results/
│       └── route.ts               # 결과 저장
│
└── admin/
    └── tests/
        ├── page.tsx              # 테스트 목록 관리
        ├── [slug]/
        │   └── page.tsx          # 테스트 편집
        └── new/
            └── page.tsx          # 새 테스트 생성

lib/
└── db/
    ├── schema.ts                 # Drizzle ORM 스키마
    ├── client.ts                 # Cloudflare D1 클라이언트
    └── queries/
        ├── tests.ts              # 테스트 쿼리 함수
        ├── questions.ts          # 질문 쿼리 함수
        └── results.ts            # 결과 쿼리 함수
```

---

## 🔧 핵심 컴포넌트 설계

### 1. 동적 라우팅 (`app/tests/[slug]/page.tsx`)

```typescript
// app/tests/[slug]/page.tsx
import { getTestBySlug } from '@/lib/db/queries/tests'
import TestIntro from '@/components/tests/TestIntro'

export async function generateStaticParams() {
  // 인기 테스트만 SSG로 생성 (선택적)
  const popularTests = await getPopularTests(limit: 50)
  return popularTests.map(test => ({ slug: test.slug }))
}

export default async function TestPage({ params }: { params: { slug: string } }) {
  const test = await getTestBySlug(params.slug)
  if (!test) notFound()
  
  return <TestIntro test={test} />
}
```

### 2. 공통 테스트 엔진 (`components/tests/TestEngine.tsx`)

```typescript
// components/tests/TestEngine.tsx
'use client'

interface TestEngineProps {
  testId: string
  questions: Question[]
  onComplete: (resultType: string) => void
}

export default function TestEngine({ testId, questions, onComplete }: TestEngineProps) {
  // 모든 테스트에서 공통으로 사용하는 로직
  // MBTI 계산, 진행률, 네비게이션 등
}
```

### 3. API 라우트 (`app/api/tests/[slug]/route.ts`)

```typescript
// app/api/tests/[slug]/route.ts
import { getTestBySlug } from '@/lib/db/queries/tests'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const test = await getTestBySlug(params.slug)
  if (!test) return Response.json({ error: 'Not found' }, { status: 404 })
  
  return Response.json(test)
}
```

---

## 🚀 마이그레이션 전략

### Phase 1: 하이브리드 구조 (점진적 전환)
1. 기존 파일 기반 테스트 유지
2. 새 테스트는 DB 기반으로 개발
3. 공통 컴포넌트 추출

### Phase 2: 데이터 마이그레이션
1. 기존 테스트 데이터를 DB로 이관
2. 스크립트로 자동 마이그레이션

### Phase 3: 완전 전환
1. 파일 기반 구조 제거
2. 동적 라우팅으로 완전 전환

---

## 📈 성능 최적화

### 1. 캐싱 전략
- **Cloudflare Cache**: 테스트 메타데이터 캐싱
- **KV Storage**: 인기 테스트 결과 캐싱
- **Edge Caching**: 정적 자산 CDN 배포

### 2. 빌드 최적화
- 인기 테스트만 SSG 생성
- 나머지는 ISR (Incremental Static Regeneration)
- 또는 완전 동적 렌더링

### 3. 데이터베이스 최적화
- 인덱스: `slug`, `status`, `category`
- 파티셔닝: 오래된 결과 데이터 아카이빙
- 집계 테이블: 통계는 크론으로 주기적 업데이트

---

## 🔐 관리자 페이지 기능

### 테스트 CRUD
- 목록 조회 (필터링, 검색, 정렬)
- 새 테스트 생성 (폼 기반)
- 질문 편집 (드래그 앤 드롭 순서 변경)
- 결과 타입 관리
- 미리보기 기능
- 배포/비배포 토글

### 통계 대시보드
- 테스트별 완료 수
- 유형 분포 차트
- 문항별 이탈률
- 공유 클릭률

---

## 🛠️ 기술 스택

- **Database**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **API**: Cloudflare Pages Functions
- **Caching**: Cloudflare KV
- **Cron**: Cloudflare Cron Triggers
- **Admin**: Next.js App Router + Server Components

---

## 📝 다음 단계

1. ✅ 데이터베이스 스키마 설계 완료
2. ⏳ Drizzle ORM 스키마 작성
3. ⏳ 공통 컴포넌트 추출
4. ⏳ 동적 라우팅 구현
5. ⏳ 관리자 페이지 개발
6. ⏳ 마이그레이션 스크립트 작성

---

## 💡 추가 고려사항

### 다국어 지원
- `tests` 테이블에 `locale` 컬럼 추가
- 또는 별도 `test_translations` 테이블

### A/B 테스트
- `questions` 테이블에 `variant` 컬럼 추가
- 또는 별도 `question_variants` 테이블

### 버전 관리
- `tests` 테이블에 `version` 컬럼 추가
- 이전 버전 데이터 보관

