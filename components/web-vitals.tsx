"use client";

/**
 * Core Web Vitals(LCP·INP·CLS·FCP·TTFB)를 GA4로 전송.
 * 실사용자 메트릭(RUM)을 GA4 Looker Studio/BigQuery에서 분석 가능.
 *
 * Next.js 14의 useReportWebVitals 훅을 사용하므로 별도 패키지 설치 불필요.
 */

import { useReportWebVitals } from "next/web-vitals";

type Metric = {
  id: string;
  name: string;
  label: "web-vital" | "custom";
  value: number;
  delta: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: string;
};

export default function WebVitals() {
  useReportWebVitals((metric: Metric) => {
    if (typeof window === "undefined") return;
    if (!window.gtag) return;

    // GA4는 정수 값만 권장. CLS는 ×1000, 그 외는 반올림.
    const value = Math.round(
      metric.name === "CLS" ? metric.delta * 1000 : metric.delta,
    );

    try {
      window.gtag("event", metric.name, {
        event_category:
          metric.label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        event_label: metric.id,
        value,
        metric_id: metric.id,
        metric_value: metric.value,
        metric_rating: metric.rating,
        non_interaction: true,
      });
    } catch {
      // 추적 실패는 사용자 경험과 무관 — 조용히 무시
    }
  });

  return null;
}
