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
import { Heart } from "lucide-react";

const shortDescription =
  "첫 데이트의 긴장과 설렘을 다루는 방식 12문항으로 진단. 약 3분.";
const fullDescription =
  "첫 데이트 긴장 테스트로 알아보는 연애 유형! 약속 도착·첫 마디·대화 끊겼을 때 등 첫 만남의 미세한 선택을 분석해 16유형 중 당신의 데이트 캐릭터를 알려드립니다. 약 3분, 무료.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "first-date-nerves",
  title: "첫 데이트 긴장 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "첫 데이트, 데이트 긴장, 연애 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/first-date-nerves",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("첫 데이트 긴장 테스트")];

export default function FirstDateNervesIntro() {
  const schemas = generateQuizSchemas({
    quizId: "first-date-nerves",
    title: "첫 데이트 긴장 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "첫 데이트, 데이트 긴장, 연애 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/first-date-nerves",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="first-date-nerves-quiz-schema" data={schemas.quiz} />
      <JsonLd id="first-date-nerves-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="first-date-nerves-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  💗 첫 데이트 긴장 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  첫 만남의 긴장 관리·표현 방식으로 알아보는 16유형
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-pink-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-rose-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-600">16유형</div>
                  <div className="text-sm text-muted-foreground">데이트 캐릭터</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/first-date-nerves/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="first-date-nerves" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="First Date Nerves Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="First Date Nerves Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="first-date-nerves" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="첫 데이트 긴장 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
