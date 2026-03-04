import { redirect } from "next/navigation"

interface ResultEntryPageProps {
  params: { testId: string }
  searchParams: { id?: string }
}

export default function ResultEntryPage({ params, searchParams }: ResultEntryPageProps) {
  const resultId = searchParams.id?.trim()

  if (resultId) {
    redirect(`/tests/${params.testId}/test/result/${resultId}`)
  }

  redirect(`/tests/${params.testId}`)
}
