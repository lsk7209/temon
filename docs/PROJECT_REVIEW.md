# 테몬 (Temon) 프로젝트 검토 보고서

> 검토일: 2026-03-19

## 1. 프로젝트 개요

MBTI 및 성격 테스트 플랫폼으로, 200개 이상의 테마별 퀴즈를 제공하는 한국어 웹 서비스.

## 2. 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) + TypeScript |
| 스타일링 | Tailwind CSS + shadcn/ui (Radix UI) |
| DB | Turso (libSQL/SQLite) + Drizzle ORM |
| 배포 | Vercel (주) + Cloudflare Workers (크론/분석) |
| AI | Google Generative AI (테스트 자동 생성) |
| 분석 | GA4 + Microsoft Clarity + Vercel Analytics |
| 수익화 | Google AdSense |

## 3. 강점

- **풍부한 콘텐츠**: 200개 이상 테스트 페이지, 체계적 레지스트리 관리
- **SEO 최적화**: JSON-LD, 동적 OG 이미지, 사이트맵, RSS, IndexNow
- **보안 미들웨어**: Rate limiting, CSP, HSTS, XSS 방어, 관리자 토큰 인증
- **성능**: Edge Runtime API, ISR 캐싱, 이미지 최적화
- **분석 체계**: 페이지 방문, 테스트 시작/완료/이탈, Web Vitals 모니터링
- **자동화**: AI 기반 테스트 생성, 대기열 처리, 자동 배포 스크립트

## 4. 개선 권장사항

### 높은 우선순위

#### 자동화 테스트 도입
- Jest/Vitest 등 단위 테스트가 전혀 없음
- 퀴즈 로직(`use-quiz-logic.ts`), 결과 계산, API 라우트 테스트 필요
- 최소한 핵심 비즈니스 로직(MBTI 계산, 점수 산정)에 대한 테스트 추가 권장

### 중간 우선순위

#### 하드코딩된 테스트 데이터
- `tests-config.ts` 86KB, 200개 이상 테스트가 단일 파일에 하드코딩
- DB 기반 동적 관리 전환 또는 데이터 파일 분리 권장

#### Rate Limiting 개선
- 메모리 기반 rate limiting은 서버리스 환경에서 인스턴스 간 비공유
- Upstash Redis 등 분산 rate limiting 도입 권장

#### 에러 모니터링
- Sentry 등 에러 추적 서비스 부재
- 프로덕션 에러 감지 및 디버깅 위해 도입 권장

### 낮은 우선순위

#### 코드 구조 정리
- `_archive` 디렉토리 정리 필요
- `scripts/` 내 일회성 스크립트(`fix-*.js`) 정리 권장
- Cloudflare Functions와 Vercel API Routes 간 기능 중복 검토

#### 타입 안전성 강화
- 모든 API 엔드포인트에 일관된 Zod 입력 검증 적용 권장

#### 환경변수 관리
- 13개 환경변수의 필수/선택 구분 명시 권장

## 5. 아키텍처 평가

| 항목 | 평가 | 비고 |
|------|------|------|
| 확장성 | 양호 | Edge Runtime + Turso 분산 DB |
| 유지보수성 | 보통 | 하드코딩 데이터 관리 부담 |
| 보안 | 양호 | 미들웨어 보안 헤더, 입력 검증 |
| SEO | 우수 | 종합적 최적화 |
| 성능 | 양호 | Edge + ISR + 이미지 최적화 |
| 테스트 가능성 | 미흡 | 자동화 테스트 없음 |

## 6. 요약

테몬은 SEO와 사용자 참여에 강점을 가진 잘 구축된 성격 테스트 플랫폼입니다.
핵심 개선 포인트 3가지:

1. **자동화 테스트 도입** — 비즈니스 로직 안정성 확보
2. **하드코딩 데이터 DB 마이그레이션** — 유지보수성 향상
3. **분산 Rate Limiting** — 서버리스 환경 대응

현재 상태로도 운영 가능하지만, 규모 확장 시 위 세 가지가 병목이 될 수 있습니다.
