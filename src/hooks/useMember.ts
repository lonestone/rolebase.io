import { MemberFragment } from '@gql'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useMember(id?: string): MemberFragment | undefined {
  const members = useStoreState((state) => state.org.members)
  return useMemo(
    () => (id ? members?.find((m) => m.id === id) : undefined),
    [members, id]
  )
}
