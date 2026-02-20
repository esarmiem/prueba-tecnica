import { useCallback, useState } from 'react'

export const useAsync = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(false)

  const execute = useCallback(
    async <T>(
      operation: () => Promise<T>,
      errorMessage: string,
      onSuccess?: (result: T) => void,
      onError?: () => void
    ) => {
      setLoading(true)
      setError(null)
      try {
        const result = await operation()
        setIsFallback(false)
        if (onSuccess) onSuccess(result)
        return result
      } catch (err) {
        setError(errorMessage)
        if (onError) {
          onError()
        } else {
          throw err
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    loading,
    error,
    isFallback,
    execute,
    setError, // Exposed in case manual error setting is needed
    setIsFallback, // Exposed in case manual fallback setting is needed
  }
}
