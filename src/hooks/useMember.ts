import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useMember(id: string) {
  const getById = useStoreState((state) => state.members.getById)
  const member = useMemo(() => getById(id), [getById, id])
  return member
}
