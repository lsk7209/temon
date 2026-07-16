import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, Clock3, Search, Sparkles } from "lucide-react";
import { ContentToc } from "@/components/content-toc";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllBlogPosts,
  getBlogCategories,
  type BlogPost,
} from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

const BASE_URL = "https://temon.kr";

export const revalidate = 86400;

const title = "무료 MBTI 테스트 해석 블로그 | 성격·취향 테스트 가이드 - 테몬";
const description =
  "테몬 퀴즈 블로그에서 무료 MBTI 테스트, 성격 테스트, 음식 취향 테스트, 연애 테스트 결과를 더 깊게 해석해보세요.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "무료 MBTI 테스트 해석, 성격 테스트 블로그, 취향 테스트 가이드, 연애 테스트 해석, 음식 취향 테스트, 테몬 블로그",
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
        url: `${BASE_URL}/api/og?title=${encodeURIComponent("테몬 퀴즈 블로그")}&desc=${encodeURIComponent("퀴즈 결과를 더 잘 읽는 글 모음")}`,
        width: 1200,
        height: 630,
        alt: "테몬 퀴즈 블로그",
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
  { id: "intent-guide", label: "검색 주제" },
  { id: "featured-posts", label: "추천 글" },
  { id: "category-guide", label: "카테고리" },
  { id: "reading-guide", label: "읽는 방법" },
  { id: "blog-faq", label: "자주 묻는 질문" },
];

const intentGuides = [
  {
    query: "무료 MBTI 테스트",
    description:
      "한국어 질문, 결과 해석, 공유 흐름까지 확인하고 바로 테스트로 이동합니다.",
    href: "/blog/free-mbti-test-guide-korean",
  },
  {
    query: "MBTI 결과 해석",
    description:
      "결과명을 넘어 생활 장면, 관계 대화, 다음 행동으로 읽는 방법입니다.",
    href: "/blog/mbti-test-result-interpretation",
  },
  {
    query: "커피 MBTI",
    description:
      "커피 선택 습관을 루틴, 집중 방식, 카페 취향으로 해석합니다.",
    href: "/blog/coffee-mbti-personality-guide",
  },
  {
    query: "라면 MBTI",
    description:
      "맵기, 토핑, 조리 방식으로 음식 취향과 선택 습관을 비교합니다.",
    href: "/blog/ramen-mbti-food-personality",
  },
  {
    query: "소비성향 테스트",
    description:
      "충동구매와 비교 습관을 평가가 아닌 일상 선택 기준으로 읽습니다.",
    href: "/blog/spending-style-test-money-habits",
  },
  {
    query: "크로노타입 테스트",
    description:
      "아침형·저녁형 이름보다 하루 에너지 곡선과 루틴 배치를 봅니다.",
    href: "/blog/sleep-chronotype-test-routine",
  },
];

const faqs = [
  {
    question: "테몬 블로그에는 어떤 글이 올라오나요?",
    answer:
      "성격, 관계, 취향, 일상, 직장·공부, 디지털 습관처럼 테몬 퀴즈와 직접 연결되는 해석 글을 제공합니다.",
  },
  {
    question: "블로그 글과 테스트는 어떻게 연결되나요?",
    answer:
      "글에서는 퀴즈 결과를 읽는 기준을 설명하고, 본문과 하단의 내부 링크로 바로 참여할 수 있는 관련 테스트를 연결합니다.",
  },
  {
    question: "퀴즈 결과를 진단처럼 봐도 되나요?",
    answer:
      "아닙니다. 테몬 퀴즈는 자기이해와 대화를 위한 엔터테인먼트 콘텐츠이며 전문 진단이나 상담을 대체하지 않습니다.",
  },
];

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function categoryClass(category: BlogPost["category"]): string {
  const tones: Record<BlogPost["category"], string> = {
    심리: "bg-violet-100 text-violet-800",
    관계: "bg-rose-100 text-rose-800",
    취향: "bg-amber-100 text-amber-800",
    일상: "bg-emerald-100 text-emerald-800",
    "직장·공부": "bg-cyan-100 text-cyan-800",
    디지털: "bg-slate-200 text-slate-800",
  };

  return tones[category];
}

function buildCollectionSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}/blog`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
        description: post.description,
      })),
    },
  };
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: BASE_URL },
    { name: "블로그", url: `${BASE_URL}/blog` },
  ]);
  const faqSchema = createFAQSchema(faqs);
  const collectionSchema = buildCollectionSchema(posts);

  return (
    <>
      <JsonLd id="blog-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="blog-faq-schema" data={faqSchema} />
      <JsonLd id="blog-collection-schema" data={collectionSchema} />

      <div className="min-h-screen bg-slate-50 text-slate-950">
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <Badge className="mb-5 border-0 bg-violet-100 px-4 py-2 text-violet-800">
                테몬 퀴즈 블로그
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                무료 MBTI 테스트 결과를 더 잘 읽는 글 모음
              </h1>
              <p className="article-summary key-takeaways mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                테몬 블로그는 무료 MBTI 테스트, 성격 테스트, 음식 취향 테스트,
                연애 테스트 결과를 더 깊게 읽기 위한 해석 글입니다. 결과를
                단정하지 않고 선택 습관과 대화 힌트로 연결합니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-lg bg-slate-950 text-white">
                  <Link href="#featured-posts">
                    글 읽기
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg">
                  <Link href="/tests">퀴즈 바로가기</Link>
                </Button>
              </div>
            </div>

            <ContentToc items={tocItems} title="목차" className="lg:sticky lg:top-24 lg:self-start" />
          </div>
        </section>

        <section id="intent-guide" className="scroll-mt-24 px-4 pb-12">
          <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-600" aria-hidden="true" />
              <h2 className="text-2xl font-black md:text-3xl">
                검색 주제별 해석 가이드
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {intentGuides.map((guide) => (
                <article
                  key={guide.href}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-lg font-black text-slate-950">
                    {guide.query}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {guide.description}
                  </p>
                  <Link
                    href={guide.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-700"
                  >
                    가이드 읽기
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-posts" className="scroll-mt-24 px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-600" aria-hidden="true" />
              <h2 className="text-2xl font-black md:text-3xl">추천 글</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${categoryClass(post.category)}`}
                    >
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readingMinutes}분
                    </span>
                  </div>
                  <h3 className="text-xl font-black leading-snug text-slate-950">
                    <Link href={`/blog/${post.slug}`} className="hover:text-violet-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-700">
                    {post.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      {formatDate(post.publishedAt)}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-violet-700"
                    >
                      자세히 읽기
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="category-guide" className="scroll-mt-24 px-4 pb-12">
          <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-600" aria-hidden="true" />
              <h2 className="text-2xl font-black">카테고리별 보기</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const count = posts.filter((post) => post.category === category).length;
                return (
                  <div
                    key={category}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryClass(category)}`}>
                      {category}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {category} 주제 글 {count}개를 읽고 관련 퀴즈로 바로 이어갈 수 있습니다.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="reading-guide" className="scroll-mt-24 px-4 pb-12">
          <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpenText className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl font-black">읽는 방법</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "먼저 글에서 결과를 읽는 기준을 확인합니다.",
                "본문 중간의 체크리스트와 표로 내 선택 습관을 비교합니다.",
                "하단 관련 퀴즈를 진행하고 결과를 친구와 공유합니다.",
              ].map((item, index) => (
                <div key={item} className="rounded-lg bg-slate-50 p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="blog-faq" className="scroll-mt-24 px-4 pb-16">
          <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">자주 묻는 질문</h2>
            <div className="mt-5 grid gap-4">
              {faqs.map((faq) => (
                <section key={faq.question} className="rounded-lg bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-950">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
