import type { ReactNode } from "react";
import { Suspense } from "react";
import { ResultRouteAutoEnhancements } from "@/components/result-route-auto-enhancements";
import { LegacyResultAdSlot } from "@/components/legacy-result-ad-slot";

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ResultRouteAutoEnhancements />
      </Suspense>
      <LegacyResultAdSlot />
    </>
  );
}
