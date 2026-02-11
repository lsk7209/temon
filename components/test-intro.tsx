"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Droplets, Sparkles, CheckCircle2, PlayCircle } from "lucide-react"
import { JsonLd, createQuizSchema } from "@/components/json-ld"

interface TestIntroProps {
    id: string
    title: string
    description: string
    questionCount: number
    avgMinutes?: number // Default 3
    resultCount?: number // Default 16
    participants?: number // Fake number if needed
    theme?: 'blue' | 'red' | 'purple' | 'green' | 'pink'
}

export function TestIntro({
    id,
    title,
    description,
    questionCount,
    avgMinutes = 3,
    resultCount = 16,
    participants = 1234,
    theme = 'blue'
}: TestIntroProps) {
    // Theme configs
    const themes = {
        blue: {
            bg: "bg-[#F7FAFC]",
            accent: "from-blue-500 to-cyan-500",
            subAccent: "from-blue-200 to-cyan-300",
            text: "text-blue-500",
            badge: "bg-blue-100 text-blue-800",
            icon: "💧"
        },
        red: {
            bg: "bg-red-50",
            accent: "from-red-500 to-orange-500",
            subAccent: "from-red-200 to-orange-300",
            text: "text-red-500",
            badge: "bg-red-100 text-red-800",
            icon: "🔥"
        },
        purple: {
            bg: "bg-purple-50",
            accent: "from-purple-500 to-pink-500",
            subAccent: "from-purple-200 to-pink-300",
            text: "text-purple-500",
            badge: "bg-purple-100 text-purple-800",
            icon: "✨"
        },
        green: {
            bg: "bg-green-50",
            accent: "from-green-500 to-emerald-500",
            subAccent: "from-green-200 to-emerald-300",
            text: "text-green-500",
            badge: "bg-green-100 text-green-800",
            icon: "🌿"
        },
        pink: {
            bg: "bg-pink-50",
            accent: "from-pink-500 to-rose-500",
            subAccent: "from-pink-200 to-rose-300",
            text: "text-pink-500",
            badge: "bg-pink-100 text-pink-800",
            icon: "🌸"
        }
    }

    const t = themes[theme] || themes.blue

    const jsonLd = createQuizSchema({
        name: title,
        description: description,
        url: `https://www.temon.kr/tests/${id}`,
        questionCount: questionCount,
        duration: `PT${avgMinutes}M`,
        image: `https://www.temon.kr/images/tests/${id}/thumbnail.jpg` // Fallback
    })

    return (
        <div className={`min-h-screen ${t.bg}`}>
            <JsonLd id="quiz-schema" data={jsonLd} />
            <main className="container max-w-4xl mx-auto px-4 py-12">
                <div className="text-center space-y-10">
                    {/* Animated Icon Area */}
                    <div className="relative mx-auto w-32 h-32 mb-8 group cursor-pointer hover:scale-110 transition-transform">
                        <div className={`absolute inset-0 bg-gradient-to-br ${t.accent} rounded-full animate-pulse opacity-20`} />
                        <div className={`absolute inset-2 bg-gradient-to-br ${t.subAccent} rounded-full flex items-center justify-center shadow-lg`}>
                            <span className="text-5xl animate-bounce">{t.icon}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Badge variant="secondary" className={`${t.badge} px-4 py-1 text-sm rounded-full`}>
                            {t.icon} 인기 심리테스트
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                            <span className={`bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}>
                                {title}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>

                        <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>{participants.toLocaleString()}명 참여</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{avgMinutes}분 소요</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>{questionCount}문항</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <Button
                                size="lg"
                                className={`h-16 px-12 text-xl font-bold bg-gradient-to-r ${t.accent} hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-full`}
                                asChild
                            >
                                <Link href={`/tests/${id}/test`}>
                                    <span className="text-2xl mr-3">{t.icon}</span>
                                    테스트 시작하기
                                    <PlayCircle className="ml-2 h-6 w-6" />
                                </Link>
                            </Button>

                            <p className="text-sm text-center text-gray-500">
                                무료 • 회원가입 필요 없음 • {resultCount}가지 유형 분석
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 space-y-12">
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center space-y-8">
                                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2 text-gray-800">
                                    <Sparkles className={`h-6 w-6 ${t.text}`} />
                                    <span>무엇을 알 수 있나요?</span>
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
                                        <div className="text-2xl mb-3">🧐</div>
                                        <h3 className="font-bold text-lg mb-2">나의 성향 분석</h3>
                                        <p className="text-gray-500 text-sm">MBTI 기반으로 나의 성격과 행동 패턴을 정밀하게 분석합니다.</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
                                        <div className="text-2xl mb-3">🤝</div>
                                        <h3 className="font-bold text-lg mb-2">잘 맞는 친구</h3>
                                        <p className="text-gray-500 text-sm">나와 환상의 케미를 자랑하는 친구 유형을 찾아보세요.</p>
                                    </div>
                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-100 transition-colors">
                                        <div className="text-2xl mb-3">💌</div>
                                        <h3 className="font-bold text-lg mb-2">결과 공유</h3>
                                        <p className="text-gray-500 text-sm">재미있는 결과 이미지를 저장하고 인스타에 공유해보세요!</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
