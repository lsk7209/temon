// Analytics consent gate: a denied (or opt-in unanswered) session sends zero
// GA calls and zero first-party /api/analytics/track requests.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

function compile(file, jsx = false) {
  return ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      ...(jsx ? { jsx: ts.JsxEmit.ReactJSX } : {}),
    },
  }).outputText
}
const consentSource = compile('lib/consent.ts')
const analyticsSource = compile('lib/analytics.ts')

/** Fresh browser-like sandbox with recorders for every outbound analytics path. */
function createSession({ mode, stored, storageThrows = false }) {
  const gtagCalls = []
  const fetches = []
  const events = []
  const store = new Map(stored ? [['temon_analytics_consent', stored]] : [])
  const localStorage = {
    getItem: (key) => { if (storageThrows) throw new Error('blocked'); return store.get(key) ?? null },
    setItem: (key, value) => { if (storageThrows) throw new Error('blocked'); store.set(key, value) },
  }
  const window = {
    localStorage,
    location: { href: 'https://temon.kr/tests?q=x', pathname: '/tests', search: '?q=x' },
    dispatchEvent: (event) => events.push(event),
    gtag: (...args) => gtagCalls.push(args),
  }
  const timers = []
  const sandbox = {
    window, console, URL, URLSearchParams, Date, Set,
    document: { title: 'Temon', referrer: '' },
    process: { env: mode ? { NEXT_PUBLIC_ANALYTICS_CONSENT_MODE: mode } : {} },
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init?.detail } },
    fetch: async (url, options) => { fetches.push({ url, options }); return { ok: true, status: 200 } },
    setInterval: (callback) => { timers.push(callback); return timers.length },
    clearInterval: () => {},
  }
  const consentModule = { exports: {} }
  vm.runInNewContext(consentSource, { ...sandbox, module: consentModule, exports: consentModule.exports })
  const analyticsModule = { exports: {} }
  vm.runInNewContext(analyticsSource, {
    ...sandbox, module: analyticsModule, exports: analyticsModule.exports,
    require: (id) => { if (id === './consent') return consentModule.exports; throw new Error(id) },
  })
  return { window, gtagCalls, fetches, events, store, timers,
    consent: consentModule.exports, analytics: analyticsModule.exports }
}

/** Calls every exported tracking function once. */
function fireAllTrackers(analytics) {
  analytics.trackVisit()
  analytics.trackPageVisit('/tests')
  analytics.trackContentReadComplete('/tests', 90)
  analytics.trackTestStart('quiz')
  analytics.trackTestProgress('quiz', 4, 4, 'attempt-1')
  analytics.trackTestComplete('quiz', 'ENFP')
  analytics.trackResultSave('quiz', 'error')
  analytics.trackShare('quiz', 'copy')
  analytics.trackClick('button', '/tests')
  analytics.trackSearch('음악')
  analytics.trackEngagement('scroll', 1)
  analytics.trackQuestionAnswer('quiz', 1, 'A')
  analytics.trackError('x', '/tests')
  analytics.trackAdminLogin()
  analytics.trackResultView('quiz', 'ENFP')
  analytics.trackCTAClick('test_start', '/tests')
  analytics.sendTestEvent()
}

async function settle() { await new Promise((resolve) => setImmediate(resolve)) }

