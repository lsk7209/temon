
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
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

            <article className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto">
                        {/* Header Section */}
                        <header className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{test.title}</h1>
                            <p className="text-xl text-gray-600 mb-8">{test.subtitle || test.description}</p>
                        </header>

                        {/* Main Content Section */}
                        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <div className="space-y-8">
                                <div className="text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 테스트 소개</h2>
                                    <div className="space-y-3 text-gray-600">
                                        <p>• {test.title}로 알아보는 나의 성격</p>
                                        <p>• {test.resultTypeCount}가지 유형 중 당신의 유형은?</p>
                                        <p>• 재미로 보는 AI 심리테스트</p>
                                        <p>• 친구들과 결과를 공유해보세요!</p>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                        <div className="text-center">
                                            <div className="font-semibold text-indigo-600">소요시간</div>
                                            <div>약 {test.avgMinutes}분</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-indigo-600">문항수</div>
                                            <div>{test.questionCount}문항</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Link href={`/tests/${params.testId}/test`}>
                            <Button
                                size="lg"
                                className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                테스트 시작하기 🚀
                            </Button>
                        </Link>

                        {/* CTA Section */}
                        <section className="text-center mb-8 mt-12">
                            <Link href={`/tests/${params.testId}/test`}>
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                                >
                                    테스트 시작하기 🚀
                                </Button>
                            </Link>
                            <div className="mt-8 text-sm text-gray-500">
                                <p>💡 정확한 결과를 위해 솔직하게 답변해주세요!</p>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section className="mt-12">
                            <FAQSection faqs={faqs} title={`${test.title} 자주 묻는 질문`} />
                        </section>
                    </div>
                </div>
            </article>
        </>
    )
}
