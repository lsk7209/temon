"use client";

import type React from "react";
import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useAnalyticsConsent } from "@/hooks/use-analytics-consent";

type ClarityFunction = (command: string, ...args: unknown[]) => void;

/**
 * Applies a consent change to trackers that may already be loaded.
 * `ga-disable-<id>` is GA's documented kill switch and also stops automatic hits.
 */
export function applyLoadedTrackerConsent(gaId: string, allowed: boolean): void {
  if (typeof window === "undefined") return;
  const globals = window as unknown as Record<string, unknown>;
  globals[`ga-disable-${gaId}`] = !allowed;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: allowed ? "granted" : "denied",
      ad_personalization: allowed ? "granted" : "denied",
      ad_user_data: allowed ? "granted" : "denied",
    });
  }
  const clarity = globals.clarity as ClarityFunction | undefined;
  if (typeof clarity === "function") clarity("consent", allowed);
}

export function gaInitScript(gaId: string): string {
  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);}
    window.gtag('js', new Date());
    window.gtag('config', '${gaId}', {
      page_path: window.location.pathname,
      page_location: window.location.href,
      send_page_view: false
    });
  `;
}

export function clarityInitScript(clarityId: string): string {
  return `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityId}");
  `;
}

interface AnalyticsScriptsProps {
  gaId: string;
  clarityId?: string;
}

/** Loads GA and Clarity only after consent allows it; never on the server render. */
export function AnalyticsScripts({ gaId, clarityId }: AnalyticsScriptsProps) {
  const { ready, allowed } = useAnalyticsConsent();
  // Derive loaded from consent state — avoids synchronous setState inside an effect.
  const loaded = ready && allowed;

  useEffect(() => {
    if (!ready) return;
    applyLoadedTrackerConsent(gaId, allowed);
  }, [ready, allowed, gaId]);

  if (!loaded) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
      <Script id="google-tag" strategy="afterInteractive">{gaInitScript(gaId)}</Script>
      {clarityId && (
        <Script id="microsoft-clarity" strategy="lazyOnload">{clarityInitScript(clarityId)}</Script>
      )}
    </>
  );
}

/** Renders analytics-only children (e.g. Vercel Analytics) while consent allows it. */
export function AnalyticsConsentGate({ children }: { children: React.ReactNode }) {
  const { allowed } = useAnalyticsConsent();
  return allowed ? <>{children}</> : null;
}

interface ConsentBannerViewProps {
  onGrant: () => void;
  onDeny: () => void;
}

export function ConsentBannerView({ onGrant, onDeny }: ConsentBannerViewProps) {
  return (
    <section
      role="region"
      aria-label="분석 도구 및 맞춤형 광고 사용 동의"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur"
    >
      <div className="container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-foreground">
          서비스 개선을 위한 방문·테스트 통계 분석 도구(Google Analytics 등)와 맞춤형 광고를
          사용해도 될까요? 거부해도 모든 테스트를 그대로 이용할 수 있고, 광고는 맞춤 설정 없이
          표시됩니다.{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            개인정보처리방침
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onDeny}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            거부
          </button>
          <button
            type="button"
            onClick={onGrant}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            허용
          </button>
        </div>
      </div>
    </section>
  );
}

/** Shown only in opt-in mode until the visitor answers. */
export function ConsentBanner() {
  const { ready, showBanner, grant, deny } = useAnalyticsConsent();
  if (!ready || !showBanner) return null;
  return <ConsentBannerView onGrant={grant} onDeny={deny} />;
}

interface ConsentSettingsViewProps {
  allowed: boolean;
  onGrant: () => void;
  onDeny: () => void;
}

export function ConsentSettingsView({ allowed, onGrant, onDeny }: ConsentSettingsViewProps) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span aria-live="polite">분석·맞춤형 광고: {allowed ? "허용됨" : "거부됨"}</span>
      <button
        type="button"
        onClick={allowed ? onDeny : onGrant}
        className="underline underline-offset-2 hover:text-foreground"
      >
        {allowed ? "분석·맞춤형 광고 거부하기" : "분석·맞춤형 광고 허용하기"}
      </button>
    </span>
  );
}

/** Footer control so visitors can refuse or withdraw at any time. */
export function ConsentSettings() {
  const { ready, allowed, grant, deny } = useAnalyticsConsent();
  if (!ready) return null;
  return <ConsentSettingsView allowed={allowed} onGrant={grant} onDeny={deny} />;
}
