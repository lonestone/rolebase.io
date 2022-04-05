import { SubscriptionFn } from './subscribe'

// Keep a stack of same subscriptions to avoid duplicating them
export function stackSubscribe<Data>(
  subscribe: SubscriptionFn<Data>
): SubscriptionFn<Data> {
  let unsubscribe: undefined | (() => void)
  let lastData: Data | undefined
  let lastError: Error | undefined
  const onDataListeners: ((data: Data) => void)[] = []
  const onErrorListeners: ((error: Error) => void)[] = []

  const onDataInternal = (data: Data) => {
    // console.log('DEBUG data', data)
    lastData = data
    lastError = undefined
    onDataListeners.forEach((listener) => listener(data))
  }
  const onErrorInternal = (error: Error) => {
    // console.log('DEBUG error', error)
    lastError = error
    lastData = undefined
    onErrorListeners.forEach((listener) => listener(error))
  }

  // Return new subscribe function
  return (onData, onError) => {
    onDataListeners.push(onData)
    onErrorListeners.push(onError)

    if (!unsubscribe) {
      // New subscription (first to listen)
      // console.log('DEBUG subscribe')
      unsubscribe = subscribe(onDataInternal, onErrorInternal)
    } else {
      // Subscription already exists
      // We send last data and error to new listener
      if (lastData) onData(lastData)
      if (lastError) onError(lastError)
    }

    // Unsubscribe
    return () => {
      // Remove listeners
      onDataListeners.splice(onDataListeners.indexOf(onData), 1)
      onErrorListeners.splice(onErrorListeners.indexOf(onError), 1)
      // If no more listeners, unsubscribe
      if (onDataListeners.length === 0) {
        // console.log('DEBUG unsubscribe')
        unsubscribe?.()
        unsubscribe = undefined
        lastData = undefined
        lastError = undefined
      }
    }
  }
}
