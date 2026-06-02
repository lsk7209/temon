#!/usr/bin/env node
/**
 * Polishes awkward static test card description fragments in lib/tests-config.ts.
 *
 * Dry-run:
 *   node scripts/polish-static-test-descriptions.js
 * Apply:
 *   node scripts/polish-static-test-descriptions.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(ROOT, "lib", "tests-config.ts");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");
const CHECK = process.argv.includes("--check");

const REPLACEMENTS = [
  ["요리, 오늘도 상황", "요리와 일상 식사 장면"],
  ["싸기, 떠나기 상황", "짐 싸기와 이동 준비 장면"],
  ["저녁, 뭐하지 상황", "저녁 시간과 퇴근 후 선택 장면"],
  ["카페, 달콤한 상황", "카페 메뉴와 디저트 선택 장면"],
  ["선물, 뜯기 상황", "선물과 포장 확인 장면"],
  ["취향, 좋아하 상황", "취향과 선호 선택 장면"],
  ["루틴, 아침에 상황", "아침 루틴 장면"],
  ["루틴, 저녁에 상황", "저녁 루틴 장면"],
  ["루틴, 주말에 상황", "주말 루틴 장면"],
  ["스마트폰, 관리하 상황", "스마트폰 관리 장면"],
  ["스마트폰, 정리하 상황", "스마트폰 정리 장면"],
  ["스마트폰, 사용하 상황", "스마트폰 사용 장면"],
  ["스마트폰, 검색하 상황", "스마트폰 검색 장면"],
  ["아침에 상황", "아침 장면"],
  ["저녁에 상황", "저녁 장면"],
  ["주말에 상황", "주말 장면"],
  ["관리하 상황", "관리 장면"],
  ["정리하 상황", "정리 장면"],
  ["사용하 상황", "사용 장면"],
  ["검색하 상황", "검색 장면"],
];

function backupPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(REPORTS_DIR, `static-test-description-polish-backup-${stamp}.ts`);
}

function main() {
  const source = fs.readFileSync(TARGET_FILE, "utf8");
  let nextSource = source;
  const changes = [];

  for (const [before, after] of REPLACEMENTS) {
    const count = nextSource.split(before).length - 1;
    if (count === 0) continue;
    nextSource = nextSource.split(before).join(after);
    changes.push({ before, after, count });
  }

  const summary = {
    mode: APPLY ? "apply" : CHECK ? "check" : "dry-run",
    changedFragments: changes.reduce((total, change) => total + change.count, 0),
    changes,
  };
  console.log(JSON.stringify(summary, null, 2));

  if (CHECK && changes.length > 0) {
    throw new Error(`Static descriptions need polish: ${summary.changedFragments} fragments`);
  }
  if (!APPLY || changes.length === 0) return;

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const backup = backupPath();
  fs.writeFileSync(backup, source, "utf8");
  fs.writeFileSync(TARGET_FILE, nextSource, "utf8");
  console.log(`Backup written: ${path.relative(ROOT, backup)}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
