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
import { Zap } from "lucide-react";

const shortDescription =
  "회의·집중·동료 상호작용에서 에너지를 어떻게 쓰는지 12문항으로 진단. 약 3분.";
const fullDescription =
  "업무 에너지 테스트로 알아보는 직장 유형! 회의 직후 컨디션, 점심 시간 선택, 신규 프로젝트 자료 보는 방식 등 일터에서의 에너지 사용 패턴을 분석해 16유형 중 당신에게 가장 가까운 캐릭터를 알려드립니다. 약 3분, 무료.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "workday-energy",
  title: "업무 에너지 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "업무 에너지, 일터 MBTI, 직장인 테스트, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/workday-energy",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("업무 에너지 테스트")];

export default function WorkdayEnergyIntro() {
  const schemas = generateQuizSchemas({
    quizId: "workday-energy",
    title: "업무 에너지 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "업무 에너지, 일터 MBTI, 직장인 테스트, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/workday-energy",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="workday-energy-quiz-schema" data={schemas.quiz} />
      <JsonLd id="workday-energy-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="workday-energy-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Zap className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  💼 업무 에너지 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  일터에서의 에너지 사용 패턴으로 알아보는 16유형
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-amber-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-orange-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-rose-600">16유형</div>
                  <div className="text-sm text-muted-foreground">직장 캐릭터</div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/workday-energy/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="workday-energy" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="Workday Energy Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="Workday Energy Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="workday-energy" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="업무 에너지 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
