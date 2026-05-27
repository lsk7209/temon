"use client";

import { useSearchParams } from "next/navigation";
import { ContentToc, type TocItem } from "@/components/content-toc";
import { FAQSection } from "@/components/faq-section";
import { RelatedTestsSection } from "@/components/related-tests-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopicResultFAQs, getTopicResultUseCases } from "@/lib/quiz-topic-copy";

interface StaticResultEnhancementsProps {
  testId: string;
  quizTitle: string;
  resultName?: string;
  showToc?: boolean;
  anchorMain?: boolean;
}

const tocItems: TocItem[] = [
  { id: "result-main", label: "결과 요약" },
  { id: "result-action-guide", label: "활용 가이드" },
  { id: "result-faq", label: "자주 묻는 질문" },
  { id: "result-related", label: "추천 테스트" },
];

export function StaticResultEnhancements({
  testId,
  quizTitle,
  resultName,
  showToc = false,
  anchorMain = false,
}: StaticResultEnhancementsProps) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.toUpperCase();
  const resolvedResultName = resultName || type || "결과 유형";
  const useCases = getTopicResultUseCases(quizTitle, resolvedResultName);
  const faqs = getTopicResultFAQs(quizTitle, resolvedResultName);

  return (
    <div className="article-content space-y-6">
      {anchorMain && <div id="result-main" className="scroll-mt-24" />}
      {showToc && <ContentToc items={tocItems} />}

      <Card
        id="result-action-guide"
        className="scroll-mt-24 border-0 bg-white/90 shadow-xl backdrop-blur"
      >
        <CardHeader>
          <CardTitle className="text-2xl">결과 활용 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {useCases.map((item) => (
              <li key={item} className="text-gray-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div id="result-faq" className="scroll-mt-24">
        <FAQSection
          faqs={faqs}
          title="결과를 읽을 때 자주 묻는 질문"
          className="rounded-lg bg-white/90 p-6 shadow-xl backdrop-blur"
        />
      </div>

      <div id="result-related" className="scroll-mt-24">
        <RelatedTestsSection testId={testId} title="비슷한 주제의 테스트" />
      </div>
    </div>
  );
}
