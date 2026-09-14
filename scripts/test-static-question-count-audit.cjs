const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), "temon-question-audit-"));

execFileSync(process.execPath, [path.join(__dirname, "audit-quiz-flow.js")], {
  cwd: root,
  env: { ...process.env, QUIZ_AUDIT_REPORT_DIR: reportDir },
  stdio: "pipe",
});

const date = new Date().toISOString().slice(0, 10);
const report = JSON.parse(
  fs.readFileSync(
    path.join(reportDir, `quiz-flow-audit-${date}.json`),
    "utf8",
  ),
);
const staticRecords = report.records.filter((record) =>
  record.source.startsWith("static"),
);
const expectedStaticSlugs = fs
  .readdirSync(path.join(root, "app", "tests"), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith("[") &&
      fs.existsSync(path.join(root, "app", "tests", entry.name, "test", "page.tsx")),
  )
  .map((entry) => entry.name)
  .sort();
const undetected = staticRecords.filter(
  (record) => record.question.metrics.questionCount <= 0,
);
const mismatches = staticRecords.filter((record) =>
  record.issues.some((issue) => issue.message.includes("question count mismatch")),
);

assert.deepEqual(
  staticRecords.map((record) => record.slug).sort(),
  expectedStaticSlugs,
  "audit inventory must match the current static route tree",
);
assert.deepEqual(
  undetected.map((record) => record.slug),
  [],
  "every inline static question array must have a detectable count",
);
assert.deepEqual(
  mismatches.map((record) => record.slug),
  [],
  "advertised question counts must match each static engine",
);

function countIds(relativePath) {
  return [...fs.readFileSync(path.join(root, relativePath), "utf8").matchAll(/^\s+id:\s*\d+,/gm)]
    .length;
}

assert.equal(countIds("app/tests/alarm-habit/test/page.tsx"), 12);
assert.equal(countIds("app/tests/ntrp-test/test/page.tsx"), 15);
assert.equal(countIds("lib/data/commute-style-questions.ts"), 12);
assert.equal(countIds("lib/data/zombie-survival-questions.ts"), 12);

if (!path.resolve(reportDir).startsWith(path.resolve(os.tmpdir()))) {
  throw new Error("refusing to remove a non-temporary report directory");
}
fs.rmSync(reportDir, { recursive: true, force: true });

console.log(
  `PASS: all ${staticRecords.length} static engine counts are detected and match advertised counts.`,
);
