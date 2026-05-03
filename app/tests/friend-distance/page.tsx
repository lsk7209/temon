import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/faq-section";
import { AnswerEngineSection } from "@/components/answer-engine-section";
import { LandingConversionSection } from "@/components/landing-conversion-section";
import { RelatedTestsSection } from "@/components/related-tests-section";
import { TestExpandedIntro } from "@/components/test-expanded-intro";
import {
  generateQuizMetadata,
  generateQuizSchemas,
} from "@/lib/quiz-seo-utils";
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const shortDescription =
  "친구 간 거리 조절 스타일로 알아보는 16가지 우정 유형 진단 테스트.";
const fullDescription =
  "친구 간 거리 조절 스타일 테스트로 알아보는 우정 유형! 단톡방 반응, 약속 잡는 방식, 친구 고민 들어주는 방식 등 12개 질문으로 16가지 친구 캐릭터 중 당신의 유형을 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "friend-distance",
  title: "친구 간 거리 조절 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "친구 거리, 우정 MBTI, 인간관계 테스트, 친구 유형, 성격 테스트, 무료 테스트",
  canonical: "/tests/friend-distance",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("친구 간 거리 조절 스타일 테스트")];

export default function FriendDistanceIntro() {
  const schemas = generateQuizSchemas({
    quizId: "friend-distance",
    title: "친구 간 거리 조절 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords: "친구 거리, 우정 MBTI, 인간관계 테스트, 무료 테스트",
    canonical: "/tests/friend-distance",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="friend-distance-quiz-schema" data={schemas.quiz} />
      <JsonLd id="friend-distance-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="friend-distance-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Users className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  👥 친구 간 거리 조절 스타일 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  나와 친구 사이의 거리감으로 알아보는 우정 유형
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-violet-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-pink-600">16유형</div>
                  <div className="text-sm text-muted-foreground">우정 캐릭터</div>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/friend-distance/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="friend-distance" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="Friend Distance Test" />
          </div>
          <div className="mt-12">
            <LandingConversionSection quizTitle="Friend Distance Test" />
          </div>
          <div className="mt-12">
            <RelatedTestsSection testId="friend-distance" />
          </div>
          <section className="mt-12 mb-8">
            <FAQSection faqs={faqs} title="친구 간 거리 조절 스타일 테스트 자주 묻는 질문" />
          </section>
        </main>
      </article>
    </>
  );
}
