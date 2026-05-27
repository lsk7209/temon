"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import { StaticResultEnhancements } from "@/components/static-result-enhancements";
import { ALL_TESTS } from "@/lib/tests-config";

export const AUTO_ENHANCEMENT_SKIP_SLUGS = [
  "breakup-style",
  "commute-style",
  "food-brand",
  "hotel-breakfast",
  "investment-style",
  "meeting-villain",
  "spending-style",
  "spice-tolerance",
  "zombie-survival",
] as const;

const SKIP_SLUGS = new Set<string>(AUTO_ENHANCEMENT_SKIP_SLUGS);

function getResultSlug(pathname: string): string | null {
  const match = pathname.match(/^\/tests\/([^/]+)\/test\/result\/?$/);
  return match?.[1] ?? null;
}

function toTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ResultRouteAutoEnhancements() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = getResultSlug(pathname);

  if (!slug || SKIP_SLUGS.has(slug)) return null;

  const resultType = searchParams.get("type")?.toUpperCase() || "RESULT";
  const testTitle = ALL_TESTS.find((test) => test.id === slug)?.title;
  const title = `${testTitle || toTitle(slug)} 결과`;

  return (
    <section className="mx-auto w-full max-w-[720px] px-4 pb-10">
      <div className="mb-6">
        <ShareButtons
          testId={slug}
          testPath={`/tests/${slug}/test`}
          resultType={resultType}
          title={title}
          description="내 결과를 저장하고 친구와 비교해 보세요."
        />
      </div>
      <StaticResultEnhancements
        testId={slug}
        quizTitle={title}
        resultName={resultType}
        showToc
        anchorMain
      />
    </section>
  );
}
