import { useEffect, useState } from 'react'
import { SubscriptionFn } from '../api/firebase'

export default function useSubscription<Data>(
  subscription: SubscriptionFn<Data> | undefined
) {
  const [data, setData] = useState<Data | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    if (!subscription) return
    const unsubscribe = subscription((newData) => {
      setData(newData)
      setLoading(false)
    }, setError)
    return () => unsubscribe()
  }, [subscription])

  return {
    data,
    loading,
    error,
  }
}
