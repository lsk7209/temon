#!/usr/bin/env node
/**
 * Pulls Google Search Console Search Analytics data and ranks SEO opportunities.
 *
 * Usage:
 *   node scripts/gsc-opportunity-report.js
 *   node scripts/gsc-opportunity-report.js --days=28 --lag=2
 */
const fs = require("node:fs");
const path = require("node:path");
const { createSign } = require("node:crypto");
const dotenv = require("dotenv");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const WEBMASTERS_SCOPE = "https://www.googleapis.com/auth/webmasters";
const LOCAL_SERVICE_ACCOUNT_PATH = "D:/env/gsc_credentials.json";
const TIMEOUT_MS = 20_000;

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function getArgNumber(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  if (!arg) return fallback;

  const value = Number.parseInt(arg.slice(prefix.length), 10);
  return Number.isFinite(value) ? value : fallback;
}

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
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

async function getAccessToken(serviceAccount) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJwt(serviceAccount),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || `Token HTTP ${response.status}`);
  }

  return data.access_token;
}

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || "https://temon.kr").replace(/\/$/, "");
}

function getSearchConsoleProperty(baseUrl) {
  const host = new URL(baseUrl).host.replace(/^www\./, "");
  return (
    process.env.GSC_SITE_URL ||
    process.env.GSC_PROPERTY_URL ||
    `sc-domain:${host}`
  ).trim();
}

async function querySearchAnalytics(accessToken, siteUrl, body) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl,
  )}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`GSC Search Analytics HTTP ${response.status}: ${text.slice(0, 300)}`);
  }

  return response.json();
}

function normalizeRow(row, dimensions) {
  const result = {
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  };

  dimensions.forEach((dimension, index) => {
    result[dimension] = row.keys?.[index] || "";
  });

  return result;
}

function scoreOpportunity(row) {
  const ctrGap = Math.max(0, 0.04 - row.ctr);
  const positionFit = row.position >= 4 && row.position <= 20 ? 1 : 0.55;
  return row.impressions * ctrGap * positionFit;
}

function classifyPage(row) {
  if (row.impressions >= 300 && row.ctr < 0.03) return "P0";
  if (row.impressions >= 100 && row.ctr < 0.04) return "P1";
  if (row.impressions >= 50 && row.ctr < 0.05) return "P2";
  return "P3";
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(rows, columns) {
  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");
}

function percent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) =>
    `| ${columns.map((column) => column.format(row[column.key], row)).join(" | ")} |`,
  );
  return [header, divider, ...body].join("\n");
}

