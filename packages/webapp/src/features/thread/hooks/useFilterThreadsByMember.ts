import { ThreadFragment } from '@gql'
import filterThreadsByMember from '@shared/helpers/filterThreadsByMember'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'

export default function useFilterThreadsByMember<Entity extends ThreadFragment>(
  threads: Entity[] | undefined,
  memberId?: string
): Entity[] | undefined {
  const circles = useStoreState((state) => state.org.circles)

  // Filter entries
  return useMemo(
    () => threads && filterThreadsByMember(threads, memberId, circles),
    [threads, memberId, circles]
  )
}
