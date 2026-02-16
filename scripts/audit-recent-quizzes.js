#!/usr/bin/env node

/**
 * 최근 생성 퀴즈 품질 점검 스크립트
 *
 * 점검 항목
 * - 필수 페이지 존재 여부(인트로/질문/결과)
 * - 인트로 CTA 중복 여부("테스트 시작하기")
 * - 과장성 문구 여부("100% 찐 결과 보장")
 *
 * 사용법
 *   node scripts/audit-recent-quizzes.js
 */

const fs = require('fs')
const path = require('path')

const repoRoot = process.cwd()
const testsRoot = path.join(repoRoot, 'app', 'tests')
const outDir = path.join(repoRoot, 'docs')
const outFile = path.join(outDir, 'quiz-audit-recent.md')

function exists(filePath) {
  return fs.existsSync(filePath)
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function formatDate(ms) {
  const d = new Date(ms)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
}

function walkTsxMtime(dirPath) {
  let latest = 0
  const stack = [dirPath]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const e of entries) {
      const fullPath = path.join(current, e.name)
      if (e.isDirectory()) {
        stack.push(fullPath)
      } else if (e.isFile() && fullPath.endsWith('.tsx')) {
        const mtime = fs.statSync(fullPath).mtimeMs
        if (mtime > latest) latest = mtime
      }
    }
  }

  if (latest === 0) {
    latest = fs.statSync(dirPath).mtimeMs
  }

  return latest
}


function readPendingGeneratedQuiz() {
  const generatedPath = path.join(repoRoot, 'data', 'generated-quiz.json')
  if (!exists(generatedPath)) return null

  try {
    const data = JSON.parse(read(generatedPath))
    if (!data || !data.slug) return null

    const expectedDir = path.join(testsRoot, data.slug)
    return {
      slug: data.slug,
      title: data.title || '',
      existsInRoutes: exists(expectedDir),
      sourcePath: 'data/generated-quiz.json',
    }
  } catch (error) {
    return {
      parseError: String(error),
      sourcePath: 'data/generated-quiz.json',
    }
  }
}

function collectAuditRows() {
  const dirs = fs
    .readdirSync(testsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== '[testId]')
    .map((d) => d.name)

  const rows = []

  for (const slug of dirs) {
    const base = path.join(testsRoot, slug)
    const introPath = path.join(base, 'page.tsx')
    const questionPath = path.join(base, 'test', 'page.tsx')
    const resultPath = path.join(base, 'test', 'result', 'page.tsx')

    const issues = []

    const hasIntro = exists(introPath)
    const hasQuestion = exists(questionPath)
    const hasResult = exists(resultPath)

    if (!hasIntro) issues.push('인트로 없음')
    if (!hasQuestion) issues.push('질문 페이지 없음')
    if (!hasResult) issues.push('결과 페이지 없음')

    let startButtonCount = 0

    if (hasIntro) {
      const introCode = read(introPath)
      startButtonCount = (introCode.match(/테스트 시작하기/g) || []).length
      if (startButtonCount > 1) issues.push(`CTA 중복(${startButtonCount})`)
      if (/100%\s*찐\s*결과\s*보장/.test(introCode)) issues.push('과장 문구(100% 찐 결과 보장)')
    }

    rows.push({
      slug,
      hasIntro,
      hasQuestion,
      hasResult,
      startButtonCount,
      issues,
      lastUpdatedMs: walkTsxMtime(base),
    })
  }

  rows.sort((a, b) => b.lastUpdatedMs - a.lastUpdatedMs)

  return rows
}

