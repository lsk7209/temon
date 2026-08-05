import Script from "next/script";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";

export default function AdSenseReaderScript() {
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="adsense-reader-loader"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
