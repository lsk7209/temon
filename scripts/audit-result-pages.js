#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const REPORTS_DIR = path.join(ROOT, "reports");
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const REPORT_BASENAME = `result-page-audit-${REPORT_DATE}`;

const STATIC_THRESHOLDS = {
  minCards: 5,
  minParagraphs: 5,
};

const CONTENT_THRESHOLDS = {
  minSummary: 120,
  minShortSummary: 80,
  minTraits: 4,
  minDetailBullets: 6,
};

const MOJIBAKE_PATTERN = /[\uFFFD\u3400-\u9FFF]|[\u00c2\u00c3\u00ea\u00eb\u00ec\u00ef\u00f0][\u0080-\u00ff]*/g;

dotenv.config({
  path: path.join(ROOT, ".env.local"),
  override: true,
  quiet: true,
});

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readText(filePath));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function ensureReportsDir() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function parseJson(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value;
  try {
    return JSON.parse(value || "");
  } catch {
    return fallback;
  }
}

function arrayCount(value) {
  return Array.isArray(value) ? value.length : 0;
}

function detailCount(result) {
  const presets = result.presets || result.preset || {};
  const presetCount =
    presets && typeof presets === "object" && !Array.isArray(presets)
      ? Object.values(presets).reduce(
          (total, value) => total + (Array.isArray(value) ? value.length : 0),
          0,
        )
      : 0;

  return (
    arrayCount(result.traits) +
    arrayCount(result.tips) +
    arrayCount(result.picks) +
    presetCount +
    (result.recommend ? 1 : 0) +
    (result.pitfalls ? 1 : 0)
  );
}

function dbDetailCount(row) {
  return (
    arrayCount(parseJson(row.traits, [])) +
    arrayCount(parseJson(row.tips, [])) +
    arrayCount(parseJson(row.picks, [])) +
    arrayCount(parseJson(row.match_types, []))
  );
}

function issueSeverity(issues) {
  if (issues.some((issue) => issue.startsWith("P0"))) return "P0";
  if (issues.some((issue) => issue.startsWith("P1"))) return "P1";
  if (issues.some((issue) => issue.startsWith("P2"))) return "P2";
  return "Pass";
}

function scoreFromSeverity(severity) {
  return { P0: 0, P1: 40, P2: 70, Pass: 90 }[severity];
}

function getQuizDirs() {
  if (!fs.existsSync(TESTS_DIR)) return [];
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "[testId]")
    .map((entry) => entry.name)
    .sort();
}

function countMatches(source, pattern) {
  return (source.match(pattern) || []).length;
}

function hasPattern(source, pattern) {
  return pattern.test(source);
}

