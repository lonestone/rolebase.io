import { RoleFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useRole(id?: string): RoleFragment | undefined {
  const roles = useStoreState((state) => state.org.roles)
  return useMemo(
    () => (id ? roles?.find((r) => r.id === id) : undefined),
    [roles, id]
  )
}
