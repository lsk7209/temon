#!/usr/bin/env node
/**
 * 신규 100개 draft 퀴즈의 발행 전 설명문을 주제별 고유 문구로 정리합니다.
 *
 * 기본은 dry-run입니다.
 *   node scripts/polish-quiz-drafts.js
 * 실제 DB 반영:
 *   node scripts/polish-quiz-drafts.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const PLAN_PATH = path.join(ROOT, "data", "quiz-topic-plan-100.json");
const APPLY = process.argv.includes("--apply");
const BAD_PHRASES = [
  "평소 선택 기준, 일 처리 흐름, 주변과 맞는 협업 포인트",
  "결과는 공유하기 좋은 MBTI 유형별 해석으로 정리됩니다",
  "자연스럽게 확인할 수 있습니다",
];
const CATEGORY_FOCUS = {
  "직장": "업무 습관과 협업 반응",
  "학교": "학습 습관과 참여 방식",
  "관계": "대화 방식과 거리감",
  "소비": "구매 기준과 결정 패턴",
  "생활": "생활 루틴과 배려 방식",
  "엔터테인먼트": "감상 취향과 몰입 방식",
  "취미": "취미 몰입도와 취향",
  "SNS": "온라인 표현 방식과 거리감",
  "디지털": "디지털 정리 습관과 사용 패턴",
  "계절": "계절 변화에 반응하는 방식",
  "심리": "감정 처리 방식과 회복 패턴",
  "트렌드": "유행을 받아들이는 속도와 소비 반응",
};

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

function readTopics() {
  return JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function hasBatchim(value) {
  const char = compact(value).slice(-1);
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function objectParticle(value) {
  return hasBatchim(value) ? "을" : "를";
}

function buildDescription(topic) {
  const [first, second, third] = topic.expandedKeywords;
  const focus = CATEGORY_FOCUS[topic.category] || "선택 방식과 반응 패턴";
  const sentence = [
    `${topic.title}는 ${topic.mainKeyword}${objectParticle(topic.mainKeyword)} 중심으로 나의 ${focus}${objectParticle(focus)} 알아보는 MBTI 스타일 퀴즈입니다.`,
    `${first}, ${second}, ${third} 같은 실제 상황을 12문항으로 확인하고, 16가지 결과로 강점과 주의할 점을 정리합니다.`,
  ].join(" ");

  return compact(sentence);
}

function hasBadDescription(description) {
  const value = compact(description);
  return BAD_PHRASES.some((phrase) => value.includes(phrase));
}

function isCompleteSentence(description) {
  return /[.!?。요다죠음함니다]$/.test(compact(description));
}

async function getGeneratedDrafts(client, topics) {
  const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const queue = await client.execute("SELECT keyword, status, logs FROM test_queue");
  const drafts = [];

  for (const row of queue.rows) {
    let parsed;
    try {
      parsed = JSON.parse(row.logs || "{}");
    } catch {
      continue;
    }

    const metadata = parsed.metadata || parsed;
    const topic = topicBySlug.get(metadata.slug);
    if (!topic || !parsed.testId) continue;

    const test = await client.execute({
      sql: "SELECT id, title, description, status FROM tests WHERE id = ? LIMIT 1",
      args: [parsed.testId],
    });
    const testRow = test.rows[0];
    if (!testRow || testRow.status !== "draft") continue;

    drafts.push({ topic, test: testRow });
  }

  return drafts;
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

  const drafts = await getGeneratedDrafts(client, topics);
  const updates = drafts.map(({ topic, test }) => {
    const nextDescription = buildDescription(topic);
    return {
      id: test.id,
      title: test.title,
      before: test.description,
      after: nextDescription,
      changed:
        compact(test.description) !== nextDescription ||
        hasBadDescription(test.description) ||
        !isCompleteSentence(test.description),
    };
  });

  const changed = updates.filter((item) => item.changed);
  const invalid = updates.filter(
    (item) =>
      item.after.length < 120 ||
      item.after.length > 220 ||
      hasBadDescription(item.after) ||
      !isCompleteSentence(item.after),
  );

  console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
  console.log(`topics: ${topics.length}`);
  console.log(`drafts: ${drafts.length}`);
  console.log(`changed: ${changed.length}`);
  console.log(`invalid: ${invalid.length}`);

  if (invalid.length) {
    invalid.slice(0, 5).forEach((item) => {
      console.log(`- invalid ${item.title}: ${item.after}`);
    });
    process.exit(1);
  }

  if (!APPLY) {
    changed.slice(0, 5).forEach((item) => {
      console.log(`- ${item.title}`);
      console.log(`  before: ${compact(item.before).slice(0, 120)}`);
      console.log(`  after : ${item.after}`);
    });
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  for (const item of changed) {
    await client.execute({
      sql: "UPDATE tests SET description = ?, updated_at = ? WHERE id = ?",
      args: [item.after, now, item.id],
    });
  }

  console.log(`OK: polished ${changed.length} draft descriptions`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
