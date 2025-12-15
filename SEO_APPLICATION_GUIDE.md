# SEO 최적화 적용 가이드

## 📋 개요

이 가이드는 새로운 퀴즈 페이지에 SEO/GEO 최적화를 적용하는 방법을 설명합니다.

## 🚀 빠른 시작

### 1. 기본 템플릿

```tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "짧은 설명 80자 이하"
// Full description for Google/AI
const fullDescription = "전체 설명... 상세한 내용을 포함합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "quiz-id",
  title: "퀴즈 제목",
  shortDescription,
  fullDescription,
  keywords: "키워드1, 키워드2, 키워드3",
  canonical: "/tests/quiz-id",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getDefaultQuizFAQs("퀴즈 제목"),
  // 추가 FAQ...
]

export default function QuizPage() {
  const schemas = generateQuizSchemas({
    quizId: "quiz-id",
    title: "퀴즈 제목",
    shortDescription,
    fullDescription,
    keywords: "...",
    canonical: "/tests/quiz-id",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data */}
      <JsonLd id="quiz-schema" data={schemas.quiz} />
      <JsonLd id="breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="faq-schema" data={schemas.faq} />}

      <article className="min-h-screen...">
        <header>
          <h1>퀴즈 제목</h1>
        </header>

        <section>
          {/* 콘텐츠 */}
        </section>

        <section>
          <FAQSection faqs={faqs} title="퀴즈 제목 자주 묻는 질문" />
        </section>
      </article>
    </>
  )
}
```

## 📝 단계별 가이드

### Step 1: 메타데이터 생성

```tsx
// Naver 최적화: 80자 이하
const shortDescription = "짧은 설명"

// Google/AI 최적화: 전체 설명
const fullDescription = "상세한 전체 설명..."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "quiz-id",
  title: "퀴즈 제목",
  shortDescription,
  fullDescription,
  keywords: "키워드1, 키워드2",
  canonical: "/tests/quiz-id",
  questionCount: 12,
  duration: "PT3M",
})
```

### Step 2: FAQ 생성

```tsx
const faqs = [
  ...getDefaultQuizFAQs("퀴즈 제목"), // 기본 FAQ
  {
    question: "추가 질문?",
    answer: "추가 답변...",
  },
]
```

### Step 3: 구조화된 데이터 생성

```tsx
const schemas = generateQuizSchemas({
  quizId: "quiz-id",
  title: "퀴즈 제목",
  shortDescription,
  fullDescription,
  keywords: "...",
  canonical: "/tests/quiz-id",
  questionCount: 12,
  duration: "PT3M",
  faqs,
})
```

### Step 4: 컴포넌트 렌더링

```tsx
return (
  <>
    <JsonLd id="quiz-schema" data={schemas.quiz} />
    <JsonLd id="breadcrumb-schema" data={schemas.breadcrumb} />
    {schemas.faq && <JsonLd id="faq-schema" data={schemas.faq} />}

    <article>
      {/* 시맨틱 HTML 사용 */}
      <header>...</header>
      <section>...</section>
      <FAQSection faqs={faqs} />
    </article>
  </>
)
```

## ✅ 체크리스트

### 메타데이터
- [ ] Naver 최적화: 설명 80자 이하
- [ ] Google/AI 최적화: 전체 설명 포함
- [ ] 제목 형식: "[콘텐츠 제목] | [서비스명]"
- [ ] 키워드 포함
- [ ] Canonical URL 설정

### 구조화된 데이터
- [ ] Quiz 스키마
- [ ] Breadcrumb 스키마
- [ ] FAQ 스키마 (선택사항)

### 시맨틱 HTML
- [ ] `<article>` 태그 사용
- [ ] `<section>` 태그 사용
- [ ] `<header>` 태그 사용
- [ ] FAQ 섹션 추가

### FAQ 섹션
- [ ] 기본 FAQ 포함
- [ ] 퀴즈별 추가 FAQ (선택사항)
- [ ] `<details>`/`<summary>` 태그 사용

## 🎯 예시: 완성된 페이지

완성된 예시는 다음 파일들을 참고하세요:
- `app/coffee-mbti/page.tsx`
- `app/tests/coffee-mbti/page.tsx`
- `app/ramen-mbti/page.tsx`

## 📚 참고 자료

- `lib/quiz-seo-utils.ts` - SEO 유틸리티 함수
- `components/json-ld.tsx` - JSON-LD 컴포넌트
- `components/faq-section.tsx` - FAQ 섹션 컴포넌트

---

**마지막 업데이트**: 2025-01-XX

