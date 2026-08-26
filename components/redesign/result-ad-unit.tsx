"use client";

import Script from "next/script";
import { useEffect } from "react";

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  "ca-pub-3050601904412736";
const ADSENSE_DELIVERY_ENABLED =
  process.env.NEXT_PUBLIC_ADSENSE_DELIVERY_ENABLED === "true";
const RESULT_AD_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT_ID;

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * 결과 페이지는 세션별 resultId가 붙는 개인화 URL이라 robots noindex가
 * 의도적으로 걸려 있다(중복 URL 색인 방지 목적, 콘텐츠 품질 문제가 아님).
 * 그래서 다른 페이지의 AdSenseScript와 달리 indexable 여부는 게이트에
 * 넣지 않는다.
 *
 * 이 계정은 AdSense 콘솔에서 Auto Ads(페이지 레벨 광고)가 이미 켜져
 * 있어서, adsbygoogle.js가 로드되면 스크립트가 자체적으로 페이지 레벨
 * 광고를 초기화한다. `enable_page_level_ads: false`로 코드에서 이를
 * 끄려고 하면 스크립트의 자체 초기화와 충돌해 push 에러가 난다(실기기
 * 테스트로 확인). 따라서 Auto Ads 자체를 코드로 막을 수는 없고, 여기서는
 * 수동 유닛 1개만 추가한다 — Auto Ads가 이 페이지에도 추가로 배치될 수
 * 있다는 점을 감안해야 한다(다른 허용 경로와 동일한 수준의 노출 모델).
 * 결과 페이지에서 Auto Ads를 완전히 배제하려면 AdSense 콘솔의 Auto Ads
 * URL 제외 목록에 `temon.kr/results/`(접두사 일치)를 등록해야 한다(계정
 * 설정, 코드 밖의 작업). 결과 URL이 /results/ 아래로 재구조화된 이후에는
 * 이 접두사 하나로 모든 결과 페이지가 확실히 제외된다 — 이전 구조
 * (/tests/{slug}/test/result)에서는 가변 슬러그가 접두사 뒤에 있어
 * 접두사 일치만 지원하는 AdSense 제외 규칙으로 표현이 불가능했다.
 */
export function ResultAdUnit() {
  useEffect(() => {
    if (!ADSENSE_DELIVERY_ENABLED || !RESULT_AD_SLOT_ID) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("결과 페이지 광고 로드 오류:", error);
    }
  }, []);

  if (!ADSENSE_DELIVERY_ENABLED || !RESULT_AD_SLOT_ID) {
    return null;
  }

  return (
    <section
      aria-label="광고"
      className="flex min-h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white"
    >
      <Script
        id="adsense-result-loader"
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={RESULT_AD_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}
