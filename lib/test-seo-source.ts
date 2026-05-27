import { and, eq, or } from "drizzle-orm";
import { getDb, isDbAvailable } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { getAllTests } from "@/lib/tests-config";

export interface TestSeoSource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  avgMinutes: number;
  resultTypeCount: number;
}

const DEFAULT_CATEGORY = "성격";
const DEFAULT_QUESTION_COUNT = 12;
const DEFAULT_AVG_MINUTES = 3;
const DEFAULT_RESULT_TYPE_COUNT = 16;

function stripEmoji(title: string) {
  return title.replace(/[^\w\s가-힣]/g, "").trim() || title;
}

export function getCleanTestTitle(title: string) {
  return stripEmoji(title);
}

export async function getPublishedTestSeoSource(
  slugOrId: string,
): Promise<TestSeoSource | null> {
  if (isDbAvailable()) {
    const dbResult = await getDbTest(slugOrId);
    if (dbResult) return dbResult;
  }

  const staticTest = getAllTests().find(
    (test) => test.id === slugOrId || test.href === `/tests/${slugOrId}`,
  );
  if (!staticTest) return null;

  return {
    id: staticTest.id,
    slug: staticTest.id,
    title: staticTest.title,
    description: staticTest.description,
    category: staticTest.category || DEFAULT_CATEGORY,
    questionCount: DEFAULT_QUESTION_COUNT,
    avgMinutes: DEFAULT_AVG_MINUTES,
    resultTypeCount: DEFAULT_RESULT_TYPE_COUNT,
  };
}

async function getDbTest(slugOrId: string): Promise<TestSeoSource | null> {
  try {
    const row = await getDb()
      .select({
        id: tests.id,
        slug: tests.slug,
        title: tests.title,
        description: tests.description,
        category: tests.category,
        questionCount: tests.questionCount,
        avgMinutes: tests.avgMinutes,
        resultTypeCount: tests.resultTypeCount,
      })
      .from(tests)
      .where(
        and(
          or(eq(tests.id, slugOrId), eq(tests.slug, slugOrId)),
          eq(tests.status, "published"),
        ),
      )
      .limit(1)
      .get();

    if (!row) return null;

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      category: row.category || DEFAULT_CATEGORY,
      questionCount: row.questionCount || DEFAULT_QUESTION_COUNT,
      avgMinutes: row.avgMinutes || DEFAULT_AVG_MINUTES,
      resultTypeCount: row.resultTypeCount || DEFAULT_RESULT_TYPE_COUNT,
    };
  } catch {
    return null;
  }
}
