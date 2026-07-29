"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";
const ADSENSE_SCRIPT_ID = "adsense-loader";
const MOBILE_ADS_MAX_WIDTH = 767;
const LEGACY_CONTENT_PATHS = new Set([
  "/alarm-habit",
  "/coffee-mbti",
  "/kdrama-mbti",
  "/kpop-idol",
  "/ntrp-test",
  "/pet-mbti",
  "/ramen-mbti",
  "/snowwhite-mbti",
  "/study-mbti",
]);

function isAdSenseEligiblePath(pathname: string | null) {
  if (!pathname) return false;
  if (pathname === "/" || pathname === "/tests" || pathname === "/blog") return true;
  if (LEGACY_CONTENT_PATHS.has(pathname)) return true;

  if (pathname.startsWith("/blog/")) return true;
  return /^\/tests\/[^/]+\/?$/.test(pathname);
}

export default function AdSenseScript() {
  const pathname = usePathname();
  const [isMobileViewport, setIsMobileViewport] = useState(true);
  const [isIndexablePage, setIsIndexablePage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_ADS_MAX_WIDTH}px)`);
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    setIsIndexablePage(!robots?.content.toLowerCase().includes("noindex"));
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  // Google Auto Ads are configured outside this repository and can inject
  // mobile overlay/vignette formats. Keep the loader off on mobile until the
  // Chrome Ad Experience review is approved.
  if (
    !ADSENSE_CLIENT_ID ||
    isMobileViewport ||
    !isIndexablePage ||
    !isAdSenseEligiblePath(pathname)
  ) {
    return null;
  }

  return (
    <Script
      id={ADSENSE_SCRIPT_ID}
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
