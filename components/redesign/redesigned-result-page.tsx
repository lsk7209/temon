"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import { ContentToc } from "@/components/content-toc";
import { RelatedTestsSection } from "@/components/related-tests-section";
import { ShareButtons } from "@/components/share-buttons";
import { Button } from "@/components/ui/button";
import {
  type ResultViewModel,
  resultTocItems,
} from "@/lib/result-redesign";
import { ResultSummaryCards } from "./result-summary-cards";

interface RedesignedResultPageProps {
  data: ResultViewModel;
}

export function RedesignedResultPage({ data }: RedesignedResultPageProps) {
  return (
    <article className="temon-result min-h-screen bg-[#f6f7f9] pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
          <Link href="/tests" className="font-bold text-slate-950">
            테몬 테스트
          </Link>
          <Link
            href={data.testPath}
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700"
          >
            다시 하기
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        <section
          id="result-summary"
          className="grid gap-6 scroll-mt-24 py-4 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 text-sm font-bold text-violet-700">
              {data.testTitle} 결과
            </p>
            <div className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
              {data.resultCode}
            </div>
            <h1 className="break-keep text-3xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {data.resultName}
            </h1>
            <p className="article-summary key-takeaways mt-5 max-w-2xl break-keep text-lg leading-8 text-slate-700">
              {data.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
                >
                  #{keyword}
                </span>
              ))}
            </div>
            <p className="mt-5 flex gap-2 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              이 결과는 현재 선택 패턴을 해석한 참고 자료이며, 고정된
              성격이나 전문 진단을 의미하지 않습니다.
            </p>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-bold text-slate-500">
                공유용 요약
              </p>
              <h2 className="break-keep text-2xl font-extrabold text-slate-950">
                {data.resultName}
              </h2>
              <p className="mt-3 break-keep text-sm leading-6 text-slate-600">
                {data.summary}
              </p>
              <div className="mt-4">
                <ShareButtons {...data.share} />
              </div>
            </div>
          </aside>
        </section>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <ContentToc items={resultTocItems} />
          </aside>

          <main className="article-content space-y-6">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-950">
                결과 해석
              </h2>
              <div className="space-y-4">
                {data.interpretation.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="break-keep leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <ResultSummaryCards
              traits={data.traits}
              actionTips={data.actionTips}
              compareSignals={data.compareSignals}
            />

            {data.useCases.length > 0 && (
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 text-xl font-bold text-slate-950">
                  이 결과가 유용한 순간
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {data.useCases.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section
              id="result-faq"
              className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-950">
                자주 묻는 질문
              </h2>
              <div className="space-y-5">
                {data.faqItems.map((item) => (
                  <div key={item.question}>
                    <h3 className="font-bold text-slate-950">
                      {item.question}
                    </h3>
                    <p className="mt-2 break-keep leading-7 text-slate-700">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline" className="h-12 bg-white">
                <Link href={data.testPath}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  다시 테스트하기
                </Link>
              </Button>
              <Button asChild className="h-12 bg-slate-950 hover:bg-slate-800">
                <Link href="/tests">다른 테스트 보기</Link>
              </Button>
            </section>

            <section id="result-related" className="scroll-mt-24">
              <RelatedTestsSection
                testId={data.testId}
                title="비슷한 주제의 테스트"
              />
            </section>
          </main>
        </div>
      </div>
    </article>
  );
}
