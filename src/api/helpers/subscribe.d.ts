export type SubscriptionFn<Data> = (
  onData: (data: Data) => void,
  onError: (error: Error) => void
) => () => void // Return unsubscribe function
