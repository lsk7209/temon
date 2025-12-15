"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { getHomePageTests, ALL_TESTS } from "@/lib/tests-config"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: TrendingUp,
    title: "정확한 분석",
    description: "심리학 기반 과학적 분석",
    color: "text-violet-500",
  },
  {
    icon: Users,
    title: "1.5만+ 참여",
    description: "많은 사람들이 선택한 테스트",
    color: "text-pink-500",
  },
  {
    icon: Sparkles,
    title: "완전 무료",
    description: "모든 테스트 무료 이용",
    color: "text-cyan-500",
  },
]

export default function HomeClient() {
  const displayTests = getHomePageTests()
  const hasMoreTests = ALL_TESTS.length > 9

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 px-6 py-2 text-lg">
            ✨ MZ세대 맞춤 성격 테스트
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            나를 찾는
            <br />
            재밌는 테스트 🎯
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
            커피, 라면, 반려동물... 일상 속 선택으로 알아보는 나의 진짜 성격! 💜
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/tests">테스트 시작하기 🚀</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-violet-500 text-violet-600 hover:bg-violet-50 text-lg px-8 py-6 rounded-full bg-transparent"
            >
              <Link href="/tests">전체 테스트 보기</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {features.map((feature) => {
              const FeatureIcon = feature.icon
              return (
                <div key={feature.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <FeatureIcon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
                  <div className="font-bold text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Tests */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              다들 이거 하던데요? 🔥
            </h2>
            <p className="text-xl text-gray-600">지금 가장 핫한 테스트들</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTests.map((test) => {
              const TestIcon = test.icon
              return (
                <Link key={test.href} href={test.href}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white/90 backdrop-blur-sm border-2 border-transparent hover:border-violet-500 overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${test.color} shadow-lg`}>
                          <TestIcon className="w-8 h-8 text-white" />
                        </div>
                        {test.badge && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 font-bold">
                            {test.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-violet-600 transition-colors">
                        {test.title}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-600">{test.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{test.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{test.participants}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white rounded-full"
                      >
                        시작하기 →
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>

          {hasMoreTests && (
            <div className="text-center mt-12">
              <Link href="/tests">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-violet-500 text-violet-600 hover:bg-violet-50 text-lg px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group"
                >
                  더 많은 테스트 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 rounded-3xl p-12 shadow-2xl text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">지금 바로 시작해보세요! 🎉</h2>
          <p className="text-xl mb-8 opacity-90">2분이면 끝! 나를 더 잘 알 수 있는 시간 ✨</p>
          <Button
            size="lg"
            className="bg-white text-violet-600 hover:bg-gray-100 text-lg px-12 py-6 rounded-full font-bold shadow-xl"
          >
            <Link href="/tests">무료로 시작하기 →</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

