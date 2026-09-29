"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostsForTest } from "@/lib/blog-for-test";

interface RelatedBlogPostsProps {
  testId: string;
  title?: string;
}

/**
 * 이 퀴즈를 다룬 블로그 글로 향하는 내부 링크 섹션.
 * 관련 글이 없으면 아무것도 렌더링하지 않는다.
 */
export function RelatedBlogPosts({
  testId,
  title = "더 깊이 읽어보기",
}: RelatedBlogPostsProps) {
  const posts = getBlogPostsForTest(testId);

  if (posts.length === 0) return null;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-950">
        <BookOpen className="h-5 w-5 text-orange-500" />
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex min-h-[200px] flex-col rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex rounded-full bg-slate-200 px-2.5 py-1 text-slate-700">
                {post.category}
              </span>
              <span>{post.readingMinutes}분 읽기</span>
            </div>
            <h3 className="break-keep text-base font-bold leading-snug text-slate-950">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 break-keep text-sm leading-6 text-slate-600">
              {post.reason || post.description}
            </p>
            <Button asChild variant="outline" className="mt-4 bg-white">
              <Link href={`/blog/${post.slug}`}>
                글 읽기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
