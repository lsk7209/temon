#!/usr/bin/env node
/**
 * Refines published DB taxonomy and short descriptions.
 *
 * Dry-run:
 *   node scripts/refine-published-taxonomy.js
 * Apply:
 *   node scripts/refine-published-taxonomy.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");
const MIN_DESCRIPTION_LENGTH = 110;
const MAX_DESCRIPTION_LENGTH = 190;
const TARGET_DESCRIPTION_LENGTH = MIN_DESCRIPTION_LENGTH;

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const VALID_CATEGORIES = new Set([
  "음식",
  "직장",
  "학습",
  "관계",
  "디지털",
  "소비",
  "생활",
  "집생활",
  "엔터테인먼트",
  "취미",
  "커뮤니케이션",
]);

const CATEGORY_RULES = [
  {
    category: "음식",
    words: [
      "food",
      "meal",
      "lunch",
      "lunchbox",
      "restaurant",
      "snack",
      "pizza",
      "sushi",
      "kimbap",
      "ramen",
      "salad",
      "cake",
      "chicken",
      "jjimdak",
      "tang",
      "gukmul",
      "bibim",
      "찌개",
      "국물",
      "비빔",
      "김밥",
      "피자",
      "초밥",
      "라면",
      "샐러드",
      "탕수육",
      "찜닭",
      "치킨",
      "점심",
      "도시락",
      "식사",
      "음식",
      "맛",
      "메뉴",
      "간식",
      "배달",
    ],
  },
  {
    category: "직장",
    words: [
      "work",
      "office",
      "email",
      "report",
      "meeting",
      "handover",
      "feedback",
      "priority",
      "deadline",
      "vacation",
      "file-naming",
      "업무",
      "직장",
      "회사",
      "메일",
      "보고서",
      "회의",
      "인수인계",
      "피드백",
      "우선순위",
      "마감",
      "휴가",
      "파일명",
    ],
  },
  {
    category: "학습",
    words: [
      "study",
      "class",
      "professor",
      "scholarship",
      "library",
      "timetable",
      "assignment",
      "club",
      "practice",
      "수업",
      "교수",
      "장학금",
      "도서관",
      "시간표",
      "과제",
      "동아리",
      "학습",
      "공부",
      "필기",
    ],
  },
  {
    category: "관계",
    words: [
      "friend",
      "birthday",
      "apology",
      "canceled-plan",
      "appointment",
      "family",
      "favor",
      "love",
      "texting",
      "dm",
      "reply",
      "social",
      "gift",
      "친구",
      "생일",
      "사과",
      "약속",
      "가족",
      "부탁",
      "연애",
      "답장",
      "카톡",
      "DM",
      "관계",
      "모임",
      "선물",
    ],
  },
  {
    category: "디지털",
    words: [
      "ai",
      "prompt",
      "app-",
      "browser",
      "tab",
      "bookmark",
      "calendar",
      "cloud",
      "phone",
      "notification",
      "newsletter",
      "instagram",
      "youtube",
      "ott",
      "digital",
      "앱",
      "브라우저",
      "북마크",
      "캘린더",
      "클라우드",
      "스마트폰",
      "알림",
      "뉴스레터",
      "인스타",
      "유튜브",
      "OTT",
      "디지털",
      "프롬프트",
      "AI",
    ],
  },
  {
    category: "소비",
    words: [
      "purchase",
      "shopping",
      "cart",
      "coupon",
      "delivery",
      "budget",
      "sale",
      "market",
      "store",
      "grocery",
      "구매",
      "쇼핑",
      "장바구니",
      "쿠폰",
      "배송",
      "예산",
      "할인",
      "마트",
      "매장",
      "소비",
      "가격",
    ],
  },
  {
    category: "엔터테인먼트",
    words: [
      "movie",
      "meme",
      "korean-genre",
      "kdrama",
      "kpop",
      "karaoke",
      "music",
      "game",
      "character",
      "영화",
      "밈",
      "장르",
      "드라마",
      "케이팝",
      "노래방",
      "음악",
      "게임",
      "캐릭터",
      "최애",
    ],
  },
  {
    category: "취미",
    words: [
      "drawing",
      "copywriting",
      "diary",
      "hobby",
      "book",
      "reading",
      "travel",
      "gardening",
      "그림",
      "필사",
      "다꾸",
      "취미",
      "독서",
      "여행",
      "꾸미기",
    ],
  },
  {
    category: "집생활",
    words: [
      "home",
      "cleaning",
      "laundry",
      "bed",
      "bathroom",
      "kitchen",
      "appliance",
      "recycling",
      "집",
      "청소",
      "빨래",
      "침대",
      "화장실",
      "주방",
      "가전",
      "설명서",
      "분리수거",
      "보관",
    ],
  },
  {
    category: "커뮤니케이션",
    words: [
      "opinion",
      "conversation",
      "debate",
      "communication",
      "brain",
      "말하기",
      "대화",
      "토론",
      "의견",
      "커뮤니케이션",
      "뇌피셜",
    ],
  },
];

const CATEGORY_COPY = {
  음식: {
    focus: "취향과 메뉴 선택 기준",
    tail: "먹는 방식, 주문 기준, 함께 먹는 상황에서 반복되는 취향을 결과 유형으로 정리합니다.",
  },
  직장: {
    focus: "업무 습관과 협업 반응",
    tail: "일 처리 순서, 커뮤니케이션 방식, 마감 대응에서 드러나는 업무 스타일을 정리합니다.",
  },
  학습: {
    focus: "학습 태도와 참여 방식",
    tail: "수업, 과제, 기록 상황에서 반복되는 공부 루틴과 집중 방식을 결과로 정리합니다.",
  },
  관계: {
    focus: "관계 반응과 표현 방식",
    tail: "약속, 대화, 배려 상황에서 드러나는 거리감과 소통 패턴을 결과 유형으로 정리합니다.",
  },
  디지털: {
    focus: "디지털 사용 습관과 정리 기준",
    tail: "앱, 알림, 파일, 온라인 도구를 다루는 방식에서 반복되는 사용 패턴을 정리합니다.",
  },
  소비: {
    focus: "구매 기준과 소비 판단",
    tail: "가격, 할인, 장바구니, 결제 전 고민에서 드러나는 소비 스타일을 결과로 정리합니다.",
  },
  생활: {
    focus: "생활 루틴과 선택 습관",
    tail: "일상적인 결정, 감정 반응, 루틴 관리에서 반복되는 성향을 결과 유형으로 정리합니다.",
  },
  집생활: {
    focus: "집안 루틴과 정리 방식",
    tail: "청소, 보관, 공간 사용처럼 집에서 반복되는 생활 패턴을 결과 유형으로 정리합니다.",
  },
  엔터테인먼트: {
    focus: "감상 취향과 몰입 방식",
    tail: "콘텐츠를 고르고 즐기는 기준, 반응 속도, 공유 방식에서 드러나는 취향을 정리합니다.",
  },
  취미: {
    focus: "취미 몰입과 표현 방식",
    tail: "시작 방식, 꾸준함, 결과물을 다루는 태도에서 드러나는 취미 스타일을 정리합니다.",
  },
  커뮤니케이션: {
    focus: "말하기 방식과 판단 기준",
    tail: "의견을 꺼내고 반응을 고르는 과정에서 드러나는 대화 습관을 결과 유형으로 정리합니다.",
  },
};

const BAD_PATTERNS = [/ai-generated/i, /\?{2,}/, /undefined/i, /null/i];

function normalizeText(value) {
  return String(value || "")
    .replace(/[\u{1f300}-\u{1faff}]/gu, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDescription(value) {
  return normalizeText(value)
    .replace(/학습 태도을/g, "학습 태도를")
    .replace(/상황에서 드러나는 관계 반응을/g, "상황에서 드러나는 관계 반응을")
    .replace(/\s+([,.])/g, "$1");
}

function hasBadCopy(value) {
  return BAD_PATTERNS.some((pattern) => pattern.test(String(value || "")));
}

function inferCategory(row) {
  const current = normalizeText(row.category);
  if (VALID_CATEGORIES.has(current) && current !== "ai-generated") return current;

  const haystack = `${row.slug} ${row.title} ${row.description}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.words.some((word) => haystack.includes(String(word).toLowerCase()))) {
      return rule.category;
    }
  }

  return "생활";
}

function titleSubject(title) {
  return normalizeText(title)
    .replace(/[:|｜].*$/g, "")
    .replace(/\bMBTI\b/gi, "")
    .replace(/테스트/g, "")
    .replace(/유형별로/g, "")
    .replace(/유형별/g, "")
    .replace(/지금 바로 확인/g, "")
    .replace(/확연히 다르다/g, "")
    .replace(/,?\s*당신은 어떤 유형/g, "")
    .replace(/^당신의\s+/g, "")
    .replace(/^[내나]의\s+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[?!]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/성향은\s+/g, "성향 ")
    .replace(/유형은\s+/g, "유형 ")
    .replace(/[은는]$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHints(row, subject) {
  const desc = normalizeDescription(row.description);
  const hints = [];
  const match = desc.match(/테스트[.。]\s*([^상]+?)\s*상황/);
  if (match) {
    hints.push(
      ...match[1]
        .split(/[,\s·]+/)
        .map((part) => normalizeText(part))
        .filter((part) => part.length >= 2),
    );
  }

  for (const part of normalizeText(row.title).split(/[\s,?!.:]+/)) {
    const clean = part
      .replace(/테스트|MBTI|나의|당신의|유형|성향|방식/g, "")
      .replace(/[은는이가을를]$/g, "")
      .trim();
    if (clean.length >= 2) hints.push(clean);
  }

  const unique = [...new Set(hints.filter((hint) => !hasBadCopy(hint)))].slice(0, 2);
  while (unique.length < 2) {
    unique.push(unique.length === 0 ? subject : "일상 선택");
  }
  return unique;
}

function buildDescription(row, category) {
  const subject = titleSubject(row.title) || "성향";
  const [hintA, hintB] = extractHints(row, subject);
  const copy = CATEGORY_COPY[category] || CATEGORY_COPY["생활"];
  const base = `${subject} 테스트는 ${hintA}, ${hintB} 상황에서 드러나는 ${copy.focus}을 살펴봅니다. 12문항 답변으로 선택 기준과 반응 패턴을 확인하고, ${copy.tail}`;
  return normalizeDescription(base);
}

function validateCandidate(update) {
  const problems = [];
  if (!VALID_CATEGORIES.has(update.after.category)) {
    problems.push("invalid-category");
  }
  if (
    update.after.description.length < MIN_DESCRIPTION_LENGTH ||
    update.after.description.length > MAX_DESCRIPTION_LENGTH
  ) {
    problems.push(`invalid-description-length:${update.after.description.length}`);
  }
  if (hasBadCopy(update.after.description) || hasBadCopy(update.after.category)) {
    problems.push("bad-copy");
  }
  return problems;
}

function backupPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(REPORTS_DIR, `published-taxonomy-description-backup-${stamp}.json`);
}

function summarize(updates, skipped) {
  const byBeforeCategory = {};
  const byAfterCategory = {};
  for (const update of updates) {
    byBeforeCategory[update.before.category] = (byBeforeCategory[update.before.category] || 0) + 1;
    byAfterCategory[update.after.category] = (byAfterCategory[update.after.category] || 0) + 1;
  }

  return {
    mode: APPLY ? "apply" : "dry-run",
    targets: updates.length + skipped.length,
    validUpdates: updates.length,
    changed: updates.filter((update) => update.changed).length,
    skipped: skipped.length,
    byBeforeCategory,
    byAfterCategory,
    skippedSample: skipped.slice(0, 10),
    sample: updates
      .filter((update) => update.changed)
      .slice(0, 10)
      .map((update) => ({
        slug: update.slug,
        title: update.title,
        beforeCategory: update.before.category,
        afterCategory: update.after.category,
        beforeLength: update.before.description.length,
        afterLength: update.after.description.length,
        afterDescription: update.after.description,
      })),
  };
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
    const result = await client.execute({
      sql: `select id, slug, title, description, category, status
            from tests
            where status = 'published'
              and (category = 'ai-generated' or length(coalesce(description, '')) < ?)
            order by slug`,
      args: [TARGET_DESCRIPTION_LENGTH],
    });

    const updates = [];
    const skipped = [];

    for (const row of result.rows) {
      const category = inferCategory(row);
      const description = buildDescription(row, category);
      const update = {
        id: row.id,
        slug: row.slug,
        title: row.title,
        before: {
          description: normalizeDescription(row.description),
          category: normalizeText(row.category),
          status: row.status,
        },
        after: {
          description,
          category,
        },
      };
      update.changed =
        update.before.description !== update.after.description ||
        update.before.category !== update.after.category;

      const problems = validateCandidate(update);
      if (problems.length > 0) {
        skipped.push({
          slug: update.slug,
          title: update.title,
          problems,
          afterCategory: update.after.category,
          afterLength: update.after.description.length,
          afterDescription: update.after.description,
        });
      } else {
        updates.push(update);
      }
    }

    console.log(JSON.stringify(summarize(updates, skipped), null, 2));

    if (!APPLY || updates.filter((update) => update.changed).length === 0) return;
    if (skipped.length > 0) {
      throw new Error(`Refusing to apply while ${skipped.length} target rows are skipped`);
    }

    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    const file = backupPath();
    fs.writeFileSync(
      file,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          updates,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const changed = updates.filter((update) => update.changed);
    const now = Math.floor(Date.now() / 1000);
    await client.batch(
      changed.map((update) => ({
        sql: "update tests set description = ?, category = ?, updated_at = ? where id = ? and status = 'published'",
        args: [update.after.description, update.after.category, now, update.id],
      })),
      "write",
    );

    const verify = await client.execute({
      sql: `select
              count(*) as published,
              sum(case when category = 'ai-generated' then 1 else 0 end) as aiGeneratedCategory,
              sum(case when length(coalesce(description, '')) < ? then 1 else 0 end) as shortDescription,
              sum(case when description like '%ai-generated%' or description like '%??%' then 1 else 0 end) as badDescription
            from tests
            where status = 'published'`,
      args: [MIN_DESCRIPTION_LENGTH],
    });

    console.log(`Backup written: ${path.relative(ROOT, file)}`);
    console.log(`OK: refined ${changed.length} published rows`);
    console.log(JSON.stringify(verify.rows[0], null, 2));

    const summary = verify.rows[0];
    if (
      Number(summary.aiGeneratedCategory || 0) !== 0 ||
      Number(summary.shortDescription || 0) !== 0 ||
      Number(summary.badDescription || 0) !== 0
    ) {
      process.exitCode = 1;
    }
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
