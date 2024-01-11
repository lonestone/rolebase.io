import { useMemo } from 'react'

interface EntityWithCircle {
  circleId: string
}

// Filter entries by circleId
export default function useFilterEntitiesByCircle<
  Entity extends EntityWithCircle,
>(data: Entity[] | undefined, circleId?: string): Entity[] | undefined {
  return useMemo(() => {
    if (!circleId) return data
    return data?.filter((entry) => entry.circleId === circleId)
  }, [circleId, data])
}
