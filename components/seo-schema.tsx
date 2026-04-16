/**
 * SEO, AEO, GEO 최적화를 위한 구조화 데이터 컴포넌트
 * 재사용 가능한 스키마 컴포넌트
 */

import Script from "next/script"
import { generateTestPageSchemas, generateBreadcrumbSchema, type FAQItem } from "@/lib/seo-utils"

interface TestPageSchemasProps {
  testId: string
  testTitle: string
  testDescription: string
  questionCount: number
  duration: string
  faqs: FAQItem[]
}

/**
 * 테스트 페이지용 통합 스키마 컴포넌트
 */
export function TestPageSchemas({
  testId,
  testTitle,
  testDescription,
  questionCount,
  duration,
  faqs,
}: TestPageSchemasProps) {
  const schemas = generateTestPageSchemas({
    testId,
    testTitle,
    testDescription,
    questionCount,
    duration,
    faqs,
  })

  return (
    <>
      <Script
        id={`quiz-schema-${testId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas.quiz }}
      />
      <Script
        id={`faq-schema-${testId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas.faq }}
      />
      <Script
        id={`breadcrumb-schema-${testId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas.breadcrumb }}
      />
    </>
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

/**
 * Breadcrumb 스키마 컴포넌트
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items)

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  )
}

