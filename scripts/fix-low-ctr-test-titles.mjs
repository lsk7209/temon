import { createClient } from "@libsql/client";
import { readFileSync, writeFileSync } from "node:fs";

const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx), l.slice(idx + 1)];
    }),
);

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const updates = [
  {
    slug: "perfection-balance-1xQC",
    title: "완벽주의 테스트 | 나의 완벽주의 성향 알아보기",
    description:
      "완벽주의 테스트로 완벽주의, 자기검열 상황에서 드러나는 생활 루틴과 선택 습관을 확인하세요. 12문항 답변으로 선택 기준과 반응 패턴을 확인하고, 일상적인 결정, 감정 반응, 루틴 관리에서 반복되는 성향을 결과 유형으로 정리합니다.",
  },
  {
    slug: "daily-umbrella-check-wave4",
    title: "우산 챙기기 추천 테스트 | 나의 우산 챙기기 취향",
    description:
      "우산 챙기기 추천 테스트는 집과 일상에서 자주 반복되는 작은 결정 속에서 우산 챙기기 취향이 어떻게 드러나는지 확인하는 무료 성격 테스트입니다. 생활 습관, 일상 루틴, 정리 성향 등을 12문항으로 나눠 보고, 결과에서는 정리감, 편안함, 실용성 사이의 균형과 바로 써먹을 조정 팁을 함께 정리합니다.",
  },
];

const apply = process.argv.includes("--apply");
const backup = [];

for (const update of updates) {
  const current = await client.execute({
    sql: "SELECT id, slug, title, description FROM tests WHERE slug = ? LIMIT 1",
    args: [update.slug],
  });
  const row = current.rows[0];
  if (!row) {
    console.log(`SKIP (not found): ${update.slug}`);
    continue;
  }
  backup.push(row);
  console.log(`${apply ? "APPLYING" : "DRY-RUN"}: ${update.slug}`);
  console.log(`  title: "${row.title}" -> "${update.title}"`);
  console.log(`  description: "${row.description}" -> "${update.description}"`);

  if (apply) {
    await client.execute({
      sql: "UPDATE tests SET title = ?, description = ? WHERE id = ?",
      args: [update.title, update.description, row.id],
    });
  }
}

if (apply && backup.length > 0) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = new URL(
    `../reports/low-ctr-title-backup-${stamp}.json`,
    import.meta.url,
  );
  writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`Backup written: ${backupPath.pathname}`);
}
