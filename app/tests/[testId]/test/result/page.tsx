import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: { testId: string };
  searchParams: { id?: string | string[]; type?: string | string[] };
}

const ALLOWED_TEST_ID = /^[a-z0-9-]+$/;

const toSingleParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export default function DynamicResultEntryPage({
  params,
  searchParams,
}: Props) {
  const safeTestId = params.testId.trim().toLowerCase();

  if (!ALLOWED_TEST_ID.test(safeTestId)) {
    notFound();
  }

  const resultId = toSingleParam(searchParams.id)?.trim();
  const resultType = toSingleParam(searchParams.type)?.trim();

  if (resultId) {
    const encodedId = encodeURIComponent(resultId);
    const query = resultType ? `?type=${encodeURIComponent(resultType)}` : "";
    redirect(`/tests/${safeTestId}/test/result/${encodedId}${query}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          결과 페이지를 찾을 수 없어요
        </h1>
        <p className="mb-6 leading-relaxed text-gray-600">
          결과 ID 없이 접근한 경로입니다. 테스트를 다시 진행하면 정상적으로
          결과 페이지로 이동합니다.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={`/tests/${safeTestId}`}>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              테스트 다시하기
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              홈으로 이동
            </Button>
          </Link>
        </div>

        {resultType && (
          <p className="mt-5 text-xs text-gray-400">
            참고 유형 코드: {resultType}
          </p>
        )}
      </div>
    </div>
  );
}
