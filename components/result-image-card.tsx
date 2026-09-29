"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackShare } from "@/lib/analytics";

interface ResultImageCardProps {
  testId: string;
  quizTitle: string;
  resultType: string;
}

type Status = "idle" | "working" | "done";

/**
 * 결과를 이미지 카드(PNG)로 저장하는 유틸리티.
 * html-to-image로 숨겨진 카드 DOM을 렌더링해 다운로드한다.
 * 공유(바이럴) 촉진용으로 결과 페이지의 공유 영역 옆에 배치한다.
 */
export function ResultImageCard({
  testId,
  quizTitle,
  resultType,
}: ResultImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleDownload = async () => {
    if (!cardRef.current || status === "working") return;
    setStatus("working");
    trackShare(testId, "result_image_download");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `temon-${testId}-${resultType}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
      alert("이미지 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      {/* 화면 밖에 렌더링되는 캡처용 카드 (사용자에게는 버튼만 보임) */}
      <div className="pointer-events-none absolute -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={cardRef}
          className="flex h-[630px] w-[1200px] flex-col justify-between bg-gradient-to-br from-orange-50 via-white to-amber-50 p-16"
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧭</span>
            <span className="text-3xl font-black tracking-tight text-slate-900">
              테몬
            </span>
          </div>
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-orange-600">{quizTitle}</p>
            <p className="break-keep text-7xl font-black leading-tight text-slate-950">
              나의 결과: {resultType}
            </p>
          </div>
          <p className="text-2xl font-medium text-slate-500">
            temon.kr 에서 나도 테스트하기
          </p>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        disabled={status === "working"}
        className="min-h-11 w-full border-orange-300 bg-white font-semibold text-orange-700 hover:bg-orange-50"
      >
        {status === "working" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            이미지 만드는 중...
          </>
        ) : status === "done" ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            저장 완료
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            결과 이미지 저장
          </>
        )}
      </Button>
    </div>
  );
}
