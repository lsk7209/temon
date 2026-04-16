# 테몬 MBTI 플랫폼 기술 문서

## 🏗️ 아키텍처 개요

### 프레임워크 및 기술 스택
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **TypeScript**: 완전한 타입 안전성
- **Analytics**: Google Analytics 4 + 커스텀 추적 시스템
- **Monetization**: Google AdSense

## 📋 핵심 규칙 및 제약사항

### 🎯 헤더 표시 규칙 (최우선 규칙)
**⚠️ 절대 규칙: 헤더표시 1개 고정**
- 전체 애플리케이션에서 Header 컴포넌트는 **오직 1개만** 존재
- Layout.tsx에서만 Header 컴포넌트 렌더링 (유일한 렌더링 위치)
- **금지 사항**:
  - 개별 페이지에서 Header import 금지
  - 테스트 페이지에서 Header 렌더링 금지  
  - 결과 페이지에서 Header 렌더링 금지
  - 어떤 페이지에서도 Header 중복 렌더링 절대 금지

**위반 시 발생하는 문제**:
- 헤더가 2개 이상 표시됨
- 사용자 경험 저하
- 레이아웃 깨짐

### 🧪 테스트 구조 표준
- **질문 개수**: 12개 고정
- **보기 개수**: 2개 (A, B) 고정
- **MBTI 계산**: E/I, S/N, T/F, J/P 4차원 균형
- **자동 진행**: 보기 선택 시 0.5초 후 자동 넘어가기

### 📊 Analytics 시스템
- **필수 추적 이벤트**:
  - `trackPageVisit()`: 페이지 방문
  - `trackTestStart()`: 테스트 시작
  - `trackTestProgress()`: 진행률 추적
  - `trackTestComplete()`: 테스트 완료
  - `trackShare()`: 결과 공유

### 💰 AdSense 설정
- **단일 코드 사용**: `ca-pub-3050601904412736`
- **중복 코드 금지**: 여러 AdSense 코드 동시 사용 불가
- **로딩 전략**: `strategy="afterInteractive"`

## 🎨 디자인 시스템

### 컬러 팔레트
\`\`\`css
/* 테스트별 그라데이션 */
라면 MBTI: from-orange-400 to-red-500
반려동물 MBTI: from-pink-400 to-purple-500
커피 MBTI: from-amber-400 to-orange-500
테니스 NTRP: from-green-400 to-emerald-500
공부 스타일: from-blue-400 to-indigo-500
알람 습관: from-cyan-400 to-blue-500
\`\`\`

### 컴포넌트 구조
\`\`\`
components/
├── header.tsx (전역 헤더 - 1개만 사용)
├── analytics-provider.tsx (추적 시스템)
└── ui/ (shadcn/ui 컴포넌트들)
\`\`\`

## 🔧 개발 가이드라인

### 파일 구조
\`\`\`
app/
├── layout.tsx (Header 포함 - 유일한 헤더 렌더링 위치)
├── page.tsx (메인 페이지)
├── [test-name]/
│   ├── page.tsx (테스트 소개)
│   └── test/
│       ├── page.tsx (테스트 진행 - 헤더 렌더링 금지)
│       └── result/
│           └── page.tsx (결과 페이지)
\`\`\`

### 코딩 규칙
1. **Header 중복 방지**: 테스트 페이지에서 Header 컴포넌트 import/사용 금지
2. **타입 안전성**: 모든 함수와 컴포넌트에 TypeScript 타입 정의
3. **Analytics 필수**: 모든 사용자 상호작용에 추적 이벤트 추가
4. **반응형 디자인**: 모바일 우선 설계
5. **성능 최적화**: 이미지 최적화, 코드 스플리팅 적용

## 🚀 배포 체크리스트

### 배포 전 확인사항
- [ ] Header가 1개만 렌더링되는지 확인
- [ ] AdSense 중복 코드 없는지 확인
- [ ] 모든 테스트가 12문항 2보기 구조인지 확인
- [ ] Analytics 이벤트가 정상 전송되는지 확인
- [ ] 파비콘이 모든 브라우저에서 표시되는지 확인
- [ ] PWA 매니페스트가 유효한지 확인

### 성능 최적화
- **이미지**: WebP 포맷 사용, 적절한 크기 조정
- **폰트**: 시스템 폰트 우선, 웹폰트 최소화
- **JavaScript**: 코드 스플리팅, 지연 로딩 적용
- **CSS**: Tailwind CSS 퍼지 설정으로 미사용 스타일 제거

## 🔍 트러블슈팅

### 자주 발생하는 문제들

#### 1. 헤더 중복 문제
**증상**: 페이지에 헤더가 2개 이상 표시됨
**원인**: 테스트 페이지에서 Header 컴포넌트 중복 렌더링
**해결**: 테스트 페이지에서 Header import/사용 제거

#### 2. AdSense 중복 코드 오류
**증상**: `adsbygoogle.push() error: Warning: Do not add multiple property codes`
**원인**: 여러 AdSense 코드 동시 로드
**해결**: 단일 AdSense 코드만 사용

#### 3. Analytics 추적 실패
**증상**: Google Analytics에서 이벤트 수집 안됨
**원인**: 추적 함수 누락 또는 잘못된 설정
**해결**: 모든 필수 추적 함수 구현 확인

## 📈 모니터링 및 분석

### 핵심 지표
- **페이지 뷰**: 일일 방문자 수
- **테스트 완료율**: 시작 대비 완료 비율
- **평균 세션 시간**: 사용자 참여도
- **공유율**: 결과 공유 빈도

### 성능 지표
- **Core Web Vitals**: LCP, FID, CLS 최적화
- **페이지 로드 속도**: 3초 이내 목표
- **모바일 성능**: 90점 이상 유지

---

**마지막 업데이트**: 2024년 12월
**버전**: 1.0.0
**담당자**: 테몬 개발팀
