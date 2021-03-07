import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'

export default function useCircle(id: string) {
  const getById = useStoreState((state) => state.circles.getById)
  const circle = useMemo(() => getById(id), [getById, id])
  return circle
}
