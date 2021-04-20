import { useMemo } from 'react'
import { OrgEntry } from '../api/entities/orgs'
import { useStoreState } from '../components/store/hooks'

export default function useOrg(id?: string): OrgEntry | undefined {
  const getById = useStoreState((state) => state.orgs.getById)
  const org = useMemo(() => (id ? getById(id) : undefined), [getById, id])
  return org
}
