import { DependencyList, useCallback, useRef } from 'react'

// Get a callback that waits for the browser to be idle.

export function useIdleCallback<Args extends any[]>(
  callback: (...args: Args) => void,
  deps: DependencyList,
  timeout = 300
) {
  const idleRef = useRef<number | undefined>()

  return useCallback((...args: Args) => {
    // Cancel previous callback
    if (idleRef.current) {
      cancelIdleCallback(idleRef.current)
    }

    // Waits for idle
    idleRef.current = requestIdleCallback(
      () => {
        callback(...args)
        idleRef.current = undefined
      },
      {
        timeout,
      }
    )
  }, deps)
}
