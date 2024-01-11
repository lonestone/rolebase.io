import { CircleFullFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircle(id?: string): CircleFullFragment | undefined {
  const circles = useStoreState((state) => state.org.circles)
  return useMemo(
    () => (id ? circles?.find((c) => c.id === id) : undefined),
    [circles, id]
  )
}
