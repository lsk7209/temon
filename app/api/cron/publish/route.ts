import { NextResponse } from "next/server";
import { asc, and, desc, eq, lte } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { submitUrlsToIndexNow } from "@/lib/indexnow";
import { submitGoogleSearchUpdates } from "@/lib/google-search-submit";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const MIN_PUBLISH_QUALITY_SCORE = 90;
const SEARCH_SUBMISSION_VERSION = "1.0";
const DEFAULT_SEARCH_RETRY_BATCH_SIZE = 10;
const MAX_SEARCH_RETRY_BATCH_SIZE = 50;
const DEFAULT_SEARCH_RETRY_SCAN_LIMIT = 50;
const MAX_SEARCH_RETRY_SCAN_LIMIT = 100;

function parseMetadata(value: unknown) {
  if (!value) return {};
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value !== "string") return {};

  try {
    const parsed = JSON.parse(value) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, unknown>;
    }
    return parseMetadata(parsed);
  } catch {
    return {};
  }
}

function getQualityScore(metadata: Record<string, unknown>) {
  const quality = metadata.quality;
  if (!quality || typeof quality !== "object") return null;

  const score = (quality as { score?: unknown }).score;
  return typeof score === "number" ? score : null;
}

function isPublishableByQuality(metadata: Record<string, unknown>) {
  const score = getQualityScore(metadata);
  return typeof score === "number" && score >= MIN_PUBLISH_QUALITY_SCORE;
}

function getBlockedDraftSummary(
  draftTest: typeof tests.$inferSelect,
  metadata: Record<string, unknown>,
) {
  return {
    id: draftTest.id,
    slug: draftTest.slug,
    title: draftTest.title,
    qualityScore: getQualityScore(metadata),
    requiredScore: MIN_PUBLISH_QUALITY_SCORE,
  };
}

function getSearchConsoleProperty(baseUrl: string) {
  const host = new URL(baseUrl).host.replace(/^www\./, "");

  return (
    process.env.GSC_SITE_URL ||
    process.env.GSC_PROPERTY_URL ||
    `sc-domain:${host}`
  ).trim();
}

function getSitemapUrl(baseUrl: string) {
  return (process.env.GSC_SITEMAP_URL || `${baseUrl}/sitemap.xml`).trim();
}

function getSearchRetryBatchSize() {
  const configured = Number.parseInt(
    process.env.SEARCH_SUBMISSION_RETRY_BATCH_SIZE || "",
    10,
  );
  const batchSize = Number.isFinite(configured)
    ? configured
    : DEFAULT_SEARCH_RETRY_BATCH_SIZE;

  return Math.min(Math.max(batchSize, 1), MAX_SEARCH_RETRY_BATCH_SIZE);
}

function getSearchRetryScanLimit() {
  const configured = Number.parseInt(
    process.env.SEARCH_SUBMISSION_RETRY_SCAN_LIMIT || "",
    10,
  );
  const scanLimit = Number.isFinite(configured)
    ? configured
    : DEFAULT_SEARCH_RETRY_SCAN_LIMIT;

  return Math.min(Math.max(scanLimit, 1), MAX_SEARCH_RETRY_SCAN_LIMIT);
}

function buildPublishedUrls(
  baseUrl: string,
  slug: string,
  includeIndexUrl: boolean,
) {
  const testUrl = `${baseUrl}/tests/${slug}`;
  return includeIndexUrl ? [`${baseUrl}/tests`, testUrl] : [testUrl];
}

function buildSearchSubmissionMetadata(
  publishedUrls: string[],
  baseUrl: string,
  indexNow: Awaited<ReturnType<typeof submitUrlsToIndexNow>>,
  googleSearch: Awaited<ReturnType<typeof submitGoogleSearchUpdates>>,
) {
  return {
    version: SEARCH_SUBMISSION_VERSION,
    status: "completed",
    submittedAt: new Date().toISOString(),
    publishedUrls,
    indexNow: {
      success: indexNow.success,
      submitted: indexNow.submitted,
      endpoints: indexNow.results.map((result) => {
        if ("status" in result) {
          return {
            endpoint: result.endpoint,
            ok: result.ok,
            status: result.status,
          };
        }

        return {
          endpoint: result.endpoint,
          ok: false,
          error: result.error,
        };
      }),
    },
    googleSearch: {
      configured: googleSearch.configured,
      gscProperty: getSearchConsoleProperty(baseUrl),
      sitemapUrl: getSitemapUrl(baseUrl),
      sitemapSubmitted: googleSearch.sitemapSubmitted,
      indexingSubmitted: googleSearch.indexingSubmitted,
      indexingSkipped: googleSearch.indexingSkipped,
      errors: googleSearch.errors,
    },
  };
}

