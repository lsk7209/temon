import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ResultEntryPageProps {
  params: { testId: string }
  searchParams: {
    id?: string | string[]
    type?: string | string[]
  }
}

const ALLOWED_TEST_ID = /^[a-z0-9-]+$/

const toSingleParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value

const normalizeQueryValue = (value?: string) => {
  if (!value) return ""
  return value.trim()
}

export default function ResultEntryPage({ params, searchParams }: ResultEntryPageProps) {
  const safeTestId = params.testId.trim().toLowerCase()

  if (!ALLOWED_TEST_ID.test(safeTestId)) {
    notFound()
  }

  const resultId = normalizeQueryValue(toSingleParam(searchParams.id))
  const resultType = normalizeQueryValue(toSingleParam(searchParams.type))

  if (resultId) {
    const encodedId = encodeURIComponent(resultId)
    const query = resultType ? `?type=${encodeURIComponent(resultType)}` : ""
    redirect(`/tests/${safeTestId}/test/result/${encodedId}${query}`)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl bg-white shadow-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">결과를 불러오지 못했어요</h1>
        <p className="text-gray-600">
          결과 ID가 없어 상세 결과 페이지로 이동할 수 없습니다. 테스트를 다시 진행해 주세요.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <Button asChild size="lg">
            <Link href={`/tests/${safeTestId}/test`}>테스트 다시 하기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">다른 테스트 보기</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
