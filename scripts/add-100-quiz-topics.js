#!/usr/bin/env node
/**
 * Quiz topic plan validator and queue inserter.
 *
 * Dry-run:
 *   node scripts/add-100-quiz-topics.js --plan data/quiz-topic-plan-100-wave2.json
 * Apply:
 *   node scripts/add-100-quiz-topics.js --plan data/quiz-topic-plan-100-wave2.json --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");
const { nanoid } = require("nanoid");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_PLAN_PATH = path.join(ROOT, "data", "quiz-topic-plan-100.json");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const APPLY = process.argv.includes("--apply");
const THRESHOLD = 0.3;

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function getArg(name) {
  const prefix = `${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  if (value) return value.slice(prefix.length);

  const index = process.argv.indexOf(name);
  if (index === -1) return null;

  const nextValue = process.argv[index + 1];
  return nextValue && !nextValue.startsWith("--") ? nextValue : null;
}

function getPlanPath() {
  const planArg = getArg("--plan");
  return planArg ? path.resolve(ROOT, planArg) : DEFAULT_PLAN_PATH;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listExistingRouteSlugs() {
  return fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("[") && !name.startsWith("_"));
}

function collectReservedStrings() {
  const files = [
    "data/quiz-topic-plan-100.json",
    "scripts/add-new-topics.js",
    "scripts/generate-quiz-batch.js",
    "NEW_QUIZ_ROADMAP.md",
  ];

  return files.flatMap((relativePath) => {
    const filePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(filePath)) return [];

    const text = fs.readFileSync(filePath, "utf8");
    const quoted = [...text.matchAll(/["'`]([^"'`\n]{2,100})["'`]/g)].map(
      (match) => match[1],
    );
    const inlineSlugs = [...text.matchAll(/`([a-z0-9-]{4,})`/g)].map(
      (match) => match[1],
    );

    return [...quoted, ...inlineSlugs];
  });
}

function tokens(value) {
  const stopwords = new Set([
    "test",
    "style",
    "type",
    "habit",
    "mbti",
    "quiz",
    "테스트",
    "스타일",
    "유형",
    "성향",
    "습관",
    "방식",
    "반응",
    "관리",
    "찾기",
  ]);
  return (value || "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .map((token) => token.toLowerCase())
    .filter((token) => token.length >= 2 && !stopwords.has(token));
}

function similarity(aValue, bValue) {
  const a = new Set(tokens(aValue));
  const b = new Set(tokens(bValue));
  if (!a.size || !b.size) return { score: 0, shared: 0 };

  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }

  return {
    score: intersection / (a.size + b.size - intersection),
    shared: intersection,
  };
}

function isValidScheduledAt(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function validateShape(topics) {
  const errors = [];
  if (topics.length !== 100) {
    errors.push(`topic count must be 100, got ${topics.length}`);
  }

  topics.forEach((topic, index) => {
    const prefix = `#${index + 1} ${topic.slug || "(no-slug)"}`;
    if (!topic.title) errors.push(`${prefix}: title missing`);
    if (!/^[a-z0-9-]+$/.test(topic.slug || "")) {
      errors.push(`${prefix}: invalid slug`);
    }
    if (!topic.mainKeyword) errors.push(`${prefix}: mainKeyword missing`);
    if (!Array.isArray(topic.expandedKeywords)) {
      errors.push(`${prefix}: expandedKeywords must be array`);
    } else if (
      topic.expandedKeywords.length < 5 ||
      topic.expandedKeywords.length > 8
    ) {
      errors.push(`${prefix}: expandedKeywords must be 5-8 items`);
    }
    if (!topic.category) errors.push(`${prefix}: category missing`);
    if (!topic.intentNote) errors.push(`${prefix}: intentNote missing`);
    if (!isValidScheduledAt(topic.scheduledAt)) {
      errors.push(`${prefix}: scheduledAt must be a valid date string`);
    }
  });

  return errors;
}

async function collectDbExisting() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    return { tests: [], queue: [] };
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const testRows = await client.execute(
      "SELECT title, slug FROM tests ORDER BY created_at DESC",
    );
    const queueRows = await client.execute(
      "SELECT keyword, logs FROM test_queue ORDER BY created_at DESC",
    );

    return {
      tests: testRows.rows.flatMap((row) => [row.title, row.slug]).filter(Boolean),
      queue: queueRows.rows.flatMap((row) => {
        const values = [row.keyword];
        try {
          const parsed = JSON.parse(row.logs || "{}");
          const metadata = parsed.metadata || parsed;
          if (metadata.slug) values.push(metadata.slug);
          if (metadata.mainKeyword) values.push(metadata.mainKeyword);
        } catch {}
        return values.filter(Boolean);
      }),
    };
  } finally {
    await client.close();
  }
}

function validateDuplicates(topics, existingStrings) {
  const warnings = [];
  const seenSlugs = new Set();
  const seenTitles = new Set();

  topics.forEach((topic) => {
    if (seenSlugs.has(topic.slug)) warnings.push(`[PLAN_DUPLICATE_SLUG] ${topic.slug}`);
    if (seenTitles.has(topic.title)) warnings.push(`[PLAN_DUPLICATE_TITLE] ${topic.title}`);
    seenSlugs.add(topic.slug);
    seenTitles.add(topic.title);

    for (const existing of existingStrings) {
      const slugSimilarity = similarity(topic.slug, existing);
      const titleSimilarity = similarity(topic.title, existing);
      const keywordSimilarity = similarity(topic.mainKeyword, existing);
      const score = Math.max(
        slugSimilarity.score,
        titleSimilarity.score,
        keywordSimilarity.score,
      );
      const shared = Math.max(
        slugSimilarity.shared,
        titleSimilarity.shared,
        keywordSimilarity.shared,
      );
      if (shared >= 2 && score >= THRESHOLD) {
        warnings.push(
          `[SIMILAR_EXISTING] ${topic.slug} <-> ${existing} (${score.toFixed(2)})`,
        );
        break;
      }
    }
  });

  return warnings;
}

async function applyToQueue(topics) {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  let added = 0;
  let skipped = 0;
  try {
    for (const topic of topics) {
      const existingTest = await client.execute({
        sql: "SELECT id FROM tests WHERE slug = ? OR title = ? LIMIT 1",
        args: [topic.slug, topic.title],
      });
      const existingQueue = await client.execute({
        sql: "SELECT id FROM test_queue WHERE keyword = ? LIMIT 1",
        args: [topic.title],
      });

      if (existingTest.rows.length || existingQueue.rows.length) {
        skipped += 1;
        continue;
      }

      await client.execute({
        sql: "INSERT INTO test_queue (id, keyword, status, created_at, logs) VALUES (?, ?, ?, ?, ?)",
        args: [
          nanoid(),
          topic.title,
          "pending",
          Math.floor(Date.now() / 1000),
          JSON.stringify({
            slug: topic.slug,
            mainKeyword: topic.mainKeyword,
            expandedKeywords: topic.expandedKeywords,
            category: topic.category,
            intentNote: topic.intentNote,
            scheduledAt: topic.scheduledAt,
            wave: "wave2",
          }),
        ],
      });
      added += 1;
    }
  } finally {
    await client.close();
  }

  return { added, skipped };
}

async function main() {
  const planPath = getPlanPath();
  const topics = readJson(planPath);
  const routeSlugs = listExistingRouteSlugs();
  const reservedStrings = collectReservedStrings();
  const dbExisting = await collectDbExisting();
  const existingStrings = [
    ...routeSlugs,
    ...reservedStrings,
    ...dbExisting.tests,
    ...dbExisting.queue,
  ];

  const shapeErrors = validateShape(topics);
  const duplicateWarnings = validateDuplicates(topics, existingStrings);

  console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
  console.log(`plan: ${path.relative(ROOT, planPath)}`);
  console.log(`topics: ${topics.length}`);
  console.log(`existing strings: ${existingStrings.length}`);
  console.log(`shape errors: ${shapeErrors.length}`);
  console.log(`duplicate warnings: ${duplicateWarnings.length}`);

  if (shapeErrors.length || duplicateWarnings.length) {
    [...shapeErrors, ...duplicateWarnings].slice(0, 100).forEach((message) =>
      console.log(`- ${message}`),
    );
    process.exit(1);
  }

  if (!APPLY) {
    console.log("OK: dry-run passed. Use --apply to insert into test_queue.");
    return;
  }

  const result = await applyToQueue(topics);
  console.log(`OK: added ${result.added}, skipped ${result.skipped}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
