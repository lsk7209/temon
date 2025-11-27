# Vercel 배포 가이드

## ✅ Vercel 호스팅으로 전환 완료

프로젝트가 Vercel 호스팅에 맞게 설정되었습니다.

---

## 🔧 변경된 설정

### 1. Next.js 설정 (next.config.mjs) ✅

**변경 사항:**
- ❌ `output: 'export'` 제거 - Vercel은 서버 사이드 렌더링 지원
- ✅ 이미지 최적화 활성화 - Vercel이 자동으로 최적화
- ✅ API 라우트 사용 가능 - Next.js API Routes 지원

**이전 (Cloudflare):**
```javascript
output: 'export', // 정적 사이트 생성
images: { unoptimized: true }
```

**현재 (Vercel):**
```javascript
// output: 'export' 제거 - Vercel이 자동으로 최적화
images: {
  formats: ['image/avif', 'image/webp'],
}
```

### 2. 빌드 스크립트 (package.json) ✅

**변경 사항:**
- 정적 파일 생성 스크립트 제거 (Vercel이 자동 처리)
- `app/robots.ts`와 `app/sitemap.ts`가 자동으로 동작

**이전:**
```json
"build": "next build && node scripts/clean-build.js && node scripts/generate-feeds.js && node scripts/generate-sitemap.js && node scripts/generate-robots.js"
```

**현재:**
```json
"build": "next build"
```

### 3. Vercel 설정 파일 (vercel.json) ✅

**생성된 파일:**
- `vercel.json` - Vercel 배포 설정

**주요 설정:**
- 리전: `icn1` (서울)
- sitemap.xml, robots.txt 캐싱 설정
- Next.js 프레임워크 자동 감지

### 4. Robots.txt & Sitemap.xml ✅

**동적 생성:**
- `app/robots.ts` - 자동으로 `/robots.txt` 생성
- `app/sitemap.ts` - 자동으로 `/sitemap.xml` 생성
- Vercel에서 자동으로 처리됨

---

## 🚀 Vercel 배포 방법

### 방법 1: Vercel CLI 사용 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 (자동 배포)

1. **Vercel Dashboard 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 추가**
   - "Add New..." > "Project" 클릭
   - GitHub 저장소 선택: `lsk7209/temon`

3. **프로젝트 설정**
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지)
   - **Output Directory**: `.next` (자동 감지)
   - **Install Command**: `npm install` (자동 감지)

4. **환경 변수 설정**
   - "Environment Variables" 섹션에서 추가:
     ```
     NEXT_PUBLIC_APP_URL=https://www.temon.kr
     NEXT_PUBLIC_GA_ID=G-2TLW7Z2VQW
     NEXT_PUBLIC_ADSENSE_CLIENT_ID=your-adsense-id
     GOOGLE_SITE_VERIFICATION=your-verification-code
     NAVER_SITE_VERIFICATION=your-verification-code
     ```

5. **배포**
   - "Deploy" 버튼 클릭
   - 자동으로 빌드 및 배포 시작

---

## 📋 배포 후 확인 사항

### 1. 기본 URL 확인
- 배포 후 Vercel이 제공하는 URL 확인
- 예: `https://temon.vercel.app`

### 2. 커스텀 도메인 연결 (선택사항)
1. Vercel Dashboard > 프로젝트 > Settings > Domains
2. 도메인 추가: `www.temon.kr`
3. DNS 설정 안내에 따라 DNS 레코드 추가

### 3. Sitemap.xml 확인
```
https://your-domain.vercel.app/sitemap.xml
```
- 정상적으로 XML이 표시되어야 함
- 모든 URL이 포함되어 있는지 확인

### 4. Robots.txt 확인
```
https://your-domain.vercel.app/robots.txt
```
- 표준 형식으로 표시되어야 함
- Cloudflare의 비표준 필드 없음

### 5. Google Search Console 재제출
1. Google Search Console 접속
2. "색인 생성" > "사이트맵"
3. `https://www.temon.kr/sitemap.xml` 제출
4. 이제 정상적으로 읽힐 것입니다!

---

## 🔄 Cloudflare에서 Vercel로 전환 시 주의사항

### 제거된 기능
- ❌ Cloudflare Pages Functions (`functions/` 디렉토리)
- ❌ Cloudflare D1 데이터베이스 (별도 마이그레이션 필요)
- ❌ Cloudflare KV 네임스페이스
- ❌ Cloudflare Workers Cron

### 대체 방법

**API 라우트:**
- Cloudflare Functions → Next.js API Routes (`app/api/`)
- 예: `app/api/collect/route.ts`

**데이터베이스:**
- Cloudflare D1 → Vercel Postgres, PlanetScale, Supabase 등
- 또는 Vercel KV (Redis 호환)

**Cron 작업:**
- Vercel Cron Jobs 사용
- `vercel.json`에 cron 설정 추가

---

## 📊 Vercel의 장점

### 1. 자동 최적화
- ✅ 이미지 최적화 (AVIF, WebP 자동 변환)
- ✅ 코드 스플리팅
- ✅ 정적 페이지 자동 생성
- ✅ Edge Functions 지원

### 2. 개발자 경험
- ✅ GitHub 연동으로 자동 배포
- ✅ Preview 배포 (PR마다)
- ✅ 실시간 로그 확인
- ✅ 성능 분석 도구

### 3. SEO 최적화
- ✅ 서버 사이드 렌더링 지원
- ✅ 동적 sitemap.xml, robots.txt
- ✅ 메타데이터 최적화
- ✅ 구조화된 데이터 지원

---

## 🛠️ 문제 해결

### 문제 1: 빌드 실패

**해결:**
```bash
# 로컬에서 빌드 테스트
npm run build

# 오류 확인 후 수정
```

### 문제 2: 환경 변수 누락

**해결:**
1. Vercel Dashboard > Settings > Environment Variables
2. 필요한 환경 변수 추가
3. 재배포

### 문제 3: Sitemap.xml 404

**해결:**
- `app/sitemap.ts` 파일이 있는지 확인
- 빌드 로그에서 sitemap 생성 확인
- Vercel Functions 로그 확인

---

## 📝 다음 단계

1. ✅ Vercel 프로젝트 생성
2. ✅ GitHub 저장소 연결
3. ✅ 환경 변수 설정
4. ✅ 첫 배포 실행
5. ✅ 커스텀 도메인 연결 (선택)
6. ✅ Google Search Console 재제출

---

## ✨ 완료!

이제 Vercel에서 자동 배포가 가능합니다!

**자동 배포:**
- GitHub에 푸시하면 자동으로 배포됩니다
- `npm run deploy` 명령어는 여전히 사용 가능 (GitHub 푸시 포함)

**수동 배포:**
```bash
vercel --prod
```

---

*작성일: 2024년*  
*상태: ✅ Vercel 호스팅 준비 완료*

