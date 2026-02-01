/**
 * 회의 빌런 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "회의 빌런 테스트 | 나의 회의 스타일 유형 분석",
    description:
        "회의 시간, 당신의 역할과 행동 패턴으로 알아보는 16가지 회의 빌런 유형 분석.",
    keywords: "회의, 직장인, 회의 스타일, 빌런, 성향 테스트, MBTI, 무료 테스트",
    alternates: {
        canonical: "/tests/meeting-villain",
    },
    openGraph: {
        title: "회의 빌런 테스트 | 나의 회의 스타일 유형 분석",
        description: "회의 시간, 당신의 역할과 행동 패턴으로 알아보는 16가지 회의 빌런 유형 분석.",
        type: "website",
        url: "https://www.temon.kr/tests/meeting-villain",
    },
}

import { JsonLd, createQuizSchema } from "@/components/json-ld"

export default function MeetingVillainIntro() {
    const jsonLd = createQuizSchema({
        name: "회의 빌런 테스트 | 나의 회의 스타일 유형 분석",
        description: "회의 시간, 당신의 역할과 행동 패턴으로 알아보는 16가지 회의 빌런 유형 분석.",
        url: "https://www.temon.kr/tests/meeting-villain",
        questionCount: 12,
        duration: "PT3M",
        image: "https://www.temon.kr/images/tests/meeting-villain/thumbnail.jpg",
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800">
            <JsonLd id="quiz-schema" data={jsonLd} />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            😈 회의 빌런 테스트
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            나는 회의 때 어떤 사람일까? 나의 회의 스타일 전격 분석!
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                        <div className="space-y-6">
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    🎯 테스트 소개
                                </h2>
                                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                    <p>• 12개 질문으로 알아보는 나의 회의 스타일</p>
                                    <p>• 나는 팩트 폭격기일까, 평화주의자일까?</p>
                                    <p>• 직장 동료화 함께 해보면 더 재밌는 테스트</p>
                                    <p>• 나의 강점과 주의할 점, 찰떡 파트너 추천</p>
                                </div>
                            </div>

                            <div className="border-t dark:border-gray-700 pt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-600 dark:text-blue-400">소요시간</div>
                                        <div>약 3분</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-600 dark:text-blue-400">문항수</div>
                                        <div>12문항</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/tests/meeting-villain/test">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            테스트 시작하기 📝
                        </Button>
                    </Link>

                    <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                        <p>💡 너무 심각하게 받아들이지 마세요, 재미로 보는 테스트입니다!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
