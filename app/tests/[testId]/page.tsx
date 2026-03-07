import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { TestIntro } from "@/components/test-intro"
import { JsonLd } from "@/components/json-ld"
import { generateQuizSchemas, generateUniqueTestMetadata, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import { getDb, isDbAvailable } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { eq, or } from "drizzle-orm"

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
      .where(or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId)))
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
    testCategory: "personality",
    testDescription: test.description || "",
    keywords: `${test.title}, personality quiz, free quiz, temon`,
    canonical: `/tests/${params.testId}`,
  })
}

export default async function DynamicTestPage({ params }: Props) {
  const test = await getTest(params.testId)

  if (!test) {
    notFound()
  }

  const fullDescription = test.description || ""
  const faqs = getDefaultQuizFAQs(test.title)
  const schemas = generateQuizSchemas({
    quizId: params.testId,
    title: test.title,
    shortDescription: fullDescription.slice(0, 80),
    fullDescription,
    keywords: `${test.title}, personality quiz, free quiz, temon`,
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
    </>
  )
}
