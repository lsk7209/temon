import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { FAQSection } from "@/components/faq-section"
import { generateQuizMetadata, generateQuizSchemas, getDefaultQuizFAQs } from "@/lib/quiz-seo-utils"

// Naver-optimized description (under 80 chars)
const shortDescription = "반려동물 성향으로 알아보는 성격 테스트. 나에게 맞는 펫 찾기!"
// Full description for Google/AI
const fullDescription = "반려동물 MBTI 테스트로 나에게 맞는 펫을 찾아보세요! 당신의 라이프스타일에 딱 맞는 펫은 누구일까요? 16가지 찰떡 펫 추천 테스트로 나의 성격과 잘 맞는 반려동물을 알아보세요. 지금 바로 무료로 시작해보세요."

export const metadata: Metadata = generateQuizMetadata({
  quizId: "pet-mbti",
  title: "반려동물 MBTI",
  shortDescription,
  fullDescription,
  keywords: "반려동물 MBTI, 펫 테스트, 반려동물 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/pet-mbti",
  questionCount: 12,
  duration: "PT2M",
})

const faqs = [
  ...getDefaultQuizFAQs("반려동물 MBTI 테스트"),
  {
    question: "반려동물을 키우지 않아도 테스트할 수 있나요?",
    answer: "네, 가능합니다. 테스트는 반려동물 선호도를 통해 성격을 알아보는 것이므로, 현재 반려동물을 키우지 않으시더라도 일반적인 선호도를 바탕으로 답변하시면 됩니다.",
  },
  {
    question: "어떤 반려동물 유형들이 나오나요?",
    answer: "강아지, 고양이, 새, 물고기, 파충류 등 다양한 반려동물 유형이 포함되어 있습니다. 각 유형은 MBTI 16가지 성격 유형과 매칭되어 있어요.",
  },
]

export default function PetMBTIIntro() {
  const schemas = generateQuizSchemas({
    quizId: "pet-mbti",
    title: "반려동물 MBTI",
    shortDescription,
    fullDescription,
    keywords: "반려동물 MBTI, 펫 테스트",
    canonical: "/pet-mbti",
    questionCount: 12,
    duration: "PT2M",
    faqs,
  })

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="pet-mbti-quiz-schema" data={schemas.quiz} />
      <JsonLd id="pet-mbti-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="pet-mbti-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Paw Prints */}
        <div
          className="absolute top-20 left-10 text-pink-200 dark:text-pink-800 text-2xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🐾
        </div>
        <div
          className="absolute top-40 right-20 text-purple-200 dark:text-purple-800 text-xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🐾
        </div>
        <div
          className="absolute bottom-32 left-1/4 text-blue-200 dark:text-blue-800 text-lg animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🐾
        </div>
        <div
          className="absolute bottom-20 right-1/3 text-pink-200 dark:text-pink-800 text-xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🐾
        </div>

        {/* Floating Bubbles */}
        <div
          className="absolute top-1/4 left-1/3 w-4 h-4 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-6 h-6 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-pink-200 dark:bg-pink-800 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Hero Section */}
      <main className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* FAQ Section for AI Bot Optimization */}
        <section className="mt-20">
          <FAQSection faqs={faqs} title="반려동물 MBTI 테스트 자주 묻는 질문" />
        </section>
        <div className="text-center space-y-8">
          {/* Animated Pet Icons */}
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
              <div className="flex space-x-2 text-3xl">
                <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                  🐕
                </span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                  🐈
                </span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                  🦜
                </span>
              </div>
            </div>
            {/* Orbiting pets */}
            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              🐹
            </div>
            <div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce"
              style={{ animationDelay: "1.5s" }}
            >
              🐠
            </div>
            <div
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-2xl animate-bounce"
              style={{ animationDelay: "2s" }}
            >
              🦎
            </div>
            <div
              className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-2xl animate-bounce"
              style={{ animationDelay: "2.5s" }}
            >
              🐢
            </div>
          </div>

          <div className="space-y-6">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
              🐾 NEW 테스트
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                반려동물도
              </span>
              <br />
              <span className="text-foreground">MBTI가 있다면?</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              당신의 라이프스타일에 딱 맞는 펫은 누구일까요? 🐕🐈🦜🦎
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Coming Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>2분 소요</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>12문항</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/pet-mbti/test">
                  <span className="text-2xl mr-3 group-hover:animate-bounce">🐾</span>
                  테스트 시작하기
                </Link>
              </Button>

              <p className="text-sm text-center text-muted-foreground">무료 • 회원가입 불필요 • 16가지 찰떡 펫 추천</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-20 space-y-12">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                  <Heart className="h-6 w-6 text-pink-500" />
                  <span>이런 질문들이 나와요!</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">🌅 주말 아침, 이상적 모닝 루틴은?</p>
                      <p className="text-sm text-muted-foreground mt-1">공원 산책 vs 침대에서 뒹굴</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">🏠 집 안 풍경을 고른다면?</p>
                      <p className="text-sm text-muted-foreground mt-1">미니멀·정돈 vs 구석구석 데코·식물</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">💝 펫을 고를 때 가장 중요한 건?</p>
                      <p className="text-sm text-muted-foreground mt-1">건강·사육난이도 vs 교감·귀여움</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">✈️ 여행 계획 세울 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">날짜·코스 철저 vs 현지에서 즉흥 결정</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">😤 스트레스 해소법</p>
                      <p className="text-sm text-muted-foreground mt-1">운동·액티비티 vs 혼자 음악·독서</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">🎨 인테리어 소품을 살 때?</p>
                      <p className="text-sm text-muted-foreground mt-1">기능·내구성 체크 vs 색감·감성 우선</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pet Preview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">🎭 16가지 찰떡 펫 추천</h2>
                <p className="text-muted-foreground">당신은 어떤 펫과 잘 맞을까요?</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { emoji: "🐕", name: "모험 러버", desc: "활달한 중·대형견" },
                    { emoji: "🐈", name: "힐링 드리머", desc: "장모종 고양이" },
                    { emoji: "🐕‍🦺", name: "케어 캡틴", desc: "골든리트리버" },
                    { emoji: "😺", name: "사색 라운지", desc: "샴/러시안블루" },
                    { emoji: "🦜", name: "호기심 박사", desc: "앵무새/코뉴어" },
                    { emoji: "🐠", name: "관찰 학자", desc: "열대어/수생테라리움" },
                    { emoji: "🐕‍🦺", name: "리더십 챔프", desc: "복서/도베르만" },
                    { emoji: "🦎", name: "전략 마스터", desc: "레오파드게코" },
                  ].map((pet, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center hover:scale-105 transition-transform duration-200"
                    >
                      <div className="text-3xl mb-2">{pet.emoji}</div>
                      <div className="text-xs font-medium">{pet.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{pet.desc}</div>
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
                    <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold">정확한 매칭</h3>
                    <p className="text-sm text-muted-foreground">12가지 라이프스타일 질문으로 MBTI 4축 정확 분석</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="font-semibold">맞춤 가이드</h3>
                    <p className="text-sm text-muted-foreground">잘 맞는 이유와 주의사항, 케어 팁까지 제공</p>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
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
          <FAQSection faqs={faqs} title="반려동물 MBTI 테스트 자주 묻는 질문" />
        </section>
      </main>
    </article>
    </>
  )
}
