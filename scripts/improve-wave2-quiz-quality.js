#!/usr/bin/env node
/**
 * Improve generated wave2 quiz copy without regenerating quiz bodies.
 *
 * Dry-run:
 *   node scripts/improve-wave2-quiz-quality.js
 * Apply:
 *   node scripts/improve-wave2-quiz-quality.js --apply
 */
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const QUALITY_TAG = "wave2-copy-v1";

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const TITLE_OVERRIDES = new Map([
  ["household-tool-borrowing", "공구 빌리기 성향 테스트"],
  ["birthday-message-timing", "생일 축하 타이밍 테스트"],
  ["photo-tagging", "사진 태그 허용 성향 테스트"],
  ["shortform-scroll-stop", "숏폼 멈춤 기준 테스트"],
  ["grocery-label-checking", "식품 라벨 확인 테스트"],
  ["leftovers-reheat-method", "남은 음식 데우기 성향 테스트"],
  ["return-policy-reading", "반품 규정 읽기 테스트"],
  ["budget-rounding-style", "예산 끝자리 맞추기 테스트"],
]);

function normalizeSentence(value) {
  const text = String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[.!?。]+$/u, "")
    .trim();
  return text;
}

function trimToSentence(value, maxLength = 185) {
  if (value.length <= maxLength) return value;
  const cut = value.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${shortened.replace(/[,.!?，。]+$/u, "")}.`;
}

function getBaseSlug(slug) {
  return slug.replace(/-[A-Za-z0-9_-]{4}$/u, "");
}

function buildDescription(test, metadata) {
  const mainKeyword = normalizeSentence(metadata.mainKeyword || test.title);
  const intent = normalizeSentence(metadata.intentNote || "나의 선택 기준과 행동 패턴을 확인");
  const keywords = Array.isArray(metadata.expandedKeywords)
    ? metadata.expandedKeywords.slice(0, 3).map(normalizeSentence).filter(Boolean)
    : [];
  const keywordText = keywords.length ? `${keywords.join(", ")} 상황을 중심으로 ` : "";

  const description =
    `${mainKeyword} 테스트는 ${intent}하는 짧은 성향 퀴즈입니다. ` +
    `${keywordText}12개 문항을 풀고, 결과에서 나의 행동 패턴과 잘 맞는 관계·일상 포인트를 확인해보세요.`;

  return trimToSentence(description);
}

function buildMetadata(currentMetadata, queueMetadata) {
  return JSON.stringify({
    ...currentMetadata,
    source: currentMetadata.source || "test_queue",
    planSlug: queueMetadata.slug ?? currentMetadata.planSlug ?? null,
    mainKeyword: queueMetadata.mainKeyword ?? currentMetadata.mainKeyword ?? null,
    expandedKeywords:
      queueMetadata.expandedKeywords ?? currentMetadata.expandedKeywords ?? [],
    category: queueMetadata.category ?? currentMetadata.category ?? null,
    intentNote: queueMetadata.intentNote ?? currentMetadata.intentNote ?? null,
    scheduledAt: queueMetadata.scheduledAt ?? currentMetadata.scheduledAt ?? null,
    wave: queueMetadata.wave ?? currentMetadata.wave ?? null,
    copyQuality: QUALITY_TAG,
  });
}

function parseJson(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const queueRows = await client.execute(
      "SELECT logs FROM test_queue WHERE logs LIKE '%\"wave\":\"wave2\"%' AND status = 'completed'",
    );

    const updates = [];
    for (const row of queueRows.rows) {
      const parsed = parseJson(row.logs);
      const queueMetadata = parsed.metadata || parsed;
      if (!parsed.testId) continue;

      const testRow = await client.execute({
        sql: "SELECT id, slug, title, description, metadata FROM tests WHERE id = ? LIMIT 1",
        args: [parsed.testId],
      });
      const test = testRow.rows[0];
      if (!test) continue;

      const baseSlug = getBaseSlug(test.slug);
      const nextTitle = TITLE_OVERRIDES.get(baseSlug) || test.title;
      const nextDescription = buildDescription(test, queueMetadata);
      const nextMetadata = buildMetadata(parseJson(test.metadata), queueMetadata);

      updates.push({
        id: test.id,
        slug: test.slug,
        titleBefore: test.title,
        titleAfter: nextTitle,
        descriptionBefore: test.description,
        descriptionAfter: nextDescription,
        metadataAfter: nextMetadata,
      });
    }

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`updates: ${updates.length}`);
    console.log(
      JSON.stringify(
        updates.slice(0, 5).map((item) => ({
          slug: item.slug,
          titleBefore: item.titleBefore,
          titleAfter: item.titleAfter,
          descriptionAfter: item.descriptionAfter,
          descriptionLength: item.descriptionAfter.length,
        })),
        null,
        2,
      ),
    );

    if (!APPLY) return;

    const now = Math.floor(Date.now() / 1000);
    for (const item of updates) {
      await client.execute({
        sql: "UPDATE tests SET title = ?, description = ?, metadata = ?, updated_at = ? WHERE id = ?",
        args: [
          item.titleAfter,
          item.descriptionAfter,
          item.metadataAfter,
          now,
          item.id,
        ],
      });
    }

    console.log(`OK: applied ${updates.length} copy improvements`);
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
