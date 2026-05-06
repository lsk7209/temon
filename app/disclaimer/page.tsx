import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, createBreadcrumbSchema } from "@/components/json-ld";

const baseUrl = "https://temon.kr";

export const metadata: Metadata = {
  title: "면책조항 | 테몬 MBTI",
  description:
    "테몬 MBTI 테스트 결과와 콘텐츠 이용에 관한 면책조항입니다. 테스트 결과는 오락과 자기 이해를 위한 참고 자료이며 전문 진단을 대체하지 않습니다.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "면책조항 | 테몬 MBTI",
    description:
      "테몬 MBTI 테스트 결과와 콘텐츠 이용에 관한 면책 안내입니다.",
    url: `${baseUrl}/disclaimer`,
    siteName: "테몬",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "면책조항", url: `${baseUrl}/disclaimer` },
  ]);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "테몬 면책조항",
    url: `${baseUrl}/disclaimer`,
    inLanguage: "ko",
    isPartOf: {
      "@type": "WebSite",
      name: "테몬",
      url: baseUrl,
    },
  };

  return (
    <>
      <JsonLd id="disclaimer-breadcrumb" data={breadcrumbSchema} />
      <JsonLd id="disclaimer-webpage" data={webPageSchema} />
      <article className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-950">면책조항</h1>
            <p className="mt-3 text-slate-600">시행일: 2024년 1월 1일</p>
          </header>

          <div className="space-y-8 leading-7 text-slate-700">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-950">
                1. 테스트 결과의 성격
              </h2>
              <p>
                테몬의 MBTI 테스트와 성격 테스트 결과는 오락, 자기 이해,
                대화 소재를 위한 참고 콘텐츠입니다. 의학적, 심리학적, 법률적,
                금융적 판단이나 전문 상담을 대체하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-950">
                2. 콘텐츠 정확성
              </h2>
              <p>
                테몬은 콘텐츠를 지속적으로 점검하고 개선하지만, 모든 정보의
                완전성이나 최신성을 보장하지 않습니다. 중요한 의사결정에는
                관련 분야 전문가의 조언을 확인하시기 바랍니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-950">
                3. 외부 링크와 광고
              </h2>
              <p>
                사이트에는 광고 또는 외부 링크가 포함될 수 있습니다. 외부
                사이트의 콘텐츠, 개인정보 처리, 상품 또는 서비스에 대해서는
                해당 사이트의 정책과 약관이 적용됩니다.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-950">
                4. 문의
              </h2>
              <p>
                오류 제보나 정정 요청은{" "}
                <Link className="text-cyan-700 underline" href="/contact">
                  문의하기
                </Link>
                에서 접수할 수 있습니다.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
