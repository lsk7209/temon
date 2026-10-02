# 테몬 (Temon) MBTI 플랫폼

다양한 주제의 재미있는 MBTI 성격 테스트와 심리 분석을 제공하는 웹 플랫폼입니다.

> **운영 기준 (2026-09-30)**: 현재 production은 **Vercel** (`temon-vercel`)과 **Turso / libsql** (Drizzle ORM)을 기반으로 운영됩니다. 과거 Cloudflare Pages / D1 / Workers 시절의 안내는 지원이 종료되었으며, 현재는 Vercel 환경에 최적화되어 있습니다.  
> **로컬 검증 명령**: `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`를 사용하세요.  
> ⚠️ **주의**: `npm run deploy`는 프로덕션 빌드 후 자동으로 Git push를 트리거하므로, 단순 검증용으로 실행하지 마세요.

---

## 🚀 기술 스택

- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS, shadcn/ui (Radix UI)
- **Database**: Turso / libsql (Drizzle ORM, SQLite)
- **Hosting**: Vercel (`temon-vercel`)
- **Analytics & Observability**: Google Analytics 4, Microsoft Clarity, Vercel Analytics / Speed Insights
- **Monetization**: Google AdSense
- **SEO / AEO / GEO**: JSON-LD 구조화 데이터, 동적 sitemap (`/sitemap.xml`, `/sitemap-index.xml`), AI 검색 크롤러 지원 (`llms.txt`, `llms-full.txt`, `ai-index.json`), IndexNow

---

## 📋 주요 기능

- ✅ **다양한 MBTI/성격 테스트**: 커피, 라면, 반려동물, 공부, 연애, NTRP 테니스 등 200여 개 퀴즈 카탈로그
- ✅ **SHA-256 멱등성 결과 저장**: 클라이언트 시도(`attemptId`) 및 답안 해시를 통해 네트워크 재시도 시 중복 방지
- ✅ **서버사이드 MBTI 무결성 검증**: 클라이언트 제출 답안을 서버에서 `calculateMBTI` 알고리즘으로 독립 재검증
- ✅ **일관된 결과 URL 체계**: `/results/[testId]/[resultId]` 및 정적 테스트 `/results/[slug]` 구조
- ✅ **사용자 개인정보 보호 및 동의 관리**:
  - `lib/hash-ip.ts`를 통한 IP 주소 단방향 해시(SHA-256 + salt) 저장
  - GDPR/개인정보 동의 관리(Opt-in / Opt-out) 컴포넌트 상시 제공
- ✅ **예약 발행 및 자동 생성 파이프라인**: Vercel Cron을 통한 자동 퀴즈 생성 및 예약 발행

---

## 🛠️ 개발 환경 설정

### 1. 의존성 설치
이 프로젝트는 `npm`을 기본 패키지 매니저로 사용합니다.
```bash
npm install
```

### 2. 환경 변수 설정
루트 디렉터리에 `.env.local` 파일을 생성하고 필요한 값을 설정합니다:
```env
# 사이트 기본 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID=XXXXXXXXXX

# Turso Database (Drizzle ORM)
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token

# 관리자 인증 토큰
ADMIN_AUTH_TOKEN=your-secret-admin-token
```

### 3. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

---

## 🧪 검증 및 테스트 명령어

커밋 또는 배포 전 다음 명령어를 통해 코드 품질과 계약 무결성을 검증합니다:

```bash
# 전체 회귀 테스트 스위트 (22개 테스트 통합 실행)
npm test

# 린트 검사
npm run lint

# TypeScript 타입 검사
npx tsc --noEmit

# 프로덕션 빌드 검증
npm run build
```

---

## 🗄️ 데이터베이스 관리 (Drizzle ORM & Turso)

스키마 정의는 `lib/db/schema.ts`에 위치하며, 마이그레이션 파일은 `./drizzle`에 저장됩니다.

```bash
# Drizzle 마이그레이션 생성
npx drizzle-kit generate

# Turso 데이터베이스에 스키마 적용
npx drizzle-kit migrate

# Drizzle Studio (로컬 DB GUI 뷰어)
npx drizzle-kit studio
```

