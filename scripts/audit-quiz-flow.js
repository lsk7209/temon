#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const REPORTS_DIR = path.join(ROOT, "reports");
const REPORT_DATE = new Date().toISOString().slice(0, 10);
const REPORT_BASENAME = `quiz-flow-audit-${REPORT_DATE}`;
const BASE_URL = (process.env.QUIZ_AUDIT_BASE_URL || "").replace(/\/$/, "");
const RENDER_CONCURRENCY = Number(process.env.QUIZ_AUDIT_CONCURRENCY || 12);
const RENDER_TIMEOUT_MS = Number(process.env.QUIZ_AUDIT_TIMEOUT_MS || 8000);

const SEVERITY_SCORE = { P0: 0, P1: 40, P2: 70, P3: 82, Pass: 95 };
const MIN = {
  title: 8,
  description: 50,
  tags: 2,
  questions: 8,
  resultRows: 8,
  resultSummary: 80,
  resultTraits: 3,
  resultDetails: 5,
  visibleResultText: 900,
  resultSections: 5,
};

const AUTO_ENHANCEMENT_SKIP_SLUGS = new Set([
  "breakup-style",
  "commute-style",
  "food-brand",
  "hotel-breakfast",
  "investment-style",
  "meeting-villain",
  "spending-style",
  "spice-tolerance",
  "zombie-survival",
]);

const MOJIBAKE_PATTERN =
  /(?:�|占|챙|챘|찾|챨|野|媛|뚯|寃|곌|낵|臾|덈|쒖|쇰|대|뒗|땲|덉|쓽|쟻)/g;

dotenv.config({
  path: path.join(ROOT, ".env.local"),
  override: true,
  quiet: true,
});

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function ensureReportsDir() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function countMatches(source, pattern) {
  return (source.match(pattern) || []).length;
}

function parseJson(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value;
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function arrayCount(value) {
  return Array.isArray(value) ? value.length : 0;
}

function contentItemCount(value) {
  if (Array.isArray(value)) return value.length;
  if (!value || typeof value !== "object") return 0;
  return Object.values(value).reduce((total, item) => {
    if (Array.isArray(item)) return total + item.length;
    if (item && typeof item === "object") return total + contentItemCount(item);
    return total + (String(item || "").trim().length > 0 ? 1 : 0);
  }, 0);
}

function addIssue(issues, severity, message) {
  issues.push({ severity, message });
}

function overallSeverity(issues) {
  for (const severity of ["P0", "P1", "P2", "P3"]) {
    if (issues.some((issue) => issue.severity === severity)) return severity;
  }
  return "Pass";
}

function scoreFor(issues) {
  return SEVERITY_SCORE[overallSeverity(issues)];
}

function formatIssues(issues) {
  return issues.map((issue) => `${issue.severity} ${issue.message}`);
}

function getQuizDirs() {
  if (!fs.existsSync(TESTS_DIR)) return [];
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "[testId]")
    .map((entry) => entry.name)
    .sort();
}

function extractAllTestsMeta() {
  const source = readText(path.join(ROOT, "lib", "tests-config.ts"));
  const records = new Map();
  const objectPattern = /\{\s*id:\s*"([^"]+)"([\s\S]*?)\n\s*\},/g;
  let match;

  while ((match = objectPattern.exec(source))) {
    const slug = match[1];
    const body = match[2];
    records.set(slug, {
      title: pickString(body, "title"),
      description: pickString(body, "description"),
      category: pickString(body, "category"),
      tags: pickStringArray(body, "tags"),
      participants: pickString(body, "participants"),
      rating: Number(pickNumber(body, "rating") || 0),
    });
  }

  return records;
}

function pickString(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*"([^"]*)"`));
  return match ? match[1] : "";
}

function pickNumber(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*([0-9.]+)`));
  return match ? match[1] : "";
}

function pickStringArray(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`));
  if (!match) return [];
  return Array.from(match[1].matchAll(/"([^"]*)"/g)).map((item) => item[1]);
}

