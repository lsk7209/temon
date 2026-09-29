const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const src = fs.readFileSync(
  path.join(root, "app/sitemap.xml/route.ts"),
  "utf8",
);

// DB 라우트는 안전 래퍼를 통해 호출되어야 한다(직접 호출 시 실패가 전체 503을 유발).
assert.match(
  src,
  /getPublishedDbTestRoutesSafe\(baseUrl\)/,
  "GET must call the safe wrapper, not the throwing DB fetch directly",
);
assert.match(
  src,
  /async function getPublishedDbTestRoutesSafe/,
  "safe wrapper must exist",
);
// 안전 래퍼는 실패 시 빈 배열을 반환해 정적/블로그 라우트를 보존해야 한다.
assert.match(
  src,
  /catch[\s\S]*?return \[\];/,
  "safe wrapper must return [] on DB failure (graceful degradation)",
);
// 정적 라우트·정적 테스트·블로그 라우트는 DB에 의존하지 않아야 한다.
assert.match(src, /getStaticRoutes\(baseUrl\)/, "static routes must be included");
assert.match(src, /getIndexableTests\(now\)/, "static test routes must be included");
assert.match(src, /getAllBlogPosts\(\)\.map/, "blog routes must be included");
// 원래의 throwing 함수도 유지되어 안전 래퍼 내부에서 재사용되어야 한다.
assert.match(
  src,
  /return await getPublishedDbTestRoutes\(baseUrl\);/,
  "safe wrapper must delegate to the original DB fetch",
);

console.log(
  "PASS sitemap: DB routes degrade gracefully; static + blog routes preserved on DB failure",
);
