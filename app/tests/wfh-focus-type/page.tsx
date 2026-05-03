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
import { Home } from "lucide-react";

const shortDescription =
  "재택근무 집중 유형으로 알아보는 나의 원격 업무 성격. 12문항, 약 3분.";
const fullDescription =
  "재택근무 집중 유형 테스트로 알아보는 원격 업무 스타일! 화상 회의 후 컨디션, 집중 공간, 업무 스케줄 관리 방식 등 12개 질문으로 당신의 재택근무 캐릭터를 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "wfh-focus-type",
  title: "재택근무 집중 유형 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "재택근무, 원격근무 테스트, WFH 성격, 직장인 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/wfh-focus-type",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("재택근무 집중 유형 테스트")];

export default function WfhFocusTypeIntro() {
  const schemas = generateQuizSchemas({
    quizId: "wfh-focus-type",
    title: "재택근무 집중 유형 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "재택근무, 원격근무 테스트, WFH 성격, 직장인 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/wfh-focus-type",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="wfh-focus-type-quiz-schema" data={schemas.quiz} />
      <JsonLd id="wfh-focus-type-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="wfh-focus-type-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Home className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  🏠 재택근무 집중 유형 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  원격 업무 방식이 드러내는 나의 집중 유형
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-teal-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-cyan-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">16유형</div>
                  <div className="text-sm text-muted-foreground">재택 캐릭터</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/wfh-focus-type/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="wfh-focus-type" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="WFH Focus Type Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="WFH Focus Type Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="wfh-focus-type" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="재택근무 집중 유형 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
