"use client";

import { useState } from "react";
import { Check, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createShareLink } from "@/lib/api-client";
import { trackShare } from "@/lib/analytics";

interface ShareButtonsProps {
  testId: string;
  testPath: string;
  resultType: string;
  resultId?: string;
  title: string;
  description: string;
}

export function ShareButtons({
  testId,
  testPath,
  resultType,
  resultId,
  title,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = createShareLink(testPath, resultType, resultId);
  const hookText = `${title} ${description}`;

  const handleShare = async () => {
    trackShare(testId, "share_click");
    const fullShareText = `${hookText}\n\n${shareUrl}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text: hookText, url: shareUrl });
        trackShare(testId, "share_native_success");
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullShareText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = fullShareText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      trackShare(testId, "share_copy_success");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        alert("공유 기능을 사용할 수 없습니다. 링크를 직접 복사해 주세요.");
      }
    }
  };

  const handleKakao = () => {
    trackShare(testId, "share_kakao");
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(
      shareUrl,
    )}`;
    window.open(kakaoUrl, "_blank", "noopener,noreferrer");
  };

  const handleTwitter = () => {
    trackShare(testId, "share_twitter");
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl,
    )}&text=${encodeURIComponent(hookText)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        onClick={handleShare}
        className="min-h-12 w-full bg-slate-950 text-base font-bold text-white hover:bg-slate-800"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            링크 복사 완료
          </>
        ) : (
          <>
            <Share2 className="mr-2 h-5 w-5" />
            결과 공유하기
          </>
        )}
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleKakao}
          variant="outline"
          className="min-h-11 border-[#FEE500] bg-[#FEE500] font-semibold text-[#191919] hover:bg-[#FDD800]"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          카카오
        </Button>
        <Button
          onClick={handleTwitter}
          variant="outline"
          className="min-h-11 border-black bg-black font-semibold text-white hover:bg-gray-800"
        >
          X 공유
        </Button>
      </div>
    </div>
  );
}
