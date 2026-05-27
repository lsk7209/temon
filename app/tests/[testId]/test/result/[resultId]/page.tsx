import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq, or } from "drizzle-orm";
import { JsonLd, createBreadcrumbSchema, createFAQSchema } from "@/components/json-ld";
import { RedesignedResultPage } from "@/components/redesign/redesigned-result-page";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { resultTypes, testResults, tests } from "@/lib/db/schema";
import {
  buildCompareSignals,
  buildInterpretation,
  buildKeywords,
  buildResultUseCases,
  normalizeTextList,
  type ResultViewModel,
} from "@/lib/result-redesign";
import { getTopicResultFAQs } from "@/lib/quiz-topic-copy";

export const dynamic = "force-dynamic";

interface Props {
  params: { testId: string; resultId: string };
}

const BASE_URL = "https://temon.kr";

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

  return typeDetail ? { test, result, typeDetail } : null;
}

function buildFallbackTraits(resultName: string, quizTitle: string): string[] {
  return [
    `${resultName} 유형은 ${quizTitle}에서 반복적으로 드러난 선택 패턴을 요약한 결과입니다.`,
    "상황이 달라져도 비슷한 기준으로 판단하는 경향이 있습니다.",
    "결과는 고정된 성격이 아니라 현재 선택 감각을 읽는 참고 자료로 보는 것이 좋습니다.",
  ];
}

function toViewModel(
  data: NonNullable<Awaited<ReturnType<typeof getResultData>>>,
  params: Props["params"],
): ResultViewModel {
  const { test, result, typeDetail } = data;
  const traits = normalizeTextList(typeDetail.traits);
  const tips = normalizeTextList(typeDetail.tips);
  const matchTypes = normalizeTextList(typeDetail.matchTypes);
  const visibleTraits =
    traits.length > 0 ? traits : buildFallbackTraits(typeDetail.label, test.title);
  const summary =
    typeDetail.summary ||
    `${typeDetail.label} 유형은 ${test.title}에서 가장 강하게 드러난 선택 패턴입니다.`;

  return {
    testId: params.testId,
    testTitle: test.title,
    testPath: `/tests/${params.testId}/test`,
    resultName: typeDetail.label,
    resultCode: typeDetail.typeCode,
    summary,
    traits: visibleTraits,
    interpretation: buildInterpretation(typeDetail.label, visibleTraits),
    actionTips:
      tips.length > 0
        ? tips
        : [
            "최근 선택에서 같은 기준이 반복되는지 떠올려 보세요.",
            "친구와 결과를 공유하고 서로 다른 선택 기준을 비교해 보세요.",
            "비슷한 테스트를 이어서 하면 반복되는 패턴을 더 쉽게 확인할 수 있습니다.",
          ],
    compareSignals: buildCompareSignals(typeDetail.label, matchTypes),
    useCases: buildResultUseCases(typeDetail.label),
    faqItems: getTopicResultFAQs(test.title, typeDetail.label),
    keywords: buildKeywords(visibleTraits, typeDetail.typeCode),
    share: {
      testId: params.testId,
      testPath: `/tests/${params.testId}/test`,
      resultType: result.resultType,
      resultId: params.resultId,
      title: `${test.title} 결과 - ${typeDetail.label}`,
      description: summary,
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getResultData(params.testId, params.resultId);
  if (!data) return {};

  const title = `${data.test.title} 결과 - ${data.typeDetail.label}`;
  const description =
    data.typeDetail.summary ||
    `${data.typeDetail.label} 유형의 핵심 특징과 활용 가이드를 확인해 보세요.`;

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
  if (!data) notFound();

  const viewModel = toViewModel(data, params);
  const resultUrl = `${BASE_URL}/tests/${params.testId}/test/result/${params.resultId}`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: BASE_URL },
    { name: "테스트", url: `${BASE_URL}/tests` },
    { name: data.test.title, url: `${BASE_URL}/tests/${params.testId}` },
    { name: `${data.typeDetail.label} 결과`, url: resultUrl },
  ]);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.test.title} 결과 - ${data.typeDetail.label}`,
    description: viewModel.summary,
    url: resultUrl,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "테몬",
      url: BASE_URL,
    },
    mainEntityOfPage: resultUrl,
  };

  return (
    <>
      <JsonLd id="result-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="result-article-schema" data={articleSchema} />
      <JsonLd id="result-faq-schema" data={createFAQSchema(viewModel.faqItems)} />
      <RedesignedResultPage data={viewModel} />
    </>
  );
}
