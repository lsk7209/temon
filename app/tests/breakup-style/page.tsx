/**
 * 이별 후유증 유형 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "이별 후유증 유형 테스트 | 나의 이별 극복 스타일 분석",
    description:
        "이별 후 나의 행동과 감정 처리를 통해 알아보는 16가지 이별 후유증 유형 분석.",
    keywords: "이별, 연애, 후유증, 이별 극복, 성향 테스트, MBTI, 무료 테스트",
    alternates: {
        canonical: "/tests/breakup-style",
    },
    openGraph: {
        title: "이별 후유증 유형 테스트 | 나의 이별 극복 스타일 분석",
        description: "이별 후 나의 행동과 감정 처리를 통해 알아보는 16가지 이별 후유증 유형 분석.",
        type: "website",
        url: "https://www.temon.kr/tests/breakup-style",
    },
}

import { JsonLd, createQuizSchema } from "@/components/json-ld"

export default function BreakupStyleIntro() {
    const jsonLd = createQuizSchema({
        name: "이별 후유증 유형 테스트 | 나의 이별 극복 스타일 분석",
        description: "이별 후 나의 행동과 감정 처리를 통해 알아보는 16가지 이별 후유증 유형 분석.",
        url: "https://www.temon.kr/tests/breakup-style",
        questionCount: 12,
        duration: "PT3M",
        image: "https://www.temon.kr/images/tests/breakup-style/thumbnail.jpg",
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950">
            <JsonLd id="quiz-schema" data={jsonLd} />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            💔 이별 후유증 유형 테스트
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            이별 후 나는 어떤 모습일까? 나만의 이별 극복 스타일 알아보기
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                        <div className="space-y-6">
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    🎯 테스트 소개
                                </h2>
                                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                    <p>• 12개 질문으로 알아보는 나의 이별 대처법</p>
                                    <p>• 나는 쿨내 진동형일까, 미련 뚝뚝형일까?</p>
                                    <p>• 내 마음을 위로하고 정리하는 데 도움을 주는 테스트</p>
                                    <p>• 나의 현재 상태 진단과 맞춤형 극복 팁 제공</p>
                                </div>
                            </div>

                            <div className="border-t dark:border-gray-700 pt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="text-center">
                                        <div className="font-semibold text-rose-600 dark:text-rose-400">소요시간</div>
                                        <div>약 3분</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-rose-600 dark:text-rose-400">문항수</div>
                                        <div>12문항</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/tests/breakup-style/test">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-rose-600 hover:bg-rose-700 dark:bg-rose-700 dark:hover:bg-rose-800"
                        >
                            테스트 시작하기 🩹
                        </Button>
                    </Link>

                    <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                        <p>💡 솔직하게 답변할수록 더 정확한 위로와 조언을 얻을 수 있어요.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
