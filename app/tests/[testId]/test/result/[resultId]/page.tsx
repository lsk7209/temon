import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, or } from "drizzle-orm";
import { ArrowRight, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { ContentToc } from "@/components/content-toc";
import { FAQSection } from "@/components/faq-section";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/components/json-ld";
import { RelatedTestsSection } from "@/components/related-tests-section";
import { ShareButtons } from "@/components/share-buttons";
import { Button } from "@/components/ui/button";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { resultTypes, testResults, tests } from "@/lib/db/schema";
import { getTopicResultFAQs, getTopicResultUseCases } from "@/lib/quiz-topic-copy";

export const dynamic = "force-dynamic";

interface Props {
  params: { testId: string; resultId: string };
}

const BASE_URL = "https://temon.kr";

const tocItems = [
  { id: "result-summary", label: "결과 요약" },
  { id: "result-traits", label: "핵심 특징" },
  { id: "result-action", label: "활용 가이드" },
  { id: "result-faq", label: "자주 묻는 질문" },
  { id: "result-related", label: "추천 테스트" },
];

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value !== "string" || value.trim().length === 0) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function buildFallbackTraits(resultName: string, quizTitle: string): string[] {
  return [
    `${resultName} 유형은 ${quizTitle}에서 반복적으로 드러난 선택 패턴을 요약한 결과입니다.`,
    "익숙한 상황에서는 빠르게 판단하지만, 낯선 상황에서는 기준을 다시 세우는 경향이 있습니다.",
    "결과를 고정된 성격표로 보기보다 현재 행동 습관을 점검하는 참고 자료로 쓰면 좋습니다.",
  ];
}

function buildFallbackTips(resultName: string): string[] {
  return [
    `${resultName} 결과에서 가장 자주 반복되는 행동 한 가지를 실제 일상과 비교해보세요.`,
    "친구와 결과를 공유한 뒤 서로 다른 선택 기준을 이야기하면 결과 해석이 더 선명해집니다.",
    "비슷한 주제의 테스트를 이어서 해보면 같은 성향이 반복되는지 확인할 수 있습니다.",
  ];
}

