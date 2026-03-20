# 테몬 (Temon) MBTI 플랫폼 - 프로젝트 검토 보고서

**검토일**: 2026-03-20

## 1. 프로젝트 개요

40개 이상의 MBTI 성격 테스트를 제공하는 한국어 기반 웹 플랫폼.

| 항목 | 내용 |
|------|------|
| 코드 규모 | ~920 TSX/TS 파일, ~188,000 LOC |
| 프레임워크 | Next.js 14 (App Router) |
| DB | Turso (libSQL) + Drizzle ORM |
| UI | shadcn/ui + Tailwind CSS + Framer Motion |
| 배포 | Vercel (주), Cloudflare Workers (크론) |

## 2. 긍정적 평가

- **체계적인 App Router 구조**: 각 테스트가 독립된 라우트로 분리
- **재사용 가능한 퀴즈 컴포넌트**: quiz-container, mbti-result-page 등 공통 컴포넌트
- **SEO 최적화**: JSON-LD, 동적 OG 이미지, IndexNow, 네이버/다음 최적화
- **보안 미들웨어**: CSP, HSTS, XSS 방지 헤더, Rate Limiting
- **TypeScript strict mode**: 타입 안정성 확보
- **DB 스키마 설계**: 적절한 인덱싱, 외래 키, cascading delete

## 3. 개선 필요 사항

### 3-1. 보안 (Critical)

| 심각도 | 항목 | 상세 |
|--------|------|------|
| Critical | Next.js 취약점 | next@14.2.16에 13개 보안 취약점 (SSRF, DoS, Authorization Bypass). 최소 14.2.35 필요 |
| High | npm 취약점 | 총 12개 (6 moderate, 5 high, 1 critical) |
| Medium | Rate Limiting | 인메모리 Map → Edge 인스턴스 간 공유 불가. Vercel KV/Upstash Redis 권장 |
| Medium | CSP 정책 | unsafe-inline/unsafe-eval 허용 → nonce 기반 전환 필요 |
| Low | Admin 인증 | 단순 문자열 비교 → 타이밍 공격 가능성 |

### 3-2. 코드 품질

- **테스트 코드 부재**: 단위/E2E 테스트 없음
- **tests-config.ts 비대**: 2,781줄 단일 파일 → 분리 필요
- **중복 날짜 라이브러리**: date-fns + dayjs 동시 사용
- **미사용 Radix UI 컴포넌트**: 24개 중 미사용 패키지 정리 필요
- **pdf-lib 의존성**: 사용 목적 불명확

### 3-3. 아키텍처

- **Rate Limit 메모리 누수**: 정리가 10% 확률로만 실행
- **IP/UserAgent 수집**: 개인정보보호법 준수 검토 필요
- **에러 모니터링 부재**: Sentry 등 미통합

### 3-4. 성능

- **번들 크기**: Recharts + Framer Motion + 24 Radix → 분석 필요
- **DB 인덱싱**: pageVisits에 path/createdAt 인덱스 없음

## 4. 우선순위별 액션 아이템

### P0 (즉시)
1. next@14.2.16 → 14.2.35+ 업그레이드
2. npm audit fix 실행

### P1 (단기)
3. 핵심 로직 단위 테스트 추가
4. CSP unsafe-eval 제거
5. Rate Limiting → Vercel KV/Upstash Redis
6. pageVisits 테이블 인덱스 추가

### P2 (중기)
7. Sentry 에러 모니터링 통합
8. tests-config.ts 분리/DB 전환
9. 날짜 라이브러리 통일
10. 미사용 의존성 정리
11. Bundle Analyzer 도입
12. 개인정보처리방침 검토

## 5. 총평

프로덕션 운영 중인 잘 구조화된 프로젝트. SEO와 UX가 우수함.
가장 시급한 과제: **Next.js 보안 업데이트** + **테스트 코드 도입**.
