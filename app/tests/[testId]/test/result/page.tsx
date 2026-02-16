import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

interface Props {
  params: { testId: string }
  searchParams: { id?: string; type?: string }
}

export default function DynamicResultEntryPage({ params, searchParams }: Props) {
  const resultId = searchParams.id

  if (resultId) {
    redirect(`/tests/${params.testId}/test/result/${resultId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">결과 페이지를 찾을 수 없어요</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          결과 ID 없이 접근된 경로입니다. 테스트를 다시 진행하면 정상적으로 결과 페이지로 이동합니다.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link href={`/tests/${params.testId}`}>
            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              테스트 다시하기
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              홈으로 이동
            </Button>
          </Link>
        </div>

        {searchParams.type && (
          <p className="text-xs text-gray-400 mt-5">참고 유형 코드: {searchParams.type}</p>
        )}
      </div>
    </div>
  )
}
