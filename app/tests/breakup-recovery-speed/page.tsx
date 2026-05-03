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

const shortDescription = "이별 회복 속도로 알아보는 나의 16가지 연애 회복 유형 테스트.";
const fullDescription = "이별 회복 속도 테스트로 알아보는 연애 회복 유형! 이별 직후 행동, 슬픔 처리 방식, 다음 관계 준비 속도 등 12개 질문으로 16가지 회복 캐릭터 중 당신의 유형을 알려드립니다. 무료, 약 3분.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "breakup-recovery-speed",
  title: "이별 회복 속도 테스트",
  shortDescription,
  fullDescription,
  keywords: "이별 회복, 연애 MBTI, 이별 후유증, 헤어짐 테스트, 성격 테스트, 무료 테스트",
  canonical: "/tests/breakup-recovery-speed",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("이별 회복 속도 테스트")];

export default function Intro() {
  const schemas = generateQuizSchemas({
    quizId: "breakup-recovery-speed",
    title: "이별 회복 속도 테스트",
    shortDescription,
    fullDescription,
    keywords: "이별 회복, 연애 MBTI, 이별 후유증, 헤어짐 테스트, 성격 테스트, 무료 테스트",
    canonical: "/tests/breakup-recovery-speed",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="breakup-recovery-speed-quiz-schema" data={schemas.quiz} />
      <JsonLd id="breakup-recovery-speed-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && <JsonLd id="breakup-recovery-speed-faq-schema" data={schemas.faq} />}

      <article className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-rose-50 to-pink-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  💔 이별 회복 속도 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  이별 후 회복 패턴으로 알아보는 16가지 연애 회복 유형
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-fuchsia-600">12문항</div>
                  <div className="text-sm text-muted-foreground">간단한 질문</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-rose-600">약 3분</div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-pink-600">16유형</div>
                  <div className="text-sm text-muted-foreground">회복 캐릭터</div>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:from-fuchsia-600 hover:to-rose-600 text-white text-lg px-8 py-6">
                  <Link href="/tests/breakup-recovery-speed/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="breakup-recovery-speed" />

          <div className="mt-12"><AnswerEngineSection quizTitle="Breakup Recovery Speed Test" /></div>
          <div className="mt-12"><LandingConversionSection quizTitle="Breakup Recovery Speed Test" /></div>
          <div className="mt-12"><RelatedTestsSection testId="breakup-recovery-speed" /></div>
          <section className="mt-12 mb-8">
            <FAQSection faqs={faqs} title="이별 회복 속도 테스트 자주 묻는 질문" />
          </section>
        </main>
      </article>
    </>
  );
}
