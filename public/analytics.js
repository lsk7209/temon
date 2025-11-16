/**
 * 테몬 Analytics 수집 스니펫
 * 페이지에 <script src="/analytics.js"></script> 추가
 */

(function () {
  'use strict'

  // 설정
  const COLLECT_ENDPOINT = '/api/collect'
  const SESSION_TIMEOUT = 30 * 60 * 1000 // 30분
  const VITALS_SAMPLE_RATE = 0.1 // 10% 샘플링

  // 쿠키 유틸리티
  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  function setCookie(name, value, days = 365) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`
  }

  // ID 생성
  function generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 세션 관리
  function getOrCreateSession() {
    let sessionId = getCookie('tm_sid')
    let anonymousId = getCookie('tm_aid')

    if (!anonymousId) {
      anonymousId = generateId()
      setCookie('tm_aid', anonymousId)
    }

    if (!sessionId) {
      sessionId = generateId()
      setCookie('tm_sid', sessionId)
      // 세션 시작 이벤트
      trackEvent('session_start', { sessionId, anonymousId })
    } else {
      // 세션 갱신 확인 (30분 타임아웃)
      const lastActivity = localStorage.getItem(`tm_last_${sessionId}`)
      const now = Date.now()
      if (lastActivity && now - parseInt(lastActivity) > SESSION_TIMEOUT) {
        // 새 세션 시작
        sessionId = generateId()
        setCookie('tm_sid', sessionId)
        trackEvent('session_start', { sessionId, anonymousId })
      }
    }

    localStorage.setItem(`tm_last_${sessionId}`, Date.now().toString())
    return { sessionId, anonymousId }
  }

  // UTM 파라미터 추출
  function getUTMParams() {
    const url = new URL(window.location.href)
    return {
      utm_source: url.searchParams.get('utm_source') || null,
      utm_medium: url.searchParams.get('utm_medium') || null,
      utm_campaign: url.searchParams.get('utm_campaign') || null,
      utm_term: url.searchParams.get('utm_term') || null,
      utm_content: url.searchParams.get('utm_content') || null,
    }
  }

  // Referrer 추출
  function getReferrer() {
    return document.referrer || null
  }

  // 이벤트 전송
  function trackEvent(type, data = {}) {
    const { sessionId, anonymousId } = getOrCreateSession()
    const payload = {
      type,
      sessionId,
      anonymousId,
      ...data,
    }

    // UTM 파라미터 추가 (첫 방문 시)
    if (type === 'page_view') {
      const utm = getUTMParams()
      Object.keys(utm).forEach((key) => {
        if (utm[key]) payload[key] = utm[key]
      })
      payload.referrer = getReferrer()
    }

    // 비동기 전송 (fire and forget)
    // 404 에러는 조용히 무시 (Cloudflare Functions가 배포되지 않은 경우)
    fetch(COLLECT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((error) => {
      // 404 에러는 조용히 무시 (Functions 미배포 시 정상 동작)
      if (error.name !== 'TypeError' && error.status !== 404) {
        console.error('Analytics error:', error)
      }
    })
  }

  // 페이지 뷰 추적
  function trackPageView() {
    trackEvent('page_view', {
      path: window.location.pathname,
      referrer: getReferrer(),
    })
  }

  // 테스트 시작 클릭
  function trackQuizStartClick(quizId) {
    trackEvent('quiz_start_click', {
      quiz_id: quizId,
    })
  }

  // 테스트 시도 시작
  function trackAttemptStarted(quizId, attemptId) {
    trackEvent('attempt_started', {
      quiz_id: quizId,
      attempt_id: attemptId,
    })
  }

  // 테스트 완료
  function trackAttemptCompleted(attemptId) {
    trackEvent('attempt_completed', {
      attempt_id: attemptId,
    })
  }

  // 테스트 이탈
  function trackAttemptAbandoned(attemptId, reason) {
    trackEvent('attempt_abandoned', {
      attempt_id: attemptId,
      abandon_reason: reason,
    })
  }

  // 섹션 진입
  function trackSectionEntered(attemptId, sectionIndex) {
    trackEvent('section_entered', {
      attempt_id: attemptId,
      section_index: sectionIndex,
    })
  }

  // Web Vitals 추적
  function trackWebVitals() {
    if (Math.random() > VITALS_SAMPLE_RATE) return

    // LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      trackEvent('perf_web_vitals', {
        lcp: lastEntry.renderTime || lastEntry.loadTime,
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // FID
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        trackEvent('perf_web_vitals', {
          fid: entry.processingStart - entry.startTime,
        })
      })
    }).observe({ entryTypes: ['first-input'] })

    // CLS
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      trackEvent('perf_web_vitals', {
        cls: clsValue,
      })
    }).observe({ entryTypes: ['layout-shift'] })

    // TTFB
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        trackEvent('perf_web_vitals', {
          ttfb: navigation.responseStart - navigation.requestStart,
        })
      }
    })
  }

  // 포커스/블러 추적
  function trackVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEvent('focus_blur', { type: 'blur' })
      } else {
        trackEvent('focus_blur', { type: 'focus' })
      }
    })
  }

  // HTTP 에러 추적
  function trackHTTPError(path, status, latencyMs) {
    trackEvent('error_http', {
      path,
      status,
      latency_ms: latencyMs,
    })
  }

  // 전역 객체에 노출
  window.temonAnalytics = {
    trackPageView,
    trackQuizStartClick,
    trackAttemptStarted,
    trackAttemptCompleted,
    trackAttemptAbandoned,
    trackSectionEntered,
    trackWebVitals,
    trackHTTPError,
  }

  // 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      trackPageView()
      trackWebVitals()
      trackVisibility()
    })
  } else {
    trackPageView()
    trackWebVitals()
    trackVisibility()
  }

  // History API 추적 (SPA)
  let lastPath = window.location.pathname
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function (...args) {
    originalPushState.apply(history, args)
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      trackPageView()
    }
  }

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args)
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      trackPageView()
    }
  }

  window.addEventListener('popstate', () => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      trackPageView()
    }
  })
})()

