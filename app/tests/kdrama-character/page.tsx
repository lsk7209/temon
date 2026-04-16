import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/faq-section";
import { AnswerEngineSection } from "@/components/answer-engine-section";
import { LandingConversionSection } from "@/components/landing-conversion-section";
import { RelatedTestsSection } from "@/components/related-tests-section";
import {
  generateQuizMetadata,
  generateQuizSchemas,
} from "@/lib/quiz-seo-utils";
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Clapperboard, Sparkles } from "lucide-react";
import Script from "next/script";

// Naver-optimized description (under 80 chars)
const shortDescription =
  "K-드라마 상황 12문항으로 성향을 분석해 16가지 캐릭터 유형으로 매칭합니다. 약 3분, 결과 공유 이미지 자동 생성.";
// Full description for Google/AI
const fullDescription =
  "K-드라마 상황 12문항으로 성향을 분석해 16가지 캐릭터 유형으로 매칭합니다. 약 3분, 결과 공유 이미지 자동 생성.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "kdrama-character",
  title: "K-드라마 인물 매칭 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "K드라마 테스트, 드라마 캐릭터 테스트, 인물 매칭, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
  canonical: "/tests/kdrama-character",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("K-드라마 인물 매칭 테스트")];

export default function KdramaCharacterIntro() {
  const schemas = generateQuizSchemas({
    quizId: "kdrama-character",
    title: "K-드라마 인물 매칭 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "K드라마 테스트, 드라마 캐릭터 테스트, 인물 매칭, 성격 테스트, MBTI, 심리테스트, 무료 테스트",
    canonical: "/tests/kdrama-character",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      {/* Structured Data for SEO/GEO */}
      <JsonLd id="kdrama-character-quiz-schema" data={schemas.quiz} />
      <JsonLd
        id="kdrama-character-breadcrumb-schema"
        data={schemas.breadcrumb}
      />
      {schemas.faq && (
        <JsonLd id="kdrama-character-faq-schema" data={schemas.faq} />
      )}

      <>
        {/* SEO, AEO, GEO 최적화를 위한 구조화 데이터 */}
        <Script
          id="quiz-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemas.quiz }}
        />
        {schemas.faq && (
          <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemas.faq }}
          />
        )}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemas.breadcrumb }}
        />

        <div className="min-h-screen bg-[#F7FAFC] dark:bg-gray-950">
          <main className="container max-w-[720px] mx-auto px-4 py-8">
            <div className="text-center space-y-8">
              {/* Animated Drama Elements */}
              <div className="relative mx-auto w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
                  <span className="text-4xl animate-bounce">🎬</span>
                </div>
                {/* Floating drama elements */}
                <div
                  className="absolute -top-6 -left-6 text-lg animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  🎭
                </div>
                <div
                  className="absolute -top-4 -right-8 text-lg animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  📺
                </div>
                <div
                  className="absolute -bottom-6 -left-8 text-lg animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                >
                  ✨
                </div>
                <div
                  className="absolute -bottom-4 -right-6 text-lg animate-bounce"
                  style={{ animationDelay: "2s" }}
                >
                  💫
                </div>
              </div>

              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                >
                  🎬 NEW 테스트
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    K-드라마 인물 매칭 테스트
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  드라마 속 상황 12문항으로 캐릭터 유형을 매칭합니다. 약 3분
                  소요.
                </p>

                {/* Stats */}
                <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>13,748명 참여</span>
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
                    className="h-16 px-12 text-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/tests/kdrama-character/test">
                      <span className="text-2xl mr-3">🎬</span>
                      테스트 시작하기
                    </Link>
                  </Button>

                  <p className="text-sm text-center text-muted-foreground">
                    무료 • 회원가입 불필요 • 16가지 캐릭터 유형 분석 • 결과 공유
                    이미지 자동 생성
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
                      <Clapperboard className="h-6 w-6 text-pink-500" />
                      <span>이런 질문들이 나와요!</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      <div className="space-y-4">
                        <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                          <p className="font-medium">
                            1. 새로운 직장에서 첫날, 당신의 모습은?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            먼저 다가가 인사하고 분위기를 이끈다 vs 조용히
                            파악하며 필요한 말만 한다
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <p className="font-medium">
                            2. 의문의 단서를 발견했다. 당신의 선택은?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            확실한 증거부터 모은다 vs 패턴을 추론해 큰 그림을
                            세운다
                          </p>
                        </div>
                        <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                          <p className="font-medium">
                            3. 친구가 잘못했다. 어떻게 말할까?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            사실과 논리로 차분히 설명한다 vs 감정을 먼저
                            공감하고 부탁한다
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <p className="font-medium">
                            4. 대형 프로젝트 기한이 다가온다. 스타일은?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            계획표대로 차근차근 마무리 vs 몰입될 때 집중해
                            끝내는 편
                          </p>
                        </div>
                        <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg">
                          <p className="font-medium">
                            5. 첫 만남에서 호감인 사람에게?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            가볍게 대화 주도하며 연락처 교환 vs 상대의 반응을
                            보며 기회를 기다림
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <p className="font-medium">
                            6. 사건 해결팀에 합류했다. 당신의 역할은?
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            현장 기록·체크리스트 담당 vs 가설 제시·전략 설계
                            담당
                          </p>
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
                    <h2 className="text-2xl font-bold">
                      🎬 16가지 캐릭터 유형
                    </h2>
                    <p className="text-muted-foreground">
                      당신은 어떤 드라마 캐릭터일까요?
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { emoji: "⚡", name: "직진 로맨티스트", type: "ENFP" },
                        { emoji: "🌙", name: "따뜻한 힐러", type: "INFP" },
                        { emoji: "🤝", name: "관계 조율자", type: "ENFJ" },
                        { emoji: "📖", name: "운명 설계자", type: "INFJ" },
                        { emoji: "💡", name: "규칙 파괴자", type: "ENTP" },
                        { emoji: "🔬", name: "논리 탐정", type: "INTP" },
                        { emoji: "🎯", name: "전략 지휘관", type: "ENTJ" },
                        { emoji: "📐", name: "냉철한 설계자", type: "INTJ" },
                      ].map((character) => (
                        <div
                          key={character.type}
                          className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 rounded-lg text-center"
                        >
                          <div className="text-2xl mb-1">{character.emoji}</div>
                          <div className="text-xs font-medium">
                            {character.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {character.type}
                          </div>
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
                      <Sparkles className="h-6 w-6 text-purple-500" />
                      <span>특별한 기능</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="font-semibold">정확한 매칭</h3>
                        <p className="text-sm text-muted-foreground">
                          12문항으로 드라마 속 선택을 4축으로 정량화해 유형화
                        </p>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-2xl">💡</span>
                        </div>
                        <h3 className="font-semibold">캐릭터 분석</h3>
                        <p className="text-sm text-muted-foreground">
                          당신의 유형에 맞는 추천 서사·장르, 케미 파트너 제공
                        </p>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🔗</span>
                        </div>
                        <h3 className="font-semibold">쉬운 공유</h3>
                        <p className="text-sm text-muted-foreground">
                          결과를 친구들과 쉽게 공유하고 비교해보세요
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <AnswerEngineSection quizTitle="Kdrama Character Test" />
            </div>

            <div className="mt-12">
              <LandingConversionSection quizTitle="Kdrama Character Test" />
            </div>

            <div className="mt-12">
              <RelatedTestsSection testId="kdrama-character" />
            </div>

            {/* FAQ Section for AI Bot Optimization */}
            <section className="mt-12 mb-8">
              <FAQSection
                faqs={faqs}
                title="K-드라마 인물 매칭 테스트 자주 묻는 질문"
              />
            </section>
          </main>
        </div>
      </>
    </>
  );
}
