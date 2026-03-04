import { redirect } from "next/navigation"

interface FoodBrandResultEntryProps {
  searchParams: { id?: string; type?: string }
}

export default function FoodBrandResultEntryPage({ searchParams }: FoodBrandResultEntryProps) {
  const resultId = searchParams.id?.trim()

  if (resultId) {
    redirect(`/tests/food-brand/test/result/${resultId}`)
  }

  redirect("/tests/food-brand")
}
