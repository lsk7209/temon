/**
 * IndexNow API Integration
 * 
 * Automatically notifies search engines (Naver, Bing, etc.) about content changes.
 * Used for real-time indexing of new tests and updates.
 */

import { getSiteUrl } from "@/lib/site-url";

const DEFAULT_KEY = process.env.INDEXNOW_KEY || "";
export const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/IndexNow",
  "https://searchadvisor.naver.com/indexnow",
  "https://yandex.com/indexnow",
] as const;

export interface IndexNowResponse {
  success: boolean;
  message: string;
  submitted: number;
  results: IndexNowEndpointResult[];
}

export type IndexNowEndpointResult =
  | {
      endpoint: string;
      ok: boolean;
      status: number;
      statusText: string;
    }
  | {
      endpoint: string;
      ok: false;
      error: string;
    };

export const INDEXNOW_DEFAULT_PATHS = [
  "/",
  "/tests",
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/rss.xml",
  "/feed.xml",
  "/llms.txt",
  "/llms-full.txt",
  "/ai-index.json",
] as const;

export function getDefaultIndexNowUrls(baseUrl?: string): string[] {
  const host = baseUrl ? baseUrl.trim().replace(/\/+$/, "") : getSiteUrl();

  return INDEXNOW_DEFAULT_PATHS.map((path) => `${host}${path}`);
}

function getIndexNowConfig() {
  const normalizedBaseUrl = getSiteUrl();
  const host = new URL(normalizedBaseUrl).host;
  const key = (process.env.INDEXNOW_KEY || DEFAULT_KEY).trim();

  return {
    normalizedBaseUrl,
    host,
    key,
    keyLocation: `${normalizedBaseUrl}/${key}.txt`,
  };
}

function normalizeUrls(urls: string[], host: string) {
  return Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean)
        .filter((url) => {
          try {
            return new URL(url).host === host;
          } catch {
            return false;
          }
        }),
    ),
  );
}

/**
 * Submit URLs to IndexNow
 * @param urls Array of absolute URLs to submit (e.g., ['https://temon.kr/tests/new-test'])
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  const { host, key, keyLocation } = getIndexNowConfig();

  if (!key) {
    return {
      success: false,
      message: "INDEXNOW_KEY not configured",
      submitted: 0,
      results: [],
    };
  }

  if (!urls.length) {
    return {
      success: false,
      message: "No URLs provided",
      submitted: 0,
      results: [],
    };
  }

  const validUrls = normalizeUrls(urls, host);

  if (!validUrls.length) {
    return {
      success: false,
      message: "No valid URLs for host found",
      submitted: 0,
      results: [],
    };
  }

  const payload = {
    host,
    key,
    keyLocation,
    urlList: validUrls,
  };

  const settledResults = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8_000),
      });

      return {
        endpoint,
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
      };
    }),
  );

  const results: IndexNowEndpointResult[] = settledResults.map((result, index) => {
    if (result.status === "fulfilled") return result.value;

    return {
      endpoint: INDEXNOW_ENDPOINTS[index],
      ok: false,
      error: result.reason instanceof Error ? result.reason.message : String(result.reason),
    };
  });

  const accepted = results.some((result) => "status" in result && [200, 202].includes(result.status));

  return {
    success: accepted,
    message: accepted
      ? `Successfully submitted ${validUrls.length} URLs to at least one IndexNow endpoint`
      : "IndexNow submission was not accepted by any endpoint",
    submitted: validUrls.length,
    results,
  };
}
