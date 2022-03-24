import { useMemo } from 'react'

export function useCombineArrays<T>(...arrays: Array<T[]>): T[] {
  return useMemo(
    () => arrays.reduce((acc, array) => acc.concat(array), []),
    arrays
  )
}
