import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Users, BookOpen, Sparkles, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "공부 MBTI 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "공부 MBTI 테스트로 알아보는 나만의 공부 스타일! 형광펜 덕후부터 올빵 벼락치기까지, 학습 DNA를 무료로 확인해보세요.",
  keywords: "공부 MBTI, 공부 테스트, 학습 스타일, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/study-mbti",
  },
  openGraph: {
    title: "공부 MBTI 테스트 - 무료 성격 테스트",
    description: "공부 MBTI 테스트로 알아보는 나만의 공부 스타일! 형광펜 덕후부터 올빵 벼락치기까지, 학습 DNA를 확인해보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/study-mbti",
  },
}

export default function StudyMBTIIntro() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "이 테스트가 성적 향상에 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "자신의 학습 스타일을 이해하는 것은 효율적인 공부의 첫걸음입니다. 본인에게 맞는 공부법을 찾아 적용하면 성적 향상에 도움이 될 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 공부 유형들이 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "형광펜 덕후, 벼락치기 장인, 계획표 신봉자 등 16가지의 재미있고 공감 가는 공부 유형으로 분석해드립니다."
        }
      },
      {
        "@type": "Question",
        "name": "테스트 결과는 정확한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MBTI 이론을 학습 상황에 적용하여 분석하므로 높은 공감도를 자랑합니다. 하지만 맹신하기보다는 참고용으로 활용해주세요."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
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
                  <Link href="/tests/study-mbti/test">
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

            {/* FAQ Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 dark:bg-gray-800/80 dark:border-gray-700">
              <CardContent className="p-8 text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">❓ 자주 묻는 질문</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>이 테스트가 성적 향상에 도움이 되나요?</AccordionTrigger>
                    <AccordionContent>
                      자신의 학습 스타일을 이해하는 것은 효율적인 공부의 첫걸음입니다.
                      본인에게 맞는 공부법과 환경을 찾아 적용하면 성적 향상에 긍정적인 영향을 줄 수 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>어떤 공부 유형들이 있나요?</AccordionTrigger>
                    <AccordionContent>
                      형광펜 덕후, 벼락치기 장인, 계획표 신봉자, 스터디 그룹 리더 등 16가지의 재미있고 공감 가는 공부 유형으로 분석해드립니다.
                      친구들과 서로의 유형을 비교해보세요.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>테스트 결과는 정확한가요?</AccordionTrigger>
                    <AccordionContent>
                      MBTI 이론을 학습 상황에 적용하여 분석하므로 높은 공감도를 자랑합니다.
                      하지만 개인마다 차이가 있을 수 있으니, 맹신하기보다는 참고용으로 활용해주세요.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Outlink */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">관련 정보</h3>
                  <a
                    href="https://ko.wikipedia.org/wiki/%ED%95%99%EC%8A%B5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400"
                  >
                    효과적인 학습 방법 알아보기 <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}
