const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pageSource = fs.readFileSync(path.join(root, "app/tests/page.tsx"), "utf8");
const clientSource = fs.readFileSync(
  path.join(root, "app/tests/tests-page-client.tsx"),
  "utf8",
);

assert.match(pageSource, /searchParams[\s\S]*page/, "server page must consume ?page");
assert.match(pageSource, /generateMetadata/, "pagination metadata must be page-aware");
assert.match(pageSource, /clampRequestedPage/, "server must clamp oversized pages");
assert.match(pageSource, /schemaStartIndex/, "JSON-LD must follow the visible page");
assert.match(pageSource, /initialPage=/, "normalized server page must reach the client");
assert.match(clientSource, /initialPage\s*:\s*number/, "client must require initialPage");
assert.match(clientSource, /<Link[\s\S]*paginationHref/, "pagination must use crawlable links");
assert.match(clientSource, /useEffect\([\s\S]*setCurrentPage\(initialPage\)/, "client state must follow URL navigation");
assert.match(clientSource, /setCurrentPage\(1\)/, "filters must reset pagination");
assert.match(clientSource, /keepActiveFilters/, "filtered pagination must retain filters");
assert.match(clientSource, /router\.replace\("\/tests#tests-list"/, "filter reset must remove stale page query");

console.log("tests pagination source contract: PASS");
