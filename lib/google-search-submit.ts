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

    const settled = await Promise.allSettled(
      normalizedUrls.map((url) => submitIndexingUrl(accessToken, url)),
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
