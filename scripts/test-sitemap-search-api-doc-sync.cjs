// T11 회귀 테스트: 사이트맵 안전장치·문서 동기화.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

// 1) README가 현재 스택(Next 16/React 19/libsql/Vercel)을 정확히 기재해야 한다.
{
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  assert.ok(/Next\.js 16/.test(readme), "README must state the current Next.js major version");
  assert.ok(/libsql|Turso/.test(readme), "README must mention the current database (libsql/Turso), not only Cloudflare D1");
  assert.ok(/Vercel/.test(readme), "README must mention Vercel as the current host");
  assert.ok(/npm run deploy.*Git push|Git push.*npm run deploy/.test(readme.replace(/\s+/g, " ")), "README must warn that npm run deploy triggers a Git push");
}

// 2) sitemap.xml 라우트가 DB 실패 시에도 정적 라우트를 계속 반환해야 한다 (기존 보강 유지).
{
  const source = fs.readFileSync(path.join(root, "app/sitemap.xml/route.ts"), "utf8");
  assert.ok(/getPublishedDbTestRoutesSafe/.test(source), "sitemap route must use the safe DB wrapper, not call the DB directly");
  assert.ok(/catch \(error\)/.test(source), "safe wrapper must catch DB errors");
  assert.ok(/return \[\]/.test(source), "DB failure must degrade to an empty array, not a full 503");
}

// 3) Google Indexing API 자격 검증이 실제로 존재하고, 일반 콘텐츠 URL을 차단해야 한다 (F15).
{
  const source = fs.readFileSync(path.join(root, "lib/google-search-submit.ts"), "utf8");
  assert.ok(/isIndexingApiEligible/.test(source), "an eligibility gate function must exist");
  assert.ok(/eligibleUrls = normalizedUrls\.filter\(\(url\) => isIndexingApiEligible\(url\)\)/.test(source), "submission must filter through the eligibility gate before sending real requests");
}

// 4) lib/sitemap-utils.ts의 파일시스템 스캔 helper는 계속 사용되지 않아야 한다 (참조 없이 되살리지 않음).
{
  const sitemapRouteSource = fs.readFileSync(path.join(root, "app/sitemap.xml/route.ts"), "utf8");
  assert.ok(!/scanAppDirectory|scanTestDirectories|generateTestRoutes/.test(sitemapRouteSource), "live sitemap route must not depend on the unused filesystem-scan helpers");
}

console.log("PASS sitemap-search-api-doc-sync: README stack accuracy, sitemap DB-failure degradation intact, Indexing API eligibility gate wired, unused helpers not reactivated");
