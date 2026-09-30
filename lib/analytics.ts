// Google Analytics 및 사용자 행동 추적을 위한 함수들
// 모든 전송은 isAnalyticsAllowed()(lib/consent.ts)를 통과해야 한다.
import { isAnalyticsAllowed } from "./consent";

/**
 * Google Analytics 이벤트 파라미터 타입
 */
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  page_title?: string;
  page_location?: string;
  page_path?: string;
  test_name?: string;
  test_result?: string;
  progress_percent?: number;
  current_question?: number;
  total_questions?: number;
  method?: string;
  content_type?: string;
  item_id?: string;
  element_name?: string;
  search_term?: string;
  engagement_action?: string;
  value?: number;
  custom_parameter_1?: string;
  [key: string]: string | number | undefined;
}

/**
 * gtag 함수 타입
 */
type GtagFunction = (
  command: "config" | "event" | "js" | "set" | "consent",
  targetId: string | Date,
  params?: GtagEventParams | Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag: GtagFunction;
    dataLayer: unknown[];
    __temonPendingGtagEvents?: Array<{ queuedAt: number; send: () => void }>;
    __temonLastPageView?: {
      path: string;
      trackedAt: number;
    };
    __temonContentReadCompletions?: Set<string>;
  }
}

let gtagQueueTimer: ReturnType<typeof setInterval> | null = null;

/** Direct gtag calls: only when consent allows and gtag has loaded. */
function canSendGtag(): boolean {
  return isAnalyticsAllowed() && typeof window.gtag === "function";
}

function flushGtagQueue() {
  if (typeof window === "undefined") return;
  const pending = window.__temonPendingGtagEvents || [];
  // Events queued before a denial are dropped, never sent later.
  const allowed = isAnalyticsAllowed();
  window.__temonPendingGtagEvents = pending.filter((entry) => {
    if (!allowed) return false;
    if (Date.now() - entry.queuedAt > 30_000) return false;
    if (typeof window.gtag !== "function") return true;
    entry.send();
    return false;
  });
  if (!window.__temonPendingGtagEvents.length && gtagQueueTimer) {
    clearInterval(gtagQueueTimer);
    gtagQueueTimer = null;
  }
}

function runWhenGtagReady(callback: () => void) {
  if (typeof window === "undefined") return;
  if (!isAnalyticsAllowed()) return;

  if (typeof window.gtag === "function") {
    flushGtagQueue();
    callback();
    return;
  }

  window.__temonPendingGtagEvents = window.__temonPendingGtagEvents || [];
  if (window.__temonPendingGtagEvents.length >= 100) window.__temonPendingGtagEvents.shift();
  window.__temonPendingGtagEvents.push({ queuedAt: Date.now(), send: callback });
  if (!gtagQueueTimer) gtagQueueTimer = setInterval(flushGtagQueue, 250);
}

// 서버 트래킹 전송
async function sendTrackingEvent(type: string, payload: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    if (!isAnalyticsAllowed()) return;

    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, payload }),
      keepalive: true, // 페이지 이동 시에도 전송 보장
    });
    if (!response.ok && response.status !== 404) {
      console.error("서버 트래킹 HTTP 오류:", response.status);
    }
  } catch (error) {
    console.error("서버 트래킹 오류:", error);
  }
}

// 기본 방문 추적
export function trackVisit() {
  if (typeof window === "undefined") return;

  try {
    runWhenGtagReady(() => {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        event_category: "engagement",
      });
    });
    // 서버 트래킹
    sendTrackingEvent("page_view", {
      path: window.location.pathname,
      referrer: document.referrer,
      searchKeyword: new URLSearchParams(window.location.search).get("q"),
    });
  } catch (error) {
    console.error("방문 추적 오류:", error);
  }
}

