import { Member_Scope_Enum } from '@gql'
import { getAllCircleMembersParticipants } from '@shared/helpers/getAllCircleMembersParticipants'
import { getCircleParticipants } from '@shared/helpers/getCircleParticipants'
import { getOrg } from './getOrg'
import { RouteError } from './route'

export async function getParticipantIdsByScope(
  orgId: string,
  circleId: string,
  scope?: Member_Scope_Enum,
  extraMembersIds?: string[]
) {
  const org = await getOrg(orgId)
  if (!org) {
    throw new RouteError(404, 'Org not found')
  }

  let memberIds: string[] = []

  // Get recipients by scope
  if (scope === Member_Scope_Enum.Organization) {
    // Get all organization members
    memberIds = org.members.map((member) => member.id)
  } else if (scope === Member_Scope_Enum.CircleLeaders) {
    // Get circle and links leaders
    memberIds = getCircleParticipants(circleId, org.circles).map(
      (participant) => participant.member.id
    )
  } else if (scope === Member_Scope_Enum.CircleMembers) {
    // Get all circle members
    memberIds = getAllCircleMembersParticipants(circleId, org.circles).map(
      (participant) => participant.member.id
    )
  }

  // Get extra recipients added to those of the scope
  if (extraMembersIds) {
    for (const memberId of extraMembersIds) {
      const member = org.members.find((m) => m.id === memberId)
      if (member) {
        memberIds.push(member.id)
      }
    }
  }

  if (!memberIds || memberIds.length === 0) {
    throw new RouteError(404, 'Members not found')
  }
  return [...new Set(memberIds)]
}
