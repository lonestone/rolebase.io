import { useCallback, useState } from 'react'

export default function useCallbackState<Params extends any[]>(
  callback: (...params: Params) => Promise<void>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [done, setDone] = useState(false)

  const call = useCallback(
    async (...params: Params): Promise<void> => {
      setLoading(true)
      setError(undefined)
      try {
        await callback(...params)
        setDone(true)
      } catch (e: any) {
        setError(e)
      }
      setLoading(false)
    },
    [callback]
  )

  const reset = useCallback(() => {
    setLoading(false)
    setError(undefined)
    setDone(false)
  }, [])

  return {
    loading,
    error,
    done,
    call,
    reset,
  }
}