// 페이지별 방문 추적
export function trackPageVisit(pathname: string) {
  if (typeof window === "undefined") return;

  try {
    const currentUrl = new URL(window.location.href);
    const searchKeyword =
      currentUrl.searchParams.get("q") ||
      currentUrl.searchParams.get("search") ||
      undefined;
    const now = Date.now();
    const lastPageView = window.__temonLastPageView;

    if (
      lastPageView?.path === pathname &&
      now - lastPageView.trackedAt < 1500
    ) {
      return;
    }

    window.__temonLastPageView = {
      path: pathname,
      trackedAt: now,
    };

    runWhenGtagReady(() => {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: currentUrl.toString(),
        ...(searchKeyword && { search_term: searchKeyword }),
        event_category: "navigation",
      });
    });
    // 서버 트래킹
    sendTrackingEvent("page_view", {
      path: pathname,
      referrer: document.referrer,
      searchKeyword,
    });
  } catch (error) {
    console.error("페이지 방문 추적 오류:", error);
  }
}

// 테스트 시작 추적
export function trackContentReadComplete(pathname: string, scrollDepth: number) {
  if (typeof window === "undefined") return;

  try {
    window.__temonContentReadCompletions =
      window.__temonContentReadCompletions || new Set<string>();

    if (window.__temonContentReadCompletions.has(pathname)) return;
    window.__temonContentReadCompletions.add(pathname);

    runWhenGtagReady(() => {
      window.gtag("event", "content_read_complete", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
        scroll_depth: scrollDepth,
        event_category: "engagement",
      });
    });
  } catch (error) {
    console.error("콘텐츠 읽기 완료 추적 오류:", error);
  }
}

export function trackTestStart(testId: string) {
  if (typeof window === "undefined") return;

  try {
    runWhenGtagReady(() => {
      window.gtag("event", "test_start", {
        test_name: testId,
        event_category: "engagement",
      });
    });
    // 서버 트래킹
    sendTrackingEvent("test_start", { testId });
  } catch (error) {
    console.error("테스트 시작 추적 오류:", error);
  }
}

// 테스트 진행 마일스톤 중복 방지 캐시 (세션 내)
const _progressMilestoneSent = new Set<string>();

// 테스트 진행 추적 — 25/50/75/100% 마일스톤에서만 GA4 전송 (이벤트 한도 절감)
export function trackTestProgress(
  testId: string,
  answeredQuestions: number,
  totalQuestions: number,
  attemptId?: string,
) {
  if (typeof window === "undefined" || totalQuestions <= 0) return;

  try {
    const progress = Math.floor((answeredQuestions / totalQuestions) * 100);
    const milestones = [25, 50, 75, 100];
    for (const milestone of milestones) {
      if (progress < milestone) continue;
      const cacheKey = `${attemptId || testId}:${milestone}`;
      if (_progressMilestoneSent.has(cacheKey)) continue;
      _progressMilestoneSent.add(cacheKey);
      runWhenGtagReady(() => {
        window.gtag("event", "test_progress", {
          test_name: testId,
          progress_percent: milestone,
          current_question: answeredQuestions,
          total_questions: totalQuestions,
          event_category: "engagement",
        });
      });
    }

  } catch (error) {
    console.error("테스트 진행 추적 오류:", error);
  }
}

// 테스트 완료 추적
// attemptId(선택)를 넘기면 동일 시도의 시작→완료→저장을 이어볼 수 있다 (F07).
// 기존 호출부(attemptId 생략)는 그대로 동작한다.
export function trackTestComplete(testId: string, result?: string, attemptId?: string) {
  if (typeof window === "undefined") return;

  try {
    runWhenGtagReady(() => {
      window.gtag("event", "test_complete", {
        test_name: testId,
        test_result: result,
        event_category: "conversion",
        ...(attemptId ? { attempt_id: attemptId } : {}),
      });
    });
  } catch (error) {
    console.error("테스트 완료 추적 오류:", error);
  }
}

/** 서버 오류를 GA4/DB 원본 메시지 그대로 전송하지 않도록 제한하는 허용 목록 (F08). */
export const RESULT_SAVE_ERROR_CODES = [
  "invalid_input",
  "not_found",
  "conflict",
  "invalid_answers",
  "unsupported_engine",
  "rate_limited",
  "timeout",
  "network",
  "server_error",
] as const;
export type ResultSaveErrorCode = (typeof RESULT_SAVE_ERROR_CODES)[number];

