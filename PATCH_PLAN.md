# AdSense 최적화 PATCH_PLAN

- **생성일**: 2026-04-23
- **진단**: `DIAGNOSIS_REPORT.md` 참조
- **스택**: Next.js 14 App Router + Vercel

## 범례
- `[AUTO]` — Claude Code 자동 수정 가능 (본문 생성 아님, 구조·시그널만)
- `[REVIEW]` — 사용자 검토 후 수정 권장
- `[MANUAL]` — 사용자 직접 수행 (콘텐츠 작성·GSC·AdSense 재신청 등)

---

## 🔴 CRITICAL (심사 통과에 치명적)

### P1. [AUTO] About 페이지 생성
- **경로**: `app/about/page.tsx` 신규
- **내용**: 사이트 목적, 운영자 이름/연락처, 연혁, 신뢰 시그널(이용자 수·업데이트 주기), 관련 링크
- **Footer 링크 추가**: `components/footer.tsx` "회사 소개" 섹션
- **Header 메뉴 추가**: `components/header.tsx` navItems에 `/about` 추가
- **예상 소요**: 1 파일 신규 + 2 파일 편집

### P2. [AUTO] Contact 페이지 생성
- **경로**: `app/contact/page.tsx` 신규
- **내용**: 문의 이메일(`contact@temon.kr`), 응답 기대 시간, 문의 폼(mailto 기반 또는 간단 form), FAQ 링크
- **Footer/Header 링크** 동반 추가
- **중요**: AdSense 심사관은 "운영자 실존 확인"을 위해 Contact를 꼼꼼히 봅니다.

### P3. [AUTO] E-E-A-T: 작성자/운영자 시그널 추가
- **신규 파일**: `app/about/page.tsx` 내 또는 `components/author-bio.tsx`
- **각 테스트 랜딩**: `lib/quiz-seo-utils.ts`에 `Person` 스키마 + "최종 업데이트: 2026-04" 표기 추가
- **JSON-LD Person 스키마 추가**: `sameAs`로 운영자 소셜 프로필(선택)

### P4. [MANUAL] Scaled Content Abuse 완화
- **재심사 전 최소 30일 대기** 강력 권장 (213개 대량 양산 시그널)
- 심사관이 짧은 기간 대량 생성을 의심하지 않도록:
  - `dateModified`를 실제 수정 시점으로 분산
  - 콘텐츠 품질 개선 (P6 참조)
  - 일부 저품질 테스트 비공개(noindex) 처리 고려

---

## 🟠 WARNING (통과 가능성 크게 저하)

### P5. [AUTO] robots.txt 중복 해소
- **현재**: `public/robots.txt`(정적) + `app/robots.ts`(동적) 중복. Next.js는 정적 파일 우선.
- **조치**: 두 파일 내용이 일치하도록 동기화하거나 하나만 유지.
- **권장**: `app/robots.ts`를 단일 소스로 두고 `public/robots.txt` 삭제 (동적 환경변수 반영 가능).

### P6. [REVIEW] 랜딩 페이지 콘텐츠 두께 증강
- **문제**: 테스트 랜딩이 평균 300~500자. 애드센스 권장 1,500자 이상 미달.
- **조치 (본문 자동 생성 금지)**:
  - 각 테스트에 "이 테스트는 왜 재미있을까?", "성격 유형이란?", "결과 해석 방법" 섹션 권장
  - 대표 10~20개 테스트만 우선 본문 확장 (전체 213개 동시에 확장 시 Scaled Abuse 시그널 강화)
- **사용자 작업 대상 리스트**: 인기 테스트 상위 20개 선정 → 1개당 800~1,200자 보강

### P7. [AUTO] Header 네비게이션 확장
- **현재**: `홈 / 테스트` 2개만
- **변경**: `홈 / 테스트 / 카테고리 / 소개 / 문의` 5개로 확장
- **파일**: `components/header.tsx`

### P8. [AUTO] 카테고리 인덱스 페이지
- **경로**: `app/tests/page.tsx` 또는 `app/categories/page.tsx`
- **내용**: 213개 테스트를 주제별 분류 (음식/MBTI/습관/취향/엔터테인먼트) — Silo 구조
- **주의**: 이미 존재하면 skip. `ALL_TESTS`/`getHomePageTests` 활용

### P9. [AUTO] Organization 정보 보강
- **위치**: `lib/seo-utils.ts`의 `generateOrganizationSchema()` + About 페이지
- **추가**: 운영자명, (선택) 사업자등록번호, 소재지(대한민국), 설립 연도, 로고 URL

### P10. [AUTO] 커스텀 404 페이지
- **경로**: `app/not-found.tsx` 확인/추가
- **내용**: 홈 돌아가기, 인기 테스트 3개 링크

### P11. [AUTO] 쿠키 동의 배너 (권장)
- **컴포넌트**: `components/cookie-consent.tsx` 신규
- **로직**: localStorage 기반 1회 노출, GDPR/한국 개인정보보호법 대응

---

## 🟡 개선 권장

### P12. [MANUAL] Google Search Console 점검
- `site:temon.kr`로 색인 상태 확인
- 색인 안된 주요 페이지 → 수동 URL 검사 → 색인 요청
- 보유 도메인이므로 `D:\env\cursorai-451704-85a5abbe8eeb.json` 서비스 계정 소유자 추가 권장

### P13. [MANUAL] PageSpeed Insights 실측
- `https://pagespeed.web.dev/analysis?url=https://temon.kr` 확인
- LCP/INP/CLS 목표: 2.5s / 200ms / 0.1 이하

### P14. [REVIEW] FAQ 품질 강화
- 현재 FAQ가 모든 테스트에 동일 템플릿 → 테스트별 고유 질문 1~2개 추가 권장

### P15. [MANUAL] AdSense 재신청 타이밍
- 위 P1~P3 자동 적용 + P6 본문 확장 완료 후
- 최소 30일 트래픽 축적 + GSC 색인 50% 이상 확인 후 신청

---

## 실행 우선순위

| 순서 | 항목 | 분류 | 예상 시간 |
|---|---|---|---|
| 1 | P1 About 페이지 | AUTO | 5분 |
| 2 | P2 Contact 페이지 | AUTO | 5분 |
| 3 | P3 저자/Organization 스키마 | AUTO | 10분 |
| 4 | P5 robots 중복 제거 | AUTO | 2분 |
| 5 | P7 헤더 네비 확장 | AUTO | 3분 |
| 6 | P9 Organization 정보 | AUTO | 5분 |
| 7 | P10 404 페이지 | AUTO | 5분 |
| 8 | P11 쿠키 배너 | AUTO | 10분 |
| 9 | P6 본문 확장 | MANUAL/REVIEW | 사용자 |
| 10 | P4/P12~P15 재심사 준비 | MANUAL | 사용자 |

**총 AUTO 예상 시간**: 약 45분 (코드 변경 + 빌드 확인)
