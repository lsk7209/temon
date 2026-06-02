import { desc, eq } from "drizzle-orm";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { getIndexableTests } from "@/lib/visible-tests";
import { getSiteUrl } from "@/lib/site-url";

export interface AiIndexTest {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

function getStaticTests(): AiIndexTest[] {
  return getIndexableTests().map((test) => ({
    id: test.id,
    title: test.title,
    description: test.description,
    category: test.category,
    url: test.href,
  }));
}

async function getDynamicTests(): Promise<AiIndexTest[]> {
  if (!isDbAvailable()) {
    return [];
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        id: tests.id,
        slug: tests.slug,
        title: tests.title,
        description: tests.description,
        category: tests.category,
      })
      .from(tests)
      .where(eq(tests.status, "published"))
      .orderBy(desc(tests.createdAt))
      .all();

    return rows.map((test) => ({
      id: test.id,
      title: test.title,
      description: test.description || "",
      category: normalizeCategory(test.category),
      url: `/tests/${test.slug}`,
    }));
  } catch (error) {
    console.error("Failed to build AI content index", error);
    return [];
  }
}

function normalizeCategory(category: string | null): string {
  if (!category || category === "ai-generated" || category === "personality") {
    return "성격 테스트";
  }

  return category;
}

export async function getAiIndexTests(): Promise<AiIndexTest[]> {
  const dynamicTests = await getDynamicTests();
  const staticTests = getStaticTests();
  const testsByUrl = new Map<string, AiIndexTest>();

  [...dynamicTests, ...staticTests].forEach((test) => {
    if (!testsByUrl.has(test.url)) {
      testsByUrl.set(test.url, test);
    }
  });

  return Array.from(testsByUrl.values());
}

export function getAiIndexCategories(items: AiIndexTest[]): string[] {
  return Array.from(new Set(items.map((test) => test.category))).sort();
}

export function toAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${getSiteUrl()}${path}`;
}
