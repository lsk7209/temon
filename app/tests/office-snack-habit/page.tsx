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
import { Coffee } from "lucide-react";

const shortDescription =
  "사무실 간식 습관으로 알아보는 나의 직장 성격 유형. 12문항, 약 3분.";
const fullDescription =
  "사무실 간식 습관 테스트로 알아보는 직장 유형! 간식을 혼자 먹는지 나눠 먹는지, 정해진 시간에 먹는지 즉흥적인지 등 12개 질문으로 당신의 직장 성격 캐릭터를 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "office-snack-habit",
  title: "사무실 간식 습관 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "사무실 간식, 직장인 테스트, 간식 성격, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/office-snack-habit",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("사무실 간식 습관 테스트")];

export default function OfficeSnackHabitIntro() {
  const schemas = generateQuizSchemas({
    quizId: "office-snack-habit",
    title: "사무실 간식 습관 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "사무실 간식, 직장인 테스트, 간식 성격, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/office-snack-habit",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="office-snack-habit-quiz-schema" data={schemas.quiz} />
      <JsonLd id="office-snack-habit-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="office-snack-habit-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <Coffee className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  🍫 사무실 간식 습관 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  간식 습관이 드러내는 나의 직장 성격 유형
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-amber-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-orange-600">16유형</div>
                  <div className="text-sm text-muted-foreground">직장 캐릭터</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/office-snack-habit/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="office-snack-habit" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="Office Snack Habit Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="Office Snack Habit Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="office-snack-habit" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="사무실 간식 습관 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
