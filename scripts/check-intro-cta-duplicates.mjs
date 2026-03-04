import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = process.cwd()
const APP_DIR = join(ROOT, "app")

const introPages = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      walk(fullPath)
      continue
    }

    if (!fullPath.endsWith("page.tsx")) continue

    const normalized = fullPath.replace(/\\/g, "/")
    if (normalized.includes("/test/") || normalized.includes("/result/")) continue

    introPages.push(fullPath)
  }
}

walk(APP_DIR)

const hrefTestPattern = /href\s*=\s*(?:"\/[^"\n]+\/test(?:[?#][^"\n]*)?"|'\/[^'\n]+\/test(?:[?#][^'\n]*)?'|\{`\/[^`\n]+\/test(?:[?#][^`\n]*)?`\})/g
const startLabelPattern = /테스트\s*시작하기/g
const issues = []

for (const filePath of introPages) {
  const content = readFileSync(filePath, "utf8")
  const testLinks = content.match(hrefTestPattern) ?? []
  const startLabels = content.match(startLabelPattern) ?? []

  if (testLinks.length > 1 || startLabels.length > 1) {
    issues.push({
      file: relative(ROOT, filePath),
      testLinkCount: testLinks.length,
      startLabelCount: startLabels.length,
    })
  }
}

if (issues.length > 0) {
  console.error("❌ Intro CTA duplication detected:")
  for (const issue of issues) {
    console.error(
      ` - ${issue.file}: ${issue.testLinkCount} test links, ${issue.startLabelCount} start labels`,
    )
  }
  process.exit(1)
}

console.log(`✅ Intro CTA duplicate check passed (${introPages.length} intro pages scanned)`)
