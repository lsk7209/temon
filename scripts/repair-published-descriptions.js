#!/usr/bin/env node
/**
 * Repairs published tests whose public descriptions still contain old
 * ai-generated placeholder copy.
 *
 * Dry-run:
 *   node scripts/repair-published-descriptions.js
 * Apply:
 *   node scripts/repair-published-descriptions.js --apply
 */
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");
const REPORTS_DIR = path.join(ROOT, "reports");
const APPLY = process.argv.includes("--apply");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

const REPAIRS = [
  {
    slug: "brain-opinion-mbti-lO1Z",
    category: "커뮤니케이션",
    description:
      "뇌피셜 썰을 들었을 때 검증, 확장, 공감, 반박 중 무엇을 먼저 하는지 보는 무료 MBTI 성향 테스트입니다. 루머와 카더라 상황에서 나의 말하기·판단 패턴을 확인하세요.",
  },
  {
    slug: "cake-cutting-style-test-G9Ge",
    category: "음식",
    description:
      "케이크를 자를 때 공평함, 예쁨, 효율, 분위기 중 무엇을 먼저 보는지 확인하는 무료 성향 테스트입니다. 생일 케이크 앞 선택으로 배려 방식과 결정 스타일을 정리합니다.",
  },
  {
    slug: "challenge-participation-style-test-DcIo",
    category: "생활",
    description:
      "새 챌린지를 만났을 때 바로 뛰어드는지, 계획을 세우는지, 기록과 완주를 중시하는지 확인하는 무료 갓생 성향 테스트입니다. 12문항으로 도전 지속력과 참여 스타일을 살펴보세요.",
  },
  {
    slug: "drawing-style-mbti-test-aif7",
    category: "취미",
    description:
      "그림을 시작할 때 아이디어, 완성도, 감정 표현, 피드백 중 무엇을 중시하는지 보는 무료 그림 성향 테스트입니다. 창작 과정에서 드러나는 나의 표현 방식과 몰입 스타일을 확인하세요.",
  },
  {
    slug: "drinking-buddy-type-test-x8nl",
    category: "관계",
    description:
      "술자리에서 분위기 메이커, 상담자, 관찰자, 토론가 중 어떤 역할을 맡는지 보는 무료 술자리 MBTI 테스트입니다. 모임 속 대화 방식과 관계 반응을 16가지 결과로 정리합니다.",
  },
  {
    slug: "gukmul-vs-bibim-style-test-p0Q2",
    category: "음식",
    description:
      "국물파와 비빔파 선택으로 식탁 취향과 결정 스타일을 알아보는 무료 음식 성향 테스트입니다. 메뉴를 고를 때 안정감, 조합, 속도, 새로움 중 무엇을 보는지 확인하세요.",
  },
  {
    slug: "jjigae-vs-gukmul-personality-test-Wb50",
    category: "음식",
    description:
      "찌개와 국물 메뉴를 고르는 방식으로 나의 음식 취향과 심리 패턴을 확인하는 무료 성향 테스트입니다. 혼밥, 모임, 주문 상황에서 드러나는 선택 기준을 16가지 결과로 정리합니다.",
  },
  {
    slug: "kimbap-dna-test-wTRs",
    category: "음식",
    description:
      "김밥 재료와 조합 취향으로 나의 식탁 DNA를 알아보는 무료 음식 성향 테스트입니다. 기본 재료, 이색 조합, 나눠 먹기 상황에서 드러나는 선택 기준을 확인하세요.",
  },
  {
    slug: "korean-genre-style-test-C7vy",
    category: "엔터테인먼트",
    description:
      "노래방과 음악 취향 선택으로 나에게 맞는 장르 스타일을 찾아보는 무료 음악 성향 테스트입니다. 감성, 에너지, 가사, 분위기 중 무엇에 끌리는지 12문항으로 확인하세요.",
  },
  {
    slug: "lunchbox-style-test-BQ9n",
    category: "음식",
    description:
      "도시락 반찬과 구성 방식을 통해 나의 식사 준비 스타일을 알아보는 무료 성향 테스트입니다. 실용성, 예쁨, 균형, 새로움 중 무엇을 중시하는지 16가지 결과로 정리합니다.",
  },
  {
    slug: "meme-reaction-style-test-Fi2N",
    category: "엔터테인먼트",
    description:
      "밈과 짤을 봤을 때 바로 공유하는지, 분석하는지, 조용히 저장하는지 확인하는 무료 밈 반응 테스트입니다. 단톡방과 유행어 상황에서 드러나는 소통 스타일을 살펴보세요.",
  },
  {
    slug: "movie-picking-style-test-enKw",
    category: "엔터테인먼트",
    description:
      "영화를 고를 때 평점, 장르, 분위기, 추천, 반전 중 무엇을 먼저 보는지 확인하는 무료 영화 취향 테스트입니다. 주말 영화 선택에서 드러나는 감상 기준을 16가지로 정리합니다.",
  },
  {
    slug: "pizza-topping-mbti-test-hFyj",
    category: "음식",
    description:
      "피자 토핑 선택으로 나의 맛 취향과 성격 스타일을 알아보는 무료 MBTI 테스트입니다. 익숙한 조합, 실험적인 토핑, 함께 먹는 사람까지 고려하는 선택 패턴을 확인하세요.",
  },
  {
    slug: "salad-dressing-mbti-test-vb9p",
    category: "음식",
    description:
      "샐러드 드레싱 취향으로 나의 식사 균형감과 선택 스타일을 보는 무료 음식 성향 테스트입니다. 건강함, 맛의 강도, 새로움, 안정감 중 어떤 기준을 우선하는지 확인하세요.",
  },
  {
    slug: "subway-vs-bus-personality-test-93VO",
    category: "생활",
    description:
      "지하철과 버스 선택으로 출퇴근 성향과 이동 스타일을 알아보는 무료 성격 테스트입니다. 효율, 풍경, 안정감, 사람 배려 중 무엇을 먼저 보는지 12문항으로 확인하세요.",
  },
  {
    slug: "sushi-mbti-test-Yw65",
    category: "음식",
    description:
      "초밥 취향으로 나의 맛 선택 기준과 모험 성향을 알아보는 무료 음식 MBTI 테스트입니다. 익숙한 메뉴, 고급 재료, 새로운 조합, 함께 먹는 분위기 중 어떤 기준이 강한지 확인하세요.",
  },
  {
    slug: "tangsooyuk-test-8enk",
    category: "음식",
    description:
      "탕수육 부먹과 찍먹 선택으로 나의 음식 취향과 고집 포인트를 보는 무료 성향 테스트입니다. 소스, 식감, 나눠 먹기 상황에서 드러나는 결정 방식을 16가지 결과로 정리합니다.",
  },
  {
    slug: "test-quiz-2-godsaeng-master-Tjjb",
    category: "생활",
    description:
      "갓생 루틴을 대하는 방식으로 나의 실행력과 생활 관리 스타일을 확인하는 무료 성향 테스트입니다. 아침 루틴, 취미 시작, 목표 관리 상황에서 드러나는 지속력을 살펴보세요.",
  },
];

