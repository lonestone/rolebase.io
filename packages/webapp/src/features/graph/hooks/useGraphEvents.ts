import { useNavigateOrg } from '@/org/hooks/useNavigateOrg'
import { useCallback, useMemo } from 'react'
import useAddCircleMember from '../../circle/hooks/useAddCircleMember'
import useCopyCircle from '../../circle/hooks/useCopyCircle'
import useMoveCircle from '../../circle/hooks/useMoveCircle'
import useRemoveCircleMember from '../../circle/hooks/useRemoveCircleMember'
import useOrgMember from '../../member/hooks/useOrgMember'
import { GraphEvents } from '../types'

export default function useGraphEvents(): GraphEvents {
  const isMember = useOrgMember()
  const navigateOrg = useNavigateOrg()
  const moveCircle = useMoveCircle()
  const copyCircle = useCopyCircle()
  const addCircleMember = useAddCircleMember()
  const removeCircleMember = useRemoveCircleMember()

  // Navigation Events
  const onCircleClick = useCallback(
    (circleId: string) => navigateOrg(`roles?circleId=${circleId}`),
    []
  )
  const onMemberClick = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`roles?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  // Move a circle member to another circle
  const onMemberMove = useCallback(
    async (
      memberId: string,
      parentCircleId: string,
      targetCircleId: string | null
    ) => {
      if (targetCircleId) {
        await addCircleMember(targetCircleId, memberId)
      }
      await removeCircleMember(parentCircleId, memberId)
    },
    []
  )

  // Add a member to a circle
  const onMemberAdd = useCallback(
    (memberId: string, circleId: string) => addCircleMember(circleId, memberId),
    []
  )

  return useMemo(
    () => ({
      onCircleClick,
      onMemberClick,
      onClickOutside: () => navigateOrg('roles'),
      onCircleMove: isMember ? moveCircle : undefined,
      onCircleCopy: isMember ? copyCircle : undefined,
      onMemberMove: isMember ? onMemberMove : undefined,
      onMemberAdd: isMember ? onMemberAdd : undefined,
    }),
    []
  )
}