function buildPendingSearchSubmissionMetadata(publishedUrls: string[], baseUrl: string) {
  return {
    version: SEARCH_SUBMISSION_VERSION,
    status: "pending",
    queuedAt: new Date().toISOString(),
    publishedUrls,
    indexNow: {
      success: false,
      submitted: 0,
      endpoints: [],
    },
    googleSearch: {
      configured: false,
      gscProperty: getSearchConsoleProperty(baseUrl),
      sitemapUrl: getSitemapUrl(baseUrl),
      sitemapSubmitted: false,
      indexingSubmitted: 0,
      indexingSkipped: publishedUrls.length,
      errors: [],
    },
  };
}

function buildFailedSearchSubmissionMetadata(
  publishedUrls: string[],
  baseUrl: string,
  error: unknown,
) {
  const pending = buildPendingSearchSubmissionMetadata(publishedUrls, baseUrl);
  return {
    ...pending,
    status: "failed",
    failedAt: new Date().toISOString(),
    googleSearch: {
      ...pending.googleSearch,
      errors: [error instanceof Error ? error.message : String(error)],
    },
  };
}

function shouldRetrySearchSubmission(metadata: Record<string, unknown>) {
  const searchSubmission = metadata.searchSubmission;
  if (!searchSubmission || typeof searchSubmission !== "object") return true;

  const status = (searchSubmission as { status?: unknown }).status;
  return status === "pending" || status === "failed";
}

