import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/cron/publish/route";
import { getDb } from "@/lib/db/client";
import { submitUrlsToIndexNow } from "@/lib/indexnow";
import { submitGoogleSearchUpdates } from "@/lib/google-search-submit";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

vi.mock("@/lib/db/client", () => ({ getDb: vi.fn() }));
vi.mock("@/lib/indexnow", () => ({ submitUrlsToIndexNow: vi.fn() }));
vi.mock("@/lib/google-search-submit", () => ({ submitGoogleSearchUpdates: vi.fn() }));
vi.mock("@/lib/site-url", () => ({ getSiteUrl: () => "https://example.test" }));

type Row = {
  id: string;
  slug: string;
  title: string;
  status: string;
  publishedAt: Date;
  metadata: Record<string, unknown>;
};

const request = (authorized = true) =>
  new Request("https://example.test/api/cron/publish", {
    headers: authorized ? { authorization: "Bearer isolated-test-secret" } : {},
  });

const row = (score: number, status = "draft", submissionStatus?: string): Row => ({
  id: "test-1",
  slug: "sample",
  title: "Sample",
  status,
  publishedAt: new Date(0),
  metadata: {
    quality: { score },
    ...(submissionStatus ? { searchSubmission: { status: submissionStatus } } : {}),
  },
});

function mockDb(reads: Row[][], target?: Row, rejectClaim = false) {
  const writes: Array<Record<string, unknown>> = [];
  const db = {
    select: vi.fn(() => ({
      from: () => ({
        where: () => ({
          orderBy: () => {
            const result = reads.shift() ?? [];
            return Object.assign(Promise.resolve(result), {
              limit: () => Promise.resolve(result),
            });
          },
        }),
      }),
    })),
    update: vi.fn(() => ({
      set: (values: Record<string, unknown>) => ({
        where: async () => {
          if (rejectClaim) return { rowsAffected: 0 };
          writes.push(values);
          if (target) Object.assign(target, values);
          return { rowsAffected: 1 };
        },
      }),
    })),
  };
  vi.mocked(getDb).mockReturnValue(db as never);
  return { db, writes };
}

const indexResult = (success = true) => ({
  success,
  message: success ? "accepted" : "rejected",
  submitted: success ? 2 : 0,
  results: [{ endpoint: "https://index.example", ok: success, status: success ? 202 : 500, statusText: "" }],
});
const googleResult = (sitemapSubmitted = true) => ({
  configured: true,
  sitemapSubmitted,
  indexingSubmitted: 0,
  indexingSkipped: 2,
  errors: sitemapSubmitted ? [] : ["GSC rejected sitemap"],
});