function normalizeErrorCode(code: string | undefined): ResultSaveErrorCode {
  if (code && (RESULT_SAVE_ERROR_CODES as readonly string[]).includes(code)) {
    return code as ResultSaveErrorCode;
  }
  return "server_error";
}

export function trackResultSave(
  testId: string,
  outcome: "success" | "error",
  options?: { attemptId?: string; errorCode?: string },
) {
  if (typeof window === "undefined") return;
  runWhenGtagReady(() => {
    window.gtag("event", `result_save_${outcome}`, {
      test_name: testId,
      event_category: "engagement",
      ...(options?.attemptId ? { attempt_id: options.attemptId } : {}),
      ...(outcome === "error" ? { error_code: normalizeErrorCode(options?.errorCode) } : {}),
    });
  });
}

// 결과 공유 추적
export function trackShare(testId: string, platform: string) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "share", {
        method: platform,
        content_type: "test_result",
        item_id: testId,
        event_category: "social",
      });
    }
  } catch (error) {
    console.error("공유 추적 오류:", error);
  }
}

// 클릭 이벤트 추적
export function trackClick(elementName: string, location: string) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "click", {
        element_name: elementName,
        page_location: location,
        event_category: "engagement",
      });
    }
  } catch (error) {
    console.error("클릭 추적 오류:", error);
  }
}

// 검색 추적
export function trackSearch(searchTerm: string) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "search", {
        search_term: searchTerm,
        event_category: "engagement",
      });
    }
  } catch (error) {
    console.error("검색 추적 오류:", error);
  }
}

// 사용자 참여도 추적
export function trackEngagement(action: string, value?: number) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "engagement", {
        engagement_action: action,
        value: value,
        event_category: "engagement",
      });
    }
  } catch (error) {
    console.error("참여도 추적 오류:", error);
  }
}

// 질문 답변 추적
export function trackQuestionAnswer(
  testName: string,
  questionNumber: number,
  answer: string,
) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "question_answer", {
        event_category: "engagement",
        event_label: `${testName}_q${questionNumber}`,
        custom_parameter_1: answer,
      });
    }
  } catch (error) {
    console.error("질문 답변 추적 오류:", error);
  }
}

// 에러 추적
export function trackError(error: string, location: string) {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "error", {
        event_category: "system",
        event_label: `${location} - ${error}`,
        value: 1,
      });
    }
  } catch (error) {
    console.error("에러 추적 오류:", error);
  }
}

// 관리자 로그인 추적
export function trackAdminLogin() {
  if (typeof window === "undefined") return;

  try {
    if (canSendGtag()) {
      window.gtag("event", "admin_login", {
        event_category: "admin",
        event_label: "login_success",
        value: 1,
      });
    }
  } catch (error) {
    console.error("관리자 로그인 추적 오류:", error);
  }
}

// 결과 조회 추적
export function trackResultView(testId: string, resultType: string) {
  if (typeof window === "undefined") return;

  try {
    runWhenGtagReady(() => {
      window.gtag("event", "result_view", {
        test_name: testId,
        result_type: resultType,
        event_category: "engagement",
      });
    });
  } catch (error) {
    console.error("결과 조회 추적 오류:", error);
  }
}

// CTA 클릭 추적
export function trackCTAClick(ctaName: string, location: string) {
  if (typeof window === "undefined") return;

  try {
    runWhenGtagReady(() => {
      window.gtag("event", "cta_click", {
        cta_name: ctaName,
        page_location: location,
        event_category: "conversion",
      });
    });
  } catch (error) {
    console.error("CTA 클릭 추적 오류:", error);
  }
}

// Google Analytics 연결 확인
export function checkGAConnection() {
  if (typeof window === "undefined") return false;

  try {
    return typeof window.gtag === "function";
  } catch (error) {
    console.error("GA 연결 확인 오류:", error);
    return false;
  }
}

// 테스트 이벤트 전송 (관리자용)
export function sendTestEvent() {
  if (typeof window === "undefined") return false;

  try {
    if (canSendGtag()) {
      window.gtag("event", "admin_test", {
        event_category: "admin",
        event_label: "connection_test",
        value: 1,
      });
    }
    return true;
  } catch (error) {
    console.error("테스트 이벤트 전송 오류:", error);
    return false;
  }
}
