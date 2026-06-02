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
import { Clock, Users, Bell, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "알림 대하는 방식 테스트로 즉시 확인형·무음형 스마트폰 성향을 확인하세요."
// Full description for Google/AI
const fullDescription = "알림 대하는 방식 테스트로 스마트폰 알림을 즉시 확인하는지, 모아보는지, 정리하는지 확인하세요. 12문항으로 16가지 디지털 알림 스타일을 무료로 제공합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "phone-notification",
  title: "알림 대하는 방식 테스트",
  shortDescription,
  fullDescription,
  keywords: "알림 대하는 방식 테스트, 스마트폰 알림 테스트, 알림 설정 테스트, 디지털 습관 테스트, 폰 알림, 성격 테스트, 무료 테스트",
  canonical: "/tests/phone-notification",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("알림 대하는 방식 테스트"),
]

const gscGuides = [
  {
    title: "스마트폰 알림 테스트 검색",
    description:
      "알림을 바로 확인하는지, 쌓아두는지, 무음으로 관리하는지 일상적인 스마트폰 습관을 봅니다.",
  },
  {
    title: "알림 설정 성향 확인",
    description:
      "중요 알림만 남기는 편인지, 모든 앱 알림을 켜두는 편인지 디지털 정리 기준을 확인합니다.",
  },
  {
    title: "디지털 웰빙 참고",
    description:
      "결과는 사용 습관을 비판하지 않고 집중, 효율, 소통 기준을 이해하는 참고용입니다.",
  },
]

export default function PhoneNotificationIntro() {
  const schemas = generateQuizSchemas({
    quizId: "phone-notification",
    title: "알림 대하는 방식 테스트",
    shortDescription,
    fullDescription,
    keywords: "알림 대하는 방식 테스트, 스마트폰 알림 테스트, 알림 설정 테스트, 디지털 습관 테스트, 폰 알림, 성격 테스트, 무료 테스트",
    canonical: "/tests/phone-notification",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="phone-notification-quiz-schema" data={schemas.quiz} />
      <JsonLd id="phone-notification-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="phone-notification-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🔔</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              📱
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              💬
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              ⚙️
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🔔 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                알림 대하는 방식으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 🔔</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              알림이 올 때, 알림이 너무 많을 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>5,319명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/phone-notification/test">
                  <span className="text-2xl mr-3">🔔</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 알림 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Bell className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">1. 알림이 올 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">즉시 확인한다 vs 나중에 확인한다</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">2. 알림이 너무 많을 때</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">알림을 정리한다 vs 그대로 둔다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. 알림을 확인하는 방식</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">혼자 조용히 확인한다 vs 사람들과 함께 확인한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">4. 알림을 확인하는 시간</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">정해진 시간에 확인한다 vs 그때그때 확인한다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">5. 알림을 확인하는 이유</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">목표와 효율을 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">6. 알림을 선택하는 기준</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">효율성과 목표를 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🔔 16가지 알림 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 알림러일까요?</p>

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
                      className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg text-center"
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
                  <Sparkles className="h-6 w-6 text-cyan-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">12문항으로 알림 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-200">당신의 유형에 맞는 알림 스타일 및 디지털 웰빙 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
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
            title="알림 대하는 방식 테스트로 보는 디지털 습관"
            summary="알림 대하는 방식 테스트는 스마트폰 알림 테스트, 알림 설정 테스트, 디지털 습관 테스트를 찾는 검색 의도에 맞춘 무료 성향 테스트입니다. 즉시 확인, 모아보기, 무음 설정, 알림 정리 기준을 바탕으로 16가지 알림 스타일을 보여줍니다."
            guides={gscGuides}
            relatedLinks={[
              { href: "/tests/phone-app-organization", label: "앱 정리 스타일 테스트" },
              { href: "/tests/phone-usage", label: "폰 사용 습관 테스트" },
              { href: "/tests/phone-storage", label: "폰 저장공간 정리 테스트" },
            ]}
            tone="blue"
          />
        </div>

        <div className="mt-12">
          <AnswerEngineSection quizTitle="Phone Notification Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Phone Notification Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="phone-notification" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="알림 대하는 방식 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