function buildResultSchema(config: {
  quizTitle: string;
  resultName: string;
  summary: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${config.quizTitle} 결과 - ${config.resultName}`,
    description: config.summary,
    url: config.url,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: BASE_URL,
    },
    mainEntityOfPage: config.url,
  };
}

async function getResultData(slugOrId: string, resultId: string) {
  if (!isDbAvailable()) return null;

  const db = getDb();
  const test = await db
    .select()
    .from(tests)
    .where(
      and(
        or(eq(tests.id, slugOrId), eq(tests.slug, slugOrId)),
        eq(tests.status, "published"),
      ),
    )
    .get();

  if (!test) return null;

  const result = await db
    .select()
    .from(testResults)
    .where(and(eq(testResults.id, resultId), eq(testResults.testId, test.id)))
    .get();

  if (!result) return null;

  const typeDetail = await db
    .select()
    .from(resultTypes)
    .where(
      and(
        eq(resultTypes.testId, test.id),
        eq(resultTypes.typeCode, result.resultType),
      ),
    )
    .get();

  return { test, result, typeDetail };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getResultData(params.testId, params.resultId);
  if (!data?.test || !data.typeDetail) return {};

  const title = `${data.test.title} 결과 - ${data.typeDetail.label}`;
  const description =
    data.typeDetail.summary ||
    `${data.typeDetail.label} 유형의 핵심 특징과 활용 가이드를 확인해보세요.`;

  return {
    title: `${title} | 테몬`,
    description,
    alternates: {
      canonical: `/tests/${params.testId}/test/result/${params.resultId}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/tests/${params.testId}/test/result/${params.resultId}`,
      siteName: "테몬",
      locale: "ko_KR",
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(data.typeDetail.typeCode)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const data = await getResultData(params.testId, params.resultId);

  if (!data?.test || !data.typeDetail) {
    notFound();
  }

  const { test, typeDetail } = data;
  const summary =
    typeDetail.summary ||
    `${typeDetail.label} 유형은 ${test.title}에서 가장 강하게 드러난 선택 패턴을 보여줍니다.`;
  const traits = parseStringArray(typeDetail.traits);
  const tips = parseStringArray(typeDetail.tips);
  const visibleTraits =
    traits.length > 0 ? traits : buildFallbackTraits(typeDetail.label, test.title);
  const visibleTips =
    tips.length > 0 ? tips : buildFallbackTips(typeDetail.label);
  const useCases = getTopicResultUseCases(test.title, typeDetail.label);
  const faqs = getTopicResultFAQs(test.title, typeDetail.label);
  const resultUrl = `${BASE_URL}/tests/${params.testId}/test/result/${params.resultId}`;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: BASE_URL },
    { name: "테스트", url: `${BASE_URL}/tests` },
    { name: test.title, url: `${BASE_URL}/tests/${params.testId}` },
    { name: `${typeDetail.label} 결과`, url: resultUrl },
  ]);
  const resultSchema = buildResultSchema({
    quizTitle: test.title,
    resultName: typeDetail.label,
    summary,
    url: resultUrl,
  });
  const faqSchema = createFAQSchema(faqs);

  return (
    <article className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pb-20">
      <JsonLd id="result-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="result-article-schema" data={resultSchema} />
      <JsonLd id="result-faq-schema" data={faqSchema} />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div id="result-summary" className="mb-8 scroll-mt-24 text-center">
            <p className="mb-2 text-lg font-bold text-gray-500">
              {test.title} 결과
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-indigo-700 md:text-5xl">
              {typeDetail.label}
            </h1>
            <div className="mb-6 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-800">
              {typeDetail.typeCode}
            </div>
            <p className="article-summary key-takeaways mx-auto max-w-2xl text-xl font-medium leading-relaxed text-gray-700">
              {summary}
            </p>
          </div>

          <ContentToc items={tocItems} className="mb-8" />

          <div
            id="result-traits"
            className="article-content scroll-mt-24 rounded-lg bg-white p-6 shadow-xl md:p-8"
          >
            <h2 className="mb-6 border-b pb-3 text-2xl font-bold text-gray-900">
              핵심 특징
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {visibleTraits.slice(0, 6).map((trait) => (
                <div
                  key={trait}
                  className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-4"
                >
                  <CheckCircle2
                    className="mb-3 h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-7 text-gray-700">{trait}</p>
                </div>
              ))}
            </div>

            <h2
              id="result-action"
              className="mt-10 scroll-mt-24 border-b pb-3 text-2xl font-bold text-gray-900"
            >
              활용 가이드
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-amber-100 bg-amber-50/70 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  바로 해볼 것
                </h3>
                <ul className="space-y-3">
                  {visibleTips.slice(0, 4).map((tip) => (
                    <li key={tip} className="flex gap-2 text-gray-700">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-600" />
                      <span className="leading-7">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-violet-100 bg-violet-50/70 p-5">
                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  결과를 읽는 기준
                </h3>
                <ul className="space-y-3">
                  {useCases.map((item) => (
                    <li key={item} className="flex gap-2 text-gray-700">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-violet-600" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="my-8 rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              결과 공유하기
            </h2>
            <ShareButtons
              testId={params.testId}
              testPath={`/tests/${params.testId}/test`}
              resultType={typeDetail.typeCode}
              resultId={params.resultId}
              title={`${test.title} 결과 - ${typeDetail.label}`}
              description={summary}
            />
          </div>

          <div id="result-faq" className="article-content scroll-mt-24">
            <FAQSection
              faqs={faqs}
              title="결과를 읽을 때 자주 묻는 질문"
              className="rounded-lg bg-white p-6 shadow-lg md:p-8"
            />
          </div>

          <div id="result-related" className="mt-8 scroll-mt-24">
            <RelatedTestsSection
              testId={params.testId}
              title="비슷한 주제의 테스트"
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Link href={`/tests/${params.testId}`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full py-6 text-lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                다시 테스트하기
              </Button>
            </Link>
            <Link href="/tests">
              <Button
                size="lg"
                className="w-full bg-gray-900 py-6 text-lg hover:bg-gray-800"
              >
                다른 테스트 보러가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
