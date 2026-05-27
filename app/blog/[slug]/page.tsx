import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HelpCircle,
  LinkIcon,
} from "lucide-react";
import { ContentToc } from "@/components/content-toc";
import {
  JsonLd,
  createArticleSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  type BlogPost,
  type BlogSection,
} from "@/lib/blog-posts";

const BASE_URL = "https://temon.kr";

export const revalidate = 86400;

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;

  return {
    title: `${post.title} - 테몬`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${BASE_URL}${url}`,
      siteName: "테몬",
      locale: "ko_KR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.keywords,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.description)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function buildToc(post: BlogPost) {
  return post.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));
}

function renderTable(section: BlogSection) {
  if (!section.table) return null;

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-100 text-slate-950">
          <tr>
            {section.table.headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-black">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {section.table.rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} className="px-4 py-3 leading-7 text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlogSectionBlock({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className="scroll-mt-24 border-t border-slate-200 py-10">
      <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
        {section.title}
      </h2>
      <p className="mt-3 text-lg font-semibold leading-8 text-slate-700">
        {section.lead}
      </p>
      <div className="mt-6 space-y-5">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[1.06rem] leading-9 text-slate-800">
            {paragraph}
          </p>
        ))}
      </div>

      {section.checklist ? (
        <div className="my-7 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="font-black text-emerald-950">확인 체크리스트</h3>
          <ul className="mt-4 grid gap-3">
            {section.checklist.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-emerald-950">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {renderTable(section)}

      {section.note ? (
        <aside className="my-7 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <h3 className="font-black">주의해서 읽기</h3>
          <p className="mt-2 leading-8">{section.note}</p>
        </aside>
      ) : null}
    </section>
  );
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const url = `${BASE_URL}/blog/${post.slug}`;
  const tocItems = buildToc(post);
  const articleSchema = createArticleSchema({
    headline: post.title,
    description: post.description,
    url,
    image: `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      name: "테몬 편집팀",
      url: BASE_URL,
    },
  });
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "홈", url: BASE_URL },
    { name: "블로그", url: `${BASE_URL}/blog` },
    { name: post.title, url },
  ]);
  const faqSchema = createFAQSchema(post.faqs);

  return (
    <>
      <JsonLd id="blog-detail-article-schema" data={articleSchema} />
      <JsonLd id="blog-detail-breadcrumb-schema" data={breadcrumbSchema} />
      <JsonLd id="blog-detail-faq-schema" data={faqSchema} />

      <div className="min-h-screen bg-slate-50 text-slate-950">
        <article className="px-4 py-10 md:py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-violet-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                블로그 목록
              </Link>

              <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-violet-100 px-3 py-1 text-violet-800">
                    {post.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-500">
                    <Clock3 className="h-4 w-4" aria-hidden="true" />
                    {post.readingMinutes}분 읽기
                  </span>
                  <span className="text-sm text-slate-500">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                  {post.title}
                </h1>
                <p className="article-summary key-takeaways mt-5 text-lg leading-8 text-slate-700">
                  {post.summary}
                </p>
              </header>

              <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black">핵심 요약</h2>
                <ul className="mt-4 grid gap-3">
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3 leading-7 text-slate-800">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-violet-600" aria-hidden="true" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-6 rounded-lg border border-slate-200 bg-white px-6 shadow-sm md:px-8">
                {post.sections.map((section) => (
                  <BlogSectionBlock key={section.id} section={section} />
                ))}
                <section className="border-t border-slate-200 py-10">
                  <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
                    마무리하며
                  </h2>
                  <div className="mt-6 space-y-5">
                    {post.closing.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[1.06rem] leading-9 text-slate-800"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </div>

              <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                  <h2 className="text-2xl font-black">관련 퀴즈 바로가기</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {post.relatedTests.map((test) => (
                    <Link
                      key={test.href}
                      href={test.href}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-violet-300 hover:bg-violet-50"
                    >
                      <h3 className="font-black text-slate-950">{test.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {test.reason}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-violet-700">
                        테스트 보기
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-cyan-600" aria-hidden="true" />
                  <h2 className="text-2xl font-black">자주 묻는 질문</h2>
                </div>
                <div className="grid gap-4">
                  {post.faqs.map((faq) => (
                    <section key={faq.question} className="rounded-lg bg-slate-50 p-4">
                      <h3 className="font-bold text-slate-950">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
                    </section>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm md:p-8">
                <h2 className="text-2xl font-black">다른 퀴즈 글도 이어서 보기</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="rounded-lg border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
                    >
                      <span className="text-xs font-bold text-violet-200">
                        {related.category}
                      </span>
                      <h3 className="mt-2 font-black leading-snug">{related.title}</h3>
                    </Link>
                  ))}
                </div>
                <Button asChild className="mt-6 rounded-lg bg-white text-slate-950 hover:bg-slate-100">
                  <Link href="/tests">
                    전체 퀴즈 보기
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <ContentToc items={tocItems} title="글 목차" />
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
