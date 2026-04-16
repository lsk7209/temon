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
import { Clock, Users, Droplets, Sparkles } from "lucide-react"

// Naver-optimized description (under 80 chars)
const shortDescription = "화장실 사용 패턴, 정리 습관으로 16유형 성향을 분석합니다. 화장실 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."
// Full description for Google/AI
const fullDescription = "화장실 사용 패턴, 정리 습관으로 16유형 성향을 분석합니다. 화장실 한 번에 내 성격이. 12문항, 결과 공유 이미지 자동 생성."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "bathroom-habit",
  title: "화장실 사용 습관 테스트",
  shortDescription,
  fullDescription,
  keywords: "화장실 테스트, 화장실 습관, 사용 패턴, 성향 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/bathroom-habit",
  questionCount: 12,
  duration: "PT3M",
})

const faqs = [
  ...getTopicQuizFAQs("화장실 사용 습관 테스트"),
]

export default function BathroomHabitIntro() {
  const schemas = generateQuizSchemas({
    quizId: "bathroom-habit",
    title: "화장실 사용 습관 테스트",
    shortDescription,
    fullDescription,
    keywords: "화장실 테스트, 화장실 습관, 사용 패턴, 성향 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/bathroom-habit",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="bathroom-habit-quiz-schema" data={schemas.quiz} />
      <JsonLd id="bathroom-habit-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="bathroom-habit-faq-schema" data={schemas.faq} />}

      <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">🚿</span>
            </div>
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              🧴
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              🧼
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              🪥
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🧻
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
              🚿 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                화장실 사용 습관으로 보는
              </span>
              <br />
              <span className="text-foreground">나의 선택 패턴 🚿</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              화장실 사용 패턴, 정리 습관으로 16유형 분석. 12문항, 약 3분 소요.
            </p>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>16,271명 참여</span>
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
                className="h-16 px-12 text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/tests/bathroom-habit/test">
                  <span className="text-2xl mr-3">🚿</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 화장실 습관 스타일 분석
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Droplets className="h-6 w-6 text-cyan-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">1. 화장실에서 핸드폰을 떨어뜨렸을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">당황해서 바로 확인 vs 침착하게 처리</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">2. 화장실 휴지가 다 떨어졌을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">당황해서 둘러보기 vs 침착하게 대안 찾기</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">3. 화장실 문이 잠겨있는데 급할 때</p>
                      <p className="text-sm text-muted-foreground mt-1">문 두드리기 vs 조용히 기다리기</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">4. 화장실에서 이상한 소리가 들릴 때</p>
                      <p className="text-sm text-muted-foreground mt-1">궁금해서 확인하기 vs 무시하고 나가기</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
                      <p className="font-medium">5. 화장실에서 옆 칸 사람이 이상한 소리를 낼 때</p>
                      <p className="text-sm text-muted-foreground mt-1">웃음 나오기 vs 무시하기</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">6. 화장실에서 핸드폰 알림이 울렸을 때</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 확인하기 vs 나중에 확인하기</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="mt-12">
          <AnswerEngineSection quizTitle="Bathroom Habit Test" />
        </div>

        <div className="mt-12">
          <LandingConversionSection quizTitle="Bathroom Habit Test" />
        </div>

        <div className="mt-12">
          <RelatedTestsSection testId="bathroom-habit" />
        </div>

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-12 mb-8">
          <FAQSection faqs={faqs} title="화장실 사용 습관 테스트 자주 묻는 질문" />
        </section>
</main>
    </div>
    </>
  )
}
