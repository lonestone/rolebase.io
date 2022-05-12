import { getParticipantCircles } from '@shared/helpers/getParticipantCircles'
import { CircleWithRoleEntry } from '@shared/model/circle'
import { useStoreState } from '@store/hooks'
import { useMemo } from 'react'
import useCurrentMember from './useCurrentMember'

export default function useCurrentMemberCircles():
  | CircleWithRoleEntry[]
  | undefined {
  const currentMember = useCurrentMember()
  const circles = useStoreState((state) => state.circles.entries)
  const roles = useStoreState((state) => state.roles.entries)

  return useMemo(() => {
    if (!currentMember || !circles || !roles) return
    return getParticipantCircles(currentMember.id, circles, roles)
  }, [currentMember, circles, roles])
}
