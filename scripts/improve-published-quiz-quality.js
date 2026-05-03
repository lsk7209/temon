#!/usr/bin/env node
/**
 * Published 상태의 신규 100개 퀴즈를 발행 후 품질 감사 결과에 맞춰 보강합니다.
 *
 * 기본은 dry-run입니다.
 *   node scripts/improve-published-quiz-quality.js
 * 실제 DB 반영:
 *   node scripts/improve-published-quiz-quality.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const PLAN_PATH = path.join(ROOT, "data", "quiz-topic-plan-100.json");
const APPLY = process.argv.includes("--apply");
const FOCUSED_QUESTION_SLUGS = new Set([
  "assignment-start-style",
  "professor-office-hour-style",
  "assignment-format-style",
  "library-seat-style",
  "scholarship-application-style",
  "handover-briefing-style",
  "feedback-response-style",
  "file-naming-style",
  "appointment-planning-style",
  "birthday-care-style",
  "ending-interpretation",
  "choice-fatigue-type",
  "perfection-balance",
  "emotion-hiding-type",
  "nickname-choice-type",
  "umbrella-prep-style",
  "recycling-style",
  "newsletter-curation-type",
  "story-highlight-curation",
  "calendar-color-type",
  "procrastination-excuse",
  "episode-skip-threshold",
  "expectation-disappointment",
  "solo-time-recharge",
  "coupon-decision-style",
  "shared-space-style",
]);
const TITLE_FIXES = {
  "cloud-file-organization": "클라우드 정리 성향 테스트",
  "calendar-color-type": "캘린더 정리 성향 테스트",
  "spring-change-drive": "봄 변화 성향 테스트",
  "procrastination-excuse": "미루기 유형 테스트",
  "perfection-balance": "완벽주의 성향 테스트",
};
const CATEGORY_FOCUS = {
  "직장": "업무 습관",
  "학교": "학습 태도",
  "관계": "관계 반응",
  "소비": "구매 기준",
  "생활": "생활 루틴",
  "엔터테인먼트": "감상 방식",
  "취미": "취미 몰입",
  "SNS": "온라인 표현",
  "디지털": "디지털 습관",
  "계절": "계절 반응",
  "심리": "감정 패턴",
  "트렌드": "트렌드 반응",
};

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

function readTopics() {
  return JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function hasBatchim(value) {
  const char = compact(value).slice(-1);
  const code = char.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

function objectParticle(value) {
  return hasBatchim(value) ? "을" : "를";
}

function topicSubject(value) {
  return compact(value)
    .replace(/\s*(성향|방식|유형|스타일|판단|준비|습관|기준|테스트)$/g, "")
    .trim();
}

function withObject(value) {
  const subject = topicSubject(value);
  return `${subject}${objectParticle(subject)}`;
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || "");
  } catch {
    return fallback;
  }
}

function buildDescription(topic) {
  const [first, second] = topic.expandedKeywords;
  const focus = CATEGORY_FOCUS[topic.category] || "선택 패턴";
  return compact(
    `${topic.mainKeyword} 테스트. ${first}, ${second} 상황에서 드러나는 ${focus}을 12문항으로 확인하고 16가지 결과로 정리합니다.`,
  );
}

function buildFocusedQuestions(topic) {
  const [k1, k2, k3, k4, k5, k6] = topic.expandedKeywords;
  const main = topicSubject(topic.mainKeyword);
  return [
    {
      text: `${main} 관련 상황에서 가장 먼저 하는 행동은?`,
      a: "사람들과 이야기하며 감을 잡는다",
      at: ["E"],
      b: "혼자 생각을 정리한 뒤 말한다",
      bt: ["I"],
    },
    {
      text: `${k1} 이야기가 나오면 나는?`,
      a: "반응을 나누며 방향을 잡는다",
      at: ["E"],
      b: "내 기준부터 조용히 세운다",
      bt: ["I"],
    },
    {
      text: `${withObject(k2)} 정할 때 에너지가 나는 쪽은?`,
      a: "함께 비교해야 더 잘 보인다",
      at: ["E"],
      b: "혼자 몰입해야 판단이 선다",
      bt: ["I"],
    },
    {
      text: `${withObject(k3)} 판단할 때 더 믿는 기준은?`,
      a: "지금 보이는 사실을 먼저 본다",
      at: ["S"],
      b: "뒤에 숨은 의미를 먼저 본다",
      bt: ["N"],
    },
    {
      text: `${main}에서 중요한 단서는?`,
      a: "구체적인 근거와 사례",
      at: ["S"],
      b: "전체 흐름과 가능성",
      bt: ["N"],
    },
    {
      text: `${withObject(k4)} 볼 때 먼저 확인하는 것은?`,
      a: "이미 확인된 정보를 따른다",
      at: ["S"],
      b: "앞으로 생길 변수를 상상한다",
      bt: ["N"],
    },
    {
      text: `${main} 문제를 결정할 때 우선하는 것은?`,
      a: "효율과 기준을 우선한다",
      at: ["T"],
      b: "감정과 관계를 함께 본다",
      bt: ["F"],
    },
    {
      text: `${k5} 상황에서 더 설득되는 쪽은?`,
      a: "맞고 틀린 근거가 중요하다",
      at: ["T"],
      b: "상대가 느낄 영향이 중요하다",
      bt: ["F"],
    },
    {
      text: `${withObject(k6)} 고를 때 더 중요한 기준은?`,
      a: "결과가 분명한 선택",
      at: ["T"],
      b: "마음이 편한 선택",
      bt: ["F"],
    },
    {
      text: `${withObject(main)} 준비할 때 선호하는 흐름은?`,
      a: "미리 정해두고 움직인다",
      at: ["J"],
      b: "상황 보며 유연하게 바꾼다",
      bt: ["P"],
    },
    {
      text: `${withObject(k1)} 마주했을 때 일정 관리는?`,
      a: "체크리스트로 정리한다",
      at: ["J"],
      b: "그때그때 필요한 것만 본다",
      bt: ["P"],
    },
    {
      text: `${k2} 이후 마무리 방식은?`,
      a: "끝맺음을 확실히 한다",
      at: ["J"],
      b: "여지를 남기고 마무리한다",
      bt: ["P"],
    },
  ];
}

function buildTips(topic, result) {
  const traits = parseJson(result.traits, []);
  const firstTrait = traits[0] || "강점";
  const [first, second] = topic.expandedKeywords;
  return [
    `${topic.mainKeyword}에서는 ${firstTrait}을 장점으로 살리되 한 번 더 기준을 확인하세요.`,
    `${first} 상황에서는 즉흥 판단보다 내가 반복하는 패턴을 먼저 보세요.`,
    `${second}이 흔들릴 때는 결과보다 다음 행동 하나를 작게 정하면 좋습니다.`,
  ];
}

async function collectTargets(client, topics) {
  const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
  const queue = await client.execute("SELECT logs FROM test_queue");
  const targets = [];

  for (const row of queue.rows) {
    const parsed = parseJson(row.logs, {});
    const metadata = parsed.metadata || parsed;
    const topic = topicBySlug.get(metadata.slug);
    if (!topic || !parsed.testId) continue;

    const test = await client.execute({
      sql: "SELECT id, title, slug, description, status FROM tests WHERE id = ? LIMIT 1",
      args: [parsed.testId],
    });
    const testRow = test.rows[0];
    if (!testRow || testRow.status !== "published") continue;
    targets.push({ topic, test: testRow });
  }

  return targets;
}

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL or TURSO_AUTH_TOKEN missing");
  }

  const topics = readTopics();
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const targets = await collectTargets(client, topics);
  const titleUpdates = targets.filter(({ topic, test }) => TITLE_FIXES[topic.slug] && test.title !== TITLE_FIXES[topic.slug]);
  const descriptionUpdates = targets.filter(({ topic, test }) => test.description !== buildDescription(topic));
  const questionUpdates = targets.filter(({ topic }) => FOCUSED_QUESTION_SLUGS.has(topic.slug));

  let tipUpdates = 0;
  for (const { test } of targets) {
    const results = await client.execute({
      sql: "SELECT tips FROM result_types WHERE test_id = ?",
      args: [test.id],
    });
    tipUpdates += results.rows.filter((row) => parseJson(row.tips, []).length < 3).length;
  }

  console.log(`mode: ${APPLY ? "apply" : "dry-run"}`);
  console.log(`targets: ${targets.length}`);
  console.log(`title updates: ${titleUpdates.length}`);
  console.log(`description updates: ${descriptionUpdates.length}`);
  console.log(`question set updates: ${questionUpdates.length}`);
  console.log(`result tip updates: ${tipUpdates}`);

  if (targets.length !== topics.length) {
    throw new Error(`expected ${topics.length} published targets, got ${targets.length}`);
  }
  if (!APPLY) return;

  const now = Math.floor(Date.now() / 1000);
  for (const { topic, test } of targets) {
    await client.execute({
      sql: "UPDATE tests SET title = ?, description = ?, updated_at = ? WHERE id = ?",
      args: [TITLE_FIXES[topic.slug] || test.title, buildDescription(topic), now, test.id],
    });

    if (FOCUSED_QUESTION_SLUGS.has(topic.slug)) {
      const questions = buildFocusedQuestions(topic);
      const existing = await client.execute({
        sql: "SELECT id, question_order FROM questions WHERE test_id = ? ORDER BY question_order",
        args: [test.id],
      });
      for (const row of existing.rows) {
        const next = questions[row.question_order - 1];
        await client.execute({
          sql: `UPDATE questions
                SET question_text = ?, choice_1_text = ?, choice_1_tags = ?, choice_2_text = ?, choice_2_tags = ?
                WHERE id = ?`,
          args: [
            next.text,
            next.a,
            JSON.stringify(next.at),
            next.b,
            JSON.stringify(next.bt),
            row.id,
          ],
        });
      }
    }

    const results = await client.execute({
      sql: "SELECT id, type_code, traits FROM result_types WHERE test_id = ?",
      args: [test.id],
    });
    for (const result of results.rows) {
      await client.execute({
        sql: "UPDATE result_types SET tips = ? WHERE id = ?",
        args: [JSON.stringify(buildTips(topic, result)), result.id],
      });
    }
  }

  console.log("OK: improved published quiz quality");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
