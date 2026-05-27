#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TARGET = path.join(ROOT, "data", "quiz-wave3-200.json");
const APPLY = process.argv.includes("--apply");
const MIN_SUMMARY = 140;
const MIN_TRAITS = 4;

const AXES = {
  I: "혼자 기준을 정리한 뒤 움직이는 흐름",
  E: "주변 반응을 보며 방향을 잡는 흐름",
  S: "현재 조건과 실제 편리함을 중시하는 흐름",
  N: "가능성과 다음 응용을 먼저 보는 흐름",
  T: "효율과 근거를 기준으로 판단하는 흐름",
  F: "감정의 온도와 배려 지점을 함께 보는 흐름",
  J: "순서와 마감선을 세워 안정감을 만드는 흐름",
  P: "상황 변화에 맞춰 유연하게 조정하는 흐름",
};

const FALLBACK_TRAITS = {
  I: "내 기준 정리",
  E: "반응 확인",
  S: "현실 감각",
  N: "패턴 연결",
  T: "근거 중심",
  F: "배려 중심",
  J: "루틴 설계",
  P: "유연한 조정",
};

function unique(items) {
  return [...new Set(items.map((item) => String(item || "").trim()).filter(Boolean))];
}

function typeAxes(type) {
  return String(type || "")
    .split("")
    .map((letter) => AXES[letter])
    .filter(Boolean);
}

function fallbackTraits(type) {
  return String(type || "")
    .split("")
    .map((letter) => FALLBACK_TRAITS[letter])
    .filter(Boolean);
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function presetCount(presets) {
  if (!presets || typeof presets !== "object" || Array.isArray(presets)) return 0;
  return Object.values(presets).reduce(
    (total, value) => total + (Array.isArray(value) ? value.length : 0),
    0,
  );
}

function detailCount(result) {
  return (
    ensureArray(result.traits).length +
    ensureArray(result.tips).length +
    ensureArray(result.picks).length +
    presetCount(result.presets || result.preset) +
    (result.recommend ? 1 : 0) +
    (result.pitfalls ? 1 : 0)
  );
}

function buildSummary(item, result) {
  const current = String(result.summary || "").trim();
  if (current.length >= MIN_SUMMARY) return current;

  const axes = typeAxes(result.type);
  const axisText = axes.length ? axes.join(", ") : "반복되는 선택 기준이 뚜렷한 흐름";
  const keyword = item.mainKeyword || item.title;
  const category = item.category || "일상";

  return (
    `${current} 특히 ${result.label}은 ${axisText}이 함께 나타나는 유형입니다. ` +
    `${category} 상황에서 ${keyword}을 판단할 때 무엇을 먼저 확인하는지, ` +
    `어떤 지점에서 망설이는지, 다음 선택을 어떻게 조정하면 좋은지까지 함께 읽으면 더 실용적입니다.`
  );
}

function enrichResult(item, result) {
  const traits = unique([
    ...ensureArray(result.traits),
    ...fallbackTraits(result.type),
    "반복 패턴 선명",
  ]).slice(0, Math.max(MIN_TRAITS, 5));

  const presets = result.presets && typeof result.presets === "object" ? result.presets : {};
  const keyword = item.mainKeyword || item.title;

  const enriched = {
    ...result,
    summary: buildSummary(item, result),
    traits,
    presets: {
      ...presets,
      "활용 포인트": unique([
        ...(Array.isArray(presets["활용 포인트"]) ? presets["활용 포인트"] : []),
        `${keyword}을 다시 선택할 때는 결과 설명에서 가장 자주 반복되는 기준 하나를 먼저 확인해 보세요.`,
      ]),
    },
  };

  if (detailCount(enriched) < 6) {
    enriched.tips = unique([
      ...ensureArray(result.tips),
      "최근 한 번의 선택보다 평소 반복되는 방식을 기준으로 읽어보세요.",
      "비슷한 주제의 다른 테스트와 비교하면 내 패턴이 더 선명해집니다.",
    ]);
  }

  return enriched;
}

function isThin(result) {
  return (
    String(result.summary || "").trim().length < 120 ||
    ensureArray(result.traits).length < MIN_TRAITS ||
    detailCount(result) < 6
  );
}

function main() {
  const data = JSON.parse(fs.readFileSync(TARGET, "utf8"));
  let thinBefore = 0;
  let touchedItems = 0;
  let touchedResults = 0;

  const next = data.map((item) => {
    const results = ensureArray(item.results);
    let itemTouched = false;
    const nextResults = results.map((result) => {
      if (!isThin(result)) return result;
      thinBefore += 1;
      itemTouched = true;
      touchedResults += 1;
      return enrichResult(item, result);
    });

    if (itemTouched) touchedItems += 1;
    return { ...item, results: nextResults };
  });

  const thinAfter = next.reduce(
    (total, item) => total + ensureArray(item.results).filter(isThin).length,
    0,
  );

  console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
  console.log(`items touched: ${touchedItems}`);
  console.log(`results touched: ${touchedResults}`);
  console.log(`thin results: ${thinBefore} -> ${thinAfter}`);
  console.log(
    JSON.stringify(
      next
        .filter((item) => ensureArray(item.results).some((result) => result.summary.length >= MIN_SUMMARY))
        .slice(0, 2)
        .map((item) => ({
          slug: item.slug,
          sample: item.results[0].summary,
          length: item.results[0].summary.length,
          detail: detailCount(item.results[0]),
        })),
      null,
      2,
    ),
  );

  if (!APPLY) return;
  fs.writeFileSync(TARGET, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  console.log(`OK: wrote ${path.relative(ROOT, TARGET)}`);
}

main();