function auditIntro(slug, testDir, meta) {
  const filePath = path.join(testDir, "page.tsx");
  const source = readText(filePath);
  const issues = [];
  const metrics = {
    exists: fs.existsSync(filePath),
    sourceChars: source.length,
    h1Count: countMatches(source, /<h1\b/g),
    sectionCount: countMatches(source, /<section\b|<article\b|<Card\b/g),
    linkToTest: source.includes(`/tests/${slug}/test`) || source.includes("/test"),
    metadata: /export const metadata|generateMetadata/.test(source),
    jsonLd: source.includes("JsonLd") || source.includes("generateQuizSchemas"),
    faq: /FAQ|faq|FAQSection|createFAQSchema|getTopicQuizFAQs/.test(source),
    toc: /ContentToc|data-content-toc/.test(source),
    mojibakeHits: countMatches(source, MOJIBAKE_PATTERN),
  };

  if (!metrics.exists) addIssue(issues, "P0", "intro page file missing");
  if (metrics.exists && metrics.h1Count < 1) addIssue(issues, "P1", "intro H1 missing");
  if (metrics.exists && !metrics.linkToTest) addIssue(issues, "P1", "intro start CTA missing");
  if (meta && String(meta.title || "").trim().length < MIN.title) {
    addIssue(issues, "P2", "test title too short or missing in registry");
  }
  if (meta && String(meta.description || "").trim().length < MIN.description) {
    addIssue(issues, "P2", "test description too short or missing in registry");
  }
  if (meta && arrayCount(meta.tags) < MIN.tags) addIssue(issues, "P3", "registry tags too sparse");
  if (metrics.exists && !metrics.metadata) addIssue(issues, "P2", "intro metadata missing");
  if (metrics.exists && !metrics.jsonLd) addIssue(issues, "P2", "intro JSON-LD missing");
  if (metrics.exists && !metrics.faq) addIssue(issues, "P3", "intro FAQ signal missing");
  if (metrics.mojibakeHits > 15) addIssue(issues, "P2", `intro mojibake suspected: ${metrics.mojibakeHits}`);

  return { score: scoreFor(issues), severity: overallSeverity(issues), metrics, issues };
}

