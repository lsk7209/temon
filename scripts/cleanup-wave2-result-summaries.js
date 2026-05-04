#!/usr/bin/env node
/**
 * Final cleanup for wave2 result summaries.
 *
 * Dry-run:
 *   node scripts/cleanup-wave2-result-summaries.js
 * Apply:
 *   node scripts/cleanup-wave2-result-summaries.js --apply
 */
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

function parseJson(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

function cleanupSummary(summary, mainKeyword) {
  let text = String(summary || "");
  for (const type of TYPES) {
    text = text
      .replace(new RegExp(`${type}는`, "g"), "당신은")
      .replace(new RegExp(`${type}은`, "g"), "당신은")
      .replace(new RegExp(`['‘"]?${type}['’"]?\\s*유형으로,?\\s*`, "g"), "")
      .replace(new RegExp(`\\b${type}\\b`, "g"), "이 유형");
  }

  text = text
    .replace(/당신은\s+당신은/g, "당신은")
    .replace(/이 유형는/g, "이 유형은")
    .replace(/\s+/g, " ")
    .trim();

  if (!/[.!?요다]$/u.test(text)) {
    text = `${text}.`;
  }

  if (text.length < 80) {
    text += ` 이 선택은 ${mainKeyword}에서 드러나는 나만의 기준과 행동 속도를 보여줍니다.`;
  }

  return text;
}

async function main() {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const tests = (
      await db.execute(
        "select id,title,metadata from tests where metadata like '%\"wave\":\"wave2\"%' order by published_at",
      )
    ).rows;

    const updates = [];
    for (const test of tests) {
      const metadata = parseJson(test.metadata);
      const mainKeyword = metadata.mainKeyword || test.title;
      const resultRows = (
        await db.execute({
          sql: "select id,type_code,summary from result_types where test_id=?",
          args: [test.id],
        })
      ).rows;
      for (const result of resultRows) {
        const after = cleanupSummary(result.summary, mainKeyword);
        if (after !== result.summary) {
          updates.push({
            id: result.id,
            test: test.title,
            type: result.type_code,
            before: result.summary,
            after,
          });
        }
      }
    }

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`updates: ${updates.length}`);
    console.log(
      JSON.stringify(
        updates.slice(0, 8).map((item) => ({
          test: item.test,
          type: item.type,
          before: item.before,
          after: item.after,
        })),
        null,
        2,
      ),
    );

    if (!APPLY) return;

    for (const update of updates) {
      await db.execute({
        sql: "update result_types set summary = ? where id = ?",
        args: [update.after, update.id],
      });
    }

    console.log(`OK: cleaned ${updates.length} result summaries`);
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