async function retryPendingSearchSubmissions(
  db: ReturnType<typeof getDb>,
  baseUrl: string,
) {
  const publishedTests = await db
    .select()
    .from(tests)
    .where(eq(tests.status, "published"))
    .orderBy(desc(tests.updatedAt))
    .limit(getSearchRetryScanLimit());

  const retryableTests = publishedTests.filter((test) =>
    shouldRetrySearchSubmission(parseMetadata(test.metadata)),
  );
  const retryBatchSize = getSearchRetryBatchSize();
  const retryTargets = retryableTests.slice(0, retryBatchSize);
  const retryItems = retryTargets.map((retryTarget) => {
    const publishedUrls = buildPublishedUrls(baseUrl, retryTarget.slug, false);
    return {
      test: retryTarget,
      existingMetadata: parseMetadata(retryTarget.metadata),
      publishedUrls,
    };
  });

  for (const retryItem of retryItems) {
    await db
      .update(tests)
      .set({
        metadata: {
          ...retryItem.existingMetadata,
          searchSubmission: buildPendingSearchSubmissionMetadata(
            retryItem.publishedUrls,
            baseUrl,
          ),
        },
        updatedAt: new Date(),
      })
      .where(eq(tests.id, retryItem.test.id));
  }

  let indexNow: Awaited<ReturnType<typeof submitUrlsToIndexNow>> | null = null;
  let googleSearch: Awaited<ReturnType<typeof submitGoogleSearchUpdates>> | null = null;
  const submittedUrls = retryItems.flatMap((retryItem) => retryItem.publishedUrls);
  const retried = [];

  try {
    if (submittedUrls.length > 0) {
      [indexNow, googleSearch] = await Promise.all([
        submitUrlsToIndexNow(submittedUrls),
        submitGoogleSearchUpdates(submittedUrls),
      ]);
    }

    for (const retryItem of retryItems) {
      if (!indexNow || !googleSearch) continue;

      const searchSubmission = buildSearchSubmissionMetadata(
        retryItem.publishedUrls,
        baseUrl,
        {
          ...indexNow,
          submitted: retryItem.publishedUrls.length,
        },
        googleSearch,
      );

      await db
        .update(tests)
        .set({
          metadata: {
            ...retryItem.existingMetadata,
            searchSubmission,
          },
          updatedAt: new Date(),
        })
        .where(eq(tests.id, retryItem.test.id));

      retried.push({
        id: retryItem.test.id,
        slug: retryItem.test.slug,
        searchSubmission,
      });
    }
  } catch (error) {
    console.error("Search submission retry batch failed:", error);

    for (const retryItem of retryItems) {
      const searchSubmission = buildFailedSearchSubmissionMetadata(
        retryItem.publishedUrls,
        baseUrl,
        error,
      );

      await db
        .update(tests)
        .set({
          metadata: {
            ...retryItem.existingMetadata,
            searchSubmission,
          },
          updatedAt: new Date(),
        })
        .where(eq(tests.id, retryItem.test.id));

      retried.push({
        id: retryItem.test.id,
        slug: retryItem.test.slug,
        searchSubmission,
      });
    }
  }

  return {
    scanned: publishedTests.length,
    retryable: retryableTests.length,
    batchSize: retryBatchSize,
    submittedUrls: submittedUrls.length,
    indexNow,
    googleSearch,
    retried,
  };
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    const now = new Date();
    const baseUrl = getSiteUrl();

    const dueDrafts = await db
      .select()
      .from(tests)
      .where(and(eq(tests.status, "draft"), lte(tests.publishedAt, now)))
      .orderBy(asc(tests.publishedAt), asc(tests.createdAt));

    if (dueDrafts.length === 0) {
      const retriedSearchSubmissions = await retryPendingSearchSubmissions(db, baseUrl);
      return NextResponse.json({
        message: "No due draft tests available",
        retriedSearchSubmissions,
      });
    }

    const blockedDrafts = [];
    let draftTest: typeof tests.$inferSelect | null = null;

    for (const candidate of dueDrafts) {
      const metadata = parseMetadata(candidate.metadata);
      if (isPublishableByQuality(metadata)) {
        draftTest = candidate;
        break;
      }
      blockedDrafts.push(getBlockedDraftSummary(candidate, metadata));
    }

    if (!draftTest) {
      return NextResponse.json({
        success: false,
        message: "Due drafts blocked by quality gate",
        blockedTests: blockedDrafts,
      });
    }

    const publishedUrls = buildPublishedUrls(baseUrl, draftTest.slug, true);
    const existingMetadata = parseMetadata(draftTest.metadata);
    const pendingSearchSubmission = buildPendingSearchSubmissionMetadata(
      publishedUrls,
      baseUrl,
    );

    const result = await db
      .update(tests)
      .set({
        status: "published",
        metadata: {
          ...existingMetadata,
          searchSubmission: pendingSearchSubmission,
        },
        updatedAt: now,
      })
      .where(and(eq(tests.id, draftTest.id), eq(tests.status, "draft")));

    if (result.rowsAffected === 0) {
      return NextResponse.json({
        message: "Test already published by another job",
      });
    }

    let searchSubmission: Record<string, unknown> = pendingSearchSubmission;
    let indexNow: Awaited<ReturnType<typeof submitUrlsToIndexNow>> | null = null;
    let googleSearch: Awaited<ReturnType<typeof submitGoogleSearchUpdates>> | null = null;

    try {
      [indexNow, googleSearch] = await Promise.all([
        submitUrlsToIndexNow(publishedUrls),
        submitGoogleSearchUpdates(publishedUrls),
      ]);
      searchSubmission = buildSearchSubmissionMetadata(
        publishedUrls,
        baseUrl,
        indexNow,
        googleSearch,
      );
    } catch (error) {
      console.error("Search submission failed after publish:", error);
      searchSubmission = buildFailedSearchSubmissionMetadata(
        publishedUrls,
        baseUrl,
        error,
      );
    }

    try {
      await db
        .update(tests)
        .set({
          metadata: {
            ...existingMetadata,
            searchSubmission,
          },
          updatedAt: new Date(),
        })
        .where(eq(tests.id, draftTest.id));
    } catch (error) {
      console.error("Failed to persist search submission metadata:", error);
    }

    return NextResponse.json({
      success: true,
      publishedTest: {
        id: draftTest.id,
        slug: draftTest.slug,
        title: draftTest.title,
        scheduledAt: draftTest.publishedAt,
      },
      publishedUrls,
      skippedByQualityGate: blockedDrafts,
      searchSubmission,
      indexNow,
      googleSearch,
    });
  } catch (error: unknown) {
    console.error("Publish Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to publish test" },
      { status: 500 },
    );
  }
}