async function main() {
  // 1) Explicit denial: zero requests in both modes, nothing queued for later.
  for (const mode of [undefined, 'opt-in']) {
    const session = createSession({ mode, stored: 'denied' })
    fireAllTrackers(session.analytics)
    await settle()
    assert.equal(session.gtagCalls.length, 0, `gtag calls with denial (mode=${mode})`)
    assert.equal(session.fetches.length, 0, `track requests with denial (mode=${mode})`)
    assert.equal((session.window.__temonPendingGtagEvents || []).length, 0)
    assert.equal(session.consent.isAnalyticsAllowed(), false)
    assert.equal(session.consent.shouldShowConsentBanner(), false)
  }

  // 2) Opt-in mode, unanswered: default deny + banner shown.
  const unanswered = createSession({ mode: 'opt-in' })
  fireAllTrackers(unanswered.analytics)
  await settle()
  assert.equal(unanswered.gtagCalls.length + unanswered.fetches.length, 0)
  assert.equal(unanswered.consent.shouldShowConsentBanner(), true)

  // 3) Opt-in mode, granted: tracking flows (GA + first-party).
  const granted = createSession({ mode: 'opt-in', stored: 'granted' })
  fireAllTrackers(granted.analytics)
  await settle()
  assert.ok(granted.gtagCalls.length > 10)
  assert.ok(granted.fetches.some((item) => item.url === '/api/analytics/track'))

  // 4) Default mode, unanswered: previous behavior kept, no banner.
  const legacy = createSession({})
  fireAllTrackers(legacy.analytics)
  await settle()
  assert.ok(legacy.gtagCalls.length > 10)
  assert.equal(legacy.fetches.length, 3, 'page_view x2 + test_start')
  assert.equal(legacy.consent.shouldShowConsentBanner(), false)

  // 5) Withdrawal mid-session: queued events dropped, later calls blocked, change event fired.
  const withdraw = createSession({})
  delete withdraw.window.gtag
  withdraw.analytics.trackTestStart('quiz')
  assert.equal(withdraw.window.__temonPendingGtagEvents.length, 1)
  withdraw.consent.writeAnalyticsConsent('denied')
  assert.equal(withdraw.store.get('temon_analytics_consent'), 'denied')
  assert.equal(withdraw.events.at(-1).type, 'temon:analytics-consent')
  withdraw.window.gtag = (...args) => withdraw.gtagCalls.push(args)
  withdraw.timers.forEach((flush) => flush())
  const fetchesBefore = withdraw.fetches.length
  fireAllTrackers(withdraw.analytics)
  await settle()
  assert.equal(withdraw.gtagCalls.length, 0, 'queued pre-denial event not sent after denial')
  assert.equal(withdraw.fetches.length, fetchesBefore)

  // 6) Blocked localStorage: denial still holds for the session (memory fallback).
  const blocked = createSession({ storageThrows: true })
  assert.equal(blocked.consent.readAnalyticsConsent(), 'unset')
  blocked.consent.writeAnalyticsConsent('denied')
  fireAllTrackers(blocked.analytics)
  await settle()
  assert.equal(blocked.gtagCalls.length + blocked.fetches.length, 0)

  // 7) Server render: no window -> never allowed, no tracker script in SSR HTML.
  const serverConsent = { exports: {} }
  vm.runInNewContext(consentSource, { module: serverConsent, exports: serverConsent.exports, process: { env: {} } })
  assert.equal(serverConsent.exports.isAnalyticsAllowed(), false)

  const componentModule = { exports: {} }
  // SSR check below renders with this window absent-equivalent (hook stub says not ready).
  const componentWindow = {}
  vm.runInNewContext(compile('components/analytics-consent.tsx', true), {
    module: componentModule, exports: componentModule.exports, window: componentWindow,
    require: (id) => {
      if (id === 'react' || id === 'react/jsx-runtime') return require(id)
      if (id === 'next/link') return { __esModule: true, default: (props) => React.createElement('a', props) }
      if (id === 'next/script') return { __esModule: true, default: (props) => React.createElement('script', { id: props.id, src: props.src }) }
      if (id === '@/hooks/use-analytics-consent') {
        return { useAnalyticsConsent: () => ({ ready: false, allowed: false, showBanner: false, grant() {}, deny() {} }) }
      }
      throw new Error(id)
    },
  })
  const ui = componentModule.exports
  const ssr = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(ui.AnalyticsScripts, { gaId: 'G-TEST', clarityId: 'c1' }),
    React.createElement(ui.ConsentBanner),
    React.createElement(ui.AnalyticsConsentGate, null, React.createElement('i', null, 'vercel'))))
  assert.equal(ssr, '', 'SSR output contains no tracker scripts or banner')

  // 8) Banner and footer control markup: labelled region, two real buttons, privacy link.
  const banner = renderToStaticMarkup(React.createElement(ui.ConsentBannerView, { onGrant() {}, onDeny() {} }))
  assert.match(banner, /role="region"/)
  assert.match(banner, /aria-label="분석 도구 사용 동의"/)
  assert.equal((banner.match(/<button type="button"/g) || []).length, 2)
  assert.match(banner, />거부</)
  assert.match(banner, />허용</)
  assert.match(banner, /href="\/privacy"/)
  assert.match(renderToStaticMarkup(React.createElement(ui.ConsentSettingsView, { allowed: true, onGrant() {}, onDeny() {} })), /분석 수집 거부하기/)
  assert.match(renderToStaticMarkup(React.createElement(ui.ConsentSettingsView, { allowed: false, onGrant() {}, onDeny() {} })), /분석 수집 허용하기/)

  // 9) Revocation flips GA's kill switch and Clarity consent on loaded trackers.
  const clarityCalls = []
  const gtagConsent = []
  componentWindow.gtag = (...args) => gtagConsent.push(args)
  componentWindow.clarity = (...args) => clarityCalls.push(args)
  ui.applyLoadedTrackerConsent('G-TEST', false)
  assert.equal(componentWindow['ga-disable-G-TEST'], true)
  assert.equal(JSON.stringify(gtagConsent.at(-1)), JSON.stringify(['consent', 'update', { analytics_storage: 'denied' }]))
  assert.deepEqual(clarityCalls.at(-1), ['consent', false])
  ui.applyLoadedTrackerConsent('G-TEST', true)
  assert.equal(componentWindow['ga-disable-G-TEST'], false)
  assert.deepEqual(clarityCalls.at(-1), ['consent', true])

  // 10) Layout no longer loads GA/Clarity unconditionally.
  const layout = fs.readFileSync('app/layout.tsx', 'utf8')
  assert.doesNotMatch(layout, /googletagmanager\.com\/gtag\/js/)
  assert.doesNotMatch(layout, /clarity\.ms\/tag/)
  assert.match(layout, /<AnalyticsScripts /)
  assert.match(layout, /<AnalyticsConsentGate>/)
  assert.match(fs.readFileSync('components/web-vitals.tsx', 'utf8'), /isAnalyticsAllowed\(\)/)

  console.log('analytics consent: passed (denied/opt-in zero requests, grant, withdrawal, blocked storage, SSR, UI)')
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