function auditStaticResultPages() {
  const testsLayoutPath = path.join(TESTS_DIR, "layout.tsx");
  const robotsPath = path.join(ROOT, "app", "robots.ts");
  const robotsSource = fs.existsSync(robotsPath) ? readText(robotsPath) : "";
  const resultRoutesBlocked =
    robotsSource.includes("/tests/*/test/result") &&
    robotsSource.includes("/tests/*/test/result/*");
  const hasGlobalResultEnhancer =
    fs.existsSync(testsLayoutPath) &&
    readText(testsLayoutPath).includes("ResultRouteAutoEnhancements");
  const autoEnhancerSourcePath = path.join(
    ROOT,
    "components",
    "result-route-auto-enhancements.tsx",
  );
  const autoEnhancerSource = fs.existsSync(autoEnhancerSourcePath)
    ? readText(autoEnhancerSourcePath)
    : "";

  return getQuizDirs().map((slug) => {
    const resultPath = path.join(TESTS_DIR, slug, "test", "result", "page.tsx");
    const resultLayoutPath = path.join(TESTS_DIR, slug, "test", "result", "layout.tsx");
    const introPath = path.join(TESTS_DIR, slug, "page.tsx");
    const testPath = path.join(TESTS_DIR, slug, "test", "page.tsx");
    const issues = [];

    if (!fs.existsSync(resultPath)) {
      return {
        slug,
        path: path.relative(ROOT, resultPath),
        severity: "P0",
        score: 0,
        issues: ["P0 result page file missing"],
      };
    }

    const source = readText(resultPath);
    const usesEnhancement = source.includes("StaticResultEnhancements");
    const usesCommonResultPage = source.includes("MbtiResultPage");
    const usesGlobalEnhancement =
      hasGlobalResultEnhancer &&
      autoEnhancerSource.includes(`"${slug}"`) === false &&
      !usesEnhancement &&
      !usesCommonResultPage;
    const cardCount = countMatches(source, /<Card\b/g);
    const paragraphCount = countMatches(source, /<p\b/g);
    const enhancementSectionCount = usesEnhancement || usesGlobalEnhancement ? 4 : 0;
    const commonSectionCount = usesCommonResultPage ? 8 : 0;
    const metrics = {
      sourceChars: source.length,
      cardCount,
      effectiveCardCount: cardCount + enhancementSectionCount + commonSectionCount,
      paragraphCount,
      effectiveParagraphCount:
        paragraphCount +
        (usesEnhancement || usesGlobalEnhancement ? 5 : 0) +
        commonSectionCount,
      h1Count: countMatches(source, /<h1\b/g) + (usesCommonResultPage ? 1 : 0),
      sectionLikeCount: countMatches(source, /<Card\b|<section\b|<article\b/g),
      resultMapCount: countMatches(
        source,
        /(const\s+\w+\s*=\s*\{|Record<string|description:\s*\[)/g,
      ),
      mojibakeHits: countMatches(source, MOJIBAKE_PATTERN),
    };

    const flags = {
      hasIntroPage: fs.existsSync(introPath),
      hasTestPage: fs.existsSync(testPath),
      usesCommonResultPage,
      usesEnhancement,
      usesGlobalEnhancement,
      importsResultData: /@\/lib\/data\/.*-results/.test(source),
      hasShare: source.includes("ShareButtons") || usesCommonResultPage || usesGlobalEnhancement,
      hasToc:
        source.includes("ContentToc") ||
        usesEnhancement ||
        usesCommonResultPage ||
        usesGlobalEnhancement,
      hasFaqEffective:
        /FAQ|ResultFaqSchema|createFAQSchema|faqItems|StaticResultEnhancements|getTopicResultFAQs/.test(source) ||
        usesCommonResultPage ||
        usesGlobalEnhancement,
      hasActionGuideEffective:
        /StaticResultEnhancements|getTopicResultUseCases|Action Guide|활용|가이드|실천|체크리스트|추천/.test(source) ||
        usesCommonResultPage ||
        usesGlobalEnhancement,
      hasFaq:
        /FAQ|ResultFaqSchema|createFAQSchema|faqItems|자주/.test(source),
      hasRelated:
        source.includes("RelatedTestsSection") ||
        usesEnhancement ||
        usesCommonResultPage ||
        usesGlobalEnhancement,
      hasActionGuide: /Action Guide|실천|체크리스트|추천/.test(source),
      hasMetadata:
        /export const metadata|generateMetadata/.test(source) ||
        (fs.existsSync(resultLayoutPath) &&
          /export const metadata|generateMetadata/.test(readText(resultLayoutPath))),
      resultRoutesBlocked,
      hasConsoleError: /console\.error|console\.log/.test(source),
      hasEnglishSectionTitle:
        /Where This Result Becomes Useful|Action Guide|More Routine Quizzes To Compare|>FAQ<|FAQ<\/|FAQ"/.test(source),
    };

    if (!flags.hasIntroPage || !flags.hasTestPage) {
      issues.push("P0 intro/test/result flow file incomplete");
    }
    if (!flags.hasShare) issues.push("P1 share button missing");
    if (!flags.hasFaqEffective) issues.push("P1 result FAQ missing");
    if (metrics.h1Count < 1) issues.push("P1 result H1 missing");
    if (metrics.effectiveCardCount < STATIC_THRESHOLDS.minCards) {
      issues.push(`P1 low section count: ${metrics.effectiveCardCount} effective cards`);
    }
    if (metrics.effectiveParagraphCount < STATIC_THRESHOLDS.minParagraphs) {
      issues.push(`P1 low paragraph count: ${metrics.effectiveParagraphCount}`);
    }
    if (!flags.hasToc) issues.push("P2 result table of contents missing");
    if (!flags.hasRelated) issues.push("P2 related tests missing");
    if (!flags.hasActionGuideEffective) issues.push("P2 action guide missing");
    if (!flags.hasMetadata && !flags.resultRoutesBlocked) {
      issues.push("P2 static metadata missing");
    }
    if (flags.hasEnglishSectionTitle) {
      issues.push("P2 English section title remains");
    }
    if (metrics.mojibakeHits > 20) {
      issues.push(`P2 possible mojibake text: ${metrics.mojibakeHits} hits`);
    }
    if (flags.hasConsoleError) issues.push("P2 console logging in result page");

    const severity = issueSeverity(issues);
    return {
      slug,
      path: path.relative(ROOT, resultPath),
      severity,
      score: scoreFromSeverity(severity),
      metrics,
      flags,
      issues,
    };
  });
}

function summarizeResultRows(rows, expectedCount) {
  const summaryLengths = rows.map((row) => String(row.summary || "").trim().length);
  const thinRows = rows.filter((row) => {
    const summaryLength = String(row.summary || "").trim().length;
    return (
      summaryLength < CONTENT_THRESHOLDS.minSummary ||
      arrayCount(parseJson(row.traits, [])) < CONTENT_THRESHOLDS.minTraits ||
      dbDetailCount(row) < CONTENT_THRESHOLDS.minDetailBullets
    );
  });

  const issues = [];
  if (rows.length < expectedCount) {
    issues.push(`P0 result types missing: ${rows.length}/${expectedCount}`);
  }
  if (summaryLengths.some((length) => length < CONTENT_THRESHOLDS.minShortSummary)) {
    issues.push("P1 very short result summary exists");
  }
  if (thinRows.length > 0) {
    issues.push(`P1 thin result rows: ${thinRows.length}`);
  }

  const avgSummary = summaryLengths.length
    ? Math.round(summaryLengths.reduce((sum, value) => sum + value, 0) / summaryLengths.length)
    : 0;

  return {
    avgSummary,
    minSummary: summaryLengths.length ? Math.min(...summaryLengths) : 0,
    maxSummary: summaryLengths.length ? Math.max(...summaryLengths) : 0,
    thinResultRows: thinRows.length,
    issues,
  };
}

async function auditDatabaseResults() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    return {
      available: false,
      reason: "TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing",
      records: [],
      summary: {},
    };
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const tests = (
      await db.execute(
        "select id, slug, title, status, result_type_count from tests order by status, slug",
      )
    ).rows;
    const resultRows = (
      await db.execute(
        "select test_id, type_code, label, summary, traits, picks, tips, match_types from result_types",
      )
    ).rows;
    const byTest = new Map();

    for (const row of resultRows) {
      if (!byTest.has(row.test_id)) byTest.set(row.test_id, []);
      byTest.get(row.test_id).push(row);
    }

    const records = tests.map((test) => {
      const rows = byTest.get(test.id) || [];
      const expectedCount = Number(test.result_type_count || 16);
      const resultSummary = summarizeResultRows(rows, expectedCount);
      const issues = [...resultSummary.issues];
      const severity = issueSeverity(issues);

      return {
        slug: test.slug,
        title: test.title,
        status: test.status,
        severity,
        score: scoreFromSeverity(severity),
        expectedResultTypes: expectedCount,
        actualResultTypes: rows.length,
        ...resultSummary,
        issues,
      };
    });

    const published = records.filter((record) => record.status === "published");
    const draft = records.filter((record) => record.status === "draft");

    return {
      available: true,
      summary: {
        tests: records.length,
        publishedTests: published.length,
        draftTests: draft.length,
        resultRows: resultRows.length,
        publishedThinTests: published.filter((record) => record.severity !== "Pass").length,
        draftThinTests: draft.filter((record) => record.severity !== "Pass").length,
      },
      records,
    };
  } finally {
    db.close();
  }
}

