const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const pageSource = fs.readFileSync(path.join(root, "app/tests/page.tsx"), "utf8");
const clientSource = fs.readFileSync(
  path.join(root, "app/tests/tests-page-client.tsx"),
  "utf8",
);

assert.match(pageSource, /searchParams[\s\S]*page/, "server page must consume ?page");
assert.match(pageSource, /generateMetadata/, "pagination metadata must be page-aware");
assert.match(pageSource, /getListingState/, "server must normalize filters and clamp page");
assert.match(pageSource, /schemaStartIndex/, "JSON-LD must follow the visible page");
assert.match(pageSource, /initialPage=/, "normalized server page must reach the client");
assert.match(pageSource, /initialQuery=\{query\}/, "server query must initialize search input");
assert.match(pageSource, /filterListingItems\(getUniqueListingTests/, "schema must filter the same list");
assert.match(pageSource, /index: false/, "internal search must be noindex");
assert.match(pageSource, /throw new Error\("TEST_LIST_UNAVAILABLE"\)/, "DB failure must not render an empty successful list");
assert.match(clientSource, /initialPage\s*:\s*number/, "client must require initialPage");
assert.match(clientSource, /<Link[\s\S]*listingHref/, "pagination must use crawlable links");
assert.match(clientSource, /useEffect\([\s\S]*setCurrentPage\(initialPage\)/, "client state must follow URL navigation");
assert.match(clientSource, /setCurrentPage\(1\)/, "filters must reset pagination");
assert.match(clientSource, /onCompositionStart/, "IME composition must pause URL updates");
assert.match(clientSource, /window\.setTimeout/, "search URL commit must be debounced");
assert.match(clientSource, /router\.replace\("\/tests#tests-list"/, "filter reset must remove stale page query");

require.extensions[".ts"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText, filename);
};
const { filterListingItems, uniqueListingItems, normalizeQuery, normalizeCategory,
  parseListingPage, listingHref } = require("../lib/tests-listing.ts");
const sample = [
  { href: "/tests/music", title: "음악 취향", description: "플레이리스트", category: "취향", tags: ["음악"] },
  { href: "/tests/music", title: "duplicate", description: "", category: "취향", tags: [] },
  { href: "/tests/food", title: "음식 취향", description: "맛", category: "음식", tags: [] },
];
const unique = uniqueListingItems(sample);
assert.equal(unique.length, 2);
assert.deepEqual(filterListingItems(unique, "음악", "전체").map((item) => item.href), ["/tests/music"]);
assert.deepEqual(filterListingItems(unique, "취향", "음식").map((item) => item.href), ["/tests/food"]);
assert.equal(normalizeQuery("x".repeat(120)).length, 100);
assert.equal(normalizeCategory("unknown", ["전체", "음식"]), "전체");
assert.equal(parseListingPage("-2"), 1);
assert.equal(parseListingPage("99999999999999999"), 1);
assert.equal(listingHref("음악", "취향", 2), "/tests?q=%EC%9D%8C%EC%95%85&category=%EC%B7%A8%ED%96%A5&page=2#tests-list");

console.log("tests pagination source contract: PASS");
