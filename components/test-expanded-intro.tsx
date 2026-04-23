import { getExtendedContent } from "@/lib/extended-content";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Target,
  Lightbulb,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface Props {
  testId: string;
}

/**
 * Save List 15개 테스트 랜딩 페이지용 심층 본문 섹션.
 *
 * - lib/extended-content.ts 의 EXTENDED_CONTENT에 slug가 없으면 null 렌더
 *   → 기존 페이지 영향 없음, 확장 콘텐츠 있는 slug에만 추가 노출
 * - JSON-LD Article 스키마도 함께 주입해 Google이 "독립 기사"로 인식
 */
export function TestExpandedIntro({ testId }: Props) {
  const ext = getExtendedContent(testId);
  if (!ext) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${testId} 테스트 심층 가이드`,
    description: ext.intro.slice(0, 160),
    datePublished: ext.lastUpdated,
    dateModified: ext.lastUpdated,
    author: {
      "@type": "Organization",
      name: "테몬 운영팀",
      url: "https://temon.kr/about",
    },
    publisher: {
      "@type": "Organization",
      name: "테몬",
      logo: {
        "@type": "ImageObject",
        url: "https://temon.kr/apple-touch-icon.png",
      },
    },
  };

  return (
    <section
      className="mt-12 space-y-6"
      aria-labelledby="expanded-intro-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <h2
        id="expanded-intro-heading"
        className="text-2xl md:text-3xl font-bold"
      >
        이 테스트 심층 가이드
      </h2>

      {/* Intro */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur">
        <CardContent className="p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold">
              무엇을 다루는 테스트인가요?
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{ext.intro}</p>
        </CardContent>
      </Card>

      {/* Why it matters */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur">
        <CardContent className="p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold">왜 의미 있는 신호인가요?</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{ext.whyItMatters}</p>
        </CardContent>
      </Card>

      {/* Use cases */}
      <Card className="border-0 shadow-md bg-white/90 backdrop-blur">
        <CardContent className="p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold">이럴 때 활용하기 좋아요</h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            {ext.useCases.map((u, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-bold text-violet-600 shrink-0">
                  {i + 1}.
                </span>
                <span className="leading-relaxed">{u}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Limitations — AdSense 투명성 신호 */}
      <Card className="border-0 shadow-md bg-amber-50/90 backdrop-blur">
        <CardContent className="p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-xl font-semibold">결과 해석의 한계</h3>
          </div>
          <p className="text-gray-800 leading-relaxed">{ext.limitations}</p>
        </CardContent>
      </Card>

      {/* Extra FAQs */}
      {ext.extraFaqs && ext.extraFaqs.length > 0 && (
        <Card className="border-0 shadow-md bg-white/90 backdrop-blur">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold">심화 FAQ</h3>
            </div>
            <div className="space-y-4">
              {ext.extraFaqs.map((f, i) => (
                <div
                  key={i}
                  className="pb-4 border-b last:border-b-0 last:pb-0"
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    Q. {f.question}
                  </p>
                  <p className="text-gray-700 leading-relaxed">A. {f.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-right">
        최종 업데이트: <time dateTime={ext.lastUpdated}>{ext.lastUpdated}</time>
      </p>
    </section>
  );
}
