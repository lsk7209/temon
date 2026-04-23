#!/usr/bin/env node
/**
 * 211개 테스트 랜딩 페이지 전수 조사 스크립트.
 *
 * 각 app/tests/{id}/page.tsx에서:
 *   - shortDescription / fullDescription (metadata 카피) 추출
 *   - 본문 prose (JSX <p>, <h1~h3>, <li>, <span>) 텍스트 추출
 *   - prose-only 분량 기준 Kill/Save 판정
 *   - 중복/유사 페어 탐지 (slug + title + desc jaccard)
 *
 * 출력: CONTENT_AUDIT.md
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "app", "tests");
const OUTPUT = path.join(ROOT, "CONTENT_AUDIT.md");

const THIN_PROSE = 300;
const VERY_THIN_PROSE = 150;
const OK_PROSE = 600;

function listTestIds() {
  const entries = fs.readdirSync(TESTS_DIR, { withFileTypes: true });
  return entries
    .filter(
      (e) =>
        e.isDirectory() && !e.name.startsWith("[") && !e.name.startsWith("_"),
    )
    .map((e) => e.name)
    .filter((id) => fs.existsSync(path.join(TESTS_DIR, id, "page.tsx")));
}

function extractString(src, key) {
  const re = new RegExp(`const\\s+${key}\\s*=\\s*(["'\`])([\\s\\S]*?)\\1`, "m");
  const m = src.match(re);
  return m ? m[2] : null;
}

function extractMetaString(src, key) {
  const re = new RegExp(`${key}\\s*:\\s*(["'\`])([\\s\\S]*?)\\1`, "m");
  const m = src.match(re);
  return m ? m[2] : null;
}

function extractProseText(src) {
  const texts = [];
  const tagRe = /<(p|h1|h2|h3|span|li)[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = tagRe.exec(src)) !== null) {
    const raw = m[2]
      .replace(/\{[^{}]*\}/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (raw && /[가-힣]/.test(raw) && raw.length > 5) texts.push(raw);
  }
  return texts;
}

function normalizeTokens(s) {
  return (s || "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .map((t) => t.toLowerCase());
}

function jaccard(aTokens, bTokens) {
  const a = new Set(aTokens);
  const b = new Set(bTokens);
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function slugTokens(id) {
  return id.split("-").filter(Boolean);
}

const ids = listTestIds();
console.log(`Found ${ids.length} test landing pages`);

const records = [];
for (const id of ids) {
  const file = path.join(TESTS_DIR, id, "page.tsx");
  const src = fs.readFileSync(file, "utf8");
  const shortDesc = extractString(src, "shortDescription") || "";
  const fullDesc = extractString(src, "fullDescription") || "";
  const metaTitle = extractMetaString(src, "title") || "";
  const proseTexts = extractProseText(src);
  const proseLen = proseTexts.reduce((n, t) => n + t.length, 0);
  const metaLen = shortDesc.length + fullDesc.length;
  records.push({
    id,
    title: metaTitle,
    shortDesc,
    fullDesc,
    proseLen,
    metaLen,
    totalLen: metaLen + proseLen,
  });
}

// 중복/유사 페어 탐지
const pairs = [];
for (let i = 0; i < records.length; i++) {
  for (let j = i + 1; j < records.length; j++) {
    const a = records[i];
    const b = records[j];
    const slugJac = jaccard(slugTokens(a.id), slugTokens(b.id));
    const titleJac = jaccard(
      normalizeTokens(a.title),
      normalizeTokens(b.title),
    );
    const descJac = jaccard(
      normalizeTokens(a.shortDesc + " " + a.fullDesc),
      normalizeTokens(b.shortDesc + " " + b.fullDesc),
    );
    const score = 0.4 * slugJac + 0.3 * titleJac + 0.3 * descJac;
    if (score >= 0.55) {
      pairs.push({ a: a.id, b: b.id, score, slugJac, titleJac, descJac });
    }
  }
}
pairs.sort((x, y) => y.score - x.score);

// 판정 — prose 기준
const byProse = [...records].sort((x, y) => x.proseLen - y.proseLen);
const thin = byProse.filter((r) => r.proseLen < THIN_PROSE);
const veryThin = byProse.filter((r) => r.proseLen < VERY_THIN_PROSE);
const okProse = byProse.filter((r) => r.proseLen >= OK_PROSE);

// 카테고리 클러스터
const clusters = {};
for (const r of records) {
  const prefix = r.id.split("-")[0];
  clusters[prefix] = (clusters[prefix] || 0) + 1;
}
const clusterRanking = Object.entries(clusters).sort((a, b) => b[1] - a[1]);

// 리포트
const lines = [];
lines.push("# 콘텐츠 전수 조사 리포트 (v2 — prose 기준)");
lines.push("");
lines.push(`- 생성일: ${new Date().toISOString().slice(0, 10)}`);
lines.push(`- 대상: ${records.length}개 테스트 랜딩 (app/tests/{id}/page.tsx)`);
lines.push("");
lines.push("## 요약 지표");
lines.push("");
lines.push(`- 전체 페이지: **${records.length}**`);
lines.push(
  `- 본문(prose) 매우 얇음 <${VERY_THIN_PROSE}자: **${veryThin.length}**`,
);
lines.push(`- 본문(prose) 얇음 <${THIN_PROSE}자: **${thin.length}**`);
lines.push(`- 본문(prose) 양호 >=${OK_PROSE}자: **${okProse.length}**`);
lines.push(`- 의심 중복/유사 페어 (score >= 0.55): **${pairs.length}**`);
lines.push("");
lines.push("> 본문 prose는 JSX <p>/<h1-h3>/<li>/<span>의 실제 표시 텍스트.");
lines.push(
  "> metadata.description은 검색 결과용이며 페이지 본문에는 나타나지 않음.",
);
lines.push("");
lines.push("## 카테고리 클러스터 Top 10");
lines.push("");
for (const [k, v] of clusterRanking.slice(0, 10)) {
  lines.push(`- \`${k}-*\`: ${v}개`);
}
lines.push("");
lines.push("## 중복/유사 페어 — 상위 30 (score DESC)");
lines.push("");
lines.push("| # | A | B | score | slug | title | desc |");
lines.push("|---|---|---|---:|---:|---:|---:|");
pairs.slice(0, 30).forEach((p, i) => {
  lines.push(
    `| ${i + 1} | ${p.a} | ${p.b} | ${p.score.toFixed(2)} | ${p.slugJac.toFixed(2)} | ${p.titleJac.toFixed(2)} | ${p.descJac.toFixed(2)} |`,
  );
});
lines.push("");
lines.push(`## Kill List 후보 (본문 <${VERY_THIN_PROSE}자) — 상위 40`);
lines.push("");
lines.push("| id | title | prose | meta |");
lines.push("|---|---|---:|---:|");
veryThin.slice(0, 40).forEach((r) => {
  lines.push(
    `| ${r.id} | ${(r.title || "").slice(0, 40)} | ${r.proseLen} | ${r.metaLen} |`,
  );
});
lines.push("");
lines.push("## Save List (본문 prose Top 15)");
lines.push("");
lines.push("| id | title | prose | meta |");
lines.push("|---|---|---:|---:|");
okProse
  .slice(-15)
  .reverse()
  .forEach((r) => {
    lines.push(
      `| ${r.id} | ${(r.title || "").slice(0, 40)} | ${r.proseLen} | ${r.metaLen} |`,
    );
  });
lines.push("");
lines.push("## 전체 순위 — prose 본문 기준 ASC");
lines.push("");
lines.push("<details><summary>펼치기</summary>");
lines.push("");
lines.push("| id | prose | meta |");
lines.push("|---|---:|---:|");
for (const r of byProse) {
  lines.push(`| ${r.id} | ${r.proseLen} | ${r.metaLen} |`);
}
lines.push("");
lines.push("</details>");

fs.writeFileSync(OUTPUT, lines.join("\n"), "utf8");
console.log(`Report written to ${OUTPUT}`);
console.log(
  `Prose thin(<${THIN_PROSE}): ${thin.length} / Very thin(<${VERY_THIN_PROSE}): ${veryThin.length} / Pairs: ${pairs.length}`,
);
