import { createSign } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { getSiteUrl } from "@/lib/site-url";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const INDEXING_API_URL =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";
const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const GOOGLE_SEARCH_TIMEOUT_MS = 10_000;
const LOCAL_SERVICE_ACCOUNT_PATH = "D:/env/gsc_credentials.json";
const INDEXING_API_ENABLED = process.env.GSC_INDEXING_API_ENABLED === "true";

/**
 * Google Indexing API는 JobPosting 또는 VideoObject 안의 BroadcastEvent에
 * 한정된 사용 범위다 (R10, https://developers.google.com/search/apis/indexing-api/v3/using-api).
 * 이 사이트는 일반 퀴즈/블로그 콘텐츠만 발행하므로, 플래그가 true여도 이 함수가
 * false를 반환하는 URL은 절대 Indexing API로 보내지 않는다. sitemap 제출(Search
 * Console Sitemaps API)은 이 제한과 무관하며 항상 허용된다.
 *
 * 현재 이 사이트에는 JobPosting/BroadcastEvent 콘텐츠가 없으므로 항상 false를
 * 반환한다. 그런 콘텐츠 타입을 실제로 추가하기 전까지는 화이트리스트를 넓히지 않는다.
 */
function isIndexingApiEligible(_url: string): boolean {
  return false;
}

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

type GoogleSubmitResult = {
  configured: boolean;
  sitemapSubmitted: boolean;
  indexingSubmitted: number;
  indexingSkipped: number;
  errors: string[];
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeMaybeBase64(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("{")) return trimmed;

  try {
    return Buffer.from(trimmed, "base64").toString("utf8");
  } catch {
    return trimmed;
  }
}

function parseServiceAccount(rawValue: string): GoogleServiceAccount | null {
  try {
    const parsed = JSON.parse(decodeMaybeBase64(rawValue)) as Partial<GoogleServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) return null;

    return {
      client_email: parsed.client_email,
      private_key: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

function getServiceAccount(): GoogleServiceAccount | null {
  const rawCredential =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (rawCredential) return parseServiceAccount(rawCredential);

  const credentialPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PATH ||
    LOCAL_SERVICE_ACCOUNT_PATH;
  if (!credentialPath || !existsSync(credentialPath)) return null;

  return parseServiceAccount(readFileSync(credentialPath, "utf8"));
}

function createJwt(serviceAccount: GoogleServiceAccount) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const scope = INDEXING_API_ENABLED
    ? `${INDEXING_SCOPE} ${WEBMASTERS_SCOPE}`
    : WEBMASTERS_SCOPE;
  const payload = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope,
      aud: TOKEN_URL,
      iat: nowSeconds,
      exp: nowSeconds + 3600,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(serviceAccount.private_key);

  return `${unsignedToken}.${base64Url(signature)}`;
}

async function getAccessToken(serviceAccount: GoogleServiceAccount) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJwt(serviceAccount),
    }),
    signal: AbortSignal.timeout(GOOGLE_SEARCH_TIMEOUT_MS),
  });
  const data = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description || data.error || `Google token HTTP ${response.status}`,
    );
  }

  return data.access_token;
}

function getBaseUrl() {
  return getSiteUrl();
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

function normalizeSiteUrls(urls: string[], baseUrl: string) {
  const siteHost = new URL(baseUrl).host;

  return Array.from(
    new Set(
      urls
        .map((url) => (url.startsWith("http") ? url : `${baseUrl}${url}`))
        .filter((url) => {
          try {
            return new URL(url).host === siteHost;
          } catch {
            return false;
          }
        }),
    ),
  );
}

async function submitSitemap(accessToken: string, baseUrl: string) {
  const propertyUrl = getSearchConsoleProperty(baseUrl);
  const sitemapUrl = getSitemapUrl(baseUrl);
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    propertyUrl,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(GOOGLE_SEARCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GSC sitemap HTTP ${response.status}: ${text.slice(0, 180)}`);
  }
}

async function submitIndexingUrl(accessToken: string, url: string) {
  const response = await fetch(INDEXING_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
    signal: AbortSignal.timeout(GOOGLE_SEARCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Indexing API HTTP ${response.status}: ${text.slice(0, 180)}`);
  }
}

export async function submitGoogleSearchUpdates(
  urls: string[],
): Promise<GoogleSubmitResult> {
  const serviceAccount = getServiceAccount();
  if (!serviceAccount) {
    return {
      configured: false,
      sitemapSubmitted: false,
      indexingSubmitted: 0,
      indexingSkipped: urls.length,
      errors: ["Google service account credentials are not configured"],
    };
  }

  const result: GoogleSubmitResult = {
    configured: true,
    sitemapSubmitted: false,
    indexingSubmitted: 0,
    indexingSkipped: 0,
    errors: [],
  };
  const baseUrl = getBaseUrl();
  const normalizedUrls = normalizeSiteUrls(urls, baseUrl);

  try {
    const accessToken = await getAccessToken(serviceAccount);

    try {
      await submitSitemap(accessToken, baseUrl);
      result.sitemapSubmitted = true;
    } catch (error) {
      result.errors.push(error instanceof Error ? error.message : String(error));
    }

    if (!INDEXING_API_ENABLED) {
      result.indexingSkipped = normalizedUrls.length;
      return result;
    }

    // 플래그가 true여도 콘텐츠 자격이 없는 URL(이 사이트의 일반 퀴즈/블로그 전부)은
    // 요청 자체를 만들지 않고 차단한다 (F15/R10).
    const eligibleUrls = normalizedUrls.filter((url) => isIndexingApiEligible(url));
    const ineligibleCount = normalizedUrls.length - eligibleUrls.length;
    if (ineligibleCount > 0) {
      result.indexingSkipped += ineligibleCount;
      result.errors.push(
        `${ineligibleCount} URL(s) skipped: not eligible for the Indexing API (JobPosting/BroadcastEvent only, R10)`,
      );
    }
    if (eligibleUrls.length === 0) {
      return result;
    }

    const settled = await Promise.allSettled(
      eligibleUrls.map((url) => submitIndexingUrl(accessToken, url)),
    );

    for (const item of settled) {
      if (item.status === "fulfilled") {
        result.indexingSubmitted += 1;
      } else {
        result.indexingSkipped += 1;
        result.errors.push(
          item.reason instanceof Error ? item.reason.message : String(item.reason),
        );
      }
    }
  } catch (error) {
    result.indexingSkipped = normalizedUrls.length;
    result.errors.push(error instanceof Error ? error.message : String(error));
  }

  return result;
}
