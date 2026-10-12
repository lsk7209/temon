import { NextResponse } from "next/server";
import { authorizeCron } from "@/lib/cron-auth";
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
const DEFAULT_SEARCH_RETRY_SCAN_LIMIT = 50;
const MAX_SEARCH_RETRY_SCAN_LIMIT = 100;
let publishRunning = false;

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
  const completed =
    indexNow.success &&
    googleSearch.configured &&
    googleSearch.sitemapSubmitted &&
    googleSearch.errors.length === 0;
  return {
    version: SEARCH_SUBMISSION_VERSION,
    status: completed ? "completed" : "failed",
    submittedAt: new Date().toISOString(),
    ...(completed ? {} : { failedAt: new Date().toISOString() }),
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

function buildSubmittingSearchSubmissionMetadata(publishedUrls: string[], baseUrl: string) {
  return {
    version: SEARCH_SUBMISSION_VERSION,
    status: "submitting",
    startedAt: new Date().toISOString(),
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

function needsSearchSubmissionReview(metadata: Record<string, unknown>) {
  const searchSubmission = metadata.searchSubmission;
  if (!searchSubmission || typeof searchSubmission !== "object") return true;

  const status = (searchSubmission as { status?: unknown }).status;
  return status !== "completed";
}

function canRetryWithoutDuplicate(metadata: Record<string, unknown>) {
  const submission = metadata.searchSubmission as Record<string, unknown> | undefined;
  if (submission?.status !== "failed") return false;
  const indexNow = submission.indexNow as Record<string, unknown> | undefined;
  const google = submission.googleSearch as Record<string, unknown> | undefined;
  // Only retry when neither provider could have received a successful submission.
  // Network errors and partially accepted batches have an unknown outcome.
  return indexNow?.success === false && indexNow.submitted === 0 &&
    Array.isArray(indexNow.endpoints) && indexNow.endpoints.every(
      (endpoint: { status?: number; ok?: boolean }) => endpoint.ok === false &&
        typeof endpoint.status === "number",
    ) && google?.configured === false;
}

async function inspectSearchSubmissions(
  db: ReturnType<typeof getDb>,
  baseUrl: string,
) {
  const publishedTests = await db
    .select()
    .from(tests)
    .where(eq(tests.status, "published"))
    .orderBy(desc(tests.updatedAt))
    .limit(getSearchRetryScanLimit());

  const reviewRequired = publishedTests.filter((test) =>
    needsSearchSubmissionReview(parseMetadata(test.metadata)),
  );
  const retried = [];
  for (const test of publishedTests) {
    const existingMetadata = parseMetadata(test.metadata);
    if (!canRetryWithoutDuplicate(existingMetadata)) continue;
    const publishedUrls = buildPublishedUrls(baseUrl, test.slug, false);
    const claimed = buildSubmittingSearchSubmissionMetadata(publishedUrls, baseUrl);
    const claimedMetadata = { ...existingMetadata, searchSubmission: claimed };
    const claim = await db.update(tests).set({
      metadata: claimedMetadata,
      updatedAt: new Date(),
    }).where(and(eq(tests.id, test.id), eq(tests.metadata, test.metadata)));
    if (claim.rowsAffected !== 1) continue;

    try {
      const [indexNow, googleSearch] = await Promise.all([
        submitUrlsToIndexNow(publishedUrls),
        submitGoogleSearchUpdates(publishedUrls),
      ]);
      const searchSubmission = buildSearchSubmissionMetadata(
        publishedUrls, baseUrl, indexNow, googleSearch,
      );
      await db.update(tests).set({
        metadata: { ...existingMetadata, searchSubmission },
        updatedAt: new Date(),
      }).where(and(eq(tests.id, test.id), eq(tests.metadata, claimedMetadata)));
      retried.push({ id: test.id, slug: test.slug, searchSubmission });
    } catch (error) {
      // An exception may follow external success. Leave the durable claim for review.
      console.error("Search submission retry outcome uncertain:", error);
    }
  }

  return {
    scanned: publishedTests.length,
    reviewRequired: reviewRequired.map((test) => ({ id: test.id, slug: test.slug })),
    retried,
    truncated: publishedTests.length === getSearchRetryScanLimit(),
  };
}

export async function GET(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (process.env.TEMON_CRON_ENABLED === "false") {
    return NextResponse.json({ error: "Publishing disabled" }, { status: 503 });
  }
  if (process.env.TEMON_CRON_OWNER !== "vps" || process.env.TEMON_CRON_INSTANCE !== "vps") {
    return NextResponse.json({ error: "Publisher is not owned by this instance" }, { status: 503 });
  }
  if (publishRunning) {
    return NextResponse.json({ error: "Publishing already in progress" }, { status: 409 });
  }
  publishRunning = true;

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
      const searchSubmissions = await inspectSearchSubmissions(db, baseUrl);
      return NextResponse.json({
        success: true,
        message: "No due draft tests available",
        searchSubmissions,
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
    const pendingSearchSubmission = buildSubmittingSearchSubmissionMetadata(
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
      .where(and(
        eq(tests.id, draftTest.id),
        eq(tests.status, "draft"),
        eq(tests.metadata, draftTest.metadata),
        eq(tests.publishedAt, draftTest.publishedAt!),
      ));

    if (result.rowsAffected === 0) {
      return NextResponse.json({
        success: true,
        message: "Draft changed before publication",
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
      console.error("Search submission outcome uncertain after publish:", error);
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
        .where(and(eq(tests.id, draftTest.id), eq(tests.metadata, {
          ...existingMetadata,
          searchSubmission: pendingSearchSubmission,
        })));
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
  } finally {
    publishRunning = false;
  }
}
