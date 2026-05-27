import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, Clock3, FileText, Search, Sparkles } from "lucide-react";
import AdReserve from "@/components/ad-reserve";
import { ContentToc } from "@/components/content-toc";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests as testsTable } from "@/lib/db/schema";
import { getAllTests } from "@/lib/tests-config";

const BASE_URL = "https://temon.kr";
const BLOG_LIMIT = 48;
const STATIC_FALLBACK_DATE = new Date("2025-01-01T00:00:00.000Z");

type BlogCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
  publishedAt: Date;
};

export const revalidate = 3600;

const title = "블로그 | 무료 성격 테스트 글 목록 - 테몬";
const description =
  "테몬 블로그에서 최신 MBTI 성격 테스트와 취향 테스트 글을 카드형 목록으로 확인하세요.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "MBTI 테스트 블로그, 성격 테스트 글, 취향 테스트 목록, 무료 심리테스트, 테몬 블로그",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "테몬",
    locale: "ko_KR",
    images: [
      {
        url: `${BASE_URL}/api/og?title=${encodeURIComponent("테몬 블로그")}&desc=${encodeURIComponent("무료 성격 테스트 글 목록")}`,
        width: 1200,
        height: 630,
        alt: "테몬 블로그 카드형 글 목록",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const tocItems = [
  { id: "latest-posts", label: "최신 글" },
  { id: "category-guide", label: "카테고리별 보기" },
  { id: "reading-guide", label: "읽는 방법" },
  { id: "blog-faq", label: "자주 묻는 질문" },
];

const faqs = [
  {
    question: "테몬 블로그에서는 어떤 글을 볼 수 있나요?",
    answer:
      "MBTI 성격 테스트, 취향 테스트, 생활 유형 테스트처럼 바로 참여할 수 있는 콘텐츠를 주제별 카드 목록으로 정리합니다.",
  },
  {
    question: "블로그 글과 테스트 페이지는 어떻게 다른가요?",
    answer:
      "블로그 목록은 테스트 소개와 결과 해석으로 이어지는 진입 페이지입니다. 글 카드를 누르면 해당 테스트 상세 페이지로 이동합니다.",
  },
  {
    question: "처음 방문하면 어떤 글부터 보면 좋나요?",
    answer:
      "최신 글에서 관심 있는 주제를 고르거나 카테고리별 보기에서 음식, 생활, 관계, 디지털 같은 익숙한 주제를 먼저 선택하면 좋습니다.",
  },
];

function toValidDate(value: unknown, fallback: Date): Date {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  if (typeof value === "number") {
    const timestamp = value < 1_000_000_000_000 ? value * 1000 : value;
    const date = new Date(timestamp);
    if (!Number.isNaN(date.getTime())) return date;
  }

  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }

  return fallback;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getCategoryTone(category: string): string {
  if (/음식|푸드|카페|디저트/.test(category)) {
    return "bg-amber-50 text-amber-800 ring-amber-200";
  }
  if (/관계|연애|사랑/.test(category)) {
    return "bg-rose-50 text-rose-800 ring-rose-200";
  }
  if (/생활|일상|주말/.test(category)) {
    return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  }
  if (/디지털|SNS|스마트폰/.test(category)) {
    return "bg-sky-50 text-sky-800 ring-sky-200";
  }
  return "bg-violet-50 text-violet-800 ring-violet-200";
}

function uniqueCards(cards: BlogCard[]): BlogCard[] {
  const byHref = new Map<string, BlogCard>();
  for (const card of cards) {
    if (!byHref.has(card.href)) byHref.set(card.href, card);
  }
  return Array.from(byHref.values());
}

async function getDbBlogCards(): Promise<BlogCard[]> {
  if (!isDbAvailable()) return [];

  try {
    const db = getDb();
    const rows = await db
      .select({
        slug: testsTable.slug,
        title: testsTable.title,
        description: testsTable.description,
        category: testsTable.category,
        publishedAt: testsTable.publishedAt,
        createdAt: testsTable.createdAt,
        updatedAt: testsTable.updatedAt,
      })
      .from(testsTable)
      .where(eq(testsTable.status, "published"))
      .orderBy(desc(testsTable.publishedAt), desc(testsTable.createdAt))
      .limit(BLOG_LIMIT)
      .all();

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      description:
        row.description || `${row.title} 테스트를 시작하고 결과를 확인해보세요.`,
      category: row.category || "테스트",
      href: `/tests/${row.slug}`,
      publishedAt: toValidDate(
        row.updatedAt || row.publishedAt || row.createdAt,
        new Date(),
      ),
    }));
  } catch {
    return [];
  }
}

function getStaticBlogCards(): BlogCard[] {
  return getAllTests()
    .slice(0, BLOG_LIMIT)
    .map((test) => ({
      slug: test.id,
      title: test.title,
      description: test.description,
      category: test.category || "테스트",
      href: test.href,
      publishedAt: test.publishAt
        ? toValidDate(test.publishAt, STATIC_FALLBACK_DATE)
        : STATIC_FALLBACK_DATE,
    }));
}

