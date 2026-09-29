"use client";

import { useSearchParams } from "next/navigation";

/** Shown only when a calculated result was displayed without a confirmed save. */
export function ResultSaveNotice() {
  const searchParams = useSearchParams();
  if (searchParams.get("save") !== "unconfirmed") return null;

  return (
    <div role="status" className="mx-auto my-4 max-w-3xl rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <p className="font-semibold">결과 계산은 완료됐지만 서버 저장은 확인되지 않았습니다.</p>
      <p className="mt-1">아래 결과는 선택한 답변으로 계산한 유형입니다. 이 화면에 확인된 결과 ID가 없어 개인 결과의 영구 링크로 안내하지 않습니다.</p>
    </div>
  );
}
