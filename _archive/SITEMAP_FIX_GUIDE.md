# Sitemap.xml 404 오류 해결 가이드

## 문제 상황

Google Search Console에서 sitemap.xml을 제출했을 때 404 오류가 발생했습니다.

**오류 메시지:**
```
사이트맵을 읽을 수 없음
일반 HTTP 오류
HTTP 오류: 404
```

## 원인 분석

Next.js에서 `output: 'export'` 모드(정적 사이트 생성)를 사용할 때:
- `app/sitemap.ts` 파일이 빌드 시점에만 실행됨
- 하지만 실제로 정적 파일(`sitemap.xml`)이 생성되지 않을 수 있음
- 동적 라우트가 작동하지 않아 빌드 후에도 파일이 없을 수 있음

## 해결 방법

### 1. 빌드 스크립트 추가 ✅

`scripts/generate-sitemap.js` 스크립트를 생성하여 빌드 후 정적으로 sitemap.xml 파일을 생성하도록 했습니다.

**생성된 파일:**
- `scripts/generate-sitemap.js` - sitemap.xml 생성 스크립트
- `scripts/generate-robots.js` - robots.txt 생성 스크립트 (추가 보완)

**수정된 파일:**
- `package.json` - 빌드 스크립트에 sitemap 생성 추가

### 2. 빌드 프로세스

빌드 시 다음 순서로 실행됩니다:

```bash
npm run build
```

실행 순서:
1. `next build` - Next.js 빌드
2. `scripts/clean-build.js` - 빌드 정리
3. `scripts/generate-feeds.js` - RSS/Atom 피드 생성
4. `scripts/generate-sitemap.js` - **sitemap.xml 생성** ✨
5. `scripts/generate-robots.js` - robots.txt 생성

### 3. 생성되는 파일

빌드 후 `out/` 디렉토리에 다음 파일들이 생성됩니다:

- `out/sitemap.xml` - 사이트맵 파일
- `out/robots.txt` - robots.txt 파일
- `out/rss.xml` - RSS 피드
- `out/feed.xml` - Atom 피드

## 적용 방법

### 1단계: 빌드 실행

```bash
npm run build
```

### 2단계: 생성 확인

빌드 후 다음 파일이 생성되었는지 확인:

```bash
# Windows
dir out\sitemap.xml
dir out\robots.txt

# Mac/Linux
ls -la out/sitemap.xml
ls -la out/robots.txt
```

### 3단계: 파일 내용 확인

`sitemap.xml` 파일이 올바르게 생성되었는지 확인:

```bash
# Windows
type out\sitemap.xml

# Mac/Linux
cat out/sitemap.xml
```

예상되는 내용:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.temon.kr</loc>
    <lastmod>2024-...</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

### 4단계: 배포

생성된 `out/` 디렉토리를 배포 서버에 업로드합니다.

**Cloudflare Pages의 경우:**
- `out/` 디렉토리가 자동으로 배포됩니다
- `sitemap.xml`은 `https://www.temon.kr/sitemap.xml`에서 접근 가능해야 합니다

### 5단계: Google Search Console 재제출

1. Google Search Console 접속
2. "색인 생성" > "사이트맵" 메뉴로 이동
3. 기존 sitemap 제거 (있다면)
4. 새로 추가: `https://www.temon.kr/sitemap.xml`
5. 제출 후 상태 확인

## 검증 방법

### 1. 브라우저에서 직접 확인

배포 후 브라우저에서 직접 접근:

```
https://www.temon.kr/sitemap.xml
```

정상적으로 XML이 표시되어야 합니다.

### 2. Google Search Console 테스트

Google Search Console의 "URL 검사" 도구 사용:

1. Google Search Console 접속
2. 상단 검색창에 `https://www.temon.kr/sitemap.xml` 입력
3. "색인 생성 요청" 클릭
4. 상태 확인

### 3. 온라인 Sitemap 검증 도구 사용

다음 도구로 sitemap.xml을 검증할 수 있습니다:

- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://www.sitemaps.org/protocol.html

## 예상 결과

### 성공 시

- ✅ Google Search Console에서 "성공" 상태 표시
- ✅ sitemap.xml 파일이 정상적으로 읽힘
- ✅ 포함된 URL 개수가 표시됨

### 실패 시

- ❌ 여전히 404 오류 발생
- ❌ "사이트맵을 읽을 수 없음" 메시지

**추가 확인 사항:**
1. 배포가 완료되었는지 확인
2. `out/sitemap.xml` 파일이 실제로 생성되었는지 확인
3. Cloudflare Pages 설정에서 빌드 출력 디렉토리가 `out`으로 설정되어 있는지 확인

## 문제 해결

### 문제 1: 빌드 후에도 sitemap.xml이 생성되지 않음

**해결:**
```bash
# 스크립트 직접 실행
node scripts/generate-sitemap.js

# 오류 메시지 확인
```

### 문제 2: sitemap.xml은 생성되지만 404 오류

**원인:**
- 배포 서버에서 파일 경로 문제
- Cloudflare Pages 설정 문제

**해결:**
1. Cloudflare Pages 대시보드 확인
2. 빌드 출력 디렉토리가 `out`인지 확인
3. 배포 로그 확인

### 문제 3: sitemap.xml에 URL이 너무 적음

**원인:**
- 테스트 디렉토리 스캔 실패
- tests-config.ts 파싱 실패

**해결:**
1. `scripts/generate-sitemap.js` 실행 시 콘솔 로그 확인
2. 발견된 테스트 개수 확인
3. 필요 시 스크립트 수정

## 추가 개선 사항

### Sitemap 인덱스 사용 (선택사항)

URL이 50,000개를 초과하는 경우 sitemap 인덱스를 사용할 수 있습니다:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.temon.kr/sitemap-tests.xml</loc>
  </sitemap>
</sitemapindex>
```

현재는 단일 sitemap.xml로 충분합니다.

## 참고 자료

- [Google Sitemap 가이드](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Sitemap 프로토콜](https://www.sitemaps.org/protocol.html)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

**작성일**: 2024년  
**상태**: ✅ 해결 완료