async function main() {
  const days = getArgNumber("days", 28);
  const lag = getArgNumber("lag", 2);
  const endDate = addDays(new Date(), -lag);
  const startDate = addDays(endDate, -(days - 1));
  const baseUrl = getBaseUrl();
  const property = getSearchConsoleProperty(baseUrl);
  const accessToken = await getAccessToken(getServiceAccount());

  const baseBody = {
    startDate: toDateString(startDate),
    endDate: toDateString(endDate),
    searchType: "web",
    rowLimit: 250,
    dataState: "final",
  };

  const [pageResponse, queryResponse, pageQueryResponse] = await Promise.all([
    querySearchAnalytics(accessToken, property, { ...baseBody, dimensions: ["page"] }),
    querySearchAnalytics(accessToken, property, { ...baseBody, dimensions: ["query"] }),
    querySearchAnalytics(accessToken, property, {
      ...baseBody,
      dimensions: ["page", "query"],
      rowLimit: 1000,
    }),
  ]);

  const pages = (pageResponse.rows || []).map((row) => normalizeRow(row, ["page"]));
  const queries = (queryResponse.rows || []).map((row) => normalizeRow(row, ["query"]));
  const pageQueries = (pageQueryResponse.rows || []).map((row) =>
    normalizeRow(row, ["page", "query"]),
  );
  const pageOpportunities = pages
    .map((row) => ({
      ...row,
      ctrPercent: percent(row.ctr),
      priority: classifyPage(row),
      opportunityScore: Number(scoreOpportunity(row).toFixed(2)),
    }))
    .filter((row) => row.priority !== "P3")
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 25);
  const queryOpportunities = queries
    .map((row) => ({
      ...row,
      ctrPercent: percent(row.ctr),
      opportunityScore: Number(scoreOpportunity(row).toFixed(2)),
    }))
    .filter((row) => row.impressions >= 30 && row.ctr < 0.05)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 25);
  const pageQueryOpportunities = pageQueries
    .map((row) => ({
      ...row,
      ctrPercent: percent(row.ctr),
      opportunityScore: Number(scoreOpportunity(row).toFixed(2)),
    }))
    .filter((row) => row.impressions >= 10 && row.ctr < 0.04)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 40);

  const report = {
    generatedAt: new Date().toISOString(),
    property,
    range: {
      startDate: baseBody.startDate,
      endDate: baseBody.endDate,
      days,
      lag,
    },
    totals: {
      pages: pages.length,
      queries: queries.length,
      pageQueries: pageQueries.length,
    },
    pageOpportunities,
    queryOpportunities,
    pageQueryOpportunities,
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const jsonPath = path.join(REPORTS_DIR, `gsc-opportunities-${stamp}.json`);
  const csvPath = path.join(REPORTS_DIR, `gsc-opportunities-${stamp}.csv`);
  const mdPath = path.join(REPORTS_DIR, `gsc-opportunities-${stamp}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(
    csvPath,
    toCsv(pageQueryOpportunities, [
      "page",
      "query",
      "clicks",
      "impressions",
      "ctrPercent",
      "position",
      "opportunityScore",
    ]),
  );

  const md = [
    `# GSC Opportunity Report | ${stamp}`,
    "",
    `- Property: \`${property}\``,
    `- Range: ${baseBody.startDate}..${baseBody.endDate}`,
    `- Rows: pages ${pages.length}, queries ${queries.length}, page-query ${pageQueries.length}`,
    "",
    "## Page Opportunities",
    pageOpportunities.length
      ? markdownTable(pageOpportunities.slice(0, 12), [
          { key: "priority", label: "Priority", format: (value) => value },
          { key: "page", label: "Page", format: (value) => `\`${value}\`` },
          { key: "clicks", label: "Clicks", format: (value) => value },
          { key: "impressions", label: "Impr.", format: (value) => value },
          { key: "ctrPercent", label: "CTR", format: (value) => value },
          { key: "position", label: "Pos.", format: (value) => Number(value).toFixed(1) },
          {
            key: "opportunityScore",
            label: "Score",
            format: (value) => Number(value).toFixed(2),
          },
        ])
      : "No page-level opportunities matched thresholds.",
    "",
    "## Query Opportunities",
    queryOpportunities.length
      ? markdownTable(queryOpportunities.slice(0, 12), [
          { key: "query", label: "Query", format: (value) => value },
          { key: "clicks", label: "Clicks", format: (value) => value },
          { key: "impressions", label: "Impr.", format: (value) => value },
          { key: "ctrPercent", label: "CTR", format: (value) => value },
          { key: "position", label: "Pos.", format: (value) => Number(value).toFixed(1) },
          {
            key: "opportunityScore",
            label: "Score",
            format: (value) => Number(value).toFixed(2),
          },
        ])
      : "No query-level opportunities matched thresholds.",
    "",
    "## Page Query Opportunities",
    pageQueryOpportunities.length
      ? markdownTable(pageQueryOpportunities.slice(0, 20), [
          { key: "page", label: "Page", format: (value) => `\`${value}\`` },
          { key: "query", label: "Query", format: (value) => value },
          { key: "clicks", label: "Clicks", format: (value) => value },
          { key: "impressions", label: "Impr.", format: (value) => value },
          { key: "ctrPercent", label: "CTR", format: (value) => value },
          { key: "position", label: "Pos.", format: (value) => Number(value).toFixed(1) },
        ])
      : "No page-query opportunities matched thresholds.",
    "",
    "## Next Actions",
    "- P0/P1 page-level items: title/meta and above-the-fold copy handoff.",
    "- Query-level items: map to existing page intent before creating new content.",
    "- Page-query items: update snippets/internal links only after editorial review.",
    "",
  ].join("\n");
  fs.writeFileSync(mdPath, md);

  console.log(
    JSON.stringify(
      {
        property,
        range: report.range,
        pageOpportunities: pageOpportunities.length,
        queryOpportunities: queryOpportunities.length,
        pageQueryOpportunities: pageQueryOpportunities.length,
        files: [
          path.relative(ROOT, jsonPath),
          path.relative(ROOT, csvPath),
          path.relative(ROOT, mdPath),
        ],
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
