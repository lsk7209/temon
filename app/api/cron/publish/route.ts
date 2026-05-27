import { NextResponse } from "next/server";
import { asc, and, eq, lte } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { tests } from "@/lib/db/schema";
import { submitUrlsToIndexNow } from "@/lib/indexnow";

export const dynamic = "force-dynamic";
const MIN_PUBLISH_QUALITY_SCORE = 90;

function parseMetadata(value: unknown) {
  if (!value) return {};
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value !== "string") return {};

  try {
    return JSON.parse(value) as Record<string, unknown>;
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

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = getDb();
    const now = new Date();
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://temon.kr").replace(
      /\/$/,
      "",
    );

    const dueDrafts = await db
      .select()
      .from(tests)
      .where(and(eq(tests.status, "draft"), lte(tests.publishedAt, now)))
      .orderBy(asc(tests.publishedAt), asc(tests.createdAt));

    if (dueDrafts.length === 0) {
      return NextResponse.json({ message: "No due draft tests available" });
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

    const result = await db
      .update(tests)
      .set({
        status: "published",
        updatedAt: now,
      })
      .where(and(eq(tests.id, draftTest.id), eq(tests.status, "draft")));

    if (result.rowsAffected === 0) {
      return NextResponse.json({
        message: "Test already published by another job",
      });
    }

    const publishedUrls = [`${baseUrl}/tests`, `${baseUrl}/tests/${draftTest.slug}`];
    const indexNow = await submitUrlsToIndexNow(publishedUrls);

    return NextResponse.json({
      success: true,
      publishedTest: {
        id: draftTest.id,
        slug: draftTest.slug,
        title: draftTest.title,
        scheduledAt: draftTest.publishedAt,
      },
      skippedByQualityGate: blockedDrafts,
      indexNow,
    });
  } catch (error: unknown) {
    console.error("Publish Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to publish test" },
      { status: 500 },
    );
  }
}
