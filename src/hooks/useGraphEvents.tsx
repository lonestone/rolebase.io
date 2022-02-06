import {
  addMemberToCircle,
  copyCircle,
  moveCircle,
  moveCircleMember,
} from '@api/entities/circles'
import useCreateLog from '@hooks/useCreateLog'
import { useNavigateOrg } from '@hooks/useNavigateOrg'
import { LogType } from '@shared/log'
import { useCallback } from 'react'
import { GraphEvents } from 'src/circles-viz/createGraph'
import { store } from '../store'

export default function useGraphEvents(): GraphEvents {
  const createLog = useCreateLog()

  // Navigation
  const navigateOrg = useNavigateOrg()

  // Navigation Events
  const onMemberClick = useCallback(
    (memberId: string) => navigateOrg(`?memberId=${memberId}`),
    []
  )
  const onCircleClick = useCallback(
    (circleId: string) => navigateOrg(`?circleId=${circleId}`),
    []
  )
  const onCircleMemberClick = useCallback(
    (circleId: string, memberId: string) =>
      navigateOrg(`?circleId=${circleId}&memberId=${memberId}`),
    []
  )

  // Move a circle to another circle
  const onCircleMove = useCallback(
    async (circleId: string, targetCircleId: string | null) => {
      const changes = await moveCircle(circleId, targetCircleId)

      // Log changes
      const { circles, roles } = store.getState()
      const circle = circles.entries?.find((c) => c.id === circleId)
      const role = roles.entries?.find((r) => r.id === circle?.roleId)
      const parentCircle =
        targetCircleId && circles.entries?.find((c) => c.id === targetCircleId)
      const parentRole =
        parentCircle && roles.entries?.find((r) => r.id === parentCircle.roleId)
      if (!role) return
      createLog({
        // meetingId:
        display: {
          type: LogType.CircleMove,
          id: circleId,
          name: role.name,
          parentId: targetCircleId,
          parentName: parentRole ? parentRole.name : null,
        },
        changes,
      })
    },
    []
  )

  // Copy a circle to a target circle
  const onCircleCopy = useCallback(
    async (circleId: string, targetCircleId: string | null) => {
      const changes = await copyCircle(circleId, targetCircleId)

      // Log changes
      const { circles, roles } = store.getState()
      const circle = circles.entries?.find((c) => c.id === circleId)
      const role = roles.entries?.find((r) => r.id === circle?.roleId)
      const targetCircle =
        targetCircleId && circles.entries?.find((c) => c.id === targetCircleId)
      const targetRole =
        targetCircle && roles.entries?.find((r) => r.id === targetCircle.roleId)
      const newCircleId = changes.circles?.[0]?.id
      if (!role || !newCircleId) return
      createLog({
        // meetingId:
        display: {
          type: LogType.CircleCopy,
          id: newCircleId,
          name: role.name,
          parentId: targetCircleId,
          parentName: targetRole ? targetRole.name : null,
        },
        changes,
      })
    },
    []
  )

  // Move a circle member to another circle
  const onMemberMove = useCallback(
    async (
      memberId: string,
      parentCircleId: string,
      targetCircleId: string | null
    ) => {
      const changes = await moveCircleMember(
        memberId,
        parentCircleId,
        targetCircleId
      )

      // Log changes
      const { members, circles, roles } = store.getState()
      const member = members.entries?.find((m) => m.id === memberId)
      const targetCircle =
        targetCircleId && circles.entries?.find((c) => c.id === targetCircleId)
      const targetRole =
        targetCircle && roles.entries?.find((r) => r.id === targetCircle.roleId)
      if (!member || !targetRole) return
      createLog({
        // meetingId:
        display: {
          type: LogType.CircleMemberMove,
          id: targetCircle.id,
          name: targetRole.name,
          memberId: memberId,
          memberName: member.name,
        },
        changes,
      })
    },
    []
  )

  // Add a member to a circle
  const onMemberAdd = useCallback(
    async (memberId: string, circleId: string) => {
      const changes = await addMemberToCircle(memberId, circleId)

      // Log changes
      const { members, circles, roles } = store.getState()
      const member = members.entries?.find((m) => m.id === memberId)
      const circle = circles.entries?.find((c) => c.id === circleId)
      const role = circle && roles.entries?.find((r) => r.id === circle.roleId)
      if (!member || !role) return
      createLog({
        // meetingId:
        display: {
          type: LogType.CircleMemberAdd,
          id: circle.id,
          name: role.name,
          memberId: memberId,
          memberName: member.name,
        },
        changes,
      })
    },
    []
  )

  return {
    onCircleClick,
    onMemberClick,
    onCircleMemberClick,
    onClickOutside: navigateOrg,
    onCircleMove,
    onCircleCopy,
    onMemberMove,
    onMemberAdd,
  }
}
