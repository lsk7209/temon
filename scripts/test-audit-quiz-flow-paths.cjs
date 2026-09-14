const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const reportDir = fs.mkdtempSync(path.join(os.tmpdir(), "temon-route-audit-"));

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
const expectedStaticCount = fs
  .readdirSync(path.join(root, "app", "tests"), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith("[") &&
      fs.existsSync(path.join(root, "app", "tests", entry.name, "test", "page.tsx")),
  ).length;
const missingResultPages = staticRecords.filter((record) =>
  record.issues.some((issue) => issue.message === "result page file missing"),
);

assert.equal(staticRecords.length, expectedStaticCount, "expected the current static-test inventory");
assert.deepEqual(
  missingResultPages.map((record) => record.slug),
  [],
  "moved /app/results pages must not be reported missing",
);

if (!path.resolve(reportDir).startsWith(path.resolve(os.tmpdir()))) {
  throw new Error("refusing to remove a non-temporary report directory");
}
fs.rmSync(reportDir, { recursive: true, force: true });

console.log(
  `PASS: all ${staticRecords.length} static result routes resolve from app/results without false P0s.`,
);
