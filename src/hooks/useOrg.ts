import { OrgEntry } from '@shared/org'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useOrg(id?: string): OrgEntry | undefined {
  const getById = useStoreState((state) => state.orgs.getById)
  const org = useMemo(() => (id ? getById(id) : undefined), [getById, id])
  return org
}
