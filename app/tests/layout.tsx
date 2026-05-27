import type { ReactNode } from "react";
import { ResultRouteAutoEnhancements } from "@/components/result-route-auto-enhancements";

export default function TestsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ResultRouteAutoEnhancements />
    </>
  );
}
