import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "학습 습관으로 알아보는 성격 유형 테스트. 16가지 공부 MBTI 유형 발견!"
// Full description for Google/AI
const fullDescription = "공부 MBTI 테스트로 알아보는 나의 학습 DNA! 형광펜 덕후부터 올빵 벼락치기까지, 공부 습관에도 MBTI가 있다면? 5분 만에 내 학습 캐릭터를 확인하는 재미있는 테스트. 16가지 학습 스타일 중 당신은 어떤 유형일까요? 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "study-mbti",
  title: "공부 MBTI",
  shortDescription,
  fullDescription,
  keywords: "공부 MBTI, 학습 습관 테스트, 공부 스타일 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/study-mbti",
  questionCount: 12,
  duration: "PT5M",
})

const faqs = [
  ...getDefaultQuizFAQs("공부 MBTI 테스트"),
  {
    question: "공부를 잘하지 못해도 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 공부 습관과 스타일을 통해 성격을 알아보는 것이므로, 공부 성적과는 관계없이 솔직하게 답변하시면 됩니다.",
  },
  {
    question: "어떤 학습 스타일 유형들이 나오나요?",
    answer: "형광펜 덕후, 올빵 벼락치기, 계획형 학습자, 즉흥형 학습자 등 16가지 학습 캐릭터 유형이 있습니다. 각 유형은 MBTI 16가지 성격 유형과 매칭되어 있어요.",
  },
]

export default function StudyMBTIIntro() {
  const schemas = generateQuizSchemas({
    quizId: "study-mbti",
    title: "공부 MBTI",
    shortDescription,
    fullDescription,
    keywords: "공부 MBTI, 학습 습관 테스트",
    canonical: "/study-mbti",
    questionCount: 12,
    duration: "PT5M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="study-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="study-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="study-mbti-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        {/* Hero Section */}
        <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          {/* Animated Study Elements */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center">
              <span className="text-4xl animate-bounce">📚</span>
            </div>
            {/* Floating study items */}
            <div className="absolute -top-6 -left-6 text-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
              ✏️
            </div>
            <div className="absolute -top-4 -right-8 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
              📝
            </div>
            <div className="absolute -bottom-6 -left-8 text-lg animate-bounce" style={{ animationDelay: "1.5s" }}>
              📖
            </div>
            <div className="absolute -bottom-4 -right-6 text-lg animate-bounce" style={{ animationDelay: "2s" }}>
              🖍️
            </div>
          </div>

          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              📚 학습 DNA 분석
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                공부 습관에도
              </span>
              <br />
              <span className="text-foreground">MBTI가 있다면?</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              형광펜 덕후부터 올빵 벼락치기까지, 5분 만에 내 학습 DNA 확인하기
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>18,547명 참여</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>5분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/study-mbti/test">
                  <span className="text-2xl mr-3">✏️</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                무료 • 회원가입 불필요 • 16가지 학습 캐릭터로 분석
              </p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <BookOpen className="h-6 w-6 text-indigo-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">📍 강의 시작 5분 전, 내 자리?</p>
                      <p className="text-sm text-muted-foreground mt-1">맨 앞줄 예약 vs 중간 이후 조용존</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">📖 새 교재를 받으면?</p>
                      <p className="text-sm text-muted-foreground mt-1">목차·일정 먼저 vs 아무 페이지나 펼쳐봄</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">❓ 이해 안 가는 부분 발생!</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 질문·검색 vs 일단 넘어가고 나중에</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                      <p className="font-medium">📝 정리 노트 스타일</p>
                      <p className="text-sm text-muted-foreground mt-1">글머리·도형·컬러 완벽 vs 연상·그림·밈 활용</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">⏰ 시험 2주 전</p>
                      <p className="text-sm text-muted-foreground mt-1">데일리 스터디 플랜 vs 마감 압박받아야 달림</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">📱 공부 중 알림이 울리면?</p>
                      <p className="text-sm text-muted-foreground mt-1">즉시 '방해 금지' vs 잠깐 SNS 둘러보고 복귀</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Character Preview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🎭 16가지 학습 캐릭터</h2>
                <p className="text-muted-foreground">당신은 어떤 공부 스타일일까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🎨", name: "아이디어 폭주러", type: "ENFP" },
                    { emoji: "🎧", name: "감성 몰입러", type: "INFP" },
                    { emoji: "🗂️", name: "팀플 캡틴", type: "ENFJ" },
                    { emoji: "🧠", name: "통찰 정리러", type: "INFJ" },
                    { emoji: "💬", name: "토론 실험러", type: "ENTP" },
                    { emoji: "📑", name: "논리 설계러", type: "INTP" },
                    { emoji: "📅", name: "프로 플래너", type: "ENTJ" },
                    { emoji: "🗜️", name: "전략 솔버", type: "INTJ" },
                  ].map((character) => (
                    <div
                      key={character.type}
                      className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg text-center"
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

          {/* Features */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <span>특별한 기능</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 분석</h3>
                    <p className="text-sm text-muted-foreground">12가지 공부 습관으로 MBTI 4축을 정확하게 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 학습법</h3>
                    <p className="text-sm text-muted-foreground">당신의 유형에 맞는 효과적인 공부 방법 제안</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
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

        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-20 mb-12">
          <FAQSection faqs={faqs} title="공부 MBTI 테스트 자주 묻는 질문" />
        </section>
      </main>
    </article>
    </>
  )
}
