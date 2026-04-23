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
import { Train } from "lucide-react";

const shortDescription =
  "출퇴근길 선택으로 알아보는 나의 성격 유형 테스트. 12문항, 3분이면 끝!";
const fullDescription =
  "출퇴근 스타일 테스트로 알아보는 나의 성격! 출근 대중교통·사무실 도착 루틴·퇴근 후 선택 등 일상 속 출퇴근 패턴을 분석해 16가지 유형 중 당신의 통근 캐릭터를 알려드립니다. 재미있는 출퇴근 스타일 테스트를 지금 바로 무료로 시작해보세요.";

export const metadata: Metadata = generateQuizMetadata({
  quizId: "commute-style",
  title: "출퇴근 스타일 테스트",
  shortDescription,
  fullDescription,
  keywords:
    "출퇴근 테스트, 통근 스타일, 직장인 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
  canonical: "/tests/commute-style",
  questionCount: 12,
  duration: "PT3M",
});

const faqs = [...getTopicQuizFAQs("출퇴근 스타일 테스트")];

export default function CommuteStyleIntro() {
  const schemas = generateQuizSchemas({
    quizId: "commute-style",
    title: "출퇴근 스타일 테스트",
    shortDescription,
    fullDescription,
    keywords:
      "출퇴근 테스트, 통근 스타일, 직장인 MBTI, 성격 테스트, 심리테스트, 무료 테스트",
    canonical: "/tests/commute-style",
    questionCount: 12,
    duration: "PT3M",
    faqs,
  });

  return (
    <>
      <JsonLd id="commute-style-quiz-schema" data={schemas.quiz} />
      <JsonLd id="commute-style-breadcrumb-schema" data={schemas.breadcrumb} />
      {schemas.faq && (
        <JsonLd id="commute-style-faq-schema" data={schemas.faq} />
      )}

      <article className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50">
        <main className="container max-w-4xl mx-auto px-4 py-16">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Train className="h-12 w-12 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  🚇 출퇴근 스타일 테스트
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  출퇴근길 선택으로 알아보는 16가지 통근 캐릭터
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 py-8">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-sky-600">12문항</div>
                  <div className="text-sm text-muted-foreground">
                    간단한 질문
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-indigo-600">
                    약 3분
                  </div>
                  <div className="text-sm text-muted-foreground">소요 시간</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-violet-600">
                    16유형
                  </div>
                  <div className="text-sm text-muted-foreground">
                    통근 캐릭터
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white text-lg px-8 py-6"
                >
                  <Link href="/tests/commute-style/test">테스트 시작하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <TestExpandedIntro testId="commute-style" />

          <div className="mt-12">
            <AnswerEngineSection quizTitle="Commute Style Test" />
          </div>

          <div className="mt-12">
            <LandingConversionSection quizTitle="Commute Style Test" />
          </div>

          <div className="mt-12">
            <RelatedTestsSection testId="commute-style" />
          </div>

          <section className="mt-12 mb-8">
            <FAQSection
              faqs={faqs}
              title="출퇴근 스타일 테스트 자주 묻는 질문"
            />
          </section>
        </main>
      </article>
    </>
  );
}
