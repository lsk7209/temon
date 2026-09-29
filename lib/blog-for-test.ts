/**
 * 퀴즈(테스트) slug에서 그 퀴즈를 언급하는 블로그 글로 향하는 역방향 인덱스.
 *
 * 블로그 글은 `relatedTests[].href`("/tests/{slug}")로 퀴즈를 링크하지만,
 * 결과/퀴즈 페이지에서 블로그로 돌아가는 내부 링크는 없었다. 이 모듈은
 * 빌드 시점에 매핑을 뒤집어 slug당 관련 글 목록을 제공한다(런타임 비용 없음).
 */

import { getAllBlogPosts, type BlogPost } from "@/lib/blog-posts";

export type RelatedBlogLink = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  /** 이 글이 해당 퀴즈를 관련 테스트로 소개한 이유(있으면). */
  reason?: string;
};

const TEST_HREF = /^\/tests\/([^/?#]+)/;

function buildIndex(): Map<string, RelatedBlogLink[]> {
  const index = new Map<string, RelatedBlogLink[]>();
  for (const post of getAllBlogPosts()) {
    for (const related of post.relatedTests) {
      const match = TEST_HREF.exec(related.href);
      const slug = match?.[1];
      if (!slug) continue;
      const list = index.get(slug) ?? [];
      // 같은 글이 한 퀴즈에 중복 등록되지 않도록 방지
      if (list.some((item) => item.slug === post.slug)) continue;
      list.push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        readingMinutes: post.readingMinutes,
        reason: related.reason,
      });
      index.set(slug, list);
    }
  }
  return index;
}

let cachedIndex: Map<string, RelatedBlogLink[]> | null = null;

/**
 * 주어진 퀴즈 slug를 관련 테스트로 언급한 블로그 글 목록을 반환한다.
 * 최신 글 우선(발행일 내림차순), 최대 `limit`개.
 */
export function getBlogPostsForTest(slug: string, limit = 3): RelatedBlogLink[] {
  if (!cachedIndex) cachedIndex = buildIndex();
  const posts = cachedIndex.get(slug);
  if (!posts || posts.length === 0) return [];
  return posts.slice(0, limit);
}

/** 테스트용: 원본 블로그 글 배열 재노출(현재 미사용, 확장 대비). */
export type { BlogPost };
