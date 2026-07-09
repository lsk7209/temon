import type { Metadata, ResolvingMetadata } from "next"
import { notFound, redirect } from "next/navigation"
import { TestIntro } from "@/components/test-intro"
import { JsonLd } from "@/components/json-ld"
import { generateQuizSchemas, generateUniqueTestMetadata } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { TestExpandedIntro } from "@/components/test-expanded-intro"
import { TestQualitySignals } from "@/components/test-quality-signals"
import {
  AutoGscLandingBoost,
  hasAutoGscLandingBoost,
} from "@/components/gsc-auto-landing-boost"
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

  const testCategory = test.category || "성격";
  const keywordSet = [
    test.title,
    `${test.title} 무료 테스트`,
    `${testCategory} 테스트`,
    "무료 성격 테스트",
    "MBTI 테스트",
    "심리테스트",
    "테스트 사이트",
    "테몬",
  ];

  return generateUniqueTestMetadata({
    testName: test.title,
    testCategory,
    testDescription: test.description || "",
    keywords: keywordSet.join(", "),
    canonical: `/tests/${test.slug}`,
  })
}

export default async function DynamicTestPage({ params }: Props) {
  const test = await getTest(params.testId)

  if (!test) {
    notFound()
  }

  if (params.testId !== test.slug) {
    redirect(`/tests/${test.slug}`)
  }

  const fullDescription = test.description || ""
  const faqs = getTopicQuizFAQs(test.title)
  const testCategory = test.category || "성격";
  const keywordSet = [
    test.title,
    `${test.title} 무료 테스트`,
    `${testCategory} 테스트`,
    "무료 성격 테스트",
    "MBTI 테스트",
    "심리테스트",
    "테스트 사이트",
    "테몬",
  ];
  const schemas = generateQuizSchemas({
    quizId: test.slug,
    title: test.title,
    shortDescription: fullDescription.slice(0, 80),
    fullDescription,
    keywords: keywordSet.join(", "),
    canonical: `/tests/${test.slug}`,
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
        id={test.slug}
        title={test.title}
        description={fullDescription}
        questionCount={test.questionCount}
        avgMinutes={test.avgMinutes}
        resultCount={test.resultTypeCount}
        theme="purple"
      />
      <div className="mx-auto max-w-5xl px-4">
        <TestExpandedIntro testId={test.slug} title={test.title} />
        {hasAutoGscLandingBoost(test.slug) && (
          <AutoGscLandingBoost testId={test.slug} />
        )}
        <TestQualitySignals
          title={test.title}
          category={test.category}
          questionCount={test.questionCount}
          avgMinutes={test.avgMinutes}
          resultCount={test.resultTypeCount}
        />
      </div>
    </>
  )
}