const BAD_PATTERNS = [/ai-generated/i, /\?{2,}/];

function hasBadCopy(value) {
  return BAD_PATTERNS.some((pattern) => pattern.test(String(value || "")));
}

function validateRepairs() {
  const seen = new Set();
  for (const repair of REPAIRS) {
    if (seen.has(repair.slug)) throw new Error(`Duplicate repair slug: ${repair.slug}`);
    seen.add(repair.slug);

    if (repair.description.length < 90 || repair.description.length > 190) {
      throw new Error(
        `Invalid description length for ${repair.slug}: ${repair.description.length}`,
      );
    }
    if (hasBadCopy(repair.description) || hasBadCopy(repair.category)) {
      throw new Error(`Replacement still contains bad copy: ${repair.slug}`);
    }
  }
}

function backupPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return path.join(REPORTS_DIR, `published-description-repair-backup-${stamp}.json`);
}

async function main() {
  validateRepairs();

  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const updates = [];

    for (const repair of REPAIRS) {
      const result = await client.execute({
        sql: "select id, slug, title, description, category, status from tests where slug = ? limit 1",
        args: [repair.slug],
      });
      const row = result.rows[0];

      if (!row) throw new Error(`Target not found: ${repair.slug}`);
      if (row.status !== "published") {
        throw new Error(`Refusing to update non-published target: ${repair.slug}`);
      }

      const changed =
        row.description !== repair.description || row.category !== repair.category;

      updates.push({
        id: row.id,
        slug: row.slug,
        title: row.title,
        before: {
          description: row.description,
          category: row.category,
          status: row.status,
        },
        after: {
          description: repair.description,
          category: repair.category,
        },
        changed,
        badBefore: hasBadCopy(row.description) || hasBadCopy(row.category),
      });
    }

    const changed = updates.filter((update) => update.changed);
    const stillBadBefore = updates.filter((update) => update.badBefore);

    console.log(
      JSON.stringify(
        {
          mode: APPLY ? "apply" : "dry-run",
          targets: REPAIRS.length,
          changed: changed.length,
          badBefore: stillBadBefore.length,
          sample: changed.slice(0, 5).map((update) => ({
            slug: update.slug,
            beforeCategory: update.before.category,
            afterCategory: update.after.category,
            beforeDescription: update.before.description,
            afterDescription: update.after.description,
          })),
        },
        null,
        2,
      ),
    );

    if (!APPLY || changed.length === 0) return;

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

    const now = Math.floor(Date.now() / 1000);
    await client.batch(
      changed.map((update) => ({
        sql: "update tests set description = ?, category = ?, updated_at = ? where id = ? and status = 'published'",
        args: [update.after.description, update.after.category, now, update.id],
      })),
      "write",
    );

    const remainingBad = [];
    for (const repair of REPAIRS) {
      const result = await client.execute({
        sql: "select slug, description, category from tests where slug = ? and status = 'published' limit 1",
        args: [repair.slug],
      });
      const row = result.rows[0];
      if (!row || hasBadCopy(row.description) || row.category !== repair.category) {
        remainingBad.push({
          slug: repair.slug,
          category: row?.category,
          found: Boolean(row),
        });
      }
    }

    console.log(`Backup written: ${path.relative(ROOT, file)}`);
    console.log(`OK: repaired ${changed.length} published descriptions`);
    console.log(`Remaining bad target descriptions/categories: ${remainingBad.length}`);

    if (remainingBad.length > 0) {
      console.log(JSON.stringify(remainingBad, null, 2));
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
