#!/usr/bin/env node
/**
 * Repairs the single due draft that is structurally blocked by the quality gate.
 *
 * Dry-run:
 *   node scripts/repair-due-draft-quality.js
 * Apply:
 *   node scripts/repair-due-draft-quality.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");
const TARGET_SLUG = "jjimdak-vs-chicken-mbti-test-KN2X";

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const QUESTIONS = [
  {
    text: "찜닭과 치킨 중 메뉴를 고를 때 에너지가 더 나는 순간은?",
    a: "같이 먹을 사람들의 반응을 보며 바로 의견을 낸다",
    at: ["E"],
    b: "혼자 조용히 생각한 뒤 가장 끌리는 쪽을 말한다",
    bt: ["I"],
  },
  {
    text: "새로운 치킨 맛집을 발견했을 때 당신의 첫 반응은?",
    a: "친구들에게 공유하고 함께 주문해 본다",
    at: ["E"],
    b: "후기와 메뉴를 혼자 살펴본 뒤 저장해 둔다",
    bt: ["I"],
  },
  {
    text: "찜닭 모임을 잡을 때 더 편한 방식은?",
    a: "단체 대화방에서 바로 날짜와 메뉴를 맞춘다",
    at: ["E"],
    b: "가능한 시간을 정리한 뒤 필요한 사람에게만 말한다",
    bt: ["I"],
  },
  {
    text: "찜닭을 평가할 때 가장 먼저 보는 기준은?",
    a: "당면 익힘, 간장 양념, 닭고기 식감처럼 실제 맛이다",
    at: ["S"],
    b: "그 음식이 주는 분위기와 다음에 떠오르는 조합이다",
    bt: ["N"],
  },
  {
    text: "치킨을 주문할 때 메뉴판에서 먼저 끌리는 쪽은?",
    a: "검증된 인기 메뉴와 구체적인 구성 설명이다",
    at: ["S"],
    b: "신메뉴 이름과 독특한 콘셉트가 주는 기대감이다",
    bt: ["N"],
  },
  {
    text: "찜닭 소스를 남겼을 때 당신다운 마무리는?",
    a: "밥, 당면, 감자처럼 확실히 어울리는 재료를 더한다",
    at: ["S"],
    b: "볶음밥이나 다른 메뉴로 변형할 상상을 먼저 한다",
    bt: ["N"],
  },
  {
    text: "찜닭과 치킨 중 하나만 골라야 한다면 기준은?",
    a: "가격, 양, 배달 시간처럼 합리적인 조건을 비교한다",
    at: ["T"],
    b: "오늘 기분과 같이 먹는 사람의 만족도를 먼저 본다",
    bt: ["F"],
  },
  {
    text: "친구가 메뉴 선택을 계속 고민한다면 어떻게 돕나요?",
    a: "장단점을 정리해 가장 효율적인 선택을 제안한다",
    at: ["T"],
    b: "먹고 싶은 마음을 물어보고 후회가 적은 쪽을 고른다",
    bt: ["F"],
  },
  {
    text: "배달 음식이 기대와 다를 때 가까운 반응은?",
    a: "문제점을 확인하고 다음 주문 기준을 수정한다",
    at: ["T"],
    b: "분위기를 망치지 않게 좋은 점부터 찾아 말한다",
    bt: ["F"],
  },
  {
    text: "주말 저녁 메뉴를 정할 때 당신의 방식은?",
    a: "미리 후보를 정하고 주문 시간까지 맞춰 둔다",
    at: ["J"],
    b: "그날 컨디션에 맞춰 즉흥적으로 고른다",
    bt: ["P"],
  },
  {
    text: "찜닭이나 치킨 쿠폰을 쓸 때 더 가까운 쪽은?",
    a: "만료일과 조건을 확인해 계획적으로 사용한다",
    at: ["J"],
    b: "생각난 김에 오늘 먹고 싶으면 바로 사용한다",
    bt: ["P"],
  },
  {
    text: "메뉴가 도착한 뒤 정리와 세팅은 어떻게 하나요?",
    a: "접시, 소스, 음료를 먼저 맞춰 놓고 먹기 시작한다",
    at: ["J"],
    b: "일단 열어 먹으면서 필요한 것을 그때그때 챙긴다",
    bt: ["P"],
  },
];

const ESTJ_RESULT = {
  typeCode: "ESTJ",
  label: "현실파 주문 리더",
  summary:
    "당신은 찜닭과 치킨 앞에서도 기준이 분명한 현실파입니다. 양, 가격, 배달 시간, 같이 먹는 사람의 만족도를 빠르게 비교해 모두가 납득할 선택을 끌어냅니다. 익숙한 메뉴를 고르더라도 이유가 뚜렷하고, 모임에서는 주문과 정리를 자연스럽게 맡는 편입니다.",
  traits: ["실용적인 비교", "빠른 결정", "모임 운영력", "명확한 기준", "책임감 있는 선택"],
  picks: ["순살 간장찜닭", "후라이드 치킨", "반반 세트"],
  tips: [
    "기준이 선명한 장점은 살리되 가끔은 즉흥 메뉴도 후보에 넣어 보세요.",
    "같이 먹는 사람이 원하는 맛을 한 번 더 물으면 만족도가 더 올라갑니다.",
    "가성비와 분위기를 함께 보면 선택의 폭이 넓어집니다.",
  ],
  matchTypes: ["ISTJ", "ESFJ", "ENTJ"],
  emoji: "✅",
};

function id(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function backupPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(REPORTS_DIR, `due-draft-quality-backup-${stamp}.json`);
}

function buildMetadata(current) {
  return {
    ...current,
    mainKeyword: "찜닭 vs 치킨 MBTI 테스트",
    expandedKeywords: [
      "찜닭 성향 테스트",
      "치킨 취향 테스트",
      "음식 MBTI",
      "배달 메뉴 성향",
      "소울푸드 테스트",
    ],
    copyQuality: "manual-repaired-2026-06-02",
    resultCopyQuality: "manual-repaired-2026-06-02",
    contentAngle:
      "찜닭과 치킨 선택 상황으로 일상적인 메뉴 결정 방식과 MBTI 네 축의 반응 차이를 가볍게 보여주는 음식 성향 테스트",
  };
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const test = (
      await client.execute({
        sql: "select * from tests where slug = ? and status = 'draft' limit 1",
        args: [TARGET_SLUG],
      })
    ).rows[0];

    if (!test) {
      throw new Error(`draft not found: ${TARGET_SLUG}`);
    }

    const questions = (
      await client.execute({
        sql: "select * from questions where test_id = ? order by question_order",
        args: [test.id],
      })
    ).rows;
    const results = (
      await client.execute({
        sql: "select * from result_types where test_id = ? order by type_code",
        args: [test.id],
      })
    ).rows;

    const existingResultCodes = new Set(results.map((row) => row.type_code));
    const backup = { test, questions, results };

    console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
    console.log(`target: ${TARGET_SLUG}`);
    console.log(`before questions: ${questions.length}`);
    console.log(`before results: ${results.length}`);
    console.log(`will replace questions: ${QUESTIONS.length}`);
    console.log(`will add ESTJ result: ${!existingResultCodes.has("ESTJ")}`);

    if (!APPLY) {
      return;
    }

    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    const file = backupPath();
    fs.writeFileSync(file, JSON.stringify(backup, null, 2), "utf8");

    const now = Math.floor(Date.now() / 1000);
    const currentMetadata =
      typeof test.metadata === "string" ? JSON.parse(test.metadata || "{}") : test.metadata || {};
    const metadata = buildMetadata(currentMetadata);

    await client.execute("BEGIN");
    try {
    await client.execute({
      sql: `update tests
            set title = ?,
                description = ?,
                question_count = ?,
                result_type_count = ?,
                metadata = ?,
                updated_at = ?
            where id = ? and status = 'draft'`,
      args: [
        "찜닭 vs 치킨 MBTI 테스트",
        "찜닭과 치킨 중 무엇을 고르는지로 메뉴 선택 기준, 함께 먹는 방식, 즉흥성과 계획성을 확인하는 음식 MBTI 테스트입니다. 12개 상황 질문을 통해 배달 메뉴 앞에서 드러나는 성향을 가볍게 정리하고, 16가지 결과로 나에게 맞는 소울푸드 스타일을 보여줍니다.",
        QUESTIONS.length,
        16,
        JSON.stringify(metadata),
        now,
        test.id,
      ],
    });

    await client.execute({
      sql: "delete from questions where test_id = ?",
      args: [test.id],
    });

    for (const [index, question] of QUESTIONS.entries()) {
      await client.execute({
        sql: `insert into questions
              (id, test_id, question_order, question_text, choice_1_text, choice_1_tags, choice_2_text, choice_2_tags)
              values (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id("q"),
          test.id,
          index + 1,
          question.text,
          question.a,
          JSON.stringify(question.at),
          question.b,
          JSON.stringify(question.bt),
        ],
      });
    }

    if (!existingResultCodes.has("ESTJ")) {
      await client.execute({
        sql: `insert into result_types
              (id, test_id, type_code, label, summary, traits, picks, tips, match_types, emoji)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id("r"),
          test.id,
          ESTJ_RESULT.typeCode,
          ESTJ_RESULT.label,
          ESTJ_RESULT.summary,
          JSON.stringify(ESTJ_RESULT.traits),
          JSON.stringify(ESTJ_RESULT.picks),
          JSON.stringify(ESTJ_RESULT.tips),
          JSON.stringify(ESTJ_RESULT.matchTypes),
          ESTJ_RESULT.emoji,
        ],
      });
    }

    const questionCount = (
      await client.execute({
        sql: "select count(*) as count from questions where test_id = ?",
        args: [test.id],
      })
    ).rows[0]?.count;
    const resultCount = (
      await client.execute({
        sql: "select count(*) as count from result_types where test_id = ?",
        args: [test.id],
      })
    ).rows[0]?.count;

    if (Number(questionCount) !== QUESTIONS.length || Number(resultCount) !== 16) {
      throw new Error(
        `post-write invariant failed: questions=${questionCount}, results=${resultCount}`,
      );
    }

    await client.execute("COMMIT");
    } catch (error) {
      await client.execute("ROLLBACK").catch(() => {});
      throw error;
    }

    console.log(`backup: ${path.relative(ROOT, file)}`);
    console.log("OK: repaired due draft structure");
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
