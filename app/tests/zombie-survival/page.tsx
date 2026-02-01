/**
 * 좀비 아포칼립스 생존 유형 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "좀비 아포칼립스 생존 유형 테스트 | 좀비 사태 발생 시 나의 생존 확률은?",
    description:
        "갑자기 세상이 좀비로 뒤덮인다면? 나의 생존 전략과 역할로 알아보는 16가지 생존 유형.",
    keywords: "좀비, 아포칼립스, 생존 테스트, 생존 유형, 성향 테스트, MBTI, 무료 테스트",
    alternates: {
        canonical: "/tests/zombie-survival",
    },
    openGraph: {
        title: "좀비 아포칼립스 생존 유형 테스트 | 좀비 사태 발생 시 나의 생존 확률은?",
        description: "갑자기 세상이 좀비로 뒤덮인다면? 나의 생존 전략과 역할로 알아보는 16가지 생존 유형.",
        type: "website",
        url: "https://www.temon.kr/tests/zombie-survival",
    },
}

import { JsonLd, createQuizSchema } from "@/components/json-ld"

export default function ZombieSurvivalIntro() {
    const jsonLd = createQuizSchema({
        name: "좀비 아포칼립스 생존 유형 테스트 | 좀비 사태 발생 시 나의 생존 확률은?",
        description: "갑자기 세상이 좀비로 뒤덮인다면? 나의 생존 전략과 역할로 알아보는 16가지 생존 유형.",
        url: "https://www.temon.kr/tests/zombie-survival",
        questionCount: 12,
        duration: "PT3M",
        image: "https://www.temon.kr/images/tests/zombie-survival/thumbnail.jpg",
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 to-gray-900">
            <JsonLd id="quiz-schema" data={jsonLd} />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            🧟‍♂️ 좀비 아포칼립스 생존 유형
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            지금 당장 좀비가 나타난다면? 당신은 얼마나 살아남을 수 있을까요?
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-700">
                        <div className="space-y-6">
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    🎯 테스트 소개
                                </h2>
                                <div className="space-y-3 text-gray-300">
                                    <p>• 12개 질문으로 알아보는 나의 포스트 아포칼립스 생존법</p>
                                    <p>• 나는 좀비 헌터일까, 아니면 최초 감염자일까?</p>
                                    <p>• 극한 상황에서의 나의 본모습을 확인해보세요</p>
                                    <p>• 생존 확률을 높여줄 꿀팁과 아이템 추천</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                    <div className="text-center">
                                        <div className="font-semibold text-red-500">소요시간</div>
                                        <div>약 3분</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-red-500">문항수</div>
                                        <div>12문항</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/tests/zombie-survival/test">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white border-none"
                        >
                            생존 테스트 시작 🔫
                        </Button>
                    </Link>

                    <div className="mt-8 text-sm text-gray-500">
                        <p>💡 주의: 실제 좀비 사태 발생 시 도움이 안 될 수도 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
