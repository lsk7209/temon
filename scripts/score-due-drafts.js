#!/usr/bin/env node
/**
 * Score due draft quizzes before the cron publisher can release them.
 *
 * Dry-run:
 *   node scripts/score-due-drafts.js
 * Apply metadata quality scores:
 *   node scripts/score-due-drafts.js --apply
 */
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const MIN_PUBLISH_SCORE = 90;
const QUALITY_VERSION = "due-draft-quality-v1";
const VALID_TAGS = new Set(["E", "I", "S", "N", "T", "F", "J", "P"]);
const AXIS_BY_TAG = { E: "EI", I: "EI", S: "SN", N: "SN", T: "TF", F: "TF", J: "JP", P: "JP" };
const GENERIC_SUMMARY_PATTERNS = [
  /카리스마/,
  /창의적이며/,
  /책임감/,
  /가능성을 탐색/,
  /긍정적인 영향/,
  /잠재력/,
  /목표 달성/,
];

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function parseJson(value, fallback) {
  if (!value) return fallback;
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function deduct(state, amount, issue) {
  state.score -= amount;
  state.issues.add(issue);
}

function scoreMetadata(state, test, metadata) {
  const title = compact(test.title);
  const description = compact(test.description);
  const keywords = Array.isArray(metadata.expandedKeywords) ? metadata.expandedKeywords : [];

  if (title.length < 8 || title.length > 45) deduct(state, 4, "title_length");
  if (description.length < 120 || description.length > 320) deduct(state, 8, "description_length");
  if (!metadata.mainKeyword) deduct(state, 5, "main_keyword_missing");
  if (keywords.length < 3) deduct(state, 4, "expanded_keywords_missing");
  if (!metadata.copyQuality) deduct(state, 3, "copy_quality_missing");
  if (!metadata.resultCopyQuality) deduct(state, 3, "result_copy_quality_missing");
  if (test.question_count !== 12) deduct(state, 10, "declared_question_count");
  if (test.result_type_count !== 16) deduct(state, 10, "declared_result_count");
}

function scoreQuestions(state, questions) {
  if (questions.length !== 12) deduct(state, 20, "question_count");

  const axisCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };
  questions.forEach((question, index) => {
    const text = compact(question.question_text);
    const choice1 = compact(question.choice_1_text);
    const choice2 = compact(question.choice_2_text);
    const tags = [
      ...parseJson(question.choice_1_tags, []),
      ...parseJson(question.choice_2_tags, []),
    ];
    const axes = new Set(tags.map((tag) => AXIS_BY_TAG[tag]).filter(Boolean));

    if (text.length < 15 || text.length > 90) deduct(state, 1, `question_length_${index + 1}`);
    if (!choice1 || !choice2) deduct(state, 2, `choice_missing_${index + 1}`);
    if (tags.some((tag) => !VALID_TAGS.has(tag))) deduct(state, 4, `invalid_tag_${index + 1}`);
    if (axes.size !== 1) deduct(state, 4, `mixed_axis_${index + 1}`);

    const axis = [...axes][0];
    if (axis) axisCounts[axis] += 1;
  });

  Object.entries(axisCounts).forEach(([axis, count]) => {
    if (count !== 3) deduct(state, 8, `axis_${axis}_${count}`);
  });
}

function scoreResults(state, results) {
  if (results.length !== 16) deduct(state, 20, "result_count");

  const typeCodes = new Set();
  const labels = new Set();
  let genericSummaryCount = 0;

  results.forEach((result) => {
    const typeCode = compact(result.type_code);
    const label = compact(result.label);
    const summary = compact(result.summary);
    const traits = parseJson(result.traits, []);

    if (typeCodes.has(typeCode)) deduct(state, 8, `duplicate_type_${typeCode}`);
    typeCodes.add(typeCode);
    if (labels.has(label)) deduct(state, 5, "duplicate_result_label");
    labels.add(label);
    if (summary.length < 80) deduct(state, 1, `short_summary_${typeCode}`);
    if (!Array.isArray(traits) || traits.length < 3) deduct(state, 1, `trait_count_${typeCode}`);
    if (GENERIC_SUMMARY_PATTERNS.some((pattern) => pattern.test(summary))) {
      genericSummaryCount += 1;
    }
  });

  if (genericSummaryCount > 0) {
    deduct(state, Math.min(8, Math.ceil(genericSummaryCount / 2)), "generic_result_summary");
  }
}

function buildQuality(test, metadata, questions, results) {
  const state = { score: 100, issues: new Set() };

  scoreMetadata(state, test, metadata);
  scoreQuestions(state, questions);
  scoreResults(state, results);

  return {
    score: Math.max(0, state.score),
    version: QUALITY_VERSION,
    checkedAt: new Date().toISOString(),
    requiredScore: MIN_PUBLISH_SCORE,
    issues: [...state.issues],
  };
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const now = Math.floor(Date.now() / 1000);
    const tests = (
      await client.execute({
        sql: `select id, slug, title, description, question_count, result_type_count, metadata
              from tests
              where status = ? and published_at <= ?
              order by published_at asc, created_at asc`,
        args: ["draft", now],
      })
    ).rows;

    const updates = [];
    for (const test of tests) {
      const metadata = parseJson(test.metadata, {});
      const questions = (
        await client.execute({
          sql: "select question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags from questions where test_id = ? order by question_order",
          args: [test.id],
        })
      ).rows;
      const results = (
        await client.execute({
          sql: "select type_code, label, summary, traits from result_types where test_id = ? order by type_code",
          args: [test.id],
        })
      ).rows;
      const quality = buildQuality(test, metadata, questions, results);
      const nextMetadata = { ...metadata, quality };

      updates.push({
        id: test.id,
        slug: test.slug,
        title: test.title,
        score: quality.score,
        publishable: quality.score >= MIN_PUBLISH_SCORE,
        issues: quality.issues,
        metadata: JSON.stringify(nextMetadata),
      });
    }

    const publishable = updates.filter((item) => item.publishable).length;
    const blocked = updates.length - publishable;
    const minScore = updates.length ? Math.min(...updates.map((item) => item.score)) : null;

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`due drafts: ${updates.length}`);
    console.log(`publishable >= ${MIN_PUBLISH_SCORE}: ${publishable}`);
    console.log(`blocked: ${blocked}`);
    console.log(`min score: ${minScore}`);
    console.log(
      JSON.stringify(
        updates.slice(0, 8).map((item) => ({
          slug: item.slug,
          score: item.score,
          publishable: item.publishable,
          issues: item.issues,
        })),
        null,
        2,
      ),
    );

    if (!APPLY) return;

    const updatedAt = Math.floor(Date.now() / 1000);
    for (const update of updates) {
      await client.execute({
        sql: "update tests set metadata = ?, updated_at = ? where id = ? and status = 'draft'",
        args: [update.metadata, updatedAt, update.id],
      });
    }

    console.log(`OK: scored ${updates.length} due drafts`);
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
