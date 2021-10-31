import { CircleWithRoleEntry } from '@shared/circles'
import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'
import { getCircleRoles } from '../utils/getCircleRoles'

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
