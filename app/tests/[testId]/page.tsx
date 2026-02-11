
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TestIntro } from "@/components/test-intro"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateUniqueTestMetadata, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"
import { ExternalLink } from "lucide-react"
import { getDb } from "@/lib/db/client"
import { tests } from "@/lib/db/schema"
import { eq, or } from "drizzle-orm"

interface Props {
    params: { testId: string }
}

// Fetch test data helper
async function getTest(slugOrId: string) {
    try {
        const db = getDb()
        const test = await db.select()
            .from(tests)
            .where(or(eq(tests.slug, slugOrId), eq(tests.id, slugOrId)))
            .limit(1)
            .get()
        return test
    } catch (e) {
        console.error("Failed to fetch test", e)
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
            title: "테스트를 찾을 수 없습니다",
        }
    }

    return generateUniqueTestMetadata({
        testName: test.title,
        testCategory: "심리테스트",
        testDescription: test.description || "",
        keywords: `${test.title}, 심리테스트, MBTI, 성격테스트`,
        canonical: `/tests/${params.testId}`,
    })
}

export default async function DynamicTestPage({ params }: Props) {
    const test = await getTest(params.testId)

    if (!test) {
        notFound()
    }

    const shortDescription = test.description?.slice(0, 100) || ""
    const fullDescription = test.description || ""
    const faqs = getDefaultQuizFAQs(test.title)

    const schemas = {
        quiz: {
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: test.title,
            description: fullDescription,
            hasPart: {
                "@type": "Question",
                name: "Personality Questions",
                suggestedAnswer: {
                    "@type": "Answer",
                    text: "Multiple Choice"
                }
            }
        },
        breadcrumb: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "홈",
                    item: "https://temon.kr",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "테스트",
                    item: "https://temon.kr/tests",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: test.title,
                    item: `https://temon.kr/tests/${params.testId}`,
                },
            ],
        }
    }

    return (
        <>
            <JsonLd id="quiz-schema" data={schemas.quiz} />
            <JsonLd id="breadcrumb-schema" data={schemas.breadcrumb} />

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
