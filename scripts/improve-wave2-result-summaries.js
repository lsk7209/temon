#!/usr/bin/env node
/**
 * Make wave2 result summaries more topic-specific without changing scoring.
 *
 * Dry-run:
 *   node scripts/improve-wave2-result-summaries.js
 * Apply:
 *   node scripts/improve-wave2-result-summaries.js --apply
 */
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const QUALITY_TAG = "wave2-result-copy-v1";

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const STYLE_BY_TYPE = {
  ISTJ: "기준과 순서를 먼저 확인하는",
  ISFJ: "주변 사람의 불편을 먼저 살피는",
  INFJ: "상황의 의미와 상대의 마음을 함께 읽는",
  INTJ: "전체 흐름과 효율을 계산하는",
  ISTP: "필요한 만큼만 빠르게 판단하는",
  ISFP: "분위기와 감정선을 조심스럽게 살피는",
  INFP: "내 기준과 진심이 맞는지 확인하는",
  INTP: "원인과 구조를 차분히 분석하는",
  ESTP: "바로 움직이며 상황을 풀어가는",
  ESFP: "현장 분위기를 살리는",
  ENFP: "새로운 가능성과 사람의 반응을 함께 보는",
  ENTP: "다른 선택지를 빠르게 떠올리는",
  ESTJ: "명확한 기준으로 정리하는",
  ESFJ: "모두가 편한 방향을 조율하는",
  ENFJ: "관계의 흐름과 상대의 반응을 이끄는",
  ENTJ: "목표와 효율을 중심으로 판단하는",
};

function parseJson(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

function sentenceEnd(value) {
  const text = value.trim().replace(/\s+/g, " ");
  if (!text) return "";
  return /[.!?요다]$/u.test(text) ? text : `${text}.`;
}

function cleanOriginal(summary, typeCode) {
  const typePattern = new RegExp(`당신은\\s*['‘"]?${typeCode}['’"]?\\s*유형으로,?\\s*`, "gi");
  let text = String(summary || "")
    .replace(typePattern, "")
    .replace(/당신은\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = text
    .split(/(?<=[.!?요다])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length > 1 && /카리스마|잠재력|긍정적인 영향|공동체|이상주의자/u.test(sentences[0])) {
    sentences.shift();
  }

  const selected = [];
  for (const sentence of sentences) {
    if (selected.join(" ").length + sentence.length > 145) break;
    selected.push(sentence);
    if (selected.length >= 2) break;
  }

  text = selected.length ? selected.join(" ") : sentences[0] || "";
  return sentenceEnd(text);
}

function buildSummary({ mainKeyword, typeCode, originalSummary }) {
  const style = STYLE_BY_TYPE[typeCode] || "자기만의 기준으로 반응하는";
  const prefix = `${mainKeyword} 상황에서 당신은 ${style} 편입니다.`;
  const cleaned = cleanOriginal(originalSummary, typeCode);
  if (!cleaned) return prefix;
  return `${prefix} ${cleaned}`;
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const tests = (
      await db.execute(
        "select id,title,slug,metadata from tests where metadata like '%\"wave\":\"wave2\"%' order by published_at",
      )
    ).rows;

    const updates = [];
    for (const test of tests) {
      const metadata = parseJson(test.metadata);
      const mainKeyword = metadata.mainKeyword || test.title;
      const resultRows = (
        await db.execute({
          sql: "select id,type_code,label,summary from result_types where test_id=?",
          args: [test.id],
        })
      ).rows;

      for (const result of resultRows) {
        updates.push({
          id: result.id,
          testTitle: test.title,
          typeCode: result.type_code,
          label: result.label,
          before: result.summary,
          after: buildSummary({
            mainKeyword,
            typeCode: result.type_code,
            originalSummary: result.summary,
          }),
        });
      }
    }

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`updates: ${updates.length}`);
    console.log(
      JSON.stringify(
        updates.slice(0, 5).map((item) => ({
          test: item.testTitle,
          type: item.typeCode,
          label: item.label,
          after: item.after,
          length: item.after.length,
        })),
        null,
        2,
      ),
    );

    if (!APPLY) return;

    const now = Math.floor(Date.now() / 1000);
    for (const item of updates) {
      await db.execute({
        sql: "update result_types set summary = ? where id = ?",
        args: [item.after, item.id],
      });
    }

    for (const test of tests) {
      const metadata = parseJson(test.metadata);
      await db.execute({
        sql: "update tests set metadata = ?, updated_at = ? where id = ?",
        args: [JSON.stringify({ ...metadata, resultCopyQuality: QUALITY_TAG }), now, test.id],
      });
    }

    console.log(`OK: applied ${updates.length} result summary improvements`);
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
