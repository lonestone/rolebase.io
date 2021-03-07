import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'

export default function useOrg(id?: string) {
  const getById = useStoreState((state) => state.orgs.getById)
  const org = useMemo(() => (id ? getById(id) : undefined), [getById, id])
  return org
}
