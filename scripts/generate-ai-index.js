/**
 * public/ai-index.json 전체 재생성
 * - lib/tests-config.ts의 ALL_TESTS와 lib/noindex-tests.ts를 파싱
 * - publishAt 미래 또는 NOINDEX_TEST_IDS는 제외
 */

const fs = require('fs')
const path = require('path')

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://temon.kr'
const configPath = path.join(__dirname, '../lib/tests-config.ts')
const noindexPath = path.join(__dirname, '../lib/noindex-tests.ts')
const outputPath = path.join(__dirname, '../public/ai-index.json')

function loadNoindexIds() {
  const src = fs.readFileSync(noindexPath, 'utf-8')
  const ids = new Set()
  const re = /["']([a-z0-9-]+)["']\s*,/g
  // Set<string>([ ... ]) 블록 한정
  const block = src.match(/new\s+Set<string>\(\[([\s\S]*?)\]\)/)
  if (!block) return ids
  let m
  while ((m = re.exec(block[1])) !== null) ids.add(m[1])
  return ids
}

function parseTests() {
  const src = fs.readFileSync(configPath, 'utf-8')
  // ALL_TESTS 배열 본문만 잘라냄
  const start = src.indexOf('export const ALL_TESTS')
  if (start < 0) throw new Error('ALL_TESTS not found')
  const eq = src.indexOf('=', start)
  const arrOpen = src.indexOf('[', eq)
  // 짝맞는 ] 찾기 (중첩 대비)
  let depth = 0
  let end = -1
  for (let i = arrOpen; i < src.length; i++) {
    const ch = src[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end < 0) throw new Error('ALL_TESTS array end not found')
  const body = src.slice(arrOpen + 1, end)

  // 각 객체 추출 — { ... }, 짝맞춤
  const tests = []
  let cur = ''
  let dep = 0
  let inObj = false
  for (let i = 0; i < body.length; i++) {
    const ch = body[i]
    if (ch === '{') {
      if (!inObj) { inObj = true; cur = '' }
      dep++
      cur += ch
    } else if (ch === '}') {
      dep--
      cur += ch
      if (dep === 0 && inObj) {
        tests.push(cur)
        inObj = false
        cur = ''
      }
    } else if (inObj) {
      cur += ch
    }
  }

  const now = Date.now()
  const out = []
  for (const obj of tests) {
    const id = (obj.match(/\bid:\s*["']([^"']+)["']/) || [])[1]
    if (!id) continue
    const title = (obj.match(/\btitle:\s*["']([^"']+)["']/) || [])[1] || id
    const desc = (obj.match(/\bdescription:\s*["']([^"']+)["']/) || [])[1] || ''
    const category = (obj.match(/\bcategory:\s*["']([^"']+)["']/) || [])[1] || ''
    const href = (obj.match(/\bhref:\s*["']([^"']+)["']/) || [])[1] || `/tests/${id}`
    const publishAtRaw = (obj.match(/\bpublishAt:\s*["']([^"']+)["']/) || [])[1]
    if (publishAtRaw) {
      const t = Date.parse(publishAtRaw)
      if (!Number.isNaN(t) && t > now) continue // 드립 대기 → 제외
    }
    out.push({ id, title, description: desc, category, url: href })
  }
  return out
}

function main() {
  const noindex = loadNoindexIds()
  const all = parseTests()
  const visible = all.filter(t => !noindex.has(t.id))
  const cats = Array.from(new Set(visible.map(t => t.category).filter(Boolean)))

  const data = {
    site: {
      name: '테몬 MBTI',
      url: baseUrl,
      description: '한국 무료 MBTI 성격 테스트 플랫폼. 200개 이상의 다양한 주제 테스트 제공',
      language: 'ko',
      lastUpdated: new Date().toISOString().slice(0, 10),
    },
    pages: [
      { url: '/', title: '테몬 MBTI - 무료 성격 테스트 모음', type: 'home' },
      { url: '/tests', title: '전체 테스트 목록', type: 'listing' },
      { url: '/about', title: '테몬 소개', type: 'page' },
      { url: '/contact', title: '연락처', type: 'page' },
      { url: '/privacy', title: '개인정보처리방침', type: 'legal' },
      { url: '/terms', title: '이용약관', type: 'legal' },
    ],
    tests: visible.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description,
      category: t.category,
      url: t.url,
    })),
    totalTests: visible.length,
    categories: cats,
  }

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  console.log(`✅ ai-index.json 재생성: 전체 ${all.length}개 → 색인 ${visible.length}개 (noindex 제외)`)
}

main()
