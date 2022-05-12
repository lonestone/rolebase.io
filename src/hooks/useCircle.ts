import { enrichCircleWithRole } from '@shared/helpers/enrichCirclesWithRoles'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useCircle(
  id?: string
): CircleWithRoleEntry | undefined {
  const getById = useStoreState((state) => state.circles.getById)
  const roles = useStoreState((state) => state.roles.entries)

  return useMemo(() => {
    if (!id || !roles) return
    const circle = getById(id)
    if (!circle) return
    return enrichCircleWithRole(circle, roles)
  }, [getById, roles, id])
}
