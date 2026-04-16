
import type { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShareButtons } from "@/components/share-buttons"
import { getDb, isDbAvailable } from "@/lib/db/client"
import { tests, testResults, resultTypes } from "@/lib/db/schema"
import { eq, and, or } from "drizzle-orm"
import { ExternalLink, RefreshCw } from "lucide-react"

interface Props {
    params: { testId: string; resultId: string }
}

async function getResultData(slugOrId: string, resultId: string) {
    if (!isDbAvailable()) {
        return null
    }

    // 1. Get Test Info First (to resolve ID from Slug)
    const db = getDb()
    const test = await db.select()
        .from(tests)
        .where(or(eq(tests.id, slugOrId), eq(tests.slug, slugOrId)))
        .get()

    if (!test) return null

    // 2. Get Test Result
    const result = await db.select()
        .from(testResults)
        .where(and(eq(testResults.id, resultId), eq(testResults.testId, test.id)))
        .get()

    if (!result) return null

    // 3. Get Result Type Details
    const typeDetail = await db.select()
        .from(resultTypes)
        .where(and(eq(resultTypes.testId, test.id), eq(resultTypes.typeCode, result.resultType)))
        .get()

    return { test, result, typeDetail }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const data = await getResultData(params.testId, params.resultId)
    if (!data || !data.test || !data.typeDetail) return {}

    const title = `${data.test.title} 결과 - ${data.typeDetail.label}`
    const desc = data.typeDetail.summary || "나의 성격 유형을 확인해보세요!"

    return {
        title: `${title} | 테몬`,
        description: desc,
        openGraph: {
            title,
            description: desc,
            images: [`https://temon.kr/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(data.typeDetail.typeCode)}`],
        },
    }
}

export default async function ResultPage({ params }: Props) {
    const data = await getResultData(params.testId, params.resultId)

    if (!data || !data.test || !data.typeDetail) {
        notFound()
    }

    const { test, typeDetail } = data

    let traits: string[] = []
    try { traits = JSON.parse(typeDetail.traits as string) } catch (e) { }

    let tips: string[] = []
    try { tips = JSON.parse(typeDetail.tips as string) } catch (e) { }

    return (
        <article className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-20">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Result Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-500 mb-2">{test.title} 결과</h1>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 leading-tight mb-4">
                            {typeDetail.label}
                        </h2>
                        <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                            {typeDetail.typeCode}
                        </div>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            {typeDetail.summary}
                        </p>
                    </div>

                    {/* Traits Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">✨ 나의 특징</h3>
                        <ul className="space-y-3">
                            {traits.map((trait, i) => (
                                <li key={i} className="flex items-start text-gray-700">
                                    <span className="mr-2 text-indigo-500">✔</span>
                                    {trait}
                                </li>
                            ))}
                        </ul>

                        {tips.length > 0 && (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-6 mt-8 border-b pb-2">💡 꿀팁</h3>
                                <ul className="space-y-3">
                                    {tips.map((tip, i) => (
                                        <li key={i} className="flex items-start text-gray-700">
                                            <span className="mr-2 text-amber-500">★</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {/* Share Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-center">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">결과 공유하기</h3>
                        <ShareButtons
                            testId={params.testId}
                            testPath={test.id}
                            resultType={typeDetail.typeCode}
                            resultId={params.resultId}
                            title={`${test.title} 결과 - ${typeDetail.label}`}
                            description={typeDetail.summary || ""}
                        />
                    </div>

                    {/* Actions */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Link href={`/tests/${params.testId}`}>
                            <Button size="lg" variant="outline" className="w-full py-6 text-lg">
                                <RefreshCw className="mr-2 h-5 w-5" />
                                다시 테스트하기
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button size="lg" className="w-full py-6 text-lg bg-gray-900 hover:bg-gray-800">
                                다른 테스트 보러가기
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </article>
    )
}
