"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import { BREAKUP_RECOVERY_SPEED_RESULTS } from "@/lib/data/breakup-recovery-speed-results";

function ResultContent() {
  const searchParams = useSearchParams();
  const mbti = (searchParams.get("type") || "ISTJ").toUpperCase();
  const result = BREAKUP_RECOVERY_SPEED_RESULTS[mbti] || BREAKUP_RECOVERY_SPEED_RESULTS.ISTJ;

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-rose-50 to-pink-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center space-y-3">
            <Badge className="mx-auto bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white">{result.mbti}</Badge>
            <CardTitle className="text-3xl md:text-4xl font-bold">{result.name}</CardTitle>
            <p className="text-lg text-gray-600">{result.summary}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="font-semibold mb-3">✨ 핵심 특성</h3>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
            </section>
            <section>
              <h3 className="font-semibold mb-2">💔 지금 이 모습</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {result.presets.status.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold mb-2">🌱 회복 가속 팁</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {result.presets.recovery.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </section>
            <section>
              <h3 className="font-semibold mb-2">⚠️ 주의할 점</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {result.presets.warning.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </section>
            <section className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">찰떡 스타일</p>
                <p className="text-lg font-bold text-fuchsia-600">{result.recommend.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">피곤한 스타일</p>
                <p className="text-lg font-bold text-rose-600">{result.pitfalls.join(", ")}</p>
              </div>
            </section>
          </CardContent>
        </Card>
        <ShareButtons
          testId="breakup-recovery-speed"
          testPath="/tests/breakup-recovery-speed"
          resultType={result.mbti}
          title={`나의 이별 회복 유형: ${result.name}`}
          description={result.summary}
        />
        <div className="flex gap-3 justify-center pt-4">
          <Button asChild variant="outline">
            <Link href="/tests/breakup-recovery-speed"><RotateCcw className="w-4 h-4 mr-2" />다시 테스트</Link>
          </Button>
          <Button asChild><Link href="/tests">다른 테스트 보기</Link></Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return <Suspense fallback={null}><ResultContent /></Suspense>;
}
