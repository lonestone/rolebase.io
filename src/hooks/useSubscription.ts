import { SubscriptionFn } from '@api/helpers/subscribe'
import { useEffect, useState } from 'react'

export default function useSubscription<Data>(
  subscription: SubscriptionFn<Data> | undefined
) {
  const [data, setData] = useState<Data | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    setData(undefined)
    setError(undefined)
    if (!subscription) {
      setLoading(false)
      return
    }
    setLoading(true)

    const unsubscribe = subscription(
      (newData) => {
        setData(newData)
        setLoading(false)
      },
      (error) => {
        setError(error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [subscription])

  return {
    data,
    loading,
    error,
  }
}
