import { CircleFullFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircle(id?: string): CircleFullFragment | undefined {
  const getById = useStoreState((state) => state.circles.getById)
  return useMemo(() => (id ? getById(id) : undefined), [getById, id])
}
