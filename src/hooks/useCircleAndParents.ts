import { CircleWithRoleEntry } from '@shared/circle'
import { enrichCirclesWithRoles } from '@shared/helpers/enrichCirclesWithRoles'
import { getCircleAndParents } from '@shared/helpers/getCircleAndParents'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircleAndParents(
  id: string
): CircleWithRoleEntry[] | undefined {
  const roles = useStoreState((state) => state.roles.entries)
  const circles = useStoreState((state) => state.circles.entries)

  return useMemo(() => {
    if (!circles || !roles) return undefined
    return enrichCirclesWithRoles(getCircleAndParents(circles, id), roles)
  }, [circles, roles, id])
}