function auditWaveJsonFiles() {
  const files = [
    "data/quiz-wave3-200.json",
    "data/quiz-wave4-200.json",
    "data/quiz-wave5-300.json",
    "data/quiz-wave6-300.json",
  ].filter((relativePath) => fs.existsSync(path.join(ROOT, relativePath)));

  return files.map((relativePath) => {
    const items = readJson(path.join(ROOT, relativePath));
    const records = [];

    for (const item of items) {
      const results = Array.isArray(item.results) ? item.results : [];
      const thinResults = results.filter((result) => {
        const summaryLength = String(result.summary || "").trim().length;
        return (
          summaryLength < CONTENT_THRESHOLDS.minSummary ||
          arrayCount(result.traits) < CONTENT_THRESHOLDS.minTraits ||
          detailCount(result) < CONTENT_THRESHOLDS.minDetailBullets
        );
      });
      const summaries = results.map((result) => String(result.summary || "").trim().length);
      const issues = [];

      if (results.length < Number(item.resultTypeCount || 16)) {
        issues.push(`P0 result types missing: ${results.length}/${item.resultTypeCount || 16}`);
      }
      if (thinResults.length > 0) {
        issues.push(`P1 thin source results: ${thinResults.length}`);
      }

      const severity = issueSeverity(issues);
      records.push({
        slug: item.slug,
        title: item.title,
        severity,
        score: scoreFromSeverity(severity),
        resultCount: results.length,
        avgSummary: summaries.length
          ? Math.round(summaries.reduce((sum, value) => sum + value, 0) / summaries.length)
          : 0,
        minSummary: summaries.length ? Math.min(...summaries) : 0,
        thinResultRows: thinResults.length,
        issues,
      });
    }

    return {
      file: relativePath,
      items: records.length,
      thinItems: records.filter((record) => record.severity !== "Pass").length,
      records,
    };
  });
}