function buildMarkdown(rows, pendingGeneratedQuiz) {
  const total = rows.length
  const missingIntro = rows.filter((r) => !r.hasIntro).length
  const missingQuestion = rows.filter((r) => !r.hasQuestion).length
  const missingResult = rows.filter((r) => !r.hasResult).length
  const duplicatedCta = rows.filter((r) => r.startButtonCount > 1).length
  const highRisk = rows.filter((r) => r.issues.length > 0)

  const topRecent = rows.slice(0, 40)

  const lines = []
  lines.push('# 최근 생성 퀴즈 품질 점검 리포트')
  lines.push('')
  lines.push(`- 생성 시각: ${formatDate(Date.now())}`)
  lines.push('- 기준 경로: `app/tests/*`')
  lines.push('- 정렬 기준: 각 퀴즈 디렉토리 내 `.tsx` 파일 최신 수정 시간 내림차순')
  lines.push('')

  lines.push('## 전체 요약')
  lines.push('')
  lines.push(`- 전체 퀴즈 수: **${total}개**`)
  lines.push(`- 인트로 누락: **${missingIntro}개**`)
  lines.push(`- 질문 페이지 누락: **${missingQuestion}개**`)
  lines.push(`- 결과 페이지 누락: **${missingResult}개**`)
  lines.push(`- 인트로 CTA 중복: **${duplicatedCta}개**`)
  lines.push(`- 이슈 보유 퀴즈: **${highRisk.length}개**`)
  lines.push('')

  lines.push('## 우선 개선 대상 (최근 생성 순)')
  lines.push('')
  lines.push('| 최근순 | 슬러그 | 마지막 수정 | 상태 | 이슈 |')
  lines.push('|---:|---|---|---|---|')

  highRisk.slice(0, 30).forEach((r, i) => {
    const status = r.issues.length ? '⚠️ 점검 필요' : '✅ 정상'
    const issueText = r.issues.join(', ')
    lines.push('| ' + (i + 1) + ' | `' + r.slug + '` | ' + formatDate(r.lastUpdatedMs) + ' | ' + status + ' | ' + issueText + ' |')
  })

  lines.push('')
  lines.push('## 최근 생성 상위 40개 점검표')
  lines.push('')
  lines.push('| 최근순 | 슬러그 | 마지막 수정 | intro | test | result | 이슈 |')
  lines.push('|---:|---|---|---|---|---|---|')

  topRecent.forEach((r, i) => {
    const issueText = r.issues.length ? r.issues.join(', ') : '-'
    lines.push(
      '| ' + (i + 1) + ' | `' + r.slug + '` | ' + formatDate(r.lastUpdatedMs) + ' | ' + (r.hasIntro ? '✅' : '❌') + ' | ' + (r.hasQuestion ? '✅' : '❌') + ' | ' + (r.hasResult ? '✅' : '❌') + ' | ' + issueText + ' |'
    )
  })

  lines.push('')

  lines.push('## 생성 산출물 점검 (`data/generated-quiz.json`)')
  lines.push('')
  if (pendingGeneratedQuiz) {
    if (pendingGeneratedQuiz.parseError) {
      lines.push(`- ⚠️ JSON 파싱 실패: ${pendingGeneratedQuiz.parseError}`)
    } else {
      lines.push(`- 산출물 제목: **${pendingGeneratedQuiz.title || '(제목 없음)'}**`)
      lines.push(`- 산출물 slug: \`${pendingGeneratedQuiz.slug}\``)
      lines.push(`- 라우트 반영 여부: ${pendingGeneratedQuiz.existsInRoutes ? '✅ 반영됨' : '❌ 미반영'}`)
    }
  } else {
    lines.push('- 생성 산출물 파일이 없거나 slug 정보가 없습니다.')
  }
  lines.push('')
  lines.push('## 개선 준비 체크리스트')
  lines.push('')
  lines.push('- [ ] 결과 페이지 누락 퀴즈부터 공통 결과 템플릿 적용')
  lines.push('- [ ] 질문 페이지 누락 퀴즈 생성(최소 12문항)')
  lines.push('- [ ] 인트로 CTA(테스트 시작하기) 중복 제거')
  lines.push('- [ ] 과장 문구 및 어색한 카피 문장 정제')
  lines.push('- [ ] 배포 전 slug별 E2E 스모크 테스트(`인트로→질문→결과`)')
  lines.push('')

  return `${lines.join('\n')}\n`
}

function main() {
  if (!exists(testsRoot)) {
    console.error(`[ERROR] tests directory not found: ${testsRoot}`)
    process.exit(1)
  }

  if (!exists(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const rows = collectAuditRows()
  const pendingGeneratedQuiz = readPendingGeneratedQuiz()
  const markdown = buildMarkdown(rows, pendingGeneratedQuiz)
  fs.writeFileSync(outFile, markdown, 'utf8')

  console.log(`[OK] Wrote audit report: ${path.relative(repoRoot, outFile)}`)
  console.log(`[OK] Audited quizzes: ${rows.length}`)

  const issueCount = rows.filter((r) => r.issues.length > 0).length
  console.log(`[OK] Quizzes with issues: ${issueCount}`)
}

main()
