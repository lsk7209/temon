"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";
const ADSENSE_SCRIPT_ID = "adsense-loader";
const ADSENSE_EXCLUDED_PATH_PREFIXES = ["/admin", "/dashboard"] as const;

function isAdSenseExcludedPath(pathname: string | null) {
  if (!pathname) return false;
  if (ADSENSE_EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }

  return /\/tests\/[^/]+\/test(?:\/|$)/.test(pathname);
}

export default function AdSenseScript() {
  const pathname = usePathname();

  if (!ADSENSE_CLIENT_ID || isAdSenseExcludedPath(pathname)) return null;

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
