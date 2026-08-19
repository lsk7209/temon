"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";
const ADSENSE_SCRIPT_ID = "adsense-loader";
const ADSENSE_DELIVERY_ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED === "true";
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
  const [isIndexablePage, setIsIndexablePage] = useState(false);

  useEffect(() => {
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    setIsIndexablePage(!robots?.content.toLowerCase().includes("noindex"));
  }, []);

  // Delivery is explicitly opt-in so a deployment cannot accidentally restore
  // ads before the Better Ads review and policy checks are complete.
  if (
    !ADSENSE_DELIVERY_ENABLED ||
    !ADSENSE_CLIENT_ID ||
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