function buildSummary(staticRecords, dbAudit, waveAudits) {
  const staticBySeverity = countBy(staticRecords, "severity");
  const dbRecords = dbAudit.records || [];
  const dbPublished = dbRecords.filter((record) => record.status === "published");
  const dbDraft = dbRecords.filter((record) => record.status === "draft");
  const waveRecords = waveAudits.flatMap((audit) =>
    audit.records.map((record) => ({ ...record, sourceFile: audit.file })),
  );

  return {
    generatedAt: new Date().toISOString(),
    static: {
      tests: staticRecords.length,
      bySeverity: staticBySeverity,
      thinOrBroken: staticRecords.filter((record) => record.severity !== "Pass").length,
    },
    database: dbAudit.available
      ? {
          ...dbAudit.summary,
          publishedBySeverity: countBy(dbPublished, "severity"),
          draftBySeverity: countBy(dbDraft, "severity"),
        }
      : { available: false, reason: dbAudit.reason },
    waveJson: {
      files: waveAudits.length,
      items: waveRecords.length,
      thinItems: waveRecords.filter((record) => record.severity !== "Pass").length,
      byFile: waveAudits.map((audit) => ({
        file: audit.file,
        items: audit.items,
        thinItems: audit.thinItems,
      })),
    },
  };
}

