#!/usr/bin/env node
/**
 * Submit the production sitemap to Google Search Console and verify its status.
 *
 * Credentials are read from env, .env.local, or D:/env/gsc_credentials.json.
 * The script intentionally prints only non-secret metadata.
 */
const fs = require("node:fs");
const path = require("node:path");
const { createSign } = require("node:crypto");
const dotenv = require("dotenv");

const ROOT = path.resolve(__dirname, "..");
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const LOCAL_SERVICE_ACCOUNT_PATH = "D:/env/gsc_credentials.json";
const TIMEOUT_MS = 20_000;

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function argValue(name) {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length).trim() : "";
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function base64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeMaybeBase64(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("{")) return trimmed;

  try {
    return Buffer.from(trimmed, "base64").toString("utf8");
  } catch {
    return trimmed;
  }
}

function parseServiceAccount(rawValue) {
  const parsed = JSON.parse(decodeMaybeBase64(rawValue));
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Google service account is missing client_email/private_key");
  }

  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, "\n"),
  };
}

function getServiceAccount() {
  const rawCredential =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (rawCredential) return parseServiceAccount(rawCredential);

  const credentialPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GOOGLE_SERVICE_ACCOUNT_PATH ||
    LOCAL_SERVICE_ACCOUNT_PATH;
  if (!credentialPath || !fs.existsSync(credentialPath)) {
    throw new Error("Google service account credentials were not found");
  }

  return parseServiceAccount(fs.readFileSync(credentialPath, "utf8"));
}

function createJwt(serviceAccount) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: WEBMASTERS_SCOPE,
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

async function googleFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = data.error?.message || data.error_description || text;
    throw new Error(`HTTP ${response.status}: ${String(message).slice(0, 300)}`);
  }

  return data;
}

async function getAccessToken(serviceAccount) {
  const data = await googleFetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJwt(serviceAccount),
    }),
  });

  if (!data.access_token) throw new Error("Google token response has no access_token");
  return data.access_token;
}

function getBaseUrl() {
  return (
    argValue("base-url") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://temon.kr"
  ).replace(/\/+$/, "");
}

function candidateProperties(baseUrl) {
  const explicit =
    argValue("property") ||
    process.env.GSC_SITE_URL ||
    process.env.GSC_PROPERTY_URL ||
    "";
  const host = new URL(baseUrl).host.replace(/^www\./, "");
  const candidates = [
    explicit,
    `sc-domain:${host}`,
    `${baseUrl}/`,
    baseUrl,
  ].filter(Boolean);

  return Array.from(new Set(candidates));
}

function getSitemapUrl(baseUrl) {
  return (
    argValue("sitemap") ||
    process.env.GSC_SITEMAP_URL ||
    `${baseUrl}/sitemap.xml`
  ).trim();
}

async function findAccessibleProperty(accessToken, baseUrl) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const sites = await googleFetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers,
  });
  const available = new Set((sites.siteEntry || []).map((site) => site.siteUrl));

  for (const property of candidateProperties(baseUrl)) {
    if (available.has(property)) return property;
  }

  const candidates = candidateProperties(baseUrl).join(", ");
  const sample = Array.from(available).slice(0, 5).join(", ");
  throw new Error(
    `No accessible GSC property matched ${candidates}. Available sample: ${sample}`,
  );
}

async function submitSitemap(accessToken, property, sitemapUrl) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    property,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  await googleFetch(endpoint, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

async function getSitemapStatus(accessToken, property, sitemapUrl) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    property,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  return googleFetch(endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

async function main() {
  const baseUrl = getBaseUrl();
  const sitemapUrl = getSitemapUrl(baseUrl);
  const statusOnly = hasFlag("status-only");
  const serviceAccount = getServiceAccount();
  const accessToken = await getAccessToken(serviceAccount);
  const property = await findAccessibleProperty(accessToken, baseUrl);

  if (!statusOnly) await submitSitemap(accessToken, property, sitemapUrl);
  const status = await getSitemapStatus(accessToken, property, sitemapUrl);
  const errors = Number(status.errors || 0);
  const warnings = Number(status.warnings || 0);
  const verifiedSuccess = errors === 0 && !status.isPending;

  console.log(
    JSON.stringify(
      {
        property,
        sitemapUrl,
        submitted: !statusOnly,
        verifiedSuccess,
        isPending: Boolean(status.isPending),
        isSitemapsIndex: Boolean(status.isSitemapsIndex),
        errors,
        warnings,
        lastSubmitted: status.lastSubmitted || null,
        lastDownloaded: status.lastDownloaded || null,
        type: status.type || null,
      },
      null,
      2,
    ),
  );

  if (!verifiedSuccess) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
