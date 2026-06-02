import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { GscLandingBoost } from "@/components/gsc-landing-boost"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Timer, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "아침 바쁠 때 대처 테스트로 시간관리형·즉흥 대처형 성향을 확인하세요."
// Full description for Google/AI
const fullDescription = "아침 바쁠 때 대처 테스트로 늦었을 때 빠르게 준비하는지, 우선순위를 정하는지, 즉흥적으로 대처하는지 확인하세요. 12문항으로 16가지 아침 시간관리 유형을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "morning-rush",
  title: "아침 바쁠 때 대처 테스트",
  shortDescription,
  fullDescription,
  keywords: "아침 바쁠 때 대처 테스트, 아침 시간관리 테스트, 지각 대처 테스트, 아침 루틴 테스트, 스트레스 대처 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/morning-rush",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("아침 바쁠 때 대처 테스트"),
]

const gscGuides = [
  {
    title: "아침 시간관리 테스트 검색",
    description:
      "늦잠, 준비 시간 부족, 급한 일정처럼 아침에 자주 생기는 상황에서의 대처 방식을 봅니다.",
  },
  {
    title: "계획형과 즉흥형 비교",
    description:
      "필수만 챙기는지, 루틴을 끝까지 지키는지, 계획 변경에 얼마나 유연한지 확인합니다.",
  },
  {
    title: "아침 루틴 개선 참고",
    description:
      "결과는 성격을 단정하지 않고 내 아침 루틴의 병목과 시간관리 기준을 이해하는 참고용입니다.",
  },
]

export default function MorningRushIntro() {
  const schemas = generateQuizSchemas({
    quizId: "morning-rush",
    title: "아침 바쁠 때 대처 테스트",
    shortDescription,
    fullDescription,
    keywords: "아침 바쁠 때 대처 테스트, 아침 시간관리 테스트, 지각 대처 테스트, 아침 루틴 테스트, 스트레스 대처 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/morning-rush",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="morning-rush-quiz-schema" data={schemas.quiz} />
      <JsonLd id="morning-rush-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="morning-rush-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-pink-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">⏰</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🏃
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              ⚡
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              💨
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🚀
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              ⏰ NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                아침 바쁠 때 대처로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 ⏰</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              아침에 늦었을 때, 준비할 시간이 부족할 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>9,061명 참여</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>3분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/morning-rush/test">
                  <span className="text-2xl mr-3">⏰</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 대처 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Timer className="h-6 w-6 text-red-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">1. 아침에 늦었을 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">빠르게 준비하고 나간다 vs 여유롭게 준비한다</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">2. 준비할 시간이 부족할 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">필수적인 것만 준비한다 vs 모든 것을 준비한다</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">3. 아침에 바쁠 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">계획을 세우고 체계적으로 한다 vs 즉흥적으로 대처한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">4. 아침에 스트레스를 받을 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">참고 견딘다 vs 휴식을 취한다</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <p className="font-medium">5. 아침에 시간이 부족할 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">효율적으로 처리한다 vs 여유롭게 처리한다</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">6. 아침에 바쁠 때 대처 방식</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">계획과 실행을 중시한다 vs 유연성과 적응을 중시한다</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">⏰ 16가지 대처 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 대처러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🌅", name: "즉흥형", type: "ENFP" },
                    { emoji: "😴", name: "여유형", type: "INFP" },
                    { emoji: "⏰", name: "시간관리형", type: "ENFJ" },
                    { emoji: "🧘", name: "명상형", type: "INFJ" },
                    { emoji: "📱", name: "혁신형", type: "ENTP" },
                    { emoji: "🎵", name: "분석형", type: "INTP" },
                    { emoji: "💪", name: "효율형", type: "ENTJ" },
                    { emoji: "🌙", name: "야행성형", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-slate-700 dark:text-slate-200">{character.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">12문항으로 대처 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">당신의 유형에 맞는 대처 추천 및 시간관리 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <GscLandingBoost
            title="아침 바쁠 때 대처 테스트로 보는 시간관리"
            summary="아침 바쁠 때 대처 테스트는 아침 시간관리 테스트, 지각 대처 테스트, 아침 루틴 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 준비 시간 부족, 우선순위 선택, 스트레스 반응을 바탕으로 16가지 아침 대처 스타일을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/morning-mood", label: "아침 기분 테스트" },
              { href: "/tests/morning-outfit", label: "아침 옷 고르기 테스트" },
              { href: "/tests/morning-alarm", label: "아침 알람 반응 테스트" },
            ]}
            tone="red"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Morning Rush Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Morning Rush Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="morning-rush" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="아침 바쁠 때 대처 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
