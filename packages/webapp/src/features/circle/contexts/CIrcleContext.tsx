import useCurrentMember from '@/member/hooks/useCurrentMember'
import useOrgMember from '@/member/hooks/useOrgMember'
import useOrgOwner from '@/member/hooks/useOrgOwner'
import useCurrentOrg from '@/org/hooks/useCurrentOrg'
import useCircleLeaders from '@/participants/hooks/useCircleLeaders'
import useCircleParticipants from '@/participants/hooks/useCircleParticipants'
import { CircleFullFragment, RoleSummaryFragment } from '@gql'
import { ParticipantMember } from '@shared/model/member'
import React, { ReactNode, createContext } from 'react'
import useCircle from '../hooks/useCircle'

interface CircleContextValues {
  circle: CircleFullFragment
  parentCircle?: CircleFullFragment
  ownerCircle?: CircleFullFragment
  role: RoleSummaryFragment
  hasParentLinkMembers: boolean
  leaders: ParticipantMember[]
  participants: ParticipantMember[]
  owners: ParticipantMember[]
  isLeader: boolean
  isParticipant: boolean
  isOwner: boolean
  canEditCircle: boolean
  canEditRole: boolean
  canEditMembers: boolean
  canEditSubCircles: boolean
  canEditSubCirclesParentLinks: boolean
}

export const CircleContext = createContext<CircleContextValues | undefined>(
  undefined
)

interface Props {
  circleId: string
  children: ReactNode
}

export function CircleProvider({ circleId, children }: Props) {
  const circle = useCircle(circleId)
  const role = circle?.role
  const currentMember = useCurrentMember()
  const org = useCurrentOrg()
  const isOrgMember = useOrgMember()
  const isOrgOwner = useOrgOwner()

  // Participants
  const participants = useCircleParticipants(circle)
  const isParticipant = participants.some(
    (p) => p.member.id === currentMember?.id
  )

  // Leaders
  const leaders = useCircleLeaders(circle)
  const isLeader = leaders.some((p) => p.member.id === currentMember?.id)
  const hasParentLinkMembers = leaders.some(
    (p) => !p.circlesIds.includes(circleId)
  )

  // Parent circle
  const parentCircle = useCircle(circle?.parentId || undefined)

  // Owner circle: grand parent circle if link to parent, else parent circle
  const grandParentCircle = useCircle(
    (role?.parentLink && parentCircle?.parentId) || undefined
  )
  const ownerCircle = grandParentCircle || parentCircle

  // Parent owners
  const owners = useCircleLeaders(ownerCircle)
  const isOwner = owners.some((p) => p.member.id === currentMember?.id)

  // Can edit circle
  const canEditCircle = org?.protectGovernance
    ? isOrgOwner || isOwner
    : isOrgMember

  // Can edit role
  const canEditRole = role?.base ? isOrgOwner : canEditCircle

  // Can edit sub circles
  const canEditSubCircles =
    role?.singleMember === false &&
    role?.parentLink === false &&
    (org?.protectGovernance ? isOrgOwner || isLeader : isOrgMember)

  // Can edit sub-circles with parent link
  const canEditSubCirclesParentLinks =
    canEditCircle && role?.singleMember === false && role?.parentLink === false

  // Can edit members
  const canEditMembers = org?.protectGovernance
    ? isOrgOwner || (hasParentLinkMembers ? isLeader : isOwner)
    : isOrgMember

  // Prepare context value
  const value = circle &&
    role && {
      circle,
      parentCircle,
      ownerCircle,
      role,
      hasParentLinkMembers,
      leaders,
      participants,
      owners,
      isLeader,
      isParticipant,
      isOwner,
      canEditCircle,
      canEditRole,
      canEditMembers,
      canEditSubCircles,
      canEditSubCirclesParentLinks,
    }

  return (
    <CircleContext.Provider value={value}>{children}</CircleContext.Provider>
  )
}
