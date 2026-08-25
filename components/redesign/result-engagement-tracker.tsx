"use client";

import { useEffect } from "react";
import { trackResultView } from "@/lib/analytics";

interface ResultEngagementTrackerProps {
  testId: string;
  resultType: string;
}

export function ResultEngagementTracker({
  testId,
  resultType,
}: ResultEngagementTrackerProps) {
  useEffect(() => {
    trackResultView(testId, resultType);
  }, [resultType, testId]);

  return null;
}
