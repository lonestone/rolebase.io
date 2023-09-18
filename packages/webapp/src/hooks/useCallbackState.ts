import { useCallback, useState } from 'react'

export default function useCallbackState<Params extends any[], Result>(
  callback: (...params: Params) => Promise<Result>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [done, setDone] = useState(false)
  const [value, setValue] = useState<Result | undefined>()

  const call = useCallback(
    async (...params: Params): Promise<Result | undefined> => {
      setLoading(true)
      setError(undefined)
      try {
        const result = await callback(...params)
        setValue(result)
        setDone(true)
        return result
      } catch (e: any) {
        setValue(undefined)
        setError(e)
        return undefined
      } finally {
        setLoading(false)
      }
    },
    [callback]
  )

  const reset = useCallback(() => {
    setLoading(false)
    setError(undefined)
    setDone(false)
    setValue(undefined)
  }, [])

  return {
    loading,
    error,
    done,
    value,
    call,
    reset,
  }
}
