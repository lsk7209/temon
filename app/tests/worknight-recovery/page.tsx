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
import { Moon } from "lucide-react";

const shortDescription =
  "퇴근 후 회복 방식으로 알아보는 내 저녁 성격 유형. 12문항, 약 3분.";
const fullDescription =
  "퇴근 후 회복 방식 테스트로 알아보는 저녁 유형! 집에 오자마자 하는 행동, 저녁 루틴, 스트레스 해소법 등 12개의 질문으로 16가지 유형 중 당신의 퇴근 후 캐릭터를 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "worknight-recovery",
  title: "퇴근 후 회복 방식 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "퇴근 후 회복, 저녁 루틴, 직장인 테스트, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/worknight-recovery",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("퇴근 후 회복 방식 테스트")];

export default function WorknightRecoveryIntro() {
  const schemas = generateQuizSchemas({
    quizId: "worknight-recovery",
    title: "퇴근 후 회복 방식 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "퇴근 후 회복, 저녁 루틴, 직장인 테스트, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/worknight-recovery",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="worknight-recovery-quiz-schema" data={schemas.quiz} />
      <JsonLd id="worknight-recovery-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="worknight-recovery-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <Moon className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  🌙 퇴근 후 회복 방식 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  저녁 시간이 드러내는 나만의 회복 유형
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-indigo-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-violet-600">16유형</div>
                  <div className="text-sm text-muted-foreground">저녁 캐릭터</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/worknight-recovery/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="worknight-recovery" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="Worknight Recovery Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="Worknight Recovery Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="worknight-recovery" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="퇴근 후 회복 방식 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
