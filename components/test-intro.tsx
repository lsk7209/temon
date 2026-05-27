"use client";

import Link from "next/link";
import type React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { AnswerEngineSection } from "@/components/answer-engine-section";
import { ContentToc } from "@/components/content-toc";
import { FAQSection } from "@/components/faq-section";
import { JsonLd, createQuizSchema } from "@/components/json-ld";
import { RelatedTestsSection } from "@/components/related-tests-section";
import { Button } from "@/components/ui/button";
import {
  getIntroHighlights,
  getIntroLandingParagraphs,
  getIntroUseCases,
} from "@/lib/quiz-seo-utils";
import { getTopicQuizFAQs } from "@/lib/quiz-topic-copy";

interface TestIntroProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  avgMinutes?: number;
  resultCount?: number;
  participants?: number;
  theme?: "blue" | "red" | "purple" | "green" | "pink";
}

const themeMap = {
  blue: {
    accent: "from-blue-600 to-cyan-500",
    text: "text-blue-700",
    soft: "bg-blue-50 text-blue-800",
  },
  red: {
    accent: "from-rose-600 to-orange-500",
    text: "text-rose-700",
    soft: "bg-rose-50 text-rose-800",
  },
  purple: {
    accent: "from-violet-600 to-fuchsia-500",
    text: "text-violet-700",
    soft: "bg-violet-50 text-violet-800",
  },
  green: {
    accent: "from-emerald-600 to-teal-500",
    text: "text-emerald-700",
    soft: "bg-emerald-50 text-emerald-800",
  },
  pink: {
    accent: "from-pink-600 to-rose-500",
    text: "text-pink-700",
    soft: "bg-pink-50 text-pink-800",
  },
};

const tocItems = [
  { id: "test-start", label: "테스트 시작" },
  { id: "test-overview", label: "알 수 있는 것" },
  { id: "test-reason", label: "효과적인 이유" },
  { id: "test-recommend", label: "추천 대상" },
  { id: "test-guide", label: "테스트 안내" },
  { id: "test-faq", label: "자주 묻는 질문" },
];

export function TestIntro({
  id,
  title,
  description,
  questionCount,
  avgMinutes = 3,
  resultCount = 16,
  participants = 1234,
  theme = "blue",
}: TestIntroProps) {
  const currentTheme = themeMap[theme] || themeMap.blue;
  const faqs = getTopicQuizFAQs(title);
  const highlights = getIntroHighlights(title);
  const landingParagraphs = getIntroLandingParagraphs(title);
  const useCases = getIntroUseCases(title);
  const jsonLd = createQuizSchema({
    name: title,
    description,
    url: `https://temon.kr/tests/${id}`,
    questionCount,
    duration: `PT${avgMinutes}M`,
    image: `https://temon.kr/api/og?title=${encodeURIComponent(title)}`,
  });

  return (
    <div className="temon-flow min-h-screen bg-[#f6f7f9]">
      <JsonLd id="quiz-schema" data={jsonLd} />
      <article className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <Link href="/tests" className="font-bold text-slate-950">
            테몬 테스트
          </Link>
          <span className="text-sm font-semibold text-slate-500">
            {avgMinutes}분 소요
          </span>
        </header>

        <section
          id="test-start"
          className="grid gap-6 scroll-mt-24 py-4 lg:grid-cols-[minmax(0,1fr)_320px]"
        >
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p
              className={`mb-4 inline-flex rounded-full px-3 py-1 text-sm font-bold ${currentTheme.soft}`}
            >
              선택 패턴 테스트
            </p>
            <h1 className="break-keep text-3xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl break-keep text-lg leading-8 text-slate-700">
              {description}
            </p>
            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
              <IntroStat
                icon={<Users className="h-4 w-4" />}
                label={`${participants.toLocaleString()}명 참여`}
              />
              <IntroStat icon={<Clock className="h-4 w-4" />} label={`${avgMinutes}분`} />
              <IntroStat
                icon={<CheckCircle2 className="h-4 w-4" />}
                label={`${questionCount}문항`}
              />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className={`min-h-14 bg-gradient-to-r ${currentTheme.accent} text-base font-bold text-white hover:opacity-95`}
              >
                <Link href={`/tests/${id}/test`}>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  테스트 시작하기
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-14 bg-white">
                <Link href="#test-overview">
                  먼저 살펴보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              무료, 회원가입 없음, {resultCount}가지 유형 결과 제공.
            </p>
          </div>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:self-start">
            <p className="mb-3 text-sm font-bold text-slate-500">테스트 미리보기</p>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="break-keep text-lg font-bold leading-7 text-slate-950">
                같은 상황에서 나는 어떤 기준으로 선택할까?
              </p>
              <div className="mt-4 grid gap-2">
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  빠르게 결정한다
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  조금 더 비교한다
                </span>
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-4 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContentToc items={tocItems} />
          </aside>
          <main className="article-content space-y-6">
            <InfoSection
              id="test-overview"
              title="무엇을 알 수 있나요?"
              iconClass={currentTheme.text}
              items={highlights}
            />
            <section
              id="test-reason"
              className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-950">
                <Sparkles className={`h-5 w-5 ${currentTheme.text}`} />
                이 테스트가 효과적인 이유
              </h2>
              <div className="space-y-4">
                {landingParagraphs.map((paragraph) => (
                  <p key={paragraph} className="break-keep leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
            <InfoSection
              id="test-recommend"
              title="이런 분에게 추천합니다"
              iconClass={currentTheme.text}
              items={useCases}
            />
            <section id="test-guide" className="scroll-mt-24">
              <AnswerEngineSection quizTitle={title} />
            </section>
            <section id="test-faq" className="scroll-mt-24">
              <FAQSection faqs={faqs} className="max-w-none" />
            </section>
            <RelatedTestsSection testId={id} title="추천 테스트" />
          </main>
        </div>
      </article>
    </div>
  );
}

function IntroStat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex min-h-11 items-center gap-2 rounded-lg bg-slate-50 px-3">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function InfoSection({
  id,
  title,
  iconClass,
  items,
}: {
  id: string;
  title: string;
  iconClass: string;
  items: string[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-950">
        <Sparkles className={`h-5 w-5 ${iconClass}`} />
        {title}
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="rounded-lg bg-slate-50 p-4">
            <p className="break-keep text-sm leading-7 text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
