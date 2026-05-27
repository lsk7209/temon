#!/usr/bin/env node
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const MIN_SUMMARY = 140;
const MIN_TRAITS = 4;
const MIN_DETAIL_ITEMS = 6;

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const TYPE_AXES = {
  I: "혼자 정리하며 판단하는 편",
  E: "대화와 반응 속에서 방향을 찾는 편",
  S: "현재 보이는 단서와 실제 경험을 중시하는 편",
  N: "가능성과 숨은 의미를 먼저 연결하는 편",
  T: "기준과 효율을 세워 판단하는 편",
  F: "감정의 온도와 관계 흐름을 함께 보는 편",
  J: "정해진 순서와 마감선을 선호하는 편",
  P: "상황 변화에 맞춰 유연하게 조정하는 편",
};

const TYPE_MATCHES = {
  ISTJ: ["ENFP", "ESFP"],
  ISFJ: ["ENTP", "ENFP"],
  INFJ: ["ESTP", "ENFP"],
  INTJ: ["ESFP", "ENFP"],
  ISTP: ["ENFJ", "ESFJ"],
  ISFP: ["ENTJ", "ESFJ"],
  INFP: ["ESTJ", "ENTJ"],
  INTP: ["ESFJ", "ENTJ"],
  ESTP: ["INFJ", "ISFJ"],
  ESFP: ["INTJ", "ISTJ"],
  ENFP: ["ISTJ", "INFJ"],
  ENTP: ["ISFJ", "INTJ"],
  ESTJ: ["INFP", "ISFP"],
  ESFJ: ["INTP", "ISTP"],
  ENFJ: ["ISTP", "INFP"],
  ENTJ: ["ISFP", "INTP"],
};

function parseArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function uniqueItems(items) {
  return [...new Set(items.map((item) => String(item || "").trim()).filter(Boolean))];
}

function detailCount(row) {
  return (
    parseArray(row.traits).length +
    parseArray(row.picks).length +
    parseArray(row.tips).length +
    parseArray(row.match_types).length
  );
}

function isThin(row) {
  return (
    String(row.summary || "").trim().length < MIN_SUMMARY ||
    parseArray(row.traits).length < MIN_TRAITS ||
    detailCount(row) < MIN_DETAIL_ITEMS
  );
}

function typeProfile(typeCode) {
  return String(typeCode || "")
    .split("")
    .map((letter) => TYPE_AXES[letter])
    .filter(Boolean);
}

function buildSummary({ title, typeCode, label, summary }) {
  const current = String(summary || "").trim();
  if (current.length >= MIN_SUMMARY) return current;

  const axes = typeProfile(typeCode);
  const axisText = axes.length ? axes.join(", ") : "선택 기준이 비교적 뚜렷한 편";
  const base = current ? `${current} ` : "";

  return (
    `${base}${title}의 ${label}(${typeCode}) 유형은 ${axisText}이라는 흐름이 강합니다. ` +
    `이 결과는 단순한 성격 라벨보다 선택 전 망설이는 지점, 실제로 움직이는 기준, ` +
    `사람들과 결과를 비교할 때 드러나는 반복 패턴을 함께 읽는 데 유용합니다.`
  );
}

function buildTraits(typeCode, label, existing) {
  const generated = [
    `${label}식 판단 기준`,
    ...typeProfile(typeCode),
    "반복 패턴이 뚜렷함",
    "상황별 반응 차이가 선명함",
  ];
  return uniqueItems([...existing, ...generated]).slice(0, Math.max(MIN_TRAITS, 5));
}

function buildPicks(title, label, existing) {
  return uniqueItems([
    ...existing,
    `${title}에서 자주 보이는 선택`,
    `${label} 유형에게 맞는 비교 기준`,
    "친구와 결과를 비교하기 좋은 포인트",
  ]).slice(0, 4);
}

function buildTips(title, label, existing) {
  return uniqueItems([
    ...existing,
    `${label} 결과를 실제 행동과 비교해 보세요.`,
    `${title}의 다른 결과와 차이를 함께 보면 해석이 더 선명해집니다.`,
    "결과가 애매하면 최근 상황보다 평소 반복되는 선택을 기준으로 읽으세요.",
  ]).slice(0, 4);
}

function buildMatches(typeCode, existing) {
  return uniqueItems([...existing, ...(TYPE_MATCHES[typeCode] || [])]).slice(0, 3);
}

function enrichRow(row) {
  const traits = buildTraits(row.type_code, row.label, parseArray(row.traits));
  const picks = buildPicks(row.title, row.label, parseArray(row.picks));
  const tips = buildTips(row.title, row.label, parseArray(row.tips));
  const matches = buildMatches(row.type_code, parseArray(row.match_types));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    typeCode: row.type_code,
    label: row.label,
    before: {
      summaryLength: String(row.summary || "").trim().length,
      traits: parseArray(row.traits).length,
      detail: detailCount(row),
    },
    after: {
      summary: buildSummary(row),
      traits,
      picks,
      tips,
      matchTypes: matches,
    },
  };
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const rows = (
      await db.execute(`
        select
          rt.id,
          rt.type_code,
          rt.label,
          rt.summary,
          rt.traits,
          rt.picks,
          rt.tips,
          rt.match_types,
          t.slug,
          t.title
        from result_types rt
        join tests t on t.id = rt.test_id
        where t.status = 'published'
        order by t.slug, rt.type_code
      `)
    ).rows;

    const updates = rows.filter(isThin).map(enrichRow);

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`published rows checked: ${rows.length}`);
    console.log(`thin rows to update: ${updates.length}`);
    console.log(
      JSON.stringify(
        updates.slice(0, 8).map((item) => ({
          slug: item.slug,
          type: item.typeCode,
          label: item.label,
          before: item.before,
          afterSummaryLength: item.after.summary.length,
          afterTraits: item.after.traits.length,
          afterDetail:
            item.after.traits.length +
            item.after.picks.length +
            item.after.tips.length +
            item.after.matchTypes.length,
        })),
        null,
        2,
      ),
    );

    if (!APPLY) return;

    for (const update of updates) {
      await db.execute({
        sql: `
          update result_types
          set summary = ?, traits = ?, picks = ?, tips = ?, match_types = ?
          where id = ?
        `,
        args: [
          update.after.summary,
          JSON.stringify(update.after.traits),
          JSON.stringify(update.after.picks),
          JSON.stringify(update.after.tips),
          JSON.stringify(update.after.matchTypes),
          update.id,
        ],
      });
    }

    console.log(`OK: enriched ${updates.length} published result rows`);
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
