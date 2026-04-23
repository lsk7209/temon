"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "temon_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    } catch {
      // localStorage 접근 실패 (SSR/사파리 프라이빗 등) → 노출 생략
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, at: Date.now() }),
      );
    } catch {}
    setVisible(false);
  };

  const handleDismiss = () => {
    // 닫기만 해도 7일 유예 — 다시 표시하지 않음
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: false, at: Date.now() }),
      );
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="쿠키 사용 동의"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-gray-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 text-sm md:text-base text-gray-700 leading-relaxed">
          <p>
            테몬은 서비스 이용 분석과 광고 제공을 위해 쿠키를 사용합니다. 자세한
            내용은{" "}
            <Link
              href="/privacy"
              className="text-violet-600 underline font-medium"
            >
              개인정보처리방침
            </Link>
            에서 확인하실 수 있습니다.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button onClick={handleAccept} size="sm">
            동의
          </Button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="닫기"
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
