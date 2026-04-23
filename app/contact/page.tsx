import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, createBreadcrumbSchema } from "@/components/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Clock, AlertCircle } from "lucide-react";

const baseUrl = "https://temon.kr";
const contactEmail = "contact@temon.kr";

export const metadata: Metadata = {
  title: "문의하기 | 테몬 MBTI",
  description:
    "테몬 MBTI 서비스에 대한 오류 제보, 개선 제안, 제휴·광고 문의는 이 페이지의 이메일을 통해 접수할 수 있습니다. 영업일 기준 3일 이내 답변드립니다.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "문의하기 | 테몬 MBTI",
    description: "오류 제보, 개선 제안, 제휴 문의를 받습니다.",
    url: `${baseUrl}/contact`,
    siteName: "테몬",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: baseUrl },
    { name: "문의하기", url: `${baseUrl}/contact` },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "테몬 문의하기",
    description: "테몬 MBTI 서비스 문의 페이지",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "테몬",
      url: baseUrl,
      email: contactEmail,
      contactPoint: {
        "@type": "ContactPoint",
        email: contactEmail,
        contactType: "customer service",
        availableLanguage: "ko",
        areaServed: "KR",
      },
    },
  };

  const inquiryTypes = [
    {
      icon: AlertCircle,
      title: "오류·버그 제보",
      desc: "테스트 진행 불가, 결과 이상, 404 오류 등",
      subject: "[오류 제보] ",
      color: "red",
    },
    {
      icon: MessageSquare,
      title: "개선 제안",
      desc: "새로운 테스트 주제, UI 개선, 기능 요청",
      subject: "[개선 제안] ",
      color: "violet",
    },
    {
      icon: Mail,
      title: "제휴·광고 문의",
      desc: "브랜드 협업, 광고 게재, 미디어 취재",
      subject: "[제휴 문의] ",
      color: "amber",
    },
    {
      icon: Clock,
      title: "일반 문의",
      desc: "개인정보·이용약관·기타 안내 문의",
      subject: "[일반 문의] ",
      color: "cyan",
    },
  ] as const;

  const colorClasses: Record<string, string> = {
    red: "bg-red-100 text-red-600",
    violet: "bg-violet-100 text-violet-600",
    amber: "bg-amber-100 text-amber-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
    <>
      <JsonLd id="contact-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="contact-page-schema" data={contactPageSchema} />

      <article className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              문의하기
            </h1>
            <p className="text-lg text-muted-foreground">
              의견, 오류 제보, 제휴 문의를 환영합니다
            </p>
          </header>

          {/* 주 이메일 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">이메일로 문의해주세요</h2>
              <p className="text-gray-700">
                별도의 문의 계정이나 로그인이 필요하지 않습니다. 아래 주소로
                바로 메일을 보내주세요.
              </p>
              <Button asChild size="lg" className="text-lg">
                <a href={`mailto:${contactEmail}`}>
                  <Mail className="w-5 h-5 mr-2" />
                  {contactEmail}
                </a>
              </Button>
              <p className="text-sm text-muted-foreground pt-2">
                <Clock className="w-4 h-4 inline mr-1" />
                영업일 기준 <strong>3일 이내</strong> 답변드립니다
              </p>
            </CardContent>
          </Card>

          {/* 문의 유형 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-center">문의 유형 선택</h2>
            <p className="text-center text-muted-foreground text-sm">
              아래 카드를 클릭하면 해당 제목으로 메일 작성이 시작됩니다
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inquiryTypes.map((item) => {
                const Icon = item.icon;
                const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(item.subject)}`;
                return (
                  <a key={item.title} href={mailto} className="block group">
                    <Card className="border-0 shadow-md bg-white/90 backdrop-blur hover:shadow-xl transition-shadow h-full">
                      <CardContent className="p-6 space-y-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[item.color]}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-violet-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </section>

          {/* 작성 가이드 */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-xl font-bold">
                원활한 답변을 위한 작성 가이드
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>오류 제보 시</strong>: 발생 페이지 URL,
                  기기(PC/모바일), 브라우저, 오류 메시지
                </li>
                <li>
                  • <strong>개선 제안 시</strong>: 원하는 기능, 해결하려는
                  불편함
                </li>
                <li>
                  • <strong>제휴 문의 시</strong>: 회사명, 담당자 직함,
                  제안하시는 내용
                </li>
                <li>
                  • <strong>개인정보 관련</strong>: 요청 유형(열람/수정/삭제) 및
                  관련 정보
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 관련 링크 */}
          <Card className="border-0 shadow-md bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">먼저 확인해보세요</h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/about"
                  className="text-sm text-violet-600 hover:underline"
                >
                  소개
                </Link>
                <span className="text-gray-400">·</span>
                <Link
                  href="/privacy"
                  className="text-sm text-violet-600 hover:underline"
                >
                  개인정보처리방침
                </Link>
                <span className="text-gray-400">·</span>
                <Link
                  href="/terms"
                  className="text-sm text-violet-600 hover:underline"
                >
                  이용약관
                </Link>
                <span className="text-gray-400">·</span>
                <Link
                  href="/tests"
                  className="text-sm text-violet-600 hover:underline"
                >
                  전체 테스트
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </>
  );
}
