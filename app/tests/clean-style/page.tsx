import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { AnswerEngineSection } from "@/components/answer-engine-section"
import { LandingConversionSection } from "@/components/landing-conversion-section"
import { RelatedTestsSection } from "@/components/related-tests-section"
import { generateQuizMetadata, generateQuizSchemas } from "@/lib/quiz-seo-utils"
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Sparkles, Sparkles as SparklesIcon } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "청소할 때마다 다른 당신의 모습! 12문항으로 알아보는 방 청소 스타일 성격 테스트 🧼 방 청소할 때마다 드러나는 성격 유형을 알아보세요."
// Full description for Google/AI
const fullDescription = "청소할 때마다 다른 당신의 모습! 12문항으로 알아보는 방 청소 스타일 성격 테스트 🧼 방 청소할 때마다 드러나는 성격 유형을 알아보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "clean-style",
  title: "방청소 성격 테스트",
  shortDescription,
  fullDescription,
  keywords: "청소 테스트, 방정리 MBTI, 성격별 청소 스타일, 방 청소, 청소 습관, 정리, 청소 성격 테스트, 서울 원룸 정리, 이사 준비, 인테리어 청소, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/clean-style",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("방청소 성격 테스트"),
]

export default function CleanStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "clean-style",
    title: "방청소 성격 테스트",
    shortDescription,
    fullDescription,
    keywords: "청소 테스트, 방정리 MBTI, 성격별 청소 스타일, 방 청소, 청소 습관, 정리, 청소 성격 테스트, 서울 원룸 정리, 이사 준비, 인테리어 청소, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/clean-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="clean-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="clean-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="clean-style-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Cleaning Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🧹</span>
            </div>
            {/* Floating cleaning elements */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              ✨
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🧽
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🪣
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🧴
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🧹 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                방 청소할 때마다 드러나는
              </span>
              <br />
              <span className="text-foreground">성격 유형 🧽</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              당신은 정리 마스터? 아니면 청소 전 구경러?
              <br />
              청소 습관 속에 숨은 나의 성격을 알아보세요!
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>5,986명 참여</span>
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
                <Link href="/tests/clean-style/test">
                  <span className="text-2xl mr-3">🧹</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 청소 스타일 분석
              </p>
            </div>
          </div>
        </div>

        {/* Test Introduction */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-blue-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">1. 청소 시작 전 마음가짐은?</p>
                      <p className="text-sm text-muted-foreground mt-1">계획부터 세운다 vs 일단 손부터 움직인다</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">2. 책상 위 먼지를 보면?</p>
                      <p className="text-sm text-muted-foreground mt-1">당장 닦는다 vs '나중에 해야지' 하고 넘긴다</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                      <p className="font-medium">3. 청소할 때 음악은?</p>
                      <p className="text-sm text-muted-foreground mt-1">없으면 안 된다 vs 조용히 집중한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">4. 버릴까 말까 고민될 때</p>
                      <p className="text-sm text-muted-foreground mt-1">과감히 버림 vs 추억 생각나서 보관</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">5. 방 구조가 바뀌면?</p>
                      <p className="text-sm text-muted-foreground mt-1">새로 배치 시도! vs 원래대로가 편함</p>
                    </div>
                    <div className="p-4 bg-teal-50 dark:bg-teal-950 rounded-lg">
                      <p className="font-medium">6. 먼지 청소 중 예상보다 많을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">현실 직시 후 다시 계획 vs 그냥 대충 끝냄</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 16 Types Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🧹 16가지 청소 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 청소러일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎈", name: "감성 청소러", type: "ENFP" },
                    { emoji: "🤝", name: "배려 청소러", type: "ENFJ" },
                    { emoji: "🎯", name: "전략 청소러", type: "ENTJ" },
                    { emoji: "🧪", name: "실험 청소러", type: "ENTP" },
                    { emoji: "😊", name: "따뜻한 청소러", type: "ESFJ" },
                    { emoji: "📸", name: "감각 청소러", type: "ESFP" },
                    { emoji: "📋", name: "효율 청소러", type: "ESTJ" },
                    { emoji: "⚡", name: "스피드 청소러", type: "ESTP" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{character.emoji}</div>
                      <div className="text-xs font-medium">{character.name}</div>
                      <div className="text-xs text-muted-foreground">{character.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Features Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <SparklesIcon className="h-6 w-6 text-cyan-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 청소 루틴으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 추천</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 청소 방법, 도구 추천</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔗</span>
                    </div>
                    <h3 className="font-semibold">쉬운 공유</h3>
                    <p className="text-sm text-muted-foreground">결과를 친구들과 쉽게 공유하고 비교해보세요</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Clean Style Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Clean Style Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="clean-style" title="Next Quizzes Search Visitors Usually Click" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="방청소 성격 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