---

## 🚀 배포 (Vercel)

- **자동 배포**: GitHub `main` 브랜치에 푸시되면 Vercel CI/CD를 통해 프로덕션 환경으로 자동 배포됩니다.
- **Vercel CLI를 통한 직접 배포**:
  ```bash
  # 프로덕션 배포
  npx vercel --prod
  ```
- **배포 스크립트**:
  ```bash
  # 빌드 통과 후 자동 Git push를 수행합니다.
  npm run deploy
  ```

---

## 📊 주요 API 엔드포인트

| 엔드포인트 | 메소드 | 설명 |
|---|---|---|
| `/api/results` | `POST` / `GET` | 멱등성 보장 퀴즈 결과 저장 및 ID 기반 결과 조회 |
| `/api/stats` | `GET` | 테스트별 참여 통계 및 결과 분포 조회 |
| `/api/search` | `GET` | 퀴즈 및 테스트 검색 |
| `/api/cron/generate` | `GET` | AI 퀴즈 자동 생성 대기열 배치 (Vercel Cron 매시 정각) |
| `/api/cron/publish` | `GET` | 예약 발행 일시(`publishAt`) 도달 테스트 자동 공개 |
| `/api/og` | `GET` | 동적 OpenGraph 소셜 공유 이미지 실시간 생성 |
| `/api/indexnow/submit` | `POST` | 신규/수정 페이지 검색엔진(IndexNow) 즉시 색인 요청 |

---

## 📝 프로젝트 디렉터리 구조

```text
├── app/                        # Next.js App Router
│   ├── api/                    # 14개 REST API 및 크론 엔드포인트
│   ├── (admin)/                # 관리자 대시보드
│   ├── tests/                  # 전체 퀴즈 카탈로그 및 퀴즈 러너
│   ├── results/                # 퀴즈 결과 화면
│   ├── blog/                   # 가이드 및 블로그 콘텐츠
│   ├── layout.tsx              # 전역 레이아웃 (SEO, GA, AdSense, 테마)
│   ├── page.tsx                # 메인 랜딩 페이지
│   ├── robots.ts               # 검색엔진 크롤러 및 AI 봇 설정
│   ├── sitemap.xml/route.ts    # 동적 사이트맵 핸들러
│   └── sitemap-index.xml/route.ts
├── components/                 # React 컴포넌트
│   ├── ui/                     # shadcn/ui 기본 프리미티브
│   ├── quiz/                   # 퀴즈 진행 및 결과 모듈
│   ├── redesign/               # 결과 화면 UI 및 인게이지먼트 트래커
│   └── (dashboard)/            # 관리자 통계 시각화 차트
├── data/                       # 퀴즈 정의 및 Wave 3~6 기획/연구 데이터
├── lib/                        # 비즈니스 로직 및 인프라
│   ├── db/                     # Turso 클라이언트 및 Drizzle 스키마/쿼리
│   ├── analytics.ts            # GA4 및 내부 이벤트 계측 로직
│   ├── tests-config.ts         # 마스터 테스트 레지스트리
│   └── utils/                  # MBTI 계산기 및 채점 유틸
└── scripts/                    # 회귀 테스트 및 운영 자동화 스크립트
```

---

## 🔐 보안 및 개인정보 원칙

1. **환경 변수**: `.env.local`은 로컬 전용이며 Git 추적에서 제외됩니다. 프로덕션 환경 변수는 Vercel 대시보드에서 관리합니다.
2. **개인정보 최소화**: 사용자의 실제 IP는 데이터베이스에 저장되지 않으며, `lib/hash-ip.ts`를 통해 SHA-256 + salt 해시된 값만 기록됩니다.
3. **결과 변조 방지**: 클라이언트가 전송한 임의의 성향 결과를 그대로 신뢰하지 않고, 서버에서 답안 배열을 재채점하여 일관성을 검증합니다.
4. **보안 헤더**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` 등 주요 보안 헤더가 `next.config.mjs`에 적용되어 있습니다.

---

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.
