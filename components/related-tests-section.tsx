"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRelatedTests } from "@/lib/related-tests";

interface RelatedTestsSectionProps {
  testId: string;
  title?: string;
}

export function RelatedTestsSection({
  testId,
  title = "함께 즐기기 좋은 테스트",
}: RelatedTestsSectionProps) {
  const relatedTests = getRelatedTests(testId);

  if (relatedTests.length === 0) return null;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-slate-950">{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedTests.map((test) => (
          <article
            key={test.id}
            className="flex min-h-[220px] flex-col rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-3">
              <span
                className={`inline-flex rounded-full bg-gradient-to-r ${test.color} px-3 py-1 text-xs font-semibold text-white`}
              >
                {test.category}
              </span>
            </div>
            <h3 className="break-keep text-lg font-bold leading-snug text-slate-950">
              {test.title}
            </h3>
            <p className="mt-2 flex-1 break-keep text-sm leading-6 text-slate-600">
              {test.description}
            </p>
            <Button asChild variant="outline" className="mt-4 bg-white">
              <Link href={test.href}>
                테스트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
