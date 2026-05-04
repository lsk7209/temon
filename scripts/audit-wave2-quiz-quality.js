#!/usr/bin/env node
const path = require("node:path");
const dotenv = require("dotenv");
const { createClient } = require("@libsql/client");

const ROOT = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(ROOT, ".env.local"), override: true, quiet: true });

function hasGenericSummary(summary, typeCode) {
  const patterns = [
    new RegExp(`당신은\\s*['‘"]?${typeCode}`, "i"),
    /유형으로/,
    /카리스마/,
    /창의적이며/,
    /책임감/,
    /가능성을 탐색/,
    /긍정적인 영향/,
    /공동체/,
    /잠재력/,
  ];
  return patterns.some((pattern) => pattern.test(summary));
}

async function main() {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const tests = (
      await db.execute(
        "select id,title,slug,metadata from tests where metadata like '%\"wave\":\"wave2\"%' order by published_at",
      )
    ).rows;

    let resultCount = 0;
    let typeMention = 0;
    let shortSummary = 0;
    let genericSummary = 0;
    let duplicateLabels = 0;
    let axisIssues = 0;
    const examples = [];

    for (const test of tests) {
      const metadata = JSON.parse(test.metadata || "{}");
      const resultRows = (
        await db.execute({
          sql: "select id,type_code,label,summary from result_types where test_id=?",
          args: [test.id],
        })
      ).rows;
      resultCount += resultRows.length;

      const labels = new Set();
      for (const result of resultRows) {
        if (labels.has(result.label)) duplicateLabels += 1;
        labels.add(result.label);

        const summary = result.summary || "";
        const hasType = new RegExp(result.type_code, "i").test(summary);
        const isGeneric = hasGenericSummary(summary, result.type_code);
        if (hasType) typeMention += 1;
        if (summary.length < 80) shortSummary += 1;
        if (isGeneric) genericSummary += 1;

        if ((hasType || isGeneric) && examples.length < 12) {
          examples.push({
            test: test.title,
            mainKeyword: metadata.mainKeyword,
            type: result.type_code,
            label: result.label,
            summary: summary.slice(0, 160),
          });
        }
      }

      const questionRows = (
        await db.execute({
          sql: "select choice_1_tags, choice_2_tags from questions where test_id=? order by question_order",
          args: [test.id],
        })
      ).rows;
      const counts = { EI: 0, SN: 0, TF: 0, JP: 0 };
      for (const question of questionRows) {
        const tags = [
          ...JSON.parse(question.choice_1_tags || "[]"),
          ...JSON.parse(question.choice_2_tags || "[]"),
        ];
        if (tags.some((tag) => "EI".includes(tag))) counts.EI += 1;
        if (tags.some((tag) => "SN".includes(tag))) counts.SN += 1;
        if (tags.some((tag) => "TF".includes(tag))) counts.TF += 1;
        if (tags.some((tag) => "JP".includes(tag))) counts.JP += 1;
      }
      if (questionRows.length !== 12 || Object.values(counts).some((count) => count !== 3)) {
        axisIssues += 1;
      }
    }

    console.log(
      JSON.stringify(
        {
          tests: tests.length,
          resultCount,
          typeMention,
          shortSummary,
          genericSummary,
          duplicateLabels,
          axisIssues,
          examples,
        },
        null,
        2,
      ),
    );
  } finally {
    db.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
