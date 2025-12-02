import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Clock, Users, Sparkles, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "K-드라마 클리셰 테스트 - 무료 성격 테스트 | 테몬",
  description:
    "K-드라마 클리셰 테스트로 알아보는 나의 드라마 캐릭터! 재벌남/여부터 국밥 조연까지, 10개의 드라마 클리셰 상황에서 당신의 선택은? 무료로 시작해보세요.",
  keywords: "K-드라마, 드라마 테스트, 클리셰 테스트, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  alternates: {
    canonical: "/tests/kdrama-mbti",
  },
  openGraph: {
    title: "K-드라마 클리셰 테스트 - 무료 성격 테스트",
    description: "K-드라마 클리셰 테스트로 알아보는 나의 드라마 캐릭터! 재벌남/여부터 국밥 조연까지, 무료로 시작해보세요.",
    type: "website",
    url: "https://www.temon.kr/tests/kdrama-mbti",
  },
}

export default function KDramaMBTIIntro() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "K-드라마 클리셰 테스트란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "드라마에서 자주 등장하는 뻔하지만 재밌는 상황(클리셰)에서의 선택을 통해 당신의 성향을 분석하는 테스트입니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 결과가 나오나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "재벌 2세 본부장, 캔디형 여주인공, 서브 남주 등 드라마 속 대표적인 캐릭터 유형 중 당신과 가장 닮은 캐릭터를 알려줍니다."
        }
      },
      {
        "@type": "Question",
        "name": "테스트 결과는 정확한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MBTI 성격 유형 이론을 드라마 상황에 대입하여 분석하므로, 꽤 높은 정확도를 자랑합니다. 재미로 즐겨주세요!"
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950 dark:via-purple-950 dark:to-blue-950">
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-8">
            {/* Animated Drama Elements */}
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
                <span className="text-4xl animate-bounce">🎬</span>
              </div>
              {/* Floating drama elements */}
              <div className="absolute -top-6 -left-6 text-lg animate-bounce">
                🎭
              </div>
              <div className="absolute -top-4 -right-8 text-lg animate-bounce">
                💕
              </div>
              <div className="absolute -bottom-6 -left-8 text-lg animate-bounce">
                😂
              </div>
              <div className="absolute -bottom-4 -right-6 text-lg animate-bounce">
                😭
              </div>
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                🎬 테스트
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  K-드라마 클리셰 테스트
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                재벌남/여부터 국밥 조연까지!
                <br />
                10개의 드라마 클리셰 상황에서 당신의 선택은?
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
                  <span>10문항</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/tests/kdrama-mbti/test">
                    <span className="text-2xl mr-3">🎬</span>
                    테스트 시작하기
                  </Link>
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  무료 • 회원가입 불필요 • 16가지 드라마 캐릭터 분석
                </p>
              </div>
            </div>
          </div>

          {/* 전체 테스트 질문 */}
          <div className="mt-20">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold flex items-center justify-center space-x-2">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                    <span>전체 테스트 질문</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">1. 비 오는 날, 누군가 우산을 씌워줬다. 당신은?</p>
                      <p className="text-sm text-muted-foreground mt-1">심쿵하며 눈을 마주친다 vs 쿨하게 뿌리친다</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">2. 갑자기 첫사랑이 나타났다!</p>
                      <p className="text-sm text-muted-foreground mt-1">눈물 글썽이며 달려간다 vs 아무렇지 않게 인사한다</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">3. 길에서 부딪힌 낯선 사람. 드라마라면?</p>
                      <p className="text-sm text-muted-foreground mt-1">바로 사랑에 빠진다 vs 사과하고 지나간다</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">4. 위기 상황! 당신의 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">내가 직접 구하러 뛴다 vs 그냥 국밥 먹으러 간다</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">5. 대사 한마디로 승부 본다. 당신의 스타일은?</p>
                      <p className="text-sm text-muted-foreground mt-1">"내 마음 아직도 네 거야." vs "이러다 늦겠다, 먼저 간다."</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">6. 집안 배경은?</p>
                      <p className="text-sm text-muted-foreground mt-1">재벌가 대저택 vs 옥탑방 원룸</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">7. 연애 중 싸움이 났다!</p>
                      <p className="text-sm text-muted-foreground mt-1">울면서 매달린다 vs "그럼 헤어지자."</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="font-medium">8. 가장 닮은 드라마 장르는?</p>
                      <p className="text-sm text-muted-foreground mt-1">눈물 쏙 빼는 정통 멜로 vs 웃긴 상황극 같은 로코</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-medium">9. 누군가 고백했다!</p>
                      <p className="text-sm text-muted-foreground mt-1">"나도 좋아했어." vs "고마워, 근데 안 돼."</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                      <p className="font-medium">10. 엔딩씬, 당신의 선택은?</p>
                      <p className="text-sm text-muted-foreground mt-1">슬로모션 키스 vs 그냥 국밥 먹으며 크레딧 올라감</p>
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
                    <AccordionTrigger>K-드라마 클리셰 테스트란 무엇인가요?</AccordionTrigger>
                    <AccordionContent>
                      드라마에서 자주 등장하는 뻔하지만 재밌는 상황(클리셰)에서의 선택을 통해 당신의 성향을 분석하는 테스트입니다.
                      10가지 흥미진진한 상황이 준비되어 있습니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>어떤 결과가 나오나요?</AccordionTrigger>
                    <AccordionContent>
                      재벌 2세 본부장, 캔디형 여주인공, 서브 남주, 악녀 등 드라마 속 대표적인 캐릭터 유형 중
                      당신과 가장 닮은 캐릭터를 MBTI 기반으로 분석해 알려줍니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>테스트 결과는 정확한가요?</AccordionTrigger>
                    <AccordionContent>
                      MBTI 성격 유형 이론을 드라마 상황에 대입하여 분석하므로, 꽤 높은 정확도를 자랑합니다.
                      하지만 드라마는 드라마일 뿐! 재미로 즐겨주세요.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Outlink */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">관련 정보</h3>
                  <a
                    href="https://ko.wikipedia.org/wiki/%ED%95%9C%EA%B5%AD_%EB%93%9C%EB%9D%BC%EB%A7%88"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 hover:underline dark:text-purple-400"
                  >
                    한국 드라마의 역사와 특징 <ExternalLink className="ml-1 h-4 w-4" />
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
