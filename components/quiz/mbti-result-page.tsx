"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { JsonLd, createFAQSchema } from "@/components/json-ld";
import { RedesignedResultPage } from "@/components/redesign/redesigned-result-page";
import { useResolvedResultType } from "@/hooks/use-resolved-result-type";
import {
  buildCompareSignals,
  buildInterpretation,
  buildKeywords,
  buildResultUseCases,
  type ResultViewModel,
} from "@/lib/result-redesign";
import { getTopicResultFAQs } from "@/lib/quiz-topic-copy";

export interface MbtiResultRecord {
  mbti: string;
  name: string;
  summary: string;
  traits: string[];
  presets?: Record<string, string[]>;
  pitfalls?: string[];
  recommend?: string[];
}

interface MbtiResultPageProps {
  testId: string;
  quizTitle?: string;
  testPath: string;
  results: Record<string, MbtiResultRecord>;
  theme: {
    page: string;
    accent: string;
    spinner: string;
  };
}

function flattenPresetItems(result: MbtiResultRecord): string[] {
  if (!result.presets) return [];
  return Object.values(result.presets).flat().filter(Boolean);
}

function buildActionTips(result: MbtiResultRecord): string[] {
  const tips = (result.pitfalls || []).filter(
    (item) => !/^[A-Z]{2,5}$/.test(item.trim()),
  );
  if (tips.length > 0) return tips;

  return [
    `${result.name} 결과에서 가장 강하게 보이는 선택 기준을 최근 상황과 비교해 보세요.`,
    "친구와 결과를 공유하고 서로 다른 판단 기준을 이야기해 보면 해석이 쉬워집니다.",
    "비슷한 주제의 테스트를 이어서 해보면 반복되는 선택 패턴을 확인할 수 있습니다.",
  ];
}

function toViewModel(
  testId: string,
  quizTitle: string,
  testPath: string,
  result: MbtiResultRecord,
  resultId?: string | null,
): ResultViewModel {
  const faqItems = getTopicResultFAQs(quizTitle, result.name);
  const presetItems = flattenPresetItems(result);
  const traits = result.traits.length > 0 ? result.traits : presetItems;
  const safeTraits =
    traits.length > 0
      ? traits
      : [`${result.name} 유형은 선택 패턴을 비교하기 좋은 유형입니다.`];

  return {
    testId,
    testTitle: quizTitle,
    testPath,
    resultName: result.name,
    resultCode: result.mbti,
    summary: result.summary,
    traits: safeTraits,
    interpretation: buildInterpretation(result.name, safeTraits),
    actionTips: buildActionTips(result),
    compareSignals: buildCompareSignals(result.name, result.recommend),
    useCases: buildResultUseCases(result.name),
    faqItems,
    keywords: buildKeywords(safeTraits, result.mbti),
    share: {
      testId,
      testPath,
      resultType: result.mbti,
      resultId: resultId || undefined,
      title: `${quizTitle} 결과 - ${result.name}`,
      description: result.summary,
    },
  };
}

function LoadingState({ theme }: Pick<MbtiResultPageProps, "theme">) {
  return (
    <div className={`flex min-h-screen items-center justify-center ${theme.page}`}>
      <div className="text-center">
        <div
          className={`mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 ${theme.spinner}`}
        />
        <p className="text-slate-600">결과를 불러오는 중입니다.</p>
      </div>
    </div>
  );
}

function ResultPageContent({
  testId,
  quizTitle,
  testPath,
  results,
  theme,
}: MbtiResultPageProps) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const resultId = searchParams.get("id");
  const { resolvedType, loading } = useResolvedResultType(
    Object.keys(results),
    type,
    resultId,
  );
  const result = resolvedType ? results[resolvedType] : null;
  const resolvedQuizTitle = quizTitle || testId;

  if (loading) return <LoadingState theme={theme} />;

  if (!result) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme.page}`}>
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="mb-4 text-slate-600">결과를 찾을 수 없습니다.</p>
          <Button asChild>
            <Link href={testPath}>다시 시도하기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const viewModel = toViewModel(
    testId,
    resolvedQuizTitle,
    testPath,
    result,
    resultId,
  );
  const faqSchema = createFAQSchema(viewModel.faqItems);

  return (
    <>
      <JsonLd id={`${testId}-result-faq-schema`} data={faqSchema} />
      <RedesignedResultPage data={viewModel} />
    </>
  );
}

export function MbtiResultPage(props: MbtiResultPageProps) {
  return (
    <Suspense fallback={<LoadingState theme={props.theme} />}>
      <ResultPageContent {...props} />
    </Suspense>
  );
}
