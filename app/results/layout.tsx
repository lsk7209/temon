import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ResultRouteAutoEnhancements } from "@/components/result-route-auto-enhancements";
import { LegacyResultAdSlot } from "@/components/legacy-result-ad-slot";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

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
