import { useMemo } from 'react'
import { useStoreState } from '../components/store/hooks'

export default function useMember(id: string) {
  const getById = useStoreState((state) => state.members.getById)
  const member = useMemo(() => getById(id), [getById, id])
  return member
}