async function getBlogCards(): Promise<BlogCard[]> {
  const dbCards = await getDbBlogCards();
  return uniqueCards(dbCards.length > 0 ? dbCards : getStaticBlogCards());
}

function buildCollectionSchema(cards: BlogCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}/blog`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cards.length,
      itemListElement: cards.slice(0, 24).map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}${card.href}`,
        name: card.title,
        description: card.description,
      })),
    },
  };
}

export default async function BlogPage() {
  const cards = await getBlogCards();
  const categories = Array.from(new Set(cards.map((card) => card.category)))
    .filter(Boolean)
    .slice(0, 12);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: BASE_URL },
    { name: "블로그", url: `${BASE_URL}/blog` },
  ]);
  const faqSchema = createFAQSchema(faqs);
  const collectionSchema = buildCollectionSchema(cards);

  return (
    <>
      <JsonLd id="blog-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="blog-faq-schema" data={faqSchema} />
      <JsonLd id="blog-collection-schema" data={collectionSchema} />

      <div className="min-h-screen bg-slate-50 text-slate-950">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-0 bg-cyan-100 px-4 py-2 text-cyan-800">
                테몬 블로그
              </Badge>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                성격 테스트 글을 카드로 빠르게 골라보세요
              </h1>
              <p className="article-summary key-takeaways mt-5 text-lg leading-8 text-slate-700">
                테몬 블로그는 최신 MBTI 테스트, 취향 테스트, 생활 유형
                테스트를 한눈에 고를 수 있는 글 목록입니다. 관심 있는
                주제를 선택하면 테스트 소개와 결과 해석 페이지로 바로
                이어집니다.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Search className="mb-3 h-5 w-5 text-cyan-700" />
                <h2 className="text-lg font-bold">주제별 탐색</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  음식, 관계, 생활, 디지털처럼 익숙한 카테고리로 글을
                  찾을 수 있습니다.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Clock3 className="mb-3 h-5 w-5 text-emerald-700" />
                <h2 className="text-lg font-bold">최신순 정렬</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  최근 공개된 테스트 글을 먼저 보여주어 새 콘텐츠를 빠르게
                  확인합니다.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Sparkles className="mb-3 h-5 w-5 text-rose-700" />
                <h2 className="text-lg font-bold">결과 공유 흐름</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  글을 읽고 테스트를 진행한 뒤 결과를 친구와 비교하기 좋게
                  연결합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4">
          <ContentToc items={tocItems} />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <AdReserve />
        </div>

        <section
          id="latest-posts"
          className="article-content px-4 py-12 md:py-14"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-black">최신 글 목록</h2>
                <p className="mt-2 text-slate-600">
                  카드에서 요약을 확인하고 관심 있는 테스트 글로 이동하세요.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/tests">전체 테스트 보기</Link>
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <article
                  key={card.href}
                  className="group flex min-h-[260px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex max-w-full items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ${getCategoryTone(card.category)}`}
                    >
                      {card.category}
                    </span>
                    <time
                      dateTime={card.publishedAt.toISOString()}
                      className="shrink-0 text-xs text-slate-500"
                    >
                      {formatDate(card.publishedAt)}
                    </time>
                  </div>

                  <h3 className="text-xl font-black leading-snug text-slate-950 group-hover:text-cyan-700">
                    <Link href={card.href}>{card.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {card.description}
                  </p>

                  <Link
                    href={card.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition group-hover:gap-3"
                  >
                    글 읽고 테스트하기
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="category-guide" className="content-visibility-auto px-4 py-12">
          <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <FileText className="h-5 w-5 text-violet-700" />
              <h2 className="text-2xl font-black">카테고리별 보기</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-bold ring-1 ${getCategoryTone(category)}`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4">
          <AdReserve className="min-h-[240px]" />
        </div>

        <section id="reading-guide" className="content-visibility-auto px-4 py-12">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {[
              {
                title: "처음이라면",
                body: "제목이 가장 끌리는 글을 먼저 고르세요. 테스트형 콘텐츠는 관심 주제에서 시작할 때 결과 몰입도가 높습니다.",
              },
              {
                title: "친구와 비교하려면",
                body: "결과 공유가 쉬운 테스트를 고른 뒤 같은 링크를 보내면 서로의 선택 패턴을 비교하기 좋습니다.",
              },
              {
                title: "검색으로 들어왔다면",
                body: "카드 요약을 보고 내 검색 의도와 맞는 글을 선택하세요. 각 글은 테스트 소개와 결과 해석으로 이어집니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-xl font-black">{item.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="blog-faq" className="content-visibility-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-black">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer text-lg font-bold">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-4xl rounded-lg bg-slate-950 p-8 text-center text-white md:p-10">
            <h2 className="text-3xl font-black">
              더 많은 테스트가 필요하다면
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
              전체 테스트 목록에서 주제, 분위기, 결과 유형이 다른 콘텐츠를 더
              찾아볼 수 있습니다.
            </p>
            <Button size="lg" variant="secondary" className="mt-6" asChild>
              <Link href="/tests">전체 테스트 목록으로 이동</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