function countBy(records, key) {
  return records.reduce((acc, record) => {
    const value = record[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(reportPath, staticRecords, dbAudit, waveAudits) {
  const rows = [
    [
      "source",
      "slug",
      "status",
      "severity",
      "score",
      "summary",
      "issues",
    ],
  ];

  for (const record of staticRecords) {
    rows.push([
      "static",
      record.slug,
      "",
      record.severity,
      record.score,
      `cards=${record.metrics?.effectiveCardCount ?? 0}; paragraphs=${record.metrics?.effectiveParagraphCount ?? 0}; faq=${Boolean(record.flags?.hasFaqEffective)}`,
      record.issues.join(" | "),
    ]);
  }

  for (const record of dbAudit.records || []) {
    rows.push([
      "database",
      record.slug,
      record.status,
      record.severity,
      record.score,
      `results=${record.actualResultTypes}/${record.expectedResultTypes}; avgSummary=${record.avgSummary}; thinRows=${record.thinResultRows}`,
      record.issues.join(" | "),
    ]);
  }

  for (const audit of waveAudits) {
    for (const record of audit.records) {
      rows.push([
        audit.file,
        record.slug,
        "source-json",
        record.severity,
        record.score,
        `results=${record.resultCount}; avgSummary=${record.avgSummary}; thinRows=${record.thinResultRows}`,
        record.issues.join(" | "),
      ]);
    }
  }

  fs.writeFileSync(
    reportPath,
    `${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`,
    "utf8",
  );
}

function worst(records, limit = 20) {
  return [...records]
    .filter((record) => record.severity !== "Pass")
    .sort((a, b) => a.score - b.score || (b.thinResultRows || 0) - (a.thinResultRows || 0))
    .slice(0, limit);
}

function writeMarkdown(reportPath, summary, staticRecords, dbAudit, waveAudits) {
  const staticWorst = worst(staticRecords, 20);
  const dbPublishedWorst = worst(
    (dbAudit.records || []).filter((record) => record.status === "published"),
    20,
  );
  const waveWorst = worst(
    waveAudits.flatMap((audit) =>
      audit.records.map((record) => ({ ...record, sourceFile: audit.file })),
    ),
    20,
  );

  const lines = [
    `# Result Page Audit | ${REPORT_DATE}`,
    "",
    "## Summary",
    `- Static result pages: ${summary.static.tests}`,
    `- Static thin/broken: ${summary.static.thinOrBroken}`,
    `- DB published thin/broken: ${summary.database.publishedThinTests ?? "not checked"}`,
    `- DB draft thin/broken: ${summary.database.draftThinTests ?? "not checked"}`,
    `- Wave JSON thin items: ${summary.waveJson.thinItems}/${summary.waveJson.items}`,
    "",
    "## Worst Static Pages",
    ...formatWorst(staticWorst, "static"),
    "",
    "## Worst Published DB Results",
    ...formatWorst(dbPublishedWorst, "database"),
    "",
    "## Worst Wave JSON Sources",
    ...formatWorst(waveWorst, "wave"),
    "",
    "## Next Fix Strategy",
    "- P0: missing result page/type and broken flow first.",
    "- P1: add richer per-result summary, traits, details, FAQ, and enough visible sections.",
    "- P2: add related tests, action guide, metadata, Korean section labels, and remove console logging.",
  ];

  fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8");
}

function formatWorst(records, source) {
  if (records.length === 0) return ["- None"];
  return records.map((record) => {
    const label = source === "wave" ? `${record.sourceFile}:${record.slug}` : record.slug;
    return `- ${record.severity} ${label}: ${record.issues.join("; ")}`;
  });
}

async function main() {
  ensureReportsDir();

  const staticRecords = auditStaticResultPages();
  const dbAudit = await auditDatabaseResults();
  const waveAudits = auditWaveJsonFiles();
  const summary = buildSummary(staticRecords, dbAudit, waveAudits);
  const report = {
    summary,
    staticRecords,
    database: dbAudit,
    waveJson: waveAudits,
  };

  const jsonPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.json`);
  const csvPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.csv`);
  const mdPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.md`);

  writeJson(jsonPath, report);
  writeCsv(csvPath, staticRecords, dbAudit, waveAudits);
  writeMarkdown(mdPath, summary, staticRecords, dbAudit, waveAudits);

  console.log(`Result page audit written:`);
  console.log(`- ${path.relative(ROOT, jsonPath)}`);
  console.log(`- ${path.relative(ROOT, csvPath)}`);
  console.log(`- ${path.relative(ROOT, mdPath)}`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