function auditQuestion(slug, testDir) {
  const filePath = path.join(testDir, "test", "page.tsx");
  const source = readText(filePath);
  const issues = [];
  const questionCount = estimateQuestionCount(source);
  const metrics = {
    exists: fs.existsSync(filePath),
    sourceChars: source.length,
    questionCount,
    progress: /Progress|progress|currentQuestion/.test(source),
    previous: /previous|Previous|이전|handlePrevious|이전 질문/.test(source),
    submitOrResult: /resultPath|router\.push|saveResult|calculateResult/.test(source),
    choices: countMatches(source, /choices:|choice1Text|options:|\btext:\s*"/g),
    mojibakeHits: countMatches(source, MOJIBAKE_PATTERN),
    consoleLogging: /console\.(log|error|warn)/.test(source),
  };

  if (!metrics.exists) addIssue(issues, "P0", "question page file missing");
  if (metrics.exists && metrics.questionCount > 0 && metrics.questionCount < MIN.questions) {
    addIssue(issues, "P1", `question count low: ${metrics.questionCount}`);
  }
  if (metrics.exists && metrics.questionCount === 0 && !source.includes("questions")) {
    addIssue(issues, "P1", "question data not detectable");
  }
  if (metrics.exists && !metrics.progress) addIssue(issues, "P2", "question progress UI missing");
  if (metrics.exists && !metrics.previous) addIssue(issues, "P3", "previous question control missing");
  if (metrics.exists && !metrics.submitOrResult) addIssue(issues, "P1", "result navigation/save flow missing");
  if (metrics.mojibakeHits > 15) addIssue(issues, "P2", `question mojibake suspected: ${metrics.mojibakeHits}`);
  if (metrics.consoleLogging) addIssue(issues, "P3", "console logging remains in question page");

  return { score: scoreFor(issues), severity: overallSeverity(issues), metrics, issues };
}

function estimateQuestionCount(source) {
  const questionsStart = source.indexOf("const questions");
  const exportStart = source.indexOf("export default");
  if (questionsStart >= 0 && exportStart > questionsStart) {
    const questionBlock = source.slice(questionsStart, exportStart);
    const byQuestionKey = countMatches(questionBlock, /\n\s*question\s*:/g);
    if (byQuestionKey > 0) return byQuestionKey;
  }

  const constArray = source.match(/const\s+questions\s*[:\w\s<>,]*=\s*\[([\s\S]*?)\n\s*\]/);
  if (constArray) {
    const byQuestion = countMatches(constArray[1], /question\s*:/g);
    if (byQuestion > 0) return byQuestion;
  }
  const importedData = source.match(/QUESTIONS|questions\s*,|questions={|ClientRunner/);
  return importedData ? -1 : 0;
}

function auditResult(slug, testDir) {
  const filePath = path.join(testDir, "test", "result", "page.tsx");
  const layoutPath = path.join(testDir, "test", "result", "layout.tsx");
  const source = readText(filePath);
  const layoutSource = readText(layoutPath);
  const issues = [];
  const usesCommon = source.includes("MbtiResultPage") || source.includes("RedesignedResultPage");
  const usesGlobalAutoEnhancement =
    fs.existsSync(path.join(ROOT, "app", "tests", "layout.tsx")) &&
    !AUTO_ENHANCEMENT_SKIP_SLUGS.has(slug);
  const usesAutoEnhancement =
    usesCommon || source.includes("StaticResultEnhancements") || usesGlobalAutoEnhancement;
  const resultMapCount = countMatches(source, /description:\s*\[|summary:\s*"|mbti:\s*"|typeCode/g);
  const effectiveSections =
    countMatches(source, /<section\b|<article\b|<Card\b/g) + (usesCommon ? 8 : 0) + (usesAutoEnhancement ? 4 : 0);
  const effectiveParagraphs = countMatches(source, /<p\b/g) + (usesCommon ? 8 : 0) + (usesAutoEnhancement ? 5 : 0);
  const metrics = {
    exists: fs.existsSync(filePath),
    sourceChars: source.length,
    h1Count: countMatches(source, /<h1\b/g) + (usesCommon ? 1 : 0),
    resultMapCount,
    effectiveSections,
    effectiveParagraphs,
    metadata: /export const metadata|generateMetadata/.test(source + layoutSource),
    share: /ShareButtons|navigator\.share|copy|clipboard/.test(source) || usesCommon || usesGlobalAutoEnhancement,
    faq: /FAQ|faq|ResultFaqSchema|createFAQSchema|getTopicResultFAQs/.test(source) || usesCommon || usesAutoEnhancement,
    toc: /ContentToc|resultTocItems|data-content-toc/.test(source) || usesCommon || usesAutoEnhancement,
    related: /RelatedTestsSection|related/.test(source) || usesCommon || usesAutoEnhancement,
    actionGuide: /actionTips|recommend|pitfalls|useCases|StaticResultEnhancements|활용|가이드|추천/.test(source) || usesCommon || usesAutoEnhancement,
    adReserve: /AdReserve|ad-reserve|data-ad-reserve/.test(source),
    englishTitle: /Where This Result|Action Guide|More .* Quizzes|>FAQ</.test(source),
    mojibakeHits: countMatches(source, MOJIBAKE_PATTERN),
    consoleLogging: /console\.(log|error|warn)/.test(source),
  };

  if (!metrics.exists) addIssue(issues, "P0", "result page file missing");
  if (metrics.exists && metrics.h1Count < 1) addIssue(issues, "P1", "result H1 missing");
  if (metrics.exists && !metrics.share) addIssue(issues, "P1", "result share UI missing");
  if (metrics.exists && !metrics.faq) addIssue(issues, "P1", "result FAQ missing");
  if (metrics.exists && metrics.effectiveSections < MIN.resultSections) {
    addIssue(issues, "P1", `result visible sections low: ${metrics.effectiveSections}`);
  }
  if (metrics.exists && metrics.effectiveParagraphs < 5) {
    addIssue(issues, "P1", `result paragraphs low: ${metrics.effectiveParagraphs}`);
  }
  if (metrics.exists && !metrics.toc) addIssue(issues, "P2", "result table of contents missing");
  if (metrics.exists && !metrics.related) addIssue(issues, "P2", "related tests missing");
  if (metrics.exists && !metrics.actionGuide) addIssue(issues, "P2", "result action/use guide missing");
  if (metrics.exists && !metrics.metadata) addIssue(issues, "P2", "result metadata missing");
  if (metrics.adReserve) addIssue(issues, "P1", "manual ad reserve remains in result page");
  if (metrics.englishTitle) addIssue(issues, "P2", "English section title remains");
  if (metrics.mojibakeHits > 25) addIssue(issues, "P2", `result mojibake suspected: ${metrics.mojibakeHits}`);
  if (metrics.consoleLogging) addIssue(issues, "P3", "console logging remains in result page");

  return { score: scoreFor(issues), severity: overallSeverity(issues), metrics, issues };
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RENDER_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function auditRender(slug) {
  if (!BASE_URL) {
    return {
      skipped: true,
      reason: "QUIZ_AUDIT_BASE_URL not set",
      checks: [],
      issues: [],
      severity: "Pass",
      score: 95,
    };
  }

  const urls = [
    { kind: "intro", url: `${BASE_URL}/tests/${slug}` },
    { kind: "question", url: `${BASE_URL}/tests/${slug}/test` },
    { kind: "resultEntry", url: `${BASE_URL}/tests/${slug}/test/result?type=ENFP` },
  ];
  const checks = [];
  const issues = [];

  for (const item of urls) {
    try {
      const response = await fetchWithTimeout(item.url);
      const text = await response.text();
      const status = response.status;
      const h1Count = countMatches(text, /<h1\b/g);
      const adReserve = /ad-reserve|data-ad-reserve/.test(text);
      const serverError = /Server Error|Application error|NEXT_NOT_FOUND/.test(text);
      checks.push({
        kind: item.kind,
        status,
        bytes: text.length,
        h1Count,
        adReserve,
        serverError,
      });

      if (status >= 500 || serverError) addIssue(issues, "P0", `${item.kind} render server error`);
      if (status === 404) addIssue(issues, "P0", `${item.kind} render 404`);
      if (status >= 400 && status !== 404) addIssue(issues, "P1", `${item.kind} render status ${status}`);
      if (item.kind !== "question" && status < 400 && h1Count < 1) {
        addIssue(issues, "P1", `${item.kind} rendered H1 missing`);
      }
      if (adReserve) addIssue(issues, "P1", `${item.kind} rendered manual ad reserve`);
    } catch (error) {
      checks.push({ kind: item.kind, error: error.message });
    }
  }

  return {
    skipped: false,
    checks,
    issues,
    severity: overallSeverity(issues),
    score: scoreFor(issues),
  };
}

async function auditDatabase() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    return {
      available: false,
      reason: "TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing",
      records: [],
      bySlug: new Map(),
    };
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const testRows = (
      await db.execute(
        "select id, slug, title, description, category, status, question_count, result_type_count from tests order by status, slug",
      )
    ).rows;
    const questionRows = (
      await db.execute(
        "select test_id, question_text, choice_1_text, choice_2_text from questions",
      )
    ).rows;
    const resultRows = (
      await db.execute(
        "select test_id, type_code, label, summary, traits, picks, tips, match_types from result_types",
      )
    ).rows;

    const questionsByTest = groupBy(questionRows, "test_id");
    const resultsByTest = groupBy(resultRows, "test_id");
    const records = testRows.map((test) => {
      const issues = [];
      const testQuestions = questionsByTest.get(test.id) || [];
      const testResults = resultsByTest.get(test.id) || [];
      const thinResults = testResults.filter((result) => {
        const summaryLength = String(result.summary || "").trim().length;
        const traits = parseJson(result.traits, []);
        const picks = parseJson(result.picks, []);
        const tips = parseJson(result.tips, []);
        const matchTypes = parseJson(result.match_types, []);
        const details =
          contentItemCount(traits) +
          contentItemCount(picks) +
          contentItemCount(tips) +
          contentItemCount(matchTypes);
        return (
          summaryLength < MIN.resultSummary ||
          arrayCount(traits) < MIN.resultTraits ||
          details < MIN.resultDetails
        );
      });

      if (test.status === "published" && testQuestions.length === 0) {
        addIssue(issues, "P0", "DB published test has no questions");
      }
      if (test.status === "published" && testResults.length === 0) {
        addIssue(issues, "P0", "DB published test has no result types");
      }
      if (testQuestions.length > 0 && testQuestions.length < MIN.questions) {
        addIssue(issues, "P1", `DB question count low: ${testQuestions.length}`);
      }
      if (testResults.length > 0 && testResults.length < Number(test.result_type_count || MIN.resultRows)) {
        addIssue(issues, "P0", `DB result types missing: ${testResults.length}/${test.result_type_count || MIN.resultRows}`);
      }
      if (thinResults.length > 0) {
        addIssue(issues, "P1", `DB thin result rows: ${thinResults.length}`);
      }
      if (String(test.description || "").trim().length < MIN.description) {
        addIssue(issues, "P2", "DB test description too short");
      }

      return {
        source: "database",
        slug: test.slug,
        status: test.status,
        title: test.title,
        expectedQuestions: Number(test.question_count || 0),
        actualQuestions: testQuestions.length,
        expectedResults: Number(test.result_type_count || 0),
        actualResults: testResults.length,
        thinResultRows: thinResults.length,
        severity: overallSeverity(issues),
        score: scoreFor(issues),
        issues,
      };
    });

    return {
      available: true,
      records,
      bySlug: new Map(records.map((record) => [record.slug, record])),
    };
  } finally {
    db.close();
  }
}

function groupBy(rows, key) {
  const map = new Map();
  for (const row of rows) {
    const value = row[key];
    if (!map.has(value)) map.set(value, []);
    map.get(value).push(row);
  }
  return map;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return results;
}

async function auditStaticTests(dbBySlug) {
  const metaBySlug = extractAllTestsMeta();
  const slugs = getQuizDirs();

  return mapLimit(slugs, RENDER_CONCURRENCY, async (slug) => {
    const testDir = path.join(TESTS_DIR, slug);
    const intro = auditIntro(slug, testDir, metaBySlug.get(slug));
    const question = auditQuestion(slug, testDir);
    const result = auditResult(slug, testDir);
    const render = await auditRender(slug);
    const db = dbBySlug.get(slug) || null;
    const issues = [
      ...intro.issues.map((issue) => ({ ...issue, area: "intro" })),
      ...question.issues.map((issue) => ({ ...issue, area: "question" })),
      ...result.issues.map((issue) => ({ ...issue, area: "result" })),
      ...render.issues.map((issue) => ({ ...issue, area: "render" })),
      ...(db ? db.issues.map((issue) => ({ ...issue, area: "database" })) : []),
    ];

    return {
      slug,
      source: db ? "static+database" : "static",
      title: metaBySlug.get(slug)?.title || db?.title || slug,
      severity: overallSeverity(issues),
      score: scoreFor(issues),
      intro,
      question,
      result,
      render,
      database: db,
      issues,
      recommendedFix: recommendFix(issues),
    };
  });
}

function recommendFix(issues) {
  if (issues.some((issue) => issue.severity === "P0")) {
    return "라우트/질문/결과 타입 누락부터 복구";
  }
  if (issues.some((issue) => issue.area === "result" && issue.severity === "P1")) {
    return "결과 페이지 섹션, FAQ, 공유, 설명 보강 우선";
  }
  if (issues.some((issue) => issue.area === "question" && issue.severity === "P1")) {
    return "질문 수와 결과 이동 흐름 점검";
  }
  if (issues.some((issue) => issue.area === "intro" && issue.severity === "P1")) {
    return "인트로 H1/CTA/메타 구조 보강";
  }
  if (issues.length > 0) return "SEO/목차/관련 링크/문구 품질 보강";
  return "유지";
}

function buildSummary(staticRecords, dbAudit) {
  const dbOnly = (dbAudit.records || []).filter(
    (record) => !staticRecords.some((staticRecord) => staticRecord.slug === record.slug),
  );
  const allRecords = [...staticRecords, ...dbOnly];

  return {
    generatedAt: new Date().toISOString(),
    renderBaseUrl: BASE_URL || null,
    staticTests: staticRecords.length,
    dbTests: dbAudit.available ? dbAudit.records.length : null,
    dbAvailable: dbAudit.available,
    bySeverity: countBy(allRecords, "severity"),
    staticBySeverity: countBy(staticRecords, "severity"),
    dbOnlyBySeverity: countBy(dbOnly, "severity"),
    p0: allRecords.filter((record) => record.severity === "P0").length,
    p1: allRecords.filter((record) => record.severity === "P1").length,
    p2: allRecords.filter((record) => record.severity === "P2").length,
    p3: allRecords.filter((record) => record.severity === "P3").length,
    pass: allRecords.filter((record) => record.severity === "Pass").length,
  };
}

function countBy(records, key) {
  return records.reduce((acc, record) => {
    const value = record[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function worst(records, limit = 30) {
  return [...records]
    .filter((record) => record.severity !== "Pass")
    .sort((a, b) => a.score - b.score || b.issues.length - a.issues.length)
    .slice(0, limit);
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, records) {
  const rows = [
    ["slug", "source", "severity", "score", "recommendedFix", "issues"],
    ...records.map((record) => [
      record.slug,
      record.source,
      record.severity,
      record.score,
      record.recommendedFix || "",
      formatIssues(record.issues || []).join(" | "),
    ]),
  ];
  fs.writeFileSync(
    filePath,
    `${rows.map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`,
    "utf8",
  );
}

function writeMarkdown(filePath, summary, staticRecords, dbAudit) {
  const dbOnly = (dbAudit.records || []).filter(
    (record) => !staticRecords.some((staticRecord) => staticRecord.slug === record.slug),
  );
  const allRecords = [...staticRecords, ...dbOnly];
  const lines = [
    `# Quiz Flow Audit | ${REPORT_DATE}`,
    "",
    "## Summary",
    `- Static tests: ${summary.staticTests}`,
    `- DB tests: ${summary.dbTests ?? "not checked"}`,
    `- Render base URL: ${summary.renderBaseUrl || "not checked"}`,
    `- Severity: P0 ${summary.p0}, P1 ${summary.p1}, P2 ${summary.p2}, P3 ${summary.p3}, Pass ${summary.pass}`,
    "",
    "## Worst 30",
    ...formatWorst(worst(allRecords, 30)),
    "",
    "## Common Fix Order",
    "- P0: 라우트, 질문, 결과 타입, 404/500부터 복구.",
    "- P1: 결과 설명, 섹션, FAQ, 공유 버튼, 모바일 렌더링 문제 보강.",
    "- P2: 목차, 관련 테스트, 메타데이터, 인코딩 깨짐 의심 문구 정리.",
    "- P3: 태그, CTA, 이전 버튼, 보조 설명 같은 품질 신호 보강.",
  ];
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function formatWorst(records) {
  if (records.length === 0) return ["- None"];
  return records.map((record) => {
    const issues = formatIssues(record.issues || []).slice(0, 5).join("; ");
    return `- ${record.severity} ${record.slug}: ${record.recommendedFix || "점검"} | ${issues}`;
  });
}

async function main() {
  ensureReportsDir();
  const dbAudit = await auditDatabase();
  const staticRecords = await auditStaticTests(dbAudit.bySlug || new Map());
  const dbOnlyRecords = (dbAudit.records || [])
    .filter((record) => !staticRecords.some((staticRecord) => staticRecord.slug === record.slug))
    .map((record) => ({
      ...record,
      source: "database-only",
      recommendedFix: recommendFix(record.issues || []),
    }));
  const allRecords = [...staticRecords, ...dbOnlyRecords];
  const summary = buildSummary(staticRecords, dbAudit);
  const report = { summary, records: allRecords, database: dbAudit.available ? dbAudit.records : dbAudit };

  const jsonPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.json`);
  const csvPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.csv`);
  const mdPath = path.join(REPORTS_DIR, `${REPORT_BASENAME}.md`);

  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  writeCsv(csvPath, allRecords);
  writeMarkdown(mdPath, summary, staticRecords, dbAudit);

  console.log("Quiz flow audit written:");
  console.log(`- ${path.relative(ROOT, jsonPath)}`);
  console.log(`- ${path.relative(ROOT, csvPath)}`);
  console.log(`- ${path.relative(ROOT, mdPath)}`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exit(1);
});
