// T11 회귀 테스트: Google Indexing API 자격 검증 안전장치 (F15/R10).
// GSC_INDEXING_API_ENABLED=true여도 이 사이트의 일반 퀴즈/블로그 URL은
// Indexing API로 전송되지 않아야 한다. sitemap 제출(Search Console Sitemaps API)은
// 이 제한과 무관하게 항상 시도된다.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

process.env.GSC_INDEXING_API_ENABLED = "true";
// 이 테스트만을 위해 생성한 사용되지 않는 RSA 키 (실제 서비스 계정 아님).
// JWT 서명 자체가 실행되어야 isIndexingApiEligible() 필터 코드 경로에 도달하므로,
// 유효한 PEM 형식이 필요하다 (fetch는 아래에서 모킹해 실제 Google API로는 가지 않는다).
const { generateKeyPairSync } = require("node:crypto");
const { privateKey: fixturePrivateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs1", format: "pem" },
});
process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({
  client_email: "fixture@example.iam.gserviceaccount.com",
  private_key: fixturePrivateKey,
});

const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith("@/")) request = path.join(root, request.slice(2));
  return resolveFilename.call(this, request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      fileName: filename,
    }).outputText,
    filename,
  );
};

const indexingCalls = [];
const originalFetch = global.fetch;
global.fetch = async (url, options) => {
  const urlStr = String(url);
  if (urlStr.includes("oauth2.googleapis.com/token")) {
    return { ok: true, json: async () => ({ access_token: "fixture-token" }) };
  }
  if (urlStr.includes("indexing.googleapis.com")) {
    indexingCalls.push({ url: urlStr, body: options?.body });
    return { ok: true, json: async () => ({}) };
  }
  if (urlStr.includes("webmasters/v3/sites")) {
    return { ok: true, text: async () => "" };
  }
  throw new Error(`unexpected fetch to ${urlStr}`);
};

async function main() {
  const { submitGoogleSearchUpdates } = require(path.join(root, "lib/google-search-submit.ts"));

  // 이 사이트의 실제 발행 URL 형태: /tests/{slug} 퀴즈 인트로, /blog/{slug}, /tests 목록.
  // 전부 일반 콘텐츠이며 JobPosting/BroadcastEvent가 아니다.
  const urls = [
    "/tests/new-quiz-slug",
    "/tests",
    "/blog/some-post",
    "https://temon.kr/tests/another-quiz",
  ];

  const result = await submitGoogleSearchUpdates(urls);

  assert.equal(indexingCalls.length, 0, "Indexing API must receive zero real requests for ordinary quiz/blog URLs even when the flag is enabled");
  assert.equal(result.indexingSubmitted, 0, "indexingSubmitted must be 0 for ineligible content");
  assert.ok(result.indexingSkipped >= urls.length, "all ineligible URLs must be counted as skipped, not silently dropped");
  assert.ok(
    result.errors.some((message) => /not eligible for the Indexing API/.test(message)),
    "result must explain why URLs were skipped (not eligible), not just silently omit them",
  );
  // sitemap 제출은 Indexing API 자격 제한과 무관하게 시도되어야 한다.
  assert.equal(result.sitemapSubmitted, true, "sitemap submission must still be attempted regardless of Indexing API eligibility");

  console.log("PASS google-indexing-eligibility: 0 real Indexing API calls for ordinary content even with flag=true, sitemap submission unaffected");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    global.fetch = originalFetch;
  });
