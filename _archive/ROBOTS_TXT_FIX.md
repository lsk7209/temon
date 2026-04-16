# Robots.txt 구문 오류 해결 가이드

## 문제 상황

Google Search Console에서 robots.txt를 읽을 때 다음 오류가 발생했습니다:

```
오류 - 식별할 수 없는 구문입니다. (line 29)
Content-signal: search=yes,ai-train=no
```

## 원인 분석

Cloudflare가 자동으로 robots.txt에 비표준 필드를 추가하고 있습니다:
- `Content-signal: search=yes,ai-train=no` - 이것은 robots.txt 표준이 아닙니다
- Google Search Console은 표준 형식만 인식하므로 오류가 발생합니다

## 해결 방법

### 방법 1: Cloudflare Dashboard에서 robots.txt 자동 관리 비활성화 (권장)

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com 접속
   - 해당 도메인 선택

2. **Scrape Shield 설정 확인**
   - 좌측 메뉴에서 "Scrape Shield" 클릭
   - 또는 "Security" > "Scrape Shield"

3. **robots.txt 자동 생성 비활성화**
   - "robots.txt" 관련 설정 찾기
   - 자동 생성/관리 옵션 비활성화
   - 또는 "Override robots.txt" 옵션 활성화

4. **또는 Cloudflare Transform Rules 사용**
   - "Rules" > "Transform Rules" 메뉴
   - robots.txt 요청을 우리가 생성한 파일로 리다이렉트

### 방법 2: Cloudflare Workers로 robots.txt 오버라이드

Cloudflare Workers를 사용하여 robots.txt를 완전히 제어할 수 있습니다.

**생성할 파일: `functions/robots.txt.ts`**

```typescript
export const onRequest: PagesFunction = async (context) => {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

User-agent: Yeti
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /tests/*/test/result

Sitemap: https://www.temon.kr/sitemap.xml
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

이렇게 하면 Cloudflare의 자동 관리와 관계없이 우리가 생성한 robots.txt가 사용됩니다.

### 방법 3: Cloudflare Page Rules 사용

1. Cloudflare Dashboard에서 "Rules" > "Page Rules" 접속
2. 새 규칙 추가:
   - URL: `www.temon.kr/robots.txt`
   - 설정: "Cache Level" → "Bypass"
   - 또는 "Origin" → 우리 서버로 프록시

## 즉시 적용 방법

가장 빠른 해결책은 Cloudflare Workers를 사용하는 것입니다.

