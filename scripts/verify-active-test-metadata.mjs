import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(path.join(root, relativePath), "utf8");

const staticLayouts = [
  "coffee-mbti",
  "commute-style",
  "phone-style",
  "phone-usage",
  "skin-routine",
  "sleep-chronotype",
  "spending-style",
];

for (const testId of staticLayouts) {
  const source = read(`app/tests/${testId}/test/layout.tsx`);
  assert.match(source, new RegExp(`canonical:\\s*["']\\/tests\\/${testId}\\/test["']`));
  assert.match(source, /robots:\s*{\s*index:\s*false,\s*(?:\/\/[^\r\n]*\s*)?follow:\s*true,/s);
  assert.doesNotMatch(source, /canonical:\s*["']\/tests["']/);
}

const dynamicLayout = read("app/tests/[testId]/test/layout.tsx");
const metadataHelper = read("lib/quiz-seo-utils.ts");

assert.match(dynamicLayout, /canonical:\s*`\/tests\/\$\{params\.testId\}\/test`/);
assert.match(metadataHelper, /function generateTestPageMetadata[\s\S]*?robots:\s*noindexFollowRobots,/);

console.log(`verified ${staticLayouts.length + 1} active test metadata layouts`);
