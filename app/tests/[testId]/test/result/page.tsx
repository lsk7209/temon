import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ResultEntryPageProps {
  params: { testId: string }
  searchParams: {
    id?: string
    type?: string
  }
}

export default function ResultEntryPage({ params, searchParams }: ResultEntryPageProps) {
  const resultId = searchParams.id
  const resultType = searchParams.type

  if (resultId) {
    const query = resultType ? `?type=${encodeURIComponent(resultType)}` : ""
    redirect(`/tests/${params.testId}/test/result/${resultId}${query}`)
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
            <Link href={`/tests/${params.testId}/test`}>테스트 다시 하기</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">다른 테스트 보기</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
