#!/usr/bin/env node
/**
 * data/quiz-topic-plan-100.json으로 생성한 100개 draft 퀴즈만 공개합니다.
 *
 * 기본은 dry-run입니다.
 *   node scripts/publish-quiz-drafts.js
 * 실제 공개:
 *   node scripts/publish-quiz-drafts.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const PLAN_PATH = path.join(ROOT, "data", "quiz-topic-plan-100.json");
const APPLY = process.argv.includes("--apply");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

function readTopics() {
  return JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
}

function parseLogs(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

async function collectTargets(client, topics) {
  const topicSlugs = new Set(topics.map((topic) => topic.slug));
  const queue = await client.execute("SELECT id, keyword, status, logs FROM test_queue");
  const targets = [];
  const skipped = [];

  for (const row of queue.rows) {
    const parsed = parseLogs(row.logs);
    const metadata = parsed.metadata || parsed;
    if (!metadata.slug || !topicSlugs.has(metadata.slug)) continue;

    if (row.status !== "completed" || !parsed.testId) {
      skipped.push({
        queueId: row.id,
        keyword: row.keyword,
        reason: "queue not completed or missing testId",
      });
      continue;
    }

    const test = await client.execute({
      sql: "SELECT id, title, slug, status, question_count, result_type_count FROM tests WHERE id = ? LIMIT 1",
      args: [parsed.testId],
    });
    const testRow = test.rows[0];
    if (!testRow) {
      skipped.push({ queueId: row.id, keyword: row.keyword, reason: "test missing" });
      continue;
    }

    targets.push({
      queueId: row.id,
      keyword: row.keyword,
      metadata,
      test: testRow,
    });
  }

  return { targets, skipped };
}

function validateTargets(targets, skipped, topics) {
  const errors = [];
  const ids = new Set();
  const slugs = new Set();

  if (targets.length !== topics.length) {
    errors.push(`target count must be ${topics.length}, got ${targets.length}`);
  }
  if (skipped.length) {
    errors.push(`skipped queue items: ${skipped.length}`);
  }

  for (const target of targets) {
    if (ids.has(target.test.id)) errors.push(`duplicate test id: ${target.test.id}`);
    ids.add(target.test.id);

    if (slugs.has(target.metadata.slug)) {
      errors.push(`duplicate topic slug: ${target.metadata.slug}`);
    }
    slugs.add(target.metadata.slug);

    if (!["draft", "published"].includes(target.test.status)) {
      errors.push(`${target.test.title}: status must be draft or published, got ${target.test.status}`);
    }
    if (target.test.question_count !== 12) {
      errors.push(`${target.test.title}: question_count must be 12`);
    }
    if (target.test.result_type_count !== 16) {
      errors.push(`${target.test.title}: result_type_count must be 16`);
    }
  }

  return errors;
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const topics = readTopics();
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const { targets, skipped } = await collectTargets(client, topics);
  const errors = validateTargets(targets, skipped, topics);

  console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
  console.log(`topics: ${topics.length}`);
  console.log(`targets: ${targets.length}`);
  console.log(`skipped: ${skipped.length}`);
  console.log(`draft: ${targets.filter((target) => target.test.status === "draft").length}`);
  console.log(`published: ${targets.filter((target) => target.test.status === "published").length}`);
  console.log(`errors: ${errors.length}`);

  if (errors.length) {
    errors.slice(0, 20).forEach((message) => console.log(`- ${message}`));
    process.exit(1);
  }

  if (!APPLY) {
    targets.slice(0, 5).forEach((target) => {
      console.log(`- ${target.test.title} / ${target.test.slug}`);
    });
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const drafts = targets.filter((target) => target.test.status === "draft");
  for (const target of drafts) {
    await client.execute({
      sql: "UPDATE tests SET status = 'published', published_at = ?, updated_at = ? WHERE id = ? AND status = 'draft'",
      args: [now, now, target.test.id],
    });
  }

  console.log(`OK: published ${drafts.length} tests`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
