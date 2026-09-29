/**
 * Analytics consent state shared by GA, Clarity, Vercel Analytics, the
 * first-party /api/analytics/track calls, and AdSense ad personalization.
 *
 * - An explicit denial is always honored: no analytics request is sent.
 * - NEXT_PUBLIC_ANALYTICS_CONSENT_MODE=opt-in makes an unanswered visitor
 *   denied by default and shows the consent banner. Any other value keeps
 *   the previous behavior (tracking until the visitor refuses in the footer).
 */

export type AnalyticsConsent = "granted" | "denied" | "unset";

export const CONSENT_STORAGE_KEY = "temon_analytics_consent";
export const CONSENT_CHANGE_EVENT = "temon:analytics-consent";

// Fallback when localStorage is blocked, so a denial still lasts the session.
let memoryConsent: AnalyticsConsent = "unset";

export function isConsentOptInMode(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_CONSENT_MODE === "opt-in";
}

function isStoredConsent(value: unknown): value is "granted" | "denied" {
  return value === "granted" || value === "denied";
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unset";
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (isStoredConsent(stored)) return stored;
  } catch {
    // Storage blocked (private mode, policy): use the in-memory value.
  }
  return memoryConsent;
}

export function writeAnalyticsConsent(value: "granted" | "denied"): void {
  if (typeof window === "undefined") return;
  memoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Keep the choice in memory only.
  }
  applyAdPersonalizationPreference();
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** True only when analytics requests may be sent for this visitor right now. */
export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const consent = readAnalyticsConsent();
  if (consent === "granted") return true;
  if (consent === "denied") return false;
  return !isConsentOptInMode();
}

/** The banner is only needed when opt-in mode is on and the visitor has not answered. */
export function shouldShowConsentBanner(): boolean {
  return isConsentOptInMode() && readAnalyticsConsent() === "unset";
}

type AdSenseQueue = { requestNonPersonalizedAds?: number };

/**
 * AdSense has no consent of its own here: a refusal keeps ads but switches them
 * to non-personalized (contextual) ads. Must run before the ad request is pushed;
 * the flag also works on the already-loaded adsbygoogle object.
 */
export function applyAdPersonalizationPreference(): void {
  if (typeof window === "undefined") return;
  const host = window as unknown as { adsbygoogle?: AdSenseQueue };
  const queue: AdSenseQueue = host.adsbygoogle ?? ([] as unknown as AdSenseQueue);
  queue.requestNonPersonalizedAds = isAnalyticsAllowed() ? 0 : 1;
  host.adsbygoogle = queue;
}
