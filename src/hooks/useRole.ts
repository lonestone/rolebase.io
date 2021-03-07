import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'

export default function useRole(id: string) {
  const getById = useStoreState((state) => state.roles.getById)
  const role = useMemo(() => getById(id), [getById, id])
  return role
}
