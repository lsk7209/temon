"use client"

import { useEffect, useMemo, useState } from "react"
import { getTestResult } from "@/lib/api-client"

export function useResolvedResultType(
  validTypes: string[],
  queryType: string | null,
  resultId: string | null
) {
  const normalizedValidTypes = useMemo(() => new Set(validTypes), [validTypes])
  const [resolvedType, setResolvedType] = useState(
    queryType && normalizedValidTypes.has(queryType) ? queryType : ""
  )
  const [loading, setLoading] = useState(Boolean(resultId))

  useEffect(() => {
    let cancelled = false

    async function resolveResultType() {
      if (resultId) {
        try {
          const savedResult = await getTestResult(resultId)
          if (!cancelled && normalizedValidTypes.has(savedResult.resultType)) {
            setResolvedType(savedResult.resultType)
            setLoading(false)
            return
          }
        } catch (error) {
          console.error("Failed to restore saved result:", error)
        }
      }

      if (!cancelled) {
        setResolvedType(queryType && normalizedValidTypes.has(queryType) ? queryType : "")
        setLoading(false)
      }
    }

    void resolveResultType()

    return () => {
      cancelled = true
    }
  }, [normalizedValidTypes, queryType, resultId])

  return { resolvedType, loading }
}
