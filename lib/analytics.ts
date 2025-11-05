// Google Analytics 및 사용자 행동 추적을 위한 함수들

/**
 * Google Analytics 이벤트 파라미터 타입
 */
interface GtagEventParams {
  event_category?: string
  event_label?: string
  page_title?: string
  page_location?: string
  page_path?: string
  test_name?: string
  test_result?: string
  progress_percent?: number
  current_question?: number
  total_questions?: number
  method?: string
  content_type?: string
  item_id?: string
  element_name?: string
  search_term?: string
  engagement_action?: string
  value?: number
  custom_parameter_1?: string
  [key: string]: string | number | undefined
}

/**
 * gtag 함수 타입
 */
type GtagFunction = (
  command: 'config' | 'event' | 'js' | 'set',
  targetId: string | Date,
  params?: GtagEventParams | Record<string, unknown>
) => void

declare global {
  interface Window {
    gtag: GtagFunction
    dataLayer: unknown[]
  }
}

// 기본 방문 추적
export function trackVisit() {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        event_category: "engagement",
      })
    }
    console.log("📊 방문 추적 완료")
  } catch (error) {
    console.error("방문 추적 오류:", error)
  }
}

// 페이지별 방문 추적
export function trackPageVisit(pathname: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        event_category: "navigation",
      })
    }
    console.log(`📊 페이지 방문 추적: ${pathname}`)
  } catch (error) {
    console.error("페이지 방문 추적 오류:", error)
  }
}

// 테스트 시작 추적
export function trackTestStart(testId: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "test_start", {
        test_name: testId,
        event_category: "engagement",
      })
    }
    console.log(`📊 테스트 시작 추적: ${testId}`)
  } catch (error) {
    console.error("테스트 시작 추적 오류:", error)
  }
}

// 테스트 진행 추적
export function trackTestProgress(testId: string, currentQuestion: number, totalQuestions: number) {
  if (typeof window === "undefined") return

  try {
    const progress = Math.round((currentQuestion / totalQuestions) * 100)

    if (window.gtag) {
      window.gtag("event", "test_progress", {
        test_name: testId,
        progress_percent: progress,
        current_question: currentQuestion,
        total_questions: totalQuestions,
        event_category: "engagement",
      })
    }

    console.log(`📊 테스트 진행 추적: ${testId} - ${progress}% (${currentQuestion}/${totalQuestions})`)
  } catch (error) {
    console.error("테스트 진행 추적 오류:", error)
  }
}

// 테스트 완료 추적
export function trackTestComplete(testId: string, result?: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "test_complete", {
        test_name: testId,
        test_result: result,
        event_category: "conversion",
      })
    }
    console.log(`📊 테스트 완료 추적: ${testId} - 결과: ${result}`)
  } catch (error) {
    console.error("테스트 완료 추적 오류:", error)
  }
}

// 결과 공유 추적
export function trackShare(testId: string, platform: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "share", {
        method: platform,
        content_type: "test_result",
        item_id: testId,
        event_category: "social",
      })
    }
    console.log(`📊 공유 추적: ${testId} - ${platform}`)
  } catch (error) {
    console.error("공유 추적 오류:", error)
  }
}

// 클릭 이벤트 추적
export function trackClick(elementName: string, location: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "click", {
        element_name: elementName,
        page_location: location,
        event_category: "engagement",
      })
    }
    console.log(`📊 클릭 추적: ${elementName} - ${location}`)
  } catch (error) {
    console.error("클릭 추적 오류:", error)
  }
}

// 검색 추적
export function trackSearch(searchTerm: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "search", {
        search_term: searchTerm,
        event_category: "engagement",
      })
    }
    console.log(`📊 검색 추적: ${searchTerm}`)
  } catch (error) {
    console.error("검색 추적 오류:", error)
  }
}

// 사용자 참여도 추적
export function trackEngagement(action: string, value?: number) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "engagement", {
        engagement_action: action,
        value: value,
        event_category: "engagement",
      })
    }
    console.log(`📊 참여도 추적: ${action} - ${value}`)
  } catch (error) {
    console.error("참여도 추적 오류:", error)
  }
}

// 질문 답변 추적
export function trackQuestionAnswer(testName: string, questionNumber: number, answer: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "question_answer", {
        event_category: "engagement",
        event_label: `${testName}_q${questionNumber}`,
        custom_parameter_1: answer,
      })
    }
    console.log(`📊 질문 답변 추적: ${testName} Q${questionNumber} - ${answer}`)
  } catch (error) {
    console.error("질문 답변 추적 오류:", error)
  }
}

