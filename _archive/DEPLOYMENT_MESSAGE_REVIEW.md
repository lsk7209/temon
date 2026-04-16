# 배포 메시지 검토 및 개선 가이드

## 📋 현재 커밋 메시지 상태

### ✅ 좋은 메시지
- `fix: Remove robots.other from metadata - Next.js Metadata API does not support robots.other - Fix TypeScript build errors`
- `fix: Optimize homepage metadata description length to 140-160 chars`
- `feat: Complete SEO/GEO optimization refactoring - Add JsonLd component, FAQ section, SEO utilities - Refactor 13 pages with enhanced metadata - Add semantic HTML and structured data - Zero breaking changes`

### ⚠️ 개선 필요
- 일부 커밋 메시지에 한글 인코딩 문제 (깨짐)
- 일부 메시지가 너무 길거나 불명확함

## 🎯 커밋 메시지 가이드라인

### 형식
```
<type>: <subject>

<body> (선택사항)

<footer> (선택사항)
```

### Type 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

### Subject 규칙
- 50자 이내
- 첫 글자는 대문자
- 마지막에 마침표(.) 사용하지 않음
- 명령형으로 작성 (예: "Add" not "Added" or "Adds")

### Body 규칙 (선택사항)
- 72자마다 줄바꿈
- 무엇을 변경했는지, 왜 변경했는지 설명
- 어떻게 변경했는지는 코드로 확인 가능하므로 생략 가능

## 📝 개선된 커밋 메시지 예시

### Before
```
fix: RSS 諛?Feed XML??baseUrl???깅줉???ъ씠??二쇱냼(https://temon.kr)?  ?쇱튂?섎룄濡??섏젙
```

### After
```
fix: Update RSS and Feed XML baseUrl to https://temon.kr

- Fix baseUrl in RSS feed generation
- Update Feed XML baseUrl configuration
- Ensure consistent domain usage across feeds
```

### Before
```
feat: Google 諛??ㅼ씠踰??밸쭏?ㅽ꽣 ?꾧뎄 ?섏쭛 理쒖쟻??- robots.txt, sitemap.xml, 硫뷀? ?쒓렇 媛쒖꽑
```

### After
```
feat: Add Google search engine optimization

- Add robots.txt configuration
- Implement dynamic sitemap.xml generation
- Add meta tags for search engine optimization
```

## 🔄 Vercel 배포 메시지

Vercel은 GitHub 커밋 메시지를 자동으로 사용합니다. 따라서:
1. 명확하고 간결한 커밋 메시지 작성
2. 관련 이슈 번호 포함 (선택사항)
3. Breaking changes 명시 (있는 경우)

## 📊 현재 Vercel 프로젝트 정보

- **Project ID**: `prj_1VWadkwaHjY6J7BCdlwPk3hsLRuS`
- **Project Name**: `temon-vercel`
- **Team**: `limsub's projects`
- **Region**: `icn1` (Seoul, South Korea)

## ✅ 권장 사항

1. **커밋 메시지는 영어로 작성** (한글 인코딩 문제 방지)
2. **Conventional Commits 형식 준수**
3. **Subject는 간결하게, Body는 상세하게**
4. **관련 이슈나 PR 번호 포함** (선택사항)

---

**작성일**: 2025-12-15
**상태**: ✅ 검토 완료

