"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  type AnalyticsConsent,
  isAnalyticsAllowed,
  readAnalyticsConsent,
  shouldShowConsentBanner,
  writeAnalyticsConsent,
} from "@/lib/consent";

export interface ConsentSnapshot {
  consent: AnalyticsConsent;
  allowed: boolean;
  showBanner: boolean;
}

export function readConsentSnapshot(): ConsentSnapshot {
  return {
    consent: readAnalyticsConsent(),
    allowed: isAnalyticsAllowed(),
    showBanner: shouldShowConsentBanner(),
  };
}

const PENDING_SNAPSHOT: ConsentSnapshot = { consent: "unset", allowed: false, showBanner: false };

/**
 * Consent state for client components. Before mount it reports "not allowed"
 * so server-rendered HTML never contains tracker scripts.
 */
export function useAnalyticsConsent() {
  const [snapshot, setSnapshot] = useState<ConsentSnapshot | null>(null);

  useEffect(() => {
    const sync = () => setSnapshot(readConsentSnapshot());
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) sync();
    };
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const grant = useCallback(() => writeAnalyticsConsent("granted"), []);
  const deny = useCallback(() => writeAnalyticsConsent("denied"), []);

  return { ready: snapshot !== null, ...(snapshot ?? PENDING_SNAPSHOT), grant, deny };
}
