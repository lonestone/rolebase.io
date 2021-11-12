import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircle(id: string) {
  const getById = useStoreState((state) => state.circles.getById)
  const circle = useMemo(() => getById(id), [getById, id])
  return circle
}