beforeEach(() => {
  vi.stubEnv("CRON_SECRET", "isolated-test-secret");
  vi.stubEnv("TEMON_CRON_ENABLED", "true");
  vi.stubEnv("TEMON_CRON_OWNER", "vps");
  vi.stubEnv("TEMON_CRON_INSTANCE", "vps");
  vi.mocked(submitUrlsToIndexNow).mockResolvedValue(indexResult());
  vi.mocked(submitGoogleSearchUpdates).mockResolvedValue(googleResult());
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("publish cron", () => {
  it("rejects missing authorization and disabled publishing before opening a DB", async () => {
    expect((await GET(request(false))).status).toBe(401);
    vi.stubEnv("TEMON_CRON_ENABLED", "false");
    expect((await GET(request())).status).toBe(503);
    vi.stubEnv("TEMON_CRON_ENABLED", "true");
    vi.stubEnv("TEMON_CRON_OWNER", "vercel");
    expect((await GET(request())).status).toBe(503);
    expect(getDb).not.toHaveBeenCalled();
  });

  it("reports an idle run as successful", async () => {
    mockDb([[], []]);
    const body = await (await GET(request())).json();
    expect(body.success).toBe(true);
    expect(body.publishedTest).toBeUndefined();
    expect(submitUrlsToIndexNow).not.toHaveBeenCalled();
  });

  it("publishes only a due draft at quality 90 or above", async () => {
    const blocked = row(89);
    const publishable = { ...row(90), id: "test-2", slug: "qualified" };
    const { writes } = mockDb([[blocked, publishable]], publishable);
    const response = await GET(request());
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.publishedTest.id).toBe("test-2");
    expect(body.skippedByQualityGate).toMatchObject([{ id: "test-1", qualityScore: 89 }]);
    expect(body.searchSubmission.status).toBe("completed");
    expect(writes[0].status).toBe("published");
    expect(submitUrlsToIndexNow).toHaveBeenCalledTimes(1);
  });

  it.each(["quality", "schedule"])("loses the SQL claim after a concurrent %s edit", async (changed) => {
    const client = createClient({ url: "file::memory:" });
    try {
      await client.execute(`CREATE TABLE tests (
        id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL,
        subtitle TEXT, description TEXT, category TEXT, status TEXT NOT NULL,
        published_at INTEGER, question_count INTEGER, avg_minutes INTEGER,
        result_type_count INTEGER, metadata TEXT, created_at INTEGER, updated_at INTEGER
      )`);
      const stale = row(90);
      await client.execute({
        sql: "INSERT INTO tests (id, slug, title, status, published_at, metadata) VALUES (?, ?, ?, ?, ?, ?)",
        args: [stale.id, stale.slug, stale.title, "draft",
          changed === "schedule" ? 4102444800 : 0,
          JSON.stringify(changed === "quality" ? { quality: { score: 10 } } : stale.metadata)],
      });
      const liveDb = drizzle(client);
      const db = {
        select: () => ({ from: () => ({ where: () => ({ orderBy: async () => [stale] }) }) }),
        update: liveDb.update.bind(liveDb),
      };
      vi.mocked(getDb).mockReturnValue(db as never);

      const response = await GET(request());
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.publishedTest).toBeUndefined();
      expect(submitUrlsToIndexNow).not.toHaveBeenCalled();
      expect(submitGoogleSearchUpdates).not.toHaveBeenCalled();
      const saved = await client.execute("SELECT status FROM tests WHERE id = 'test-1'");
      expect(saved.rows[0].status).toBe("draft");
    } finally {
      client.close();
    }
  });

  it.each([
    ["IndexNow rejection", indexResult(false), googleResult()],
    ["Google sitemap failure", indexResult(), googleResult(false)],
  ])("holds %s for review when another provider succeeded", async (_name, index, google) => {
    const published = row(90);
    mockDb([[published], [], [published]], published);
    vi.mocked(submitUrlsToIndexNow).mockResolvedValue(index);
    vi.mocked(submitGoogleSearchUpdates).mockResolvedValue(google);
    const first = await (await GET(request())).json();
    expect(first.searchSubmission.status).toBe("failed");
    expect((published.metadata.searchSubmission as { status: string }).status).toBe("failed");
    const second = await (await GET(request())).json();
    expect(second.searchSubmissions.reviewRequired).toMatchObject([{ id: "test-1" }]);
    expect(second.searchSubmissions.retried).toHaveLength(0);
    expect(submitUrlsToIndexNow).toHaveBeenCalledTimes(1);
  });

  it.each(["pending", "submitting", "failed"])("does not replay ambiguous %s metadata", async (status) => {
    const published = row(90, "published", status);
    mockDb([[], [published]], published);
    const body = await (await GET(request())).json();
    expect(body.searchSubmissions.retried).toHaveLength(0);
    expect(submitUrlsToIndexNow).not.toHaveBeenCalled();
  });

  it("claims a confirmed no-submission failure before retrying", async () => {
    const published = row(90, "published", "failed");
    published.metadata.searchSubmission = {
      status: "failed",
      indexNow: { success: false, submitted: 0, endpoints: [] },
      googleSearch: { configured: false },
    };
    const { writes } = mockDb([[], [published]], published);
    const body = await (await GET(request())).json();
    expect(writes[0].metadata).toMatchObject({ searchSubmission: { status: "submitting" } });
    expect(body.searchSubmissions.retried).toHaveLength(1);
    expect(submitUrlsToIndexNow).toHaveBeenCalledTimes(1);
  });

  it("does not submit when another instance wins the retry claim", async () => {
    const published = row(90, "published", "failed");
    published.metadata.searchSubmission = {
      status: "failed",
      indexNow: { success: false, submitted: 0, endpoints: [] },
      googleSearch: { configured: false },
    };
    mockDb([[], [published]], published, true);
    const body = await (await GET(request())).json();
    expect(body.searchSubmissions.retried).toHaveLength(0);
    expect(submitUrlsToIndexNow).not.toHaveBeenCalled();
  });

  it("leaves an uncertain provider exception claimed for manual review", async () => {
    const published = row(90);
    mockDb([[published], [], [published]], published);
    vi.mocked(submitUrlsToIndexNow).mockRejectedValueOnce(new Error("connection lost"));
    const first = await (await GET(request())).json();
    expect(first.searchSubmission.status).toBe("submitting");
    const second = await (await GET(request())).json();
    expect(second.searchSubmissions.reviewRequired).toMatchObject([{ id: "test-1" }]);
    expect(submitUrlsToIndexNow).toHaveBeenCalledTimes(1);
  });

  it("rejects overlapping requests for the whole run and releases the lock afterward", async () => {
    let release!: (value: ReturnType<typeof indexResult>) => void;
    const delayed = new Promise<ReturnType<typeof indexResult>>((resolve) => { release = resolve; });
    vi.mocked(submitUrlsToIndexNow).mockReturnValue(delayed);
    const published = row(90);
    const { db } = mockDb([[published], []], published);
    const first = GET(request());
    await vi.waitFor(() => expect(submitUrlsToIndexNow).toHaveBeenCalledTimes(1));
    expect((await GET(request())).status).toBe(409);
    expect(db.select).toHaveBeenCalledTimes(1);
    release(indexResult());
    expect((await first).status).toBe(200);
    expect((await GET(request())).status).toBe(200);
  });
});
