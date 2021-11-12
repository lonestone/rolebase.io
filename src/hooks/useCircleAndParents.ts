import { CircleWithRoleEntry } from '@shared/circle'
import { getCircleRoles } from '@shared/getCircleRoles'
import { useMemo } from 'react'
import { useStoreState } from '../store/hooks'

export default function useCircleAndParents(
  id: string
): CircleWithRoleEntry[] | undefined {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)

  return useMemo(() => {
    if (!circles || !roles) return undefined
    return getCircleRoles(circles, roles, id)
  }, [circles, roles, id])
}
