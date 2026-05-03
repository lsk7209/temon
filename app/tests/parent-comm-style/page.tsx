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
import { HandHeart } from "lucide-react";

const shortDescription = "부모와 소통 방식으로 알아보는 나의 16가지 가족 관계 유형 테스트.";
const fullDescription = "부모와 소통 방식 테스트로 알아보는 가족 관계 유형! 통화 빈도, 일상 공유, 의견 충돌 시 대처 방식 등 12개 질문으로 16가지 가족 캐릭터 중 당신의 유형을 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "parent-comm-style",
  title: "부모와 소통 방식 테스트",
  shortDescription,
  fullDescription,
  keywords: "부모 소통, 가족 관계 MBTI, 부모자식 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/parent-comm-style",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("부모와 소통 방식 테스트")];

export default function Intro() {
  const schemas = generateQuizSchemas({
    quizId: "parent-comm-style",
    title: "부모와 소통 방식 테스트",
    shortDescription,
    fullDescription,
    keywords: "부모 소통, 가족 관계 MBTI, 부모자식 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/parent-comm-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="parent-comm-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="parent-comm-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="parent-comm-style-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <HandHeart className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                  👨‍👩‍👧 부모와 소통 방식 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  부모님과 소통 방식으로 알아보는 16가지 가족 관계 유형
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-rose-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-pink-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-orange-600">16유형</div>
                  <div className="text-sm text-muted-foreground">가족 캐릭터</div>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg px-8 py-6">
                  <Link href="/tests/parent-comm-style/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="parent-comm-style" />

          <div className="mt-12"><AnswerEngineSection quizTitle="Parent Communication Style Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Parent Communication Style Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="parent-comm-style" /></div>
          <section className="mt-12 mb-8">
            <FAQSection faqs={faqs} title="부모와 소통 방식 테스트 자주 묻는 질문" />
          </section>
        </main>
      </article>
    </>
  );
}
