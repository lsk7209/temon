/**
 * 호텔 조식 공략법 테스트 인트로 페이지
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "호텔 조식 공략법 테스트 | 나의 조식 뷔페 스타일 분석",
    description:
        "여행의 꽃 호텔 조식! 뷔페에서 음식을 담고 먹는 스타일로 알아보는 16가지 성향 분석.",
    keywords: "호텔 조식, 뷔페, 먹방, 여행 스타일, 음식 성향, MBTI, 무료 테스트",
    alternates: {
        canonical: "/tests/hotel-breakfast",
    },
    openGraph: {
        title: "호텔 조식 공략법 테스트 | 나의 조식 뷔페 스타일 분석",
        description: "여행의 꽃 호텔 조식! 뷔페에서 음식을 담고 먹는 스타일로 알아보는 16가지 성향 분석.",
        type: "website",
        url: "https://www.temon.kr/tests/hotel-breakfast",
    },
}

import { JsonLd, createQuizSchema } from "@/components/json-ld"

export default function HotelBreakfastIntro() {
    const jsonLd = createQuizSchema({
        name: "호텔 조식 공략법 테스트 | 나의 조식 뷔페 스타일 분석",
        description: "여행의 꽃 호텔 조식! 뷔페에서 음식을 담고 먹는 스타일로 알아보는 16가지 성향 분석.",
        url: "https://www.temon.kr/tests/hotel-breakfast",
        questionCount: 12,
        duration: "PT3M",
        image: "https://www.temon.kr/images/tests/hotel-breakfast/thumbnail.jpg",
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
            <JsonLd id="quiz-schema" data={jsonLd} />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            🥞 호텔 조식 공략법 테스트
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            조식 뷔페에서 당신의 접시는 어떤 모습인가요?
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                        <div className="space-y-6">
                            <div className="text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    🎯 테스트 소개
                                </h2>
                                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                    <p>• 12개 질문으로 알아보는 나의 뷔페 스타일</p>
                                    <p>• 나는 가성비 파이터일까, 우아한 미식가일까?</p>
                                    <p>• 여행지에서의 나의 모습을 재발견하는 시간</p>
                                    <p>• 나의 먹방 스타일과 찰떡 조식 메이트 추천</p>
                                </div>
                            </div>

                            <div className="border-t dark:border-gray-700 pt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="text-center">
                                        <div className="font-semibold text-orange-600 dark:text-orange-400">소요시간</div>
                                        <div>약 3분</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-orange-600 dark:text-orange-400">문항수</div>
                                        <div>12문항</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/tests/hotel-breakfast/test">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white dark:bg-orange-700 dark:hover:bg-orange-800"
                        >
                            테스트 시작하기 🍳
                        </Button>
                    </Link>

                    <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                        <p>💡 배고플 때 하면 더 맛있는 상상을 할 수 있어요!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
