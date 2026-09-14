const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const intro = fs.readFileSync(
  path.join(root, "app", "tests", "alarm-habit", "page.tsx"),
  "utf8",
);
const test = fs.readFileSync(
  path.join(root, "app", "tests", "alarm-habit", "test", "page.tsx"),
  "utf8",
);
const actualQuestionCount = [...test.matchAll(/^\s+id:\s*\d+,/gm)].length;
const metadataCounts = [...intro.matchAll(/questionCount:\s*(\d+)/g)].map((match) =>
  Number(match[1]),
);

assert.equal(actualQuestionCount, 12, "alarm-habit engine fixture changed unexpectedly");
assert.deepEqual(metadataCounts, [actualQuestionCount, actualQuestionCount]);
assert.match(intro, new RegExp(`>${actualQuestionCount}문항<`));
assert.match(intro, new RegExp(`${actualQuestionCount}가지 기상 습관`));
assert.doesNotMatch(intro, />8문항</);
assert.doesNotMatch(intro, /정확하게 분석/);

console.log("PASS: alarm-habit metadata and visible counts match 12 engine questions.");
