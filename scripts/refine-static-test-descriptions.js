#!/usr/bin/env node
/**
 * Refines short descriptions in lib/tests-config.ts.
 *
 * Dry-run:
 *   node scripts/refine-static-test-descriptions.js
 * Apply:
 *   node scripts/refine-static-test-descriptions.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(ROOT, "lib", "tests-config.ts");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");
const MIN_DESCRIPTION_LENGTH = 110;
const MAX_DESCRIPTION_LENGTH = 170;

const BAD_PATTERNS = [/ai-generated/i, /\?{2,}/, /undefined/i, /null/i];

const CATEGORY_COPY = {
  음식: {
    focus: "취향과 메뉴 선택 기준",
    tail: "먹는 방식, 주문 기준, 함께 먹는 상황에서 반복되는 취향을 16가지 결과로 정리합니다.",
  },
  직장: {
    focus: "업무 습관과 협업 반응",
    tail: "일 처리 순서, 커뮤니케이션 방식, 마감 대응에서 드러나는 업무 스타일을 16가지 결과로 정리합니다.",
  },
  학습: {
    focus: "학습 태도와 참여 방식",
    tail: "수업, 과제, 기록 상황에서 반복되는 공부 루틴과 집중 방식을 16가지 결과로 정리합니다.",
  },
  관계: {
    focus: "관계 반응과 표현 방식",
    tail: "약속, 대화, 배려 상황에서 드러나는 거리감과 소통 패턴을 16가지 결과로 정리합니다.",
  },
  디지털: {
    focus: "디지털 사용 습관과 정리 기준",
    tail: "앱, 알림, 파일, 온라인 도구를 다루는 방식에서 반복되는 사용 패턴을 16가지 결과로 정리합니다.",
  },
  소비: {
    focus: "구매 기준과 소비 판단",
    tail: "가격, 할인, 장바구니, 결제 전 고민에서 드러나는 소비 스타일을 16가지 결과로 정리합니다.",
  },
  재테크: {
    focus: "투자 성향과 리스크 판단",
    tail: "정보 확인, 위험 감수, 장기 계획에서 드러나는 재테크 스타일을 16가지 결과로 정리합니다.",
  },
  생활: {
    focus: "생활 루틴과 선택 습관",
    tail: "일상적인 결정, 감정 반응, 루틴 관리에서 반복되는 성향을 16가지 결과로 정리합니다.",
  },
  취미: {
    focus: "취미 몰입과 표현 방식",
    tail: "시작 방식, 꾸준함, 결과물을 다루는 태도에서 드러나는 취미 스타일을 16가지 결과로 정리합니다.",
  },
  엔터테인먼트: {
    focus: "감상 취향과 몰입 방식",
    tail: "콘텐츠를 고르고 즐기는 기준, 반응 속도, 공유 방식에서 드러나는 취향을 16가지 결과로 정리합니다.",
  },
  여행: {
    focus: "여행 준비와 이동 선택 기준",
    tail: "계획, 이동, 동행 상황에서 드러나는 여행 스타일과 에너지 사용 방식을 16가지 결과로 정리합니다.",
  },
  스포츠: {
    focus: "운동 습관과 경기 대응 방식",
    tail: "준비, 집중, 피드백 상황에서 드러나는 플레이 스타일과 성장 포인트를 16가지 결과로 정리합니다.",
  },
};

const CATEGORY_RULES = [
  ["음식", ["food", "meal", "coffee", "ramen", "pizza", "snack", "restaurant", "lunch", "breakfast", "chicken", "cafe", "dessert", "김밥", "라면", "커피", "음식", "식사", "간식", "치킨", "카페", "디저트", "초밥", "피자"]],
  ["직장", ["work", "office", "meeting", "lunch-decider", "commute", "업무", "직장", "회의", "출근", "점심"]],
  ["학습", ["study", "class", "book", "reading", "공부", "학습", "수업", "독서"]],
  ["관계", ["love", "reply", "kakao", "friend", "social", "gift", "pet", "연애", "답장", "관계", "친구", "선물", "반려"]],
  ["디지털", ["phone", "app", "youtube", "instagram", "ott", "digital", "스마트폰", "알림", "앱", "유튜브", "인스타", "SNS"]],
  ["재테크", ["investment", "stock", "invest", "주식", "투자", "재테크"]],
  ["소비", ["shopping", "spending", "market", "store", "budget", "sale", "소비", "쇼핑", "구매", "예산", "할인"]],
  ["엔터테인먼트", ["movie", "drama", "kdrama", "kpop", "music", "game", "ott", "영화", "드라마", "아이돌", "음악", "게임"]],
  ["여행", ["travel", "hotel", "여행", "호텔"]],
  ["스포츠", ["ntrp", "tennis", "sport", "테니스", "스포츠"]],
  ["취미", ["hobby", "drawing", "palette", "취미", "그림", "다꾸"]],
];

const STOP_HINTS = new Set([
  "성격",
  "성향",
  "유형",
  "스타일",
  "테스트",
  "선택",
  "분석",
  "나",
  "내",
  "당신",
  "알아보",
  "16가지",
  "어떤",
  "vs",
  "반응",
  "패턴",
  "사태",
  "시간",
  "음식",
  "생활",
  "직장",
  "관계",
  "소비",
]);

function compact(value) {
  return String(value || "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u200d\ufe0f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasBadCopy(value) {
  return BAD_PATTERNS.some((pattern) => pattern.test(String(value || "")));
}

function decodeStringLiteral(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return raw.slice(1, -1);
  }
}

function findArrayBounds(source) {
  const marker = "export const ALL_TESTS";
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error("ALL_TESTS export not found");
  const assignmentIndex = source.indexOf("=", markerIndex);
  if (assignmentIndex < 0) throw new Error("ALL_TESTS assignment not found");
  const start = source.indexOf("[", assignmentIndex);
  if (start < 0) throw new Error("ALL_TESTS array start not found");

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === "[") {
      depth += 1;
    } else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return { start, end: i };
    }
  }
  throw new Error("ALL_TESTS array end not found");
}

function splitObjectBlocks(arraySource) {
  const blocks = [];
  let depth = 0;
  let quote = null;
  let escaped = false;
  let blockStart = -1;

  for (let i = 0; i < arraySource.length; i += 1) {
    const ch = arraySource[i];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === "{") {
      if (depth === 0) blockStart = i;
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0 && blockStart >= 0) {
        blocks.push({ start: blockStart, end: i + 1, text: arraySource.slice(blockStart, i + 1) });
        blockStart = -1;
      }
    }
  }
  return blocks;
}

function readField(block, key) {
  const match = block.match(new RegExp(`${key}:\\s*("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`, "s"));
  return match ? decodeStringLiteral(match[1]) : "";
}

function readTags(block) {
  const match = block.match(/tags:\s*\[([\s\S]*?)\]/);
  if (!match) return [];
  return [...match[1].matchAll(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g)].map((item) =>
    decodeStringLiteral(item[0]),
  );
}

function inferCategory(item) {
  const current = compact(item.category);
  const haystack = `${item.id} ${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
  for (const [category, words] of CATEGORY_RULES) {
    if (words.some((word) => haystack.includes(String(word).toLowerCase()))) {
      return category;
    }
  }
  return current && current !== "기타" ? current : "생활";
}

function cleanSubject(title) {
  const subject = compact(title)
    .replace(/\bMBTI\b/gi, "MBTI")
    .replace(/[?!]/g, "")
    .replace(/^\s*(내|나의|당신의)\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return subject || "성향 테스트";
}

function cleanHint(value) {
  return compact(value)
    .replace(/테스트|MBTI|나의|당신의|유형|성향|방식|스타일/g, "")
    .replace(/[?!.,]/g, "")
    .replace(/(으로|에서|에게|까지|부터|처럼)$/g, "")
    .replace(/[은는이가을를로과와]$/g, "")
    .trim();
}

function extractHints(item, subject) {
  const hints = [];
  for (const value of [...item.tags, item.description, item.title]) {
    for (const part of compact(value).split(/[\s,·/]+/)) {
      const hint = cleanHint(part);
      if (
        hint.length >= 2 &&
        !STOP_HINTS.has(hint) &&
        !subject.includes(hint) &&
        !hasBadCopy(hint)
      ) {
        hints.push(hint);
      }
    }
  }
  const unique = [...new Set(hints)].slice(0, 2);
  while (unique.length < 2) unique.push(unique.length === 0 ? "일상 선택" : "반응 패턴");
  return unique;
}

function withTopicParticle(subject) {
  const last = subject[subject.length - 1];
  const code = last ? last.charCodeAt(0) : 0;
  if (code >= 0xac00 && code <= 0xd7a3) {
    return `${subject}${(code - 0xac00) % 28 === 0 ? "는" : "은"}`;
  }
  return `${subject}는`;
}

function buildDescription(item) {
  const subject = cleanSubject(item.title);
  const category = inferCategory(item);
  const copy = CATEGORY_COPY[category] || CATEGORY_COPY["생활"];
  const [hintA, hintB] = extractHints(item, subject);
  return compact(
    `${withTopicParticle(subject)} ${hintA}, ${hintB} 상황에서 드러나는 ${copy.focus}을 살펴봅니다. 12문항 답변으로 선택 기준과 반응 패턴을 확인하고, ${copy.tail}`,
  );
}

function validateDescription(description) {
  const problems = [];
  if (description.length < MIN_DESCRIPTION_LENGTH || description.length > MAX_DESCRIPTION_LENGTH) {
    problems.push(`length:${description.length}`);
  }
  if (hasBadCopy(description)) problems.push("bad-copy");
  return problems;
}

function backupPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(REPORTS_DIR, `static-test-description-backup-${stamp}.json`);
}

function main() {
  const source = fs.readFileSync(TARGET_FILE, "utf8");
  const bounds = findArrayBounds(source);
  const arraySource = source.slice(bounds.start + 1, bounds.end);
  const blocks = splitObjectBlocks(arraySource);
  const updates = [];
  const skipped = [];
  let nextArraySource = arraySource;
  let offset = 0;

  for (const block of blocks) {
    const item = {
      id: readField(block.text, "id"),
      title: readField(block.text, "title"),
      description: readField(block.text, "description"),
      category: readField(block.text, "category"),
      tags: readTags(block.text),
    };

    if (!item.id || !item.title || !item.description) {
      skipped.push({ id: item.id || "(missing)", title: item.title, problems: ["missing-required-field"] });
      continue;
    }

    const currentProblems = validateDescription(item.description);
    if (currentProblems.length === 0) {
      updates.push({
        id: item.id,
        title: item.title,
        category: item.category,
        before: item.description,
        after: item.description,
        beforeLength: item.description.length,
        afterLength: item.description.length,
        changed: false,
      });
      continue;
    }

    const nextDescription = buildDescription(item);
    const problems = validateDescription(nextDescription);
    if (problems.length > 0) {
      skipped.push({ id: item.id, title: item.title, problems, nextDescription });
      continue;
    }

    const changed = item.description !== nextDescription;
    updates.push({
      id: item.id,
      title: item.title,
      category: item.category,
      before: item.description,
      after: nextDescription,
      beforeLength: item.description.length,
      afterLength: nextDescription.length,
      changed,
    });

    if (changed) {
      const blockText = nextArraySource.slice(block.start + offset, block.end + offset);
      const replaced = blockText.replace(
        /(\s*description:\s*)("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/s,
        `$1${JSON.stringify(nextDescription)}`,
      );
      nextArraySource =
        nextArraySource.slice(0, block.start + offset) +
        replaced +
        nextArraySource.slice(block.end + offset);
      offset += replaced.length - blockText.length;
    }
  }

  const changed = updates.filter((update) => update.changed);
  const summary = {
    mode: APPLY ? "apply" : "dry-run",
    staticTests: blocks.length,
    validUpdates: updates.length,
    changed: changed.length,
    skipped: skipped.length,
    underMinBefore: updates.filter((update) => update.beforeLength < MIN_DESCRIPTION_LENGTH).length,
    underMinAfter: updates.filter((update) => update.afterLength < MIN_DESCRIPTION_LENGTH).length,
    skippedSample: skipped.slice(0, 10),
    sample: changed.slice(0, 10).map((update) => ({
      id: update.id,
      title: update.title,
      beforeLength: update.beforeLength,
      afterLength: update.afterLength,
      after: update.after,
    })),
  };

  console.log(JSON.stringify(summary, null, 2));

  if (!APPLY) return;
  if (skipped.length > 0) {
    throw new Error(`Refusing to apply while ${skipped.length} rows are skipped`);
  }
  if (changed.length === 0) return;

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const backup = backupPath();
  fs.writeFileSync(
    backup,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), updates }, null, 2)}\n`,
    "utf8",
  );
  const nextSource = source.slice(0, bounds.start + 1) + nextArraySource + source.slice(bounds.end);
  fs.writeFileSync(TARGET_FILE, nextSource, "utf8");
  console.log(`Backup written: ${path.relative(ROOT, backup)}`);
  console.log(`OK: refined ${changed.length} static test descriptions`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
