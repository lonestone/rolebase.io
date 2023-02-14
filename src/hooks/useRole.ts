import { RoleFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useRole(id?: string): RoleFragment | undefined {
  const getById = useStoreState((state) => state.roles.getById)
  return useMemo(() => (id ? getById(id) : undefined), [getById, id])
}
