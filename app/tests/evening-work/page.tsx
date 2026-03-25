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
import { Clock, Users, Laptop, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "저녁에 업무를 처리하는 방식으로 알아보는 나의 성격 유형. 저녁에 업무를 해야 할 때, 저녁 업무를 마무리할 때 등 구체적인 상황으로 분석..."
// Full description for Google/AI
const fullDescription = "저녁에 업무를 처리하는 방식으로 알아보는 나의 성격 유형. 저녁에 업무를 해야 할 때, 저녁 업무를 마무리할 때 등 구체적인 상황으로 분석합니다."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "evening-work",
  title: "저녁 업무 처리 테스트",
  shortDescription,
  fullDescription,
  keywords: "저녁 업무, 업무 처리, 저녁 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/evening-work",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("저녁 업무 처리 테스트"),
]

export default function EveningWorkIntro() {
  const schemas = generateQuizSchemas({
    quizId: "evening-work",
    title: "저녁 업무 처리 테스트",
    shortDescription,
    fullDescription,
    keywords: "저녁 업무, 업무 처리, 저녁 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/evening-work",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="evening-work-quiz-schema" data={schemas.quiz} />
      <JsonLd id="evening-work-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="evening-work-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-gray-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-slate-200 to-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">💼</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              📊
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              📝
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎯
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              ⚡
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
              💼 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-slate-500 to-gray-500 bg-clip-text text-transparent">
                저녁 업무 처리로 보는
              </span>
              <br />
              <span className="text-foreground">나의 성격 유형 💼</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              저녁에 업무를 해야 할 때, 저녁 업무를 마무리할 때 등 구체적인 상황으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>15,320명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/evening-work/test">
                  <span className="text-2xl mr-3">💼</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 업무 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Laptop className="h-6 w-6 text-slate-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg">
                      <p className="font-medium">1. 저녁에 업무를 해야 할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">즉시 시작한다 vs 잠시 쉬고 시작한다</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                      <p className="font-medium">2. 저녁 업무를 마무리할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 시간에 끝낸다 vs 완료할 때까지 한다</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg">
                      <p className="font-medium">3. 저녁에 업무를 할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">정해진 순서대로 한다 vs 우선순위에 따라 한다</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                      <p className="font-medium">4. 저녁에 업무를 하는 환경</p>
                      <p className="text-sm text-muted-foreground mt-1">조용하고 집중할 수 있는 곳 vs 활기차고 사람들이 있는 곳</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-lg">
                      <p className="font-medium">5. 저녁에 업무를 하는 이유</p>
                      <p className="text-sm text-muted-foreground mt-1">목표와 계획을 위해 vs 기분과 컨디션을 위해</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
                      <p className="font-medium">6. 저녁 업무 후 기분</p>
                      <p className="text-sm text-muted-foreground mt-1">성취감을 느낀다 vs 피로감을 느낀다</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">💼 16가지 업무 스타일</h2>
                <p className="text-muted-foreground">당신은 어떤 업무러일까요?</p>

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
                      className="p-3 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 rounded-lg text-center"
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

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-gray-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12문항으로 업무 처리 습관을 4축으로 정량화해 유형화</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 팁</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 업무 스타일 및 효율성 팁 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center">
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
          <AnswerEngineSection quizTitle="Evening Work Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Evening Work Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="evening-work" title="Next Quizzes Search Visitors Usually Click" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="저녁 업무 처리 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
