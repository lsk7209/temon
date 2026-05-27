import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { TestIntro } from "@/components/test-intro"
import { JsonLd } from "@/components/json-ld"
import { generateQuizSchemas, generateUniqueTestMetadata } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { TestExpandedIntro } from "@/components/test-expanded-intro"
import { getDb, isDbAvailable } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { and, eq, or } from "drizzle-orm"

interface Props {
  params: { testId: string }
}

async function getTest(slugOrId: string) {
  if (!isDbAvailable()) {
    return null
  }

  try {
    const db = getDb()
    const test = await db
      .select()
      .from(tests)
      .where(
        and(
          or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId)),
          eq(tests.status, "published"),
        ),
      )
      .limit(1)
      .get()
    return test
  } catch (error) {
    console.error("Failed to fetch test", error)
    return null
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const test = await getTest(params.testId)

  if (!test) {
    return {
      title: "Test not found",
    }
  }

  return generateUniqueTestMetadata({
    testName: test.title,
    testCategory: test.category || "성격",
    testDescription: test.description || "",
    keywords: `${test.title}, 무료 성격 테스트, MBTI 테스트, 심리테스트, 테스트 사이트, 테몬`,
    canonical: `/tests/${params.testId}`,
  })
}

export default async function DynamicTestPage({ params }: Props) {
  const test = await getTest(params.testId)

  if (!test) {
    notFound()
  }

  const fullDescription = test.description || ""
  const faqs = getTopicQuizFAQs(test.title)
  const schemas = generateQuizSchemas({
    quizId: params.testId,
    title: test.title,
    shortDescription: fullDescription.slice(0, 80),
    fullDescription,
    keywords: `${test.title}, 무료 성격 테스트, MBTI 테스트, 심리테스트, 테스트 사이트, 테몬`,
    canonical: `/tests/${params.testId}`,
    questionCount: test.questionCount,
    duration: `PT${test.avgMinutes || 3}M`,
    faqs,
  })

  return (
    <>
      <JsonLd id="quiz-schema" data={schemas.quiz} />
      <JsonLd id="breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="faq-schema" data={schemas.faq} />}

      <TestIntro
        id={params.testId}
        title={test.title}
        description={fullDescription}
        questionCount={test.questionCount}
        avgMinutes={test.avgMinutes}
        resultCount={test.resultTypeCount}
        theme="purple"
      />
      <div className="mx-auto max-w-5xl px-4">
        <TestExpandedIntro testId={params.testId} title={test.title} />
      </div>
    </>
  )
}