// 에러 추적
export function trackError(error: string, location: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "error", {
        event_category: "system",
        event_label: `${location} - ${error}`,
        value: 1,
      })
    }
    console.log(`📊 에러 추적: ${location} - ${error}`)
  } catch (error) {
    console.error("에러 추적 오류:", error)
  }
}

// 관리자 로그인 추적
export function trackAdminLogin() {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "admin_login", {
        event_category: "admin",
        event_label: "login_success",
        value: 1,
      })
    }
    console.log("📊 관리자 로그인 추적 완료")
  } catch (error) {
    console.error("관리자 로그인 추적 오류:", error)
  }
}

// 결과 조회 추적
export function trackResultView(testId: string, resultType: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "result_view", {
        test_name: testId,
        result_type: resultType,
        event_category: "engagement",
      })
    }
    console.log(`📊 결과 조회 추적: ${testId} - ${resultType}`)
  } catch (error) {
    console.error("결과 조회 추적 오류:", error)
  }
}

// CTA 클릭 추적
export function trackCTAClick(ctaName: string, location: string) {
  if (typeof window === "undefined") return

  try {
    if (window.gtag) {
      window.gtag("event", "cta_click", {
        cta_name: ctaName,
        page_location: location,
        event_category: "conversion",
      })
    }
    console.log(`📊 CTA 클릭 추적: ${ctaName} - ${location}`)
  } catch (error) {
    console.error("CTA 클릭 추적 오류:", error)
  }
}

// 로컬 통계 데이터 (시뮬레이션)
export function getStats() {
  return {
    totalVisits: 15420,
    testsCompleted: 8934,
    averageCompletionTime: "2분 30초",
    popularTest: "라면 MBTI",
    completionRate: 78,
  }
}

// 고급 통계 데이터 (시뮬레이션)
export function getAdvancedStats() {
  return {
    totalVisits: Math.floor(Math.random() * 5000) + 15000,
    totalTestsStarted: Math.floor(Math.random() * 3000) + 8000,
    totalTestsCompleted: Math.floor(Math.random() * 2500) + 6500,
    lastVisit: Date.now() - Math.floor(Math.random() * 3600000),
    testStats: {
      "커피 MBTI": {
        started: Math.floor(Math.random() * 500) + 1000,
        completed: Math.floor(Math.random() * 400) + 800,
      },
      "라면 MBTI": {
        started: Math.floor(Math.random() * 600) + 1200,
        completed: Math.floor(Math.random() * 500) + 950,
      },
      "반려동물 MBTI": {
        started: Math.floor(Math.random() * 400) + 800,
        completed: Math.floor(Math.random() * 300) + 600,
      },
      "공부 MBTI": {
        started: Math.floor(Math.random() * 350) + 700,
        completed: Math.floor(Math.random() * 280) + 550,
      },
      "알람 습관": {
        started: Math.floor(Math.random() * 300) + 600,
        completed: Math.floor(Math.random() * 240) + 480,
      },
      "NTRP 테스트": {
        started: Math.floor(Math.random() * 250) + 500,
        completed: Math.floor(Math.random() * 200) + 400,
      },
    },
  }
}

// 완료율 계산
export function getCompletionRate() {
  const stats = getStats()
  return Math.round((stats.testsCompleted / stats.totalVisits) * 100)
}

// 활성 사용자 수 (시뮬레이션)
export function getActiveUsers() {
  return Math.floor(Math.random() * 50) + 20 // 20-70 사이의 랜덤 값
}

// Google Analytics 연결 확인
export function checkGAConnection() {
  if (typeof window === "undefined") return false

  try {
    return typeof window.gtag === "function"
  } catch (error) {
    console.error("GA 연결 확인 오류:", error)
    return false
  }
}

// 테스트 이벤트 전송 (관리자용)
export function sendTestEvent() {
  if (typeof window === "undefined") return false

  try {
    if (window.gtag) {
      window.gtag("event", "admin_test", {
        event_category: "admin",
        event_label: "connection_test",
        value: 1,
      })
    }
    console.log("📊 테스트 이벤트 전송 완료")
    return true
  } catch (error) {
    console.error("테스트 이벤트 전송 오류:", error)
    return false
  }
}
