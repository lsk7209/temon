"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Users,
} from "lucide-react";
import {
  shouldShowParticipants,
  formatParticipants,
} from "@/lib/format-participants";
import type { LucideIcon } from "lucide-react";
import { getHomePageTests, ALL_TESTS } from "@/lib/tests-config";
import AdReserve from "@/components/ad-reserve";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Clock3,
    title: "2~3분 완료",
    description: "짧은 문항으로 바로 결과 확인",
  },
  {
    icon: ShieldCheck,
    title: "가입 없이 무료",
    description: "개인정보 입력 없이 테스트 진행",
  },
  {
    icon: Sparkles,
    title: "주제별 모음",
    description: "음식, 연애, 생활, 디지털까지 탐색",
  },
];

const guides = [
  {
    title: "처음 방문했다면",
    description:
      "참여자가 많고 결과 공유가 쉬운 인기 테스트부터 시작하세요.",
  },
  {
    title: "검색 목적이 있다면",
    description:
      "음식, 연애, 생활, 직장, 디지털처럼 관심사와 맞는 카테고리를 고르세요.",
  },
  {
    title: "대화 소재가 필요하다면",
    description:
      "최근 추가된 테스트를 골라 친구와 같은 문항을 비교해보세요.",
  },
];

const faqs = [
  {
    q: "테몬 MBTI 테스트 모음은 무료인가요?",
    a: "네. 가입이나 결제 없이 무료로 이용할 수 있습니다.",
  },
  {
    q: "테스트 결과는 공식 진단인가요?",
    a: "아닙니다. 테몬의 결과는 오락과 자기 이해를 위한 성향 분석 콘텐츠입니다.",
  },
  {
    q: "어떤 테스트부터 하면 좋나요?",
    a: "처음이라면 인기 테스트를, 관심사가 뚜렷하다면 카테고리별 테스트를 추천합니다.",
  },
  {
    q: "결과를 공유할 수 있나요?",
    a: "네. 결과 페이지는 친구와 비교하고 공유하기 좋게 구성되어 있습니다.",
  },
];

export default function HomeClient() {
  const displayTests = getHomePageTests();
  const newTests = ALL_TESTS.filter((test) => test.new).slice(0, 8);
  const hasMoreTests = ALL_TESTS.length > 9;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="mb-5 border-0 bg-cyan-100 px-4 py-2 text-cyan-800">
              무료 성격 테스트 플랫폼
            </Badge>
            <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              무료 MBTI 테스트 모음
            </h1>
            <p className="article-summary key-takeaways mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              테몬은 가입 없이 2~3분 안에 끝나는 무료 MBTI 테스트와 성격
              테스트를 모아 둔 한국어 테스트 플랫폼입니다. 음식, 연애, 생활,
              디지털 등 일상 주제로 결과를 확인하고 친구와 비교할 수 있습니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/tests">전체 테스트 보기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#new-tests">새로운 테스트 보기</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                      <FeatureIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-950">
                        {feature.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <AdReserve />
      </div>

      {newTests.length > 0 && (
        <section id="new-tests" className="content-visibility-auto px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-950">
                  새로운 퀴즈
                </h2>
                <p className="mt-2 text-slate-600">
                  최근 추가된 퀴즈를 먼저 확인해보세요.
                </p>
              </div>
              <Button variant="outline" className="hidden sm:inline-flex" asChild>
                <Link href="/tests">
                  전체 보기
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {newTests.map((test) => {
                const TestIcon = test.icon;

                return (
                  <Link key={test.href} href={test.href}>
                    <Card className="group h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div
                            className={`rounded-lg bg-gradient-to-br p-3 ${test.color}`}
                          >
                            <TestIcon className="w-6 h-6 text-white" />
                          </div>
                          <Badge className="border-0 bg-rose-100 text-rose-700">
                            NEW
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <CardTitle className="text-xl font-bold leading-snug group-hover:text-cyan-700">
                            {test.title}
                          </CardTitle>
                          <p className="text-sm leading-relaxed text-slate-600">
                            {test.description}
                          </p>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{test.rating}</span>
                          </div>
                          {shouldShowParticipants(test.participants) && (
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>
                                {formatParticipants(test.participants)}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-cyan-700">
                          바로가기
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="content-visibility-auto px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-slate-950">
              인기 성격 테스트
            </h2>
            <p className="mt-2 text-slate-600">
              많이 찾는 테스트를 먼저 모았습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTests.map((test) => {
              const TestIcon = test.icon;
              return (
                <Link key={test.href} href={test.href}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-slate-200 bg-white transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`rounded-lg bg-gradient-to-br p-3 ${test.color}`}
                        >
                          <TestIcon className="w-8 h-8 text-white" />
                        </div>
                        {test.badge && (
                          <Badge className="border-0 bg-amber-100 font-bold text-amber-800">
                            {test.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-rose-700">
                        {test.title}
                      </CardTitle>
                      <p className="text-base text-slate-600">
                        {test.description}
                      </p>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{test.rating}</span>
                        </div>
                        {shouldShowParticipants(test.participants) && (
                          <div className="text-sm text-slate-600">
                            {formatParticipants(test.participants)}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full"
                      >
                        시작하기
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>

          {hasMoreTests && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="group" asChild>
                <Link href="/tests">
                  더 많은 테스트 보기
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <AdReserve className="min-h-[280px]" />
      </div>

      <section className="content-visibility-auto bg-white px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-slate-950">
              MBTI 테스트 모음, 이렇게 고르면 좋아요
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-slate-950">
                  {guide.title}
                </h3>
                <p className="leading-7 text-slate-600">
                  {guide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-visibility-auto px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-black text-slate-950">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer text-lg font-bold text-slate-950">
                  {faq.q}
                </summary>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl rounded-lg bg-slate-950 p-8 text-center text-white md:p-10">
          <h2 className="mb-4 text-3xl font-black">
            관심 있는 테스트를 바로 시작하세요
          </h2>
          <p className="mb-6 text-slate-200">
            전체 목록에서 주제를 고르고 결과를 친구와 비교해보세요.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/tests">무료 테스트 시작하기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
