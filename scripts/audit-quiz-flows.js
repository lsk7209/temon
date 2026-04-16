const fs = require("fs")
const path = require("path")

const root = process.cwd()
const testsDir = path.join(root, "app", "tests")

function readFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function getQuizDirs() {
  return fs
    .readdirSync(testsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "[testId]")
    .map((entry) => entry.name)
    .sort()
}

function extractMatch(source, regex) {
  const match = source.match(regex)
  return match ? match[1] : null
}

function auditQuiz(slug) {
  const issues = []
  const introPath = path.join("app", "tests", slug, "page.tsx")
  const testPath = path.join("app", "tests", slug, "test", "page.tsx")
  const resultPath = path.join("app", "tests", slug, "test", "result", "page.tsx")

  if (!exists(introPath) || !exists(testPath) || !exists(resultPath)) {
    issues.push("Missing intro/test/result file")
    return issues
  }

  const introSource = readFile(introPath)
  const testSource = readFile(testPath)

  const introHref = extractMatch(introSource, /<Link href="([^"]+)"/)
  const testId =
    extractMatch(testSource, /testId:\s*"([^"]+)"/) ||
    extractMatch(testSource, /testId:\s*'([^']+)'/)
  const resultHref =
    extractMatch(testSource, /resultPath:\s*"([^"]+)"/) ||
    extractMatch(testSource, /router\.push\(`([^`]*\/result[^`]*)`\)/) ||
    extractMatch(testSource, /router\.push\("([^"]*\/result[^"]*)"\)/) ||
    extractMatch(testSource, /router\.push\('([^']*\/result[^']*)'\)/)

  const expectedIntroHref = `/tests/${slug}/test`
  const expectedResultHref = `/tests/${slug}/test/result`

  if (introHref !== expectedIntroHref) {
    issues.push(`Intro link mismatch: expected ${expectedIntroHref}, got ${introHref || "none"}`)
  }

  if (testId !== slug) {
    issues.push(`testId mismatch: expected ${slug}, got ${testId || "none"}`)
  }

  if (!resultHref || !resultHref.startsWith(expectedResultHref)) {
    issues.push(`resultPath mismatch: expected prefix ${expectedResultHref}, got ${resultHref || "none"}`)
  }

  return issues
}

function main() {
  const slugs = getQuizDirs()
  const failures = []

  for (const slug of slugs) {
    const issues = auditQuiz(slug)
    if (issues.length > 0) {
      failures.push({ slug, issues })
    }
  }

  console.log(`Audited quiz flows: ${slugs.length}`)
  console.log(`Failed audits: ${failures.length}`)

  if (failures.length > 0) {
    console.log("")
    for (const failure of failures) {
      console.log(`- ${failure.slug}`)
      for (const issue of failure.issues) {
        console.log(`  - ${issue}`)
      }
    }
    process.exitCode = 1
    return
  }

  console.log("All intro -> test -> result flow references are aligned.")
}

main()
